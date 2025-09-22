import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNotifications } from '../NotificationContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  ArrowLeft,
  Clock,
  DollarSign,
  CheckCircle,
  X,
  MessageSquare,
  TrendingUp,
  Calendar,
  User,
  FileText
} from 'lucide-react';

export function ManagerInvitationsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserNotifications, markAsRead, sendCounterOffer } = useNotifications();
  const [counterOffers, setCounterOffers] = useState<{[key: string]: { amount: string; message: string }}>({});
  const [isResponding, setIsResponding] = useState(false);

  // Get manager invitations from notifications
  const invitations = getUserNotifications(user?.id || '').filter(
    notification => notification.type === 'invitation' && notification.userRole === 'manager'
  );

  const handleAcceptInvitation = async (notificationId: string) => {
    setIsResponding(true);
    try {
      // Mark notification as read
      markAsRead(notificationId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Invitation accepted successfully!');
    } catch (error) {
      console.error('Failed to accept invitation:', error);
      alert('Failed to accept invitation. Please try again.');
    } finally {
      setIsResponding(false);
    }
  };

  const handleDeclineInvitation = async (notificationId: string) => {
    setIsResponding(true);
    try {
      // Mark notification as read
      markAsRead(notificationId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Invitation declined.');
    } catch (error) {
      console.error('Failed to decline invitation:', error);
      alert('Failed to decline invitation. Please try again.');
    } finally {
      setIsResponding(false);
    }
  };

  const handleSendCounterOffer = async (notification: any) => {
    const counterOffer = counterOffers[notification.id];
    if (!counterOffer?.amount || !counterOffer?.message) {
      alert('Please enter both counter offer amount and message');
      return;
    }

    setIsResponding(true);
    try {
      sendCounterOffer({
        invitationId: notification.id,
        managerId: user?.id || '',
        organizerId: notification.data?.organizerId || '',
        eventId: notification.data?.eventId || '',
        eventTitle: notification.data?.eventTitle || '',
        managerName: user?.name || '',
        originalBudget: notification.data?.budget || 0,
        counterOffer: parseFloat(counterOffer.amount),
        counterMessage: counterOffer.message,
        currency: notification.data?.currency || 'USD'
      });

      // Mark notification as read
      markAsRead(notification.id);
      
      // Clear form
      setCounterOffers(prev => ({
        ...prev,
        [notification.id]: { amount: '', message: '' }
      }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Counter offer sent successfully!');
    } catch (error) {
      console.error('Failed to send counter offer:', error);
      alert('Failed to send counter offer. Please try again.');
    } finally {
      setIsResponding(false);
    }
  };

  const updateCounterOffer = (notificationId: string, field: 'amount' | 'message', value: string) => {
    setCounterOffers(prev => ({
      ...prev,
      [notificationId]: {
        ...prev[notificationId],
        [field]: value
      }
    }));
  };

  const getCounterOffer = (notificationId: string) => {
    return counterOffers[notificationId] || { amount: '', message: '' };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manager Invitations</h1>
            <p className="text-gray-600">
              Review and respond to event management invitations
            </p>
          </div>
        </div>

        {/* Invitations */}
        <div className="space-y-6">
          {invitations.length > 0 ? (
            invitations.map((invitation) => (
              <Card key={invitation.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        {invitation.data?.eventTitle}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Invited by {invitation.data?.organizerName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {invitation.timestamp.toLocaleDateString()}
                      </Badge>
                      {!invitation.read && (
                        <Badge variant="destructive">New</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* Role Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Role</Label>
                        <p className="text-lg font-semibold">{invitation.data?.assignedRole}</p>
                      </div>
                      
                      {invitation.data?.roleDescription && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Description</Label>
                          <p className="text-sm text-gray-600">{invitation.data.roleDescription}</p>
                        </div>
                      )}

                      {invitation.data?.deadline && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Application Deadline</Label>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            <p className="text-sm">{invitation.data.deadline}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {invitation.data?.budget && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Budget</Label>
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                            <p className="text-xl font-bold text-green-600">
                              {invitation.data.currency} {invitation.data.budget}
                            </p>
                          </div>
                        </div>
                      )}

                      {invitation.data?.customMessage && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Message</Label>
                          <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                            <p className="text-sm">{invitation.data.customMessage}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Responsibilities and Requirements */}
                  {(invitation.data?.responsibilities || invitation.data?.requirements) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                      {invitation.data.responsibilities && invitation.data.responsibilities.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Responsibilities</Label>
                          <ul className="space-y-1">
                            {invitation.data.responsibilities.map((responsibility, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {invitation.data.requirements && invitation.data.requirements.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Requirements</Label>
                          <ul className="space-y-1">
                            {invitation.data.requirements.map((requirement, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {requirement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Counter Offer Section */}
                  <div className="pt-4 border-t space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Send Counter Offer (Optional)</Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Proposed Budget</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            {invitation.data?.currency || 'USD'}
                          </span>
                          <Input
                            type="number"
                            value={getCounterOffer(invitation.id).amount}
                            onChange={(e) => updateCounterOffer(invitation.id, 'amount', e.target.value)}
                            placeholder="Enter amount"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Justification Message</Label>
                        <Textarea
                          value={getCounterOffer(invitation.id).message}
                          onChange={(e) => updateCounterOffer(invitation.id, 'message', e.target.value)}
                          placeholder="Explain your counter offer..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <Button 
                      onClick={() => handleAcceptInvitation(invitation.id)}
                      disabled={isResponding}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Invitation
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleSendCounterOffer(invitation)}
                      disabled={isResponding || !getCounterOffer(invitation.id).amount || !getCounterOffer(invitation.id).message}
                      className="flex items-center"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Send Counter Offer
                    </Button>
                    
                    <Button 
                      variant="destructive"
                      onClick={() => handleDeclineInvitation(invitation.id)}
                      disabled={isResponding}
                      className="flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Invitations</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any pending manager invitations at the moment.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Information Alert */}
        <Alert className="mt-8">
          <FileText className="h-4 w-4" />
          <AlertDescription>
            <strong>About Manager Invitations:</strong><br />
            • Review all details carefully before responding<br />
            • Counter offers allow you to negotiate budget and terms<br />
            • Accepted invitations are binding commitments<br />
            • Contact the organizer directly for any questions
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}