export interface StageDeliverable {
  id: string;
  title: string;
  dueDate: string;
  statusClass: string;
  completed: boolean;
}

class StagesService {
  private currentStage = {
    id: '1',
    title: "Développeur Full-Stack — Stage de fin d'études",
    company: 'TechCorp Solutions · Paris 9ème',
    period: '01 mars 2026 → 31 août 2026',
    duration: '6 mois',
    salary: '600€/mois',
    tutor: 'Jean Dupont',
    progressPercentage: 83,
    startDate: '01 mars',
    endDate: '31 août',
  };

  private deliverables: StageDeliverable[] = [
    {
      id: '1',
      title: "Fiche d'évaluation mi-stage",
      dueDate: 'Rendu ✓',
      statusClass: 'complete',
      completed: true,
    },
    {
      id: '2',
      title: 'Rapport de stage final',
      dueDate: '20 sept.',
      statusClass: 'soon',
      completed: false,
    },
    {
      id: '3',
      title: 'Soutenance de stage',
      dueDate: '30 sept.',
      statusClass: 'urgent',
      completed: false,
    },
  ];

  private history = [
    {
      id: 'old-1',
      title: 'Développeur Front-End Junior',
      company: 'WebAgency Paris',
      duration: '2 mois (Juillet – Août 2025)',
      status: 'Validé',
      grade: '16/20',
    },
  ];

  async getStagesData() {
    return {
      stats: {
        activeStages: 1,
        totalConventions: 2,
        totalDuration: '8 mois',
      },
      currentStage: this.currentStage,
      deliverables: this.deliverables,
      history: this.history,
    };
  }

  async declareStage(data: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    salary?: string;
    tutor?: string;
  }) {
    return {
      id: String(Date.now()),
      ...data,
      status: 'submitted',
      message: 'Votre déclaration de convention de stage a été transmise au service des relations entreprises',
    };
  }
}

export const stagesService = new StagesService();
