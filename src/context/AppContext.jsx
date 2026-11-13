import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_ITEMS,
  INITIAL_CLAIMS,
  INITIAL_NOTIFICATIONS,
  DEMO_USERS,
  CATEGORIES,
  CAMPUS_LOCATIONS
} from '../data/mockData';
import { calculateMatchScore } from '../utils/helpers';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('unifind_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('unifind_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('unifind_theme', 'light');
    }
  }, [isDarkMode]);

  // Current logged in user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('unifind_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Sarah Jenkins' || parsed.id === 'user-1' || parsed.name === 'Anup Kumar') {
          return {
            ...DEMO_USERS[0],
            role: 'admin'
          };
        }
        return parsed;
      } catch (e) {
        return DEMO_USERS[0];
      }
    }
    return DEMO_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem('unifind_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Items State
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('unifind_items');
    if (saved) {
      try {
        const raw = JSON.parse(saved);
        return raw.map((item) => {
          if (item.reporter?.name === 'Sarah Jenkins' || item.reporter?.id === 'user-1') {
            return {
              ...item,
              reporter: {
                ...item.reporter,
                name: 'Anup Kumar',
                email: 'anup.kumar@student.university.edu'
              }
            };
          }
          return item;
        });
      } catch (e) {
        return INITIAL_ITEMS;
      }
    }
    return INITIAL_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('unifind_items', JSON.stringify(items));
  }, [items]);

  // Claims State
  const [claims, setClaims] = useState(() => {
    const saved = localStorage.getItem('unifind_claims');
    if (saved) {
      try {
        const raw = JSON.parse(saved);
        return raw.map((c) => {
          if (c.claimantName === 'Sarah Jenkins' || c.claimantId === 'user-1') {
            return {
              ...c,
              claimantName: 'Anup Kumar',
              claimantEmail: 'anup.kumar@student.university.edu'
            };
          }
          return c;
        });
      } catch (e) {
        return INITIAL_CLAIMS;
      }
    }
    return INITIAL_CLAIMS;
  });

  useEffect(() => {
    localStorage.setItem('unifind_claims', JSON.stringify(claims));
  }, [claims]);

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('unifind_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('unifind_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState('browse'); // 'browse', 'dashboard', 'matches', 'admin', 'safe-zones'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'lost', 'found'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'Lost', 'Found', 'Matched', 'Claimed', 'Resolved'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'popular'

  // Modals
  const [reportModal, setReportModal] = useState({ open: false, defaultType: 'lost' });
  const [selectedItemModal, setSelectedItemModal] = useState(null);
  const [claimModalItem, setClaimModalItem] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [printFlyerItem, setPrintFlyerItem] = useState(null);

  // Toast feedback
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper trigger confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Report Item
  const reportItem = (itemData) => {
    const newItemId = `item-${Date.now().toString().slice(-4)}`;
    const newItem = {
      ...itemData,
      id: newItemId,
      status: itemData.type === 'lost' ? 'Lost' : 'Found',
      views: 1,
      claimsCount: 0,
      createdAt: new Date().toISOString(),
      reporter: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '+1 (555) 000-0000',
        studentId: currentUser.studentId
      }
    };

    setItems((prev) => [newItem, ...prev]);

    // Check for smart matches immediately
    const potentialMatches = items.filter((other) => {
      return calculateMatchScore(
        newItem.type === 'lost' ? newItem : other,
        newItem.type === 'found' ? newItem : other
      ) >= 55;
    });

    if (potentialMatches.length > 0) {
      const topMatch = potentialMatches[0];
      // Create notification
      const matchNotif = {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        type: 'match',
        title: 'Instant Potential Match Found!',
        message: `Your newly reported ${newItem.title} matches a reported ${topMatch.type} item: "${topMatch.title}".`,
        itemId: topMatch.id,
        time: 'Just now',
        read: false,
        date: new Date().toISOString()
      };
      setNotifications((prev) => [matchNotif, ...prev]);
      addToast(`Report submitted! We found ${potentialMatches.length} potential matching item(s) on campus!`, 'info');
    } else {
      addToast(`Your ${itemData.type === 'lost' ? 'Lost' : 'Found'} item report is now published on UniFind.`, 'success');
    }

    triggerConfetti();
    setReportModal({ open: false, defaultType: 'lost' });
    return newItem;
  };

  // Submit Claim
  const submitClaim = (claimData) => {
    const newClaim = {
      ...claimData,
      id: `claim-${Date.now().toString().slice(-4)}`,
      claimantId: currentUser.id,
      claimantName: currentUser.name,
      claimantEmail: currentUser.email,
      claimantPhone: currentUser.phone,
      claimantStudentId: currentUser.studentId,
      claimDate: new Date().toISOString(),
      status: 'Pending',
      adminNotes: 'Awaiting Public Safety / Finder review.',
      pickupCode: `PICKUP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    };

    setClaims((prev) => [newClaim, ...prev]);

    // Update item status and claim count
    setItems((prev) =>
      prev.map((item) =>
        item.id === claimData.itemId
          ? {
              ...item,
              claimsCount: (item.claimsCount || 0) + 1,
              status: item.status === 'Resolved' ? 'Resolved' : 'Claimed'
            }
          : item
      )
    );

    // Notify finder / admin
    const targetItem = items.find((i) => i.id === claimData.itemId);
    if (targetItem && targetItem.reporter.id !== currentUser.id) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          userId: targetItem.reporter.id,
          type: 'claim_update',
          title: 'New Ownership Claim Received',
          message: `${currentUser.name} has submitted an ownership claim for your found item: "${targetItem.title}".`,
          itemId: targetItem.id,
          time: 'Just now',
          read: false,
          date: new Date().toISOString()
        },
        ...prev
      ]);
    }

    addToast('Claim submitted successfully! Campus staff and the finder have been notified.', 'success');
    setClaimModalItem(null);
  };

  // Admin Approve / Reject Claim
  const updateClaimStatus = (claimId, newStatus, adminNotes = '') => {
    const claim = claims.find((c) => c.id === claimId);
    if (!claim) return;

    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, status: newStatus, adminNotes: adminNotes || c.adminNotes } : c
      )
    );

    if (newStatus === 'Approved') {
      // Mark item as Resolved or Claimed
      setItems((prev) =>
        prev.map((item) =>
          item.id === claim.itemId ? { ...item, status: 'Resolved' } : item
        )
      );

      triggerConfetti();

      // Notify student
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          userId: claim.claimantId,
          type: 'claim_update',
          title: 'Claim Approved — Collect Your Item!',
          message: `Your claim for "${claim.itemTitle}" was APPROVED! Bring your Student ID and pickup code: ${claim.pickupCode}.`,
          itemId: claim.itemId,
          time: 'Just now',
          read: false,
          date: new Date().toISOString()
        },
        ...prev
      ]);

      addToast(`Claim for "${claim.itemTitle}" approved! Pickup code issued.`, 'success');
    } else if (newStatus === 'Rejected') {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          userId: claim.claimantId,
          type: 'claim_update',
          title: 'Claim Update: Verification Inconclusive',
          message: `Your claim for "${claim.itemTitle}" could not be verified: ${adminNotes || 'Details did not match'}.`,
          itemId: claim.itemId,
          time: 'Just now',
          read: false,
          date: new Date().toISOString()
        },
        ...prev
      ]);

      addToast(`Claim marked as rejected.`, 'info');
    }
  };

  // Update Item Status
  const updateItemStatus = (itemId, newStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item))
    );
    if (newStatus === 'Resolved') {
      triggerConfetti();
      addToast('Awesome! Item has been marked as Returned & Resolved.', 'success');
    } else {
      addToast(`Item status updated to ${newStatus}.`, 'info');
    }
  };

  // Delete Item
  const deleteItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    addToast('Item report deleted.', 'info');
  };

  // Increment item views
  const recordView = (itemId) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, views: (item.views || 0) + 1 } : item))
    );
  };

  // Notification actions
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read.', 'info');
  };

  // User Switcher
  const switchUser = (userObj) => {
    setCurrentUser(userObj);
    addToast(`Switched profile to ${userObj.name} (${userObj.role.toUpperCase()})`, 'info');
  };

  const toggleAdminRole = () => {
    setCurrentUser((prev) => {
      const nextRole = prev.role === 'admin' ? 'student' : 'admin';
      addToast(`Account role switched to ${nextRole.toUpperCase()}`, 'info');
      return { ...prev, role: nextRole };
    });
  };

  // Unread notifications count for current user
  const unreadCount = notifications.filter(
    (n) => (n.userId === currentUser.id || (currentUser.role === 'admin' && n.type === 'admin_alert')) && !n.read
  ).length;

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        currentUser,
        setCurrentUser,
        switchUser,
        toggleAdminRole,
        items,
        claims,
        notifications,
        unreadCount,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        filterType,
        setFilterType,
        filterStatus,
        setFilterStatus,
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
        sortBy,
        setSortBy,
        reportModal,
        setReportModal,
        selectedItemModal,
        setSelectedItemModal,
        claimModalItem,
        setClaimModalItem,
        authModalOpen,
        setAuthModalOpen,
        printFlyerItem,
        setPrintFlyerItem,
        toasts,
        addToast,
        removeToast,
        reportItem,
        submitClaim,
        updateClaimStatus,
        updateItemStatus,
        deleteItem,
        recordView,
        markNotificationRead,
        markAllNotificationsRead,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
