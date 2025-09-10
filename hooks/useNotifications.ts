'use client';

import { useState, useEffect } from 'react';
import { Notification } from '@/lib/interface';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Competition Available',
    message: 'A new Frontend Development Challenge has been posted. Registration closes in 3 days.',
    type: 'competition',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    actionUrl: '/competitions/1',
    actionText: 'View Competition',
    metadata: {
      competitionId: '1'
    }
  },
  {
    id: '2',
    title: 'Profile Completion Reminder',
    message: 'Complete your profile to increase your chances of being selected for competitions.',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    actionUrl: '/profile?edit=true',
    actionText: 'Complete Profile'
  },
  {
    id: '3',
    title: 'Competition Result Published',
    message: 'Results for the "React Developer Challenge" are now available. Check your ranking!',
    type: 'success',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    actionUrl: '/competitions/2/results',
    actionText: 'View Results',
    metadata: {
      competitionId: '2'
    }
  },
  {
    id: '4',
    title: 'System Maintenance Scheduled',
    message: 'The platform will undergo maintenance on Sunday, 2:00 AM - 4:00 AM UTC. Some features may be unavailable.',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
  {
    id: '5',
    title: 'Leaderboard Position Updated',
    message: 'Congratulations! You\'ve moved up to #15 in the Frontend Development category.',
    type: 'success',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    actionUrl: '/leaderboards',
    actionText: 'View Leaderboard'
  },
  {
    id: '6',
    title: 'Competition Deadline Approaching',
    message: 'Only 24 hours left to submit your entry for "Full Stack Developer Challenge".',
    type: 'warning',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    actionUrl: '/competitions/3/submit',
    actionText: 'Submit Entry',
    metadata: {
      competitionId: '3'
    }
  },
  {
    id: '7',
    title: 'Welcome to GiG Geni!',
    message: 'Thank you for joining our platform. Explore competitions and start building your professional profile.',
    type: 'info',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    actionUrl: '/competitions',
    actionText: 'Browse Competitions'
  },
  {
    id: '8',
    title: 'New Feature: Video Interviews',
    message: 'We\'ve added video interview rounds to competitions. Update your profile with your video preferences.',
    type: 'system',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    actionUrl: '/profile?tab=preferences',
    actionText: 'Update Preferences'
  },
  {
    id: '9',
    title: 'Competition Entry Rejected',
    message: 'Your entry for "UI/UX Design Challenge" was rejected. Please review the requirements and resubmit.',
    type: 'error',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18 hours ago
    actionUrl: '/competitions/4/feedback',
    actionText: 'View Feedback',
    metadata: {
      competitionId: '4'
    }
  },
  {
    id: '10',
    title: 'Monthly Newsletter',
    message: 'Check out this month\'s featured competitions, success stories, and platform updates.',
    type: 'info',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    actionUrl: '/newsletter/march-2024',
    actionText: 'Read Newsletter'
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadNotifications = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Load from localStorage or use mock data
      const stored = localStorage.getItem('notifications');
      if (stored) {
        try {
          const parsedNotifications = JSON.parse(stored).map((n: any) => ({
            ...n,
            createdAt: new Date(n.createdAt)
          }));
          setNotifications(parsedNotifications);
        } catch {
          setNotifications(mockNotifications);
        }
      } else {
        setNotifications(mockNotifications);
      }
      
      setIsLoading(false);
    };

    loadNotifications();
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.isRead));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    addNotification
  };
}