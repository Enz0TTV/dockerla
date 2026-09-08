import { AppError } from '../utils/app-error.js';

export interface Homework {
  id: string;
  title: string;
  due: string;
  dueClass: string;
  done: boolean;
}

class DashboardService {
  private homeworks: Homework[] = [
    {
      id: '1',
      title: 'Projet Docker — Conteneuriser une application web',
      due: 'Demain',
      dueClass: 'urgent',
      done: false,
    },
    {
      id: '2',
      title: 'TP SQL — Requêtes avancées et optimisation',
      due: '10 sept.',
      dueClass: 'soon',
      done: false,
    },
    {
      id: '3',
      title: 'Rapport de stage — Première partie',
      due: '20 sept.',
      dueClass: 'ok',
      done: false,
    },
    {
      id: '4',
      title: 'Exercices Java — Design Patterns',
      due: 'Rendu ✓',
      dueClass: 'complete',
      done: true,
    },
  ];

  async getDashboardData() {
    return {
      stats: {
        generalAverage: 13.2,
        averageDiff: '+0.4 vs semestre dernier',
        absences: 5,
        absencesJustified: 3,
        ectsCredits: 42,
        ectsTotal: 60,
        remainingCoursesToday: 3,
      },
      scheduleToday: [
        {
          id: '1',
          time: '08:30 – 10:30',
          subject: 'Mathématiques Appliquées',
          room: 'Salle B204 — M. Durand',
          status: 'done',
        },
        {
          id: '2',
          time: '10:45 – 12:45',
          subject: 'Développement Web',
          room: 'Labo Info 3 — Mme. Martin',
          status: 'live',
        },
        {
          id: '3',
          time: '14:00 – 16:00',
          subject: 'Base de Données',
          room: 'Salle A102 — M. Lefèvre',
          status: 'upcoming',
        },
        {
          id: '4',
          time: '16:15 – 18:15',
          subject: 'Anglais Professionnel',
          room: 'Salle C301 — Mrs. Johnson',
          status: 'upcoming',
        },
      ],
      recentGrades: [
        { id: '1', subject: 'Développement Web', type: 'DS', date: '02 sept.', value: 16.5, statusClass: 'good' },
        { id: '2', subject: 'Base de Données', type: 'Projet', date: '28 août', value: 14.0, statusClass: 'good' },
        { id: '3', subject: 'Mathématiques', type: 'DS', date: '25 août', value: 10.5, statusClass: 'ok' },
        { id: '4', subject: 'Droit du Numérique', type: 'Partiel', date: '20 août', value: 7.0, statusClass: 'bad' },
        { id: '5', subject: 'Réseau & Sécurité', type: 'TP', date: '18 août', value: 15.0, statusClass: 'good' },
      ],
      absenceGauge: {
        current: 5,
        max: 15,
        percentage: 33,
        status: 'ok',
        subtitle: 'Seuil maximum : 15 par semestre',
      },
      homeworks: this.homeworks,
    };
  }

  async toggleHomework(id: string): Promise<Homework> {
    const hw = this.homeworks.find((item) => item.id === id);
    if (!hw) {
      throw AppError.notFound(`Devoir avec l'identifiant ${id} non trouvé`);
    }
    hw.done = !hw.done;
    if (hw.done) {
      hw.due = 'Rendu ✓';
      hw.dueClass = 'complete';
    }
    return hw;
  }
}

export const dashboardService = new DashboardService();
