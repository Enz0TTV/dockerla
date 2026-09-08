export interface DocumentItem {
  id: string;
  title: string;
  iconType: 'pdf' | 'doc' | 'xls';
  iconEmoji: string;
  category: 'administrative' | 'pedagogical' | 'invoices';
  fileFormat: string;
  size: string;
  date: string;
  hasPreview: boolean;
}

class DocumentsService {
  private documents: DocumentItem[] = [
    {
      id: '1',
      title: 'Certificat de scolarité 2025-2026',
      iconType: 'pdf',
      iconEmoji: '📕',
      category: 'administrative',
      fileFormat: 'PDF',
      size: '145 Ko',
      date: 'Généré le 01 sept. 2026',
      hasPreview: true,
    },
    {
      id: '2',
      title: 'Relevé de notes — Semestre 1',
      iconType: 'pdf',
      iconEmoji: '📕',
      category: 'pedagogical',
      fileFormat: 'PDF',
      size: '230 Ko',
      date: '15 fév. 2026',
      hasPreview: true,
    },
    {
      id: '3',
      title: 'Attestation de responsabilité civile',
      iconType: 'doc',
      iconEmoji: '📘',
      category: 'administrative',
      fileFormat: 'PDF',
      size: '89 Ko',
      date: '10 sept. 2025',
      hasPreview: false,
    },
    {
      id: '4',
      title: 'Planning des examens — S2',
      iconType: 'xls',
      iconEmoji: '📗',
      category: 'pedagogical',
      fileFormat: 'PDF',
      size: '320 Ko',
      date: '25 août 2026',
      hasPreview: false,
    },
    {
      id: '5',
      title: 'Convention de stage',
      iconType: 'pdf',
      iconEmoji: '📕',
      category: 'administrative',
      fileFormat: 'PDF',
      size: '410 Ko',
      date: '20 juil. 2026',
      hasPreview: true,
    },
    {
      id: '6',
      title: 'Facture — Frais de scolarité S2',
      iconType: 'pdf',
      iconEmoji: '📕',
      category: 'invoices',
      fileFormat: 'PDF',
      size: '95 Ko',
      date: '01 janv. 2026',
      hasPreview: false,
    },
    {
      id: '7',
      title: 'Règlement intérieur',
      iconType: 'doc',
      iconEmoji: '📘',
      category: 'administrative',
      fileFormat: 'PDF',
      size: '1.2 Mo',
      date: '01 sept. 2025',
      hasPreview: false,
    },
  ];

  async getDocuments(category?: string) {
    let list = this.documents;
    if (category && category !== 'all') {
      list = this.documents.filter((d) => d.category === category);
    }

    return {
      documents: list,
      total: list.length,
    };
  }

  async requestDocument(data: { documentType: string; note?: string }) {
    return {
      id: String(Date.now()),
      status: 'pending',
      message: `Votre demande de '${data.documentType}' a été enregistrée auprès de l'administration`,
      requestDate: new Date().toISOString(),
    };
  }
}

export const documentsService = new DocumentsService();
