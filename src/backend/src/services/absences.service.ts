import { AppError } from '../utils/app-error.js';

export interface AbsenceItem {
  id: string;
  date: string;
  time: string;
  subject: string;
  type: 'Absence' | 'Retard';
  status: 'justified' | 'unjustified' | 'late';
  statusBadge: string;
  statusBadgeClass: string;
  justification?: string;
  canJustify: boolean;
}

class AbsencesService {
  private absences: AbsenceItem[] = [
    {
      id: '1',
      date: '05 sept. 2026',
      time: '08:30 – 10:30',
      subject: 'Mathématiques',
      type: 'Absence',
      status: 'unjustified',
      statusBadge: 'Non justifiée',
      statusBadgeClass: 'danger',
      canJustify: true,
    },
    {
      id: '2',
      date: '03 sept. 2026',
      time: '14:00 – 16:00',
      subject: 'Gestion de Projet',
      type: 'Absence',
      status: 'justified',
      statusBadge: 'Justifiée',
      statusBadgeClass: 'success',
      justification: 'Certificat médical',
      canJustify: false,
    },
    {
      id: '3',
      date: '01 sept. 2026',
      time: '10:45 – 12:45',
      subject: 'Développement Web',
      type: 'Retard',
      status: 'late',
      statusBadge: '15 min',
      statusBadgeClass: 'warning',
      canJustify: false,
    },
    {
      id: '4',
      date: '28 août 2026',
      time: '16:15 – 18:15',
      subject: 'Anglais Professionnel',
      type: 'Absence',
      status: 'justified',
      statusBadge: 'Justifiée',
      statusBadgeClass: 'success',
      justification: 'Convocation administrative',
      canJustify: false,
    },
    {
      id: '5',
      date: '25 août 2026',
      time: '08:30 – 10:30',
      subject: 'Mathématiques',
      type: 'Retard',
      status: 'late',
      statusBadge: '5 min',
      statusBadgeClass: 'warning',
      canJustify: false,
    },
    {
      id: '6',
      date: '22 août 2026',
      time: '14:00 – 16:00',
      subject: 'Base de Données',
      type: 'Absence',
      status: 'unjustified',
      statusBadge: 'Non justifiée',
      statusBadgeClass: 'danger',
      canJustify: true,
    },
    {
      id: '7',
      date: '18 août 2026',
      time: '08:30 – 10:30',
      subject: 'Droit du Numérique',
      type: 'Absence',
      status: 'justified',
      statusBadge: 'Justifiée',
      statusBadgeClass: 'success',
      justification: 'RDV médical',
      canJustify: false,
    },
    {
      id: '8',
      date: '12 août 2026',
      time: '16:15 – 18:15',
      subject: 'Anglais Professionnel',
      type: 'Retard',
      status: 'late',
      statusBadge: '20 min',
      statusBadgeClass: 'warning',
      canJustify: false,
    },
  ];

  async getAbsences(filter?: string) {
    let list = this.absences;

    if (filter === 'justified') {
      list = this.absences.filter((a) => a.status === 'justified');
    } else if (filter === 'unjustified') {
      list = this.absences.filter((a) => a.status === 'unjustified');
    } else if (filter === 'late') {
      list = this.absences.filter((a) => a.type === 'Retard');
    }

    const totalAbsences = this.absences.filter((a) => a.type === 'Absence').length;
    const justified = this.absences.filter((a) => a.status === 'justified').length;
    const unjustified = this.absences.filter((a) => a.status === 'unjustified').length;
    const lates = this.absences.filter((a) => a.type === 'Retard').length;

    return {
      stats: {
        totalAbsences,
        justified,
        unjustified,
        lates,
      },
      gauge: {
        current: totalAbsences,
        thresholdAlert: 10,
        thresholdMax: 15,
        percentage: Math.round((totalAbsences / 15) * 100),
        status: totalAbsences > 10 ? 'warning' : 'ok',
        statusLabel: totalAbsences > 10 ? 'Seuil d’alerte' : 'Situation normale',
      },
      absences: list,
      totalEntries: list.length,
    };
  }

  async justifyAbsence(id: string, reason: string): Promise<AbsenceItem> {
    const item = this.absences.find((a) => a.id === id);
    if (!item) {
      throw AppError.notFound(`Absence avec l'identifiant ${id} non trouvée`);
    }

    item.status = 'justified';
    item.statusBadge = 'Justifiée';
    item.statusBadgeClass = 'success';
    item.justification = reason || 'Justificatif validé';
    item.canJustify = false;

    return item;
  }
}

export const absencesService = new AbsencesService();
