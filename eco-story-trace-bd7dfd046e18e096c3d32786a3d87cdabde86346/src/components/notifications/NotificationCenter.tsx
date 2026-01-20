import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Notification } from '@/types/food';
import { 
  Bell, 
  X, 
  AlertTriangle, 
  Sparkles, 
  Leaf, 
  Info,
  CheckCircle
} from 'lucide-react';

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const iconMap: Record<Notification['type'], React.ElementType> = {
  recall: AlertTriangle,
  season: Leaf,
  achievement: Sparkles,
  update: Info,
};

const colorMap: Record<Notification['type'], string> = {
  recall: 'text-destructive bg-destructive/10',
  season: 'text-primary bg-primary/10',
  achievement: 'text-amber-500 bg-amber-500/10',
  update: 'text-secondary bg-secondary/10',
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkRead,
  onDismiss,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-semibold"
          >
            {unreadCount}
          </motion.span>
        )}
      </Button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 z-50"
            >
              <Card variant="elevated" className="overflow-hidden">
                <CardHeader className="pb-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0 max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {notifications.map((notification) => {
                        const Icon = iconMap[notification.type];
                        const colorClass = colorMap[notification.type];

                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-4 hover:bg-muted/50 transition-colors ${
                              !notification.read ? 'bg-primary/5' : ''
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className={`p-2 rounded-lg ${colorClass}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="font-medium text-sm truncate">
                                    {notification.title}
                                  </p>
                                  <button
                                    onClick={() => onDismiss?.(notification.id)}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(notification.timestamp).toLocaleDateString()}
                                  </span>
                                  {!notification.read && (
                                    <button
                                      onClick={() => onMarkRead?.(notification.id)}
                                      className="text-xs text-primary hover:underline flex items-center gap-1"
                                    >
                                      <CheckCircle className="w-3 h-3" />
                                      Mark read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
