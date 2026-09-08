export interface NotificationPreferences {
  newGrades: boolean;
  scheduleChanges: boolean;
  homeworkReminders: boolean;
  messages: boolean;
  absenceAlerts: boolean;
  newsletter: boolean;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  twoFactorAuth: boolean;
  theme: string;
}

class SettingsService {
  private preferences: UserPreferences = {
    notifications: {
      newGrades: true,
      scheduleChanges: true,
      homeworkReminders: true,
      messages: false,
      absenceAlerts: true,
      newsletter: false,
    },
    twoFactorAuth: false,
    theme: 'dark',
  };

  private sessions = [
    {
      id: 'sess-1',
      device: '🖥️ Chrome — Linux',
      location: 'Paris, France',
      lastActive: 'maintenant',
      current: true,
    },
    {
      id: 'sess-2',
      device: '📱 Safari — iPhone',
      location: 'Paris, France',
      lastActive: 'il y a 2h',
      current: false,
    },
  ];

  async getPreferences() {
    return {
      preferences: this.preferences,
      sessions: this.sessions,
    };
  }

  async updatePreferences(updates: Partial<UserPreferences>) {
    if (updates.notifications) {
      this.preferences.notifications = {
        ...this.preferences.notifications,
        ...updates.notifications,
      };
    }
    if (updates.twoFactorAuth !== undefined) {
      this.preferences.twoFactorAuth = updates.twoFactorAuth;
    }
    if (updates.theme !== undefined) {
      this.preferences.theme = updates.theme;
    }
    return this.preferences;
  }

  async revokeSession(sessionId: string) {
    this.sessions = this.sessions.filter((s) => s.id !== sessionId);
    return { success: true, message: 'Session révoquée' };
  }
}

export const settingsService = new SettingsService();
