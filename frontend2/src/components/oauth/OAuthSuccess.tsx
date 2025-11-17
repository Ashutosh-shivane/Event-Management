import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function OAuth2Success() {
  const navigate = useNavigate();
  const { handleGoogleOAuthCallback } = useAuth();

  useEffect(() => {
    handleGoogleOAuthCallback();
    navigate("/dashboard");
  }, []);

  return <p>Logging you in...</p>;
}

export default OAuth2Success;
