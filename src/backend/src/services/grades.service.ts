export interface GradeItem {
  id: string;
  subject: string;
  type: string;
  typeBadgeClass: string;
  date: string;
  value: number;
  coeff: number;
  classAverage: number;
  category: 'ds' | 'tp';
}

class GradesService {
  private grades: GradeItem[] = [
    {
      id: '1',
      subject: 'Développement Web',
      type: 'DS',
      typeBadgeClass: '',
      date: '02 sept. 2026',
      value: 16.5,
      coeff: 3,
      classAverage: 12.3,
      category: 'ds',
    },
    {
      id: '2',
      subject: 'Développement Web',
      type: 'Projet',
      typeBadgeClass: 'success',
      date: '30 août 2026',
      value: 18.0,
      coeff: 2,
      classAverage: 13.8,
      category: 'tp',
    },
    {
      id: '3',
      subject: 'Base de Données',
      type: 'Projet',
      typeBadgeClass: 'success',
      date: '28 août 2026',
      value: 14.0,
      coeff: 2,
      classAverage: 11.5,
      category: 'tp',
    },
    {
      id: '4',
      subject: 'Réseau & Sécurité',
      type: 'TP',
      typeBadgeClass: 'warning',
      date: '26 août 2026',
      value: 15.0,
      coeff: 1,
      classAverage: 12.1,
      category: 'tp',
    },
    {
      id: '5',
      subject: 'Mathématiques',
      type: 'DS',
      typeBadgeClass: '',
      date: '25 août 2026',
      value: 10.5,
      coeff: 3,
      classAverage: 9.8,
      category: 'ds',
    },
    {
      id: '6',
      subject: 'Gestion de Projet',
      type: 'Projet',
      typeBadgeClass: 'success',
      date: '22 août 2026',
      value: 13.0,
      coeff: 2,
      classAverage: 12.6,
      category: 'tp',
    },
    {
      id: '7',
      subject: 'Droit du Numérique',
      type: 'Partiel',
      typeBadgeClass: '',
      date: '20 août 2026',
      value: 7.0,
      coeff: 2,
      classAverage: 10.2,
      category: 'ds',
    },
    {
      id: '8',
      subject: 'Anglais Professionnel',
      type: 'Oral',
      typeBadgeClass: 'warning',
      date: '18 août 2026',
      value: 12.0,
      coeff: 1,
      classAverage: 11.4,
      category: 'tp',
    },
    {
      id: '9',
      subject: 'Base de Données',
      type: 'DS',
      typeBadgeClass: '',
      date: '12 août 2026',
      value: 11.0,
      coeff: 3,
      classAverage: 10.5,
      category: 'ds',
    },
  ];

  async getGrades(filter?: string) {
    let filtered = this.grades;
    if (filter === 'ds') {
      filtered = this.grades.filter((g) => g.category === 'ds');
    } else if (filter === 'tp') {
      filtered = this.grades.filter((g) => g.category === 'tp');
    }

    return {
      stats: {
        generalAverage: 13.2,
        generalAverageDiff: '+0.4 pts',
        bestGrade: { value: 18.0, subject: 'Développement Web' },
        lowestGrade: { value: 7.0, subject: 'Droit du Numérique' },
        evaluationsCount: 14,
      },
      grades: filtered,
      totalShown: filtered.length,
      weightedAverage: 13.2,
      subjectAverages: [
        { subject: 'Développement Web', coeff: 5, average: 17.0, statusClass: 'good' },
        { subject: 'Réseau & Sécurité', coeff: 1, average: 15.0, statusClass: 'good' },
        { subject: 'Base de Données', coeff: 5, average: 12.5, statusClass: 'good' },
        { subject: 'Gestion de Projet', coeff: 2, average: 13.0, statusClass: 'good' },
        { subject: 'Anglais Professionnel', coeff: 1, average: 12.0, statusClass: 'ok' },
        { subject: 'Mathématiques', coeff: 3, average: 10.5, statusClass: 'ok' },
        { subject: 'Droit du Numérique', coeff: 2, average: 7.0, statusClass: 'bad' },
      ],
    };
  }
}

export const gradesService = new GradesService();
