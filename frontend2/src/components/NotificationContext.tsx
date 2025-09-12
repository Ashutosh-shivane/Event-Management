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
  }) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
  }) => {
    const notification: Omit<Notification, 'id' | 'timestamp' | 'read'> = {
      title: 'Event Manager Invitation',
      message: `You've been invited to manage "${invitation.eventTitle}" as ${invitation.assignedRole}`,
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
      message: `Invitation sent to ${invitation.managerName} for "${invitation.eventTitle}"`,
      type: 'success',
      userId: invitation.organizerId,
      userRole: 'organizer',
      data: {
        eventId: invitation.eventId,
        eventTitle: invitation.eventTitle,
      }
    };

    addNotification(organizerNotification);
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