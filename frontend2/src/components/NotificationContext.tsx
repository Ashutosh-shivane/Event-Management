import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'invitation';
  userId: string;
  userRole: string;
  timestamp: Date;
  read: boolean;
  data?: {
    eventId?: string;
    organizerId?: string;
    organizerName?: string;
    eventTitle?: string;
    assignedRole?: string;
    permissions?: string[];
    customMessage?: string;
    budget?: number;
    currency?: string;
    roleDescription?: string;
    responsibilities?: string[];
    requirements?: string[];
    deadline?: string;
    counterOffer?: number;
    counterMessage?: string;
  };
  actions?: {
    accept?: () => void;
    decline?: () => void;
    view?: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: (userId: string) => void;
  getUnreadCount: (userId: string) => number;
  getUserNotifications: (userId: string) => Notification[];
  sendManagerInvitation: (invitation: {
    managerId: string;
    managerName: string;
    managerEmail: string;
    eventId: string;
    eventTitle: string;
    organizerId: string;
    organizerName: string;
    assignedRole: string;
    permissions: string[];
    customMessage?: string;
    budget?: number;
    currency?: string;
    roleDescription?: string;
    responsibilities?: string[];
    requirements?: string[];
    deadline?: string;
  }) => void;
  sendCounterOffer: (counteroffer: {
    invitationId: string;
    managerId: string;
    organizerId: string;
    eventId: string;
    eventTitle: string;
    managerName: string;
    originalBudget: number;
    counterOffer: number;
    counterMessage: string;
    currency: string;
  }) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  // Initialize with demo data including a comprehensive manager invitation
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'demo-manager-invitation-1',
      title: 'Event Manager Invitation',
      message: 'You\'ve been invited to manage "Annual Tech Conference 2024" as Event Operations Manager (Budget: USD 15000)',
      type: 'invitation',
      userId: '1', // This will show for any user with ID '1' (our demo user)
      userRole: 'manager',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      data: {
        eventId: 'event-demo-1',
        organizerId: 'organizer-demo-1',
        organizerName: 'Sarah Johnson',
        eventTitle: 'Annual Tech Conference 2024',
        assignedRole: 'Event Operations Manager',
        permissions: ['manage_registrations', 'approve_students', 'manage_volunteers', 'view_analytics'],
        customMessage: 'Hi! We were impressed by your experience in managing large-scale events. This conference expects 500+ attendees and requires coordination between multiple teams. Your expertise in operations management would be invaluable for ensuring smooth execution.',
        budget: 15000,
        currency: 'USD',
        roleDescription: 'Lead the operational aspects of the conference including logistics, vendor coordination, and on-site management.',
        responsibilities: [
          'Coordinate with venue management and ensure setup requirements are met',
          'Oversee registration desk and attendee check-in process',
          'Manage volunteer teams and assign duties for different conference areas',
          'Handle logistics for speaker arrangements and technical setup',
          'Monitor event timeline and ensure all sessions run on schedule',
          'Coordinate with catering services and manage break schedules',
          'Supervise technical equipment setup and troubleshooting',
          'Manage emergency protocols and safety procedures'
        ],
        requirements: [
          'Minimum 3 years of event management experience',
          'Experience managing events with 300+ attendees',
          'Strong leadership and team coordination skills',
          'Proficiency in event management software (preferred)',
          'Excellent communication and problem-solving abilities',
          'Availability for pre-event planning meetings and full conference duration',
          'Certification in event planning (preferred but not required)',
          'Experience working with tech industry events (preferred)'
        ],
        deadline: 'December 31, 2024'
      },
      actions: {
        accept: () => {
          console.log('Manager accepted invitation for Annual Tech Conference 2024');
        },
        decline: () => {
          console.log('Manager declined invitation for Annual Tech Conference 2024');
        },
        view: () => {
          console.log('Manager viewed event details for Annual Tech Conference 2024');
        }
      }
    },
    {
      id: 'demo-manager-invitation-2',
      title: 'Event Manager Invitation',
      message: 'You\'ve been invited to manage "Spring Music Festival" as Marketing & Communications Lead (Budget: USD 8000)',
      type: 'invitation',
      userId: '1',
      userRole: 'manager',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      data: {
        eventId: 'event-demo-2',
        organizerId: 'organizer-demo-2',
        organizerName: 'Michael Chen',
        eventTitle: 'Spring Music Festival',
        assignedRole: 'Marketing & Communications Lead',
        permissions: ['manage_marketing', 'social_media_access', 'press_relations'],
        customMessage: 'We need someone with strong marketing background to promote our music festival. Your portfolio shows excellent results in event promotion!',
        budget: 8000,
        currency: 'USD',
        roleDescription: 'Lead all marketing efforts to promote the festival and drive ticket sales.',
        responsibilities: [
          'Develop and execute comprehensive marketing strategy',
          'Manage social media campaigns across all platforms',
          'Coordinate with media outlets and manage press relations',
          'Design promotional materials and oversee print campaigns'
        ],
        requirements: [
          'Marketing degree or equivalent experience',
          'Social media management expertise',
          'Experience in event promotion',
          'Strong creative and analytical skills'
        ],
        deadline: 'December 15, 2024'
      }
    }
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = (userId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.userId === userId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getUnreadCount = (userId: string) => {
    return notifications.filter(notification => 
      notification.userId === userId && !notification.read
    ).length;
  };

  const getUserNotifications = (userId: string) => {
    return notifications.filter(notification => notification.userId === userId);
  };

  const sendManagerInvitation = (invitation: {
    managerId: string;
    managerName: string;
    managerEmail: string;
    eventId: string;
    eventTitle: string;
    organizerId: string;
    organizerName: string;
    assignedRole: string;
    permissions: string[];
    customMessage?: string;
    budget?: number;
    currency?: string;
    roleDescription?: string;
    responsibilities?: string[];
    requirements?: string[];
    deadline?: string;
  }) => {
    const budgetText = invitation.budget ? ` (Budget: ${invitation.currency || 'USD'} ${invitation.budget})` : '';
    const notification: Omit<Notification, 'id' | 'timestamp' | 'read'> = {
      title: 'Event Manager Invitation',
      message: `You've been invited to manage "${invitation.eventTitle}" as ${invitation.assignedRole}${budgetText}`,
      type: 'invitation',
      userId: invitation.managerId,
      userRole: 'manager',
      data: {
        eventId: invitation.eventId,
        organizerId: invitation.organizerId,
        organizerName: invitation.organizerName,
        eventTitle: invitation.eventTitle,
        assignedRole: invitation.assignedRole,
        permissions: invitation.permissions,
        customMessage: invitation.customMessage,
        budget: invitation.budget,
        currency: invitation.currency,
        roleDescription: invitation.roleDescription,
        responsibilities: invitation.responsibilities,
        requirements: invitation.requirements,
        deadline: invitation.deadline,
      },
      actions: {
        accept: () => {
          console.log(`Manager ${invitation.managerId} accepted invitation for event ${invitation.eventId}`);
          // Here you would typically update the event with the manager assignment
        },
        decline: () => {
          console.log(`Manager ${invitation.managerId} declined invitation for event ${invitation.eventId}`);
          // Here you would typically remove the invitation
        },
        view: () => {
          console.log(`Manager ${invitation.managerId} viewed event details ${invitation.eventId}`);
          // Here you would navigate to event details
        }
      }
    };

    addNotification(notification);

    // Also create a notification for the organizer
    const organizerNotification: Omit<Notification, 'id' | 'timestamp' | 'read'> = {
      title: 'Manager Invitation Sent',
      message: `Invitation sent to ${invitation.managerName} for "${invitation.eventTitle}" (${invitation.assignedRole})`,
      type: 'success',
      userId: invitation.organizerId,
      userRole: 'organizer',
      data: {
        eventId: invitation.eventId,
        eventTitle: invitation.eventTitle,
        assignedRole: invitation.assignedRole,
        budget: invitation.budget,
        currency: invitation.currency,
      }
    };

    addNotification(organizerNotification);
  };

  const sendCounterOffer = (counteroffer: {
    invitationId: string;
    managerId: string;
    organizerId: string;
    eventId: string;
    eventTitle: string;
    managerName: string;
    originalBudget: number;
    counterOffer: number;
    counterMessage: string;
    currency: string;
  }) => {
    // Notification to organizer about counter offer
    const organizerNotification: Omit<Notification, 'id' | 'timestamp' | 'read'> = {
      title: 'Counter Offer Received',
      message: `${counteroffer.managerName} sent a counter offer for "${counteroffer.eventTitle}"`,
      type: 'info',
      userId: counteroffer.organizerId,
      userRole: 'organizer',
      data: {
        eventId: counteroffer.eventId,
        eventTitle: counteroffer.eventTitle,
        budget: counteroffer.originalBudget,
        counterOffer: counteroffer.counterOffer,
        counterMessage: counteroffer.counterMessage,
        currency: counteroffer.currency,
      }
    };

    addNotification(organizerNotification);

    // Confirmation notification to manager
    const managerNotification: Omit<Notification, 'id' | 'timestamp' | 'read'> = {
      title: 'Counter Offer Sent',
      message: `Your counter offer for "${counteroffer.eventTitle}" has been sent to the organizer`,
      type: 'success',
      userId: counteroffer.managerId,
      userRole: 'manager',
      data: {
        eventId: counteroffer.eventId,
        eventTitle: counteroffer.eventTitle,
        counterOffer: counteroffer.counterOffer,
        currency: counteroffer.currency,
      }
    };

    addNotification(managerNotification);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      getUnreadCount,
      getUserNotifications,
      sendManagerInvitation,
      sendCounterOffer,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}