export interface ScheduleEvent {
  id: string;
  dayIndex: number; // 1 = Monday, 5 = Friday
  timeSlot: '08:00' | '10:00' | '14:00' | '16:00';
  title: string;
  room: string;
  category: 'math' | 'dev' | 'db' | 'english' | 'project' | 'law';
}

class ScheduleService {
  private weekLabel = '7 – 11 Septembre 2026';

  private days = [
    { name: 'Lun. 07', isToday: true, index: 1 },
    { name: 'Mar. 08', isToday: false, index: 2 },
    { name: 'Mer. 09', isToday: false, index: 3 },
    { name: 'Jeu. 10', isToday: false, index: 4 },
    { name: 'Ven. 11', isToday: false, index: 5 },
  ];

  private events: ScheduleEvent[] = [
    // 08:00
    { id: '1', dayIndex: 1, timeSlot: '08:00', title: 'Maths Appliquées', room: 'B204 — Durand', category: 'math' },
    { id: '2', dayIndex: 3, timeSlot: '08:00', title: 'Gestion de Projet', room: 'A305 — Moreau', category: 'project' },
    { id: '3', dayIndex: 4, timeSlot: '08:00', title: 'Base de Données', room: 'A102 — Lefèvre', category: 'db' },

    // 10:00
    { id: '4', dayIndex: 1, timeSlot: '10:00', title: 'Développement Web', room: 'Info 3 — Martin', category: 'dev' },
    { id: '5', dayIndex: 2, timeSlot: '10:00', title: 'Maths Appliquées', room: 'B204 — Durand', category: 'math' },
    { id: '6', dayIndex: 3, timeSlot: '10:00', title: 'Droit du Numérique', room: 'C102 — Bernard', category: 'law' },
    { id: '7', dayIndex: 4, timeSlot: '10:00', title: 'Développement Web', room: 'Info 3 — Martin', category: 'dev' },
    { id: '8', dayIndex: 5, timeSlot: '10:00', title: 'Anglais Pro', room: 'C301 — Johnson', category: 'english' },

    // 14:00
    { id: '9', dayIndex: 1, timeSlot: '14:00', title: 'Base de Données', room: 'A102 — Lefèvre', category: 'db' },
    { id: '10', dayIndex: 2, timeSlot: '14:00', title: 'Projet Web', room: 'Info 2 — Martin', category: 'dev' },
    { id: '11', dayIndex: 4, timeSlot: '14:00', title: 'Gestion de Projet', room: 'A305 — Moreau', category: 'project' },
    { id: '12', dayIndex: 5, timeSlot: '14:00', title: 'Droit du Numérique', room: 'C102 — Bernard', category: 'law' },

    // 16:00
    { id: '13', dayIndex: 1, timeSlot: '16:00', title: 'Anglais Pro', room: 'C301 — Johnson', category: 'english' },
    { id: '14', dayIndex: 2, timeSlot: '16:00', title: 'TD Maths', room: 'B210 — Durand', category: 'math' },
    { id: '15', dayIndex: 4, timeSlot: '16:00', title: 'TP Base de Données', room: 'Info 1 — Lefèvre', category: 'db' },
  ];

  async getSchedule(_weekOffset: number = 0) {
    return {
      weekLabel: this.weekLabel,
      days: this.days,
      events: this.events,
    };
  }
}

export const scheduleService = new ScheduleService();
