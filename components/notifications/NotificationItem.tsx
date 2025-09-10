'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Trash2, 
  ExternalLink,
  Trophy,
  Settings,
  Info,
  AlertCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Notification } from '@/lib/interface';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'competition':
        return <Trophy className="w-5 h-5 text-orange-500" />;
      case 'system':
        return <Settings className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = () => {
    switch (notification.type) {
      case 'competition':
        return <Badge variant="outline" className="text-orange-500 border-orange-500">Competition</Badge>;
      case 'system':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">System</Badge>;
      case 'success':
        return <Badge variant="outline" className="text-green-500 border-green-500">Success</Badge>;
      case 'warning':
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Warning</Badge>;
      case 'error':
        return <Badge variant="outline" className="text-red-500 border-red-500">Error</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const handleAction = () => {
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank');
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${!notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">
            {getNotificationIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`font-semibold ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {notification.title}
                </h3>
                {getNotificationBadge()}
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(notification.createdAt)}
              </span>
            </div>

            <p className={`text-sm mb-3 ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
              {notification.message}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {notification.actionUrl && notification.actionText && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAction}
                  className="text-xs"
                >
                  {notification.actionText}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              )}

              <div className="flex items-center gap-1 ml-auto">
                {!notification.isRead && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-xs h-8 px-2"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark Read
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(notification.id)}
                  className="text-xs h-8 px-2 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}