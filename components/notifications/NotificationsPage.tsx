'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  BellOff, 
  Check, 
  CheckCheck, 
  Trash2, 
  Filter,
  Trophy,
  Users,
  AlertCircle,
  Info,
  Settings,
  ExternalLink
} from 'lucide-react';
import { Notification } from '@/lib/interface';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from '@/hooks/useNotifications';

export function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    deleteAllRead,
    isLoading 
  } = useNotifications();

  const [activeTab, setActiveTab] = useState('all');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const getFilteredNotifications = () => {
    let filtered = notifications;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(notification => notification.type === activeTab);
    }

    // Filter by read status
    if (filter === 'unread') {
      filtered = filtered.filter(notification => !notification.isRead);
    } else if (filter === 'read') {
      filtered = filtered.filter(notification => notification.isRead);
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'competition':
        return <Trophy className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      case 'success':
        return <Check className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getTabCounts = () => {
    const counts = {
      all: notifications.length,
      competition: notifications.filter(n => n.type === 'competition').length,
      system: notifications.filter(n => n.type === 'system').length,
      info: notifications.filter(n => ['info', 'success', 'warning', 'error'].includes(n.type)).length,
    };
    return counts;
  };

  const filteredNotifications = getFilteredNotifications();
  const tabCounts = getTabCounts();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="w-8 h-8" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-2">
              Stay updated with your latest activities and announcements
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Filter Dropdown */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
              className="flex h-10 w-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
            
            <Button onClick={deleteAllRead} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Read
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            {tabCounts.all > 0 && (
              <Badge variant="secondary" className="text-xs">
                {tabCounts.all}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="competition" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Competitions
            {tabCounts.competition > 0 && (
              <Badge variant="secondary" className="text-xs">
                {tabCounts.competition}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System
            {tabCounts.system > 0 && (
              <Badge variant="secondary" className="text-xs">
                {tabCounts.system}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            General
            {tabCounts.info > 0 && (
              <Badge variant="secondary" className="text-xs">
                {tabCounts.info}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BellOff className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground text-center">
                  {filter === 'unread' 
                    ? "You're all caught up! No unread notifications."
                    : activeTab === 'all'
                    ? "You don't have any notifications yet."
                    : `No ${activeTab} notifications found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      {/* {notifications.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Notification Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{tabCounts.competition}</p>
                <p className="text-sm text-muted-foreground">Competitions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">{tabCounts.system}</p>
                <p className="text-sm text-muted-foreground">System</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}