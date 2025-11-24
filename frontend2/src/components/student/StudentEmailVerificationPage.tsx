import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import {
  ArrowLeft,
  Mail,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import axios from "axios";
import API from "../config/axiosConfig";

export function StudentEmailVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const userid = localStorage.getItem("id");
  const email = localStorage.getItem("email");

  useEffect(() => {
  if (resendTimer > 0) {
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }
}, [resendTimer]);

  useEffect(() => {

    const lastSent = localStorage.getItem("otp_last_sent");
  const now = Date.now();

  // If OTP already sent less than 90 seconds ago, DO NOT resend
  if (lastSent && now - Number(lastSent) < 90 * 1000) {
    console.log("OTP recently sent; skipping auto-send.");
    const firstInput = document.getElementById("otp-input-0") as HTMLInputElement;
    firstInput?.focus();
    return;
  }


    const payload = {
      userid: userid,
      email: email,
    };

    API.post(`/EmailVerification/SentEmail`, payload).then(() => {
      console.log("OTP sent to email");
      localStorage.setItem("otp_last_sent", now.toString());
      setResendTimer(50);
    });

    // Focus first input
    const firstInput = document.getElementById("otp-input-0") as HTMLInputElement;
    firstInput?.focus();
  }, []);

  const focusInput = (index: number) => {
    const el = document.getElementById(`otp-input-${index}`) as HTMLInputElement;
    if (el) el.focus();
  };

  const handleOtpChange = (index: number, value: string) => {
    const sanitized = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    const newOtp = [...otp];

    if (sanitized.length > 1) {
      const chars = sanitized.slice(0, 6 - index).split("");
      chars.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      focusInput(Math.min(index + sanitized.length, 5));
    } else {
      newOtp[index] = sanitized;
      setOtp(newOtp);

      if (sanitized && index < 5) {
        focusInput(index + 1);
      }
    }

    setError("");
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < 5) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 6)
      .split("");

    const newOtp = [...otp];
    pasted.forEach((char, index) => {
      newOtp[index] = char;
    });

    setOtp(newOtp);
    focusInput(Math.min(pasted.length, 5));
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 characters");
      return;
    }

    setIsVerifying(true);
    setError("");

    const payload={
      userid:userid,
      email:email,
      otp:otpCode
    }

    try {
      const response = await API.post("/EmailVerification/VerifyEmailOtp", payload);

      alert(response.data);

      console.log(response.data);

      setSuccess(true);
      
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Verification failed. Please check your OTP."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
     setIsResending(true);
    try {
      const payload = { userid, email };
      await API.post(`/EmailVerification/ReSentEmail`, payload);

      alert("OTP resent to your email");
      setResendTimer(50);
      setOtp(Array(6).fill(""));
      focusInput(0);
      setError("");
       localStorage.setItem("otp_last_sent", Date.now().toString());
    } catch {
      setError("Failed to resend OTP. Try again.");
    }
     finally {
    setIsResending(false); // stop the loader but button will stay disabled because timer > 0
  }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Button
          variant="outline"
          onClick={() => navigate("/profile")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              A 6-character verification code has been sent to your email.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <Label className="text-center block mb-3">
                Enter 6-Character OTP Code
              </Label>

              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg font-semibold uppercase"
                    disabled={isVerifying || success}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-500 text-center">
                OTP may contain A–Z and 0–9
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Email verified successfully! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleVerify}
              disabled={isVerifying || success || otp.some((d) => !d)}
              className="w-full"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : success ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verified!
                </>
              ) : (
                "Verify Email"
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
             <Button
  variant="link"
  onClick={handleResendOtp}
  disabled={isVerifying || success || resendTimer > 0 || isResending}
  className="text-blue-600  items-center gap-2"
>
  {isResending ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      Sending...
    </>
  ) : resendTimer > 0 ? (
    `Resend in ${resendTimer}s`
  ) : (
    "Resend OTP"
  )}
</Button>

            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-xs text-gray-500">
          If you face issues, contact support.
        </div>
      </div>
    </div>
  );
}
