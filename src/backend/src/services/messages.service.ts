import { AppError } from '../utils/app-error.js';

export interface MessageItem {
  id: string;
  sender: string;
  avatar: string;
  subject: string;
  preview: string;
  date: string;
  timeLabel: string;
  unread: boolean;
  content: string;
  folder: 'inbox' | 'sent' | 'archived';
}

class MessagesService {
  private messages: MessageItem[] = [
    {
      id: '1',
      sender: 'Administration',
      avatar: 'AD',
      subject: "Rappel : Inscription aux examens de rattrapage",
      preview: "Rappel : Inscription aux examens de rattrapage",
      date: '7 septembre 2026 à 09:15',
      timeLabel: "Aujourd'hui",
      unread: true,
      folder: 'inbox',
      content: `Bonjour Enzo,\n\nNous vous rappelons que la date limite d'inscription aux examens de rattrapage du second semestre est fixée au 15 septembre 2026 à 18h00.\n\nPassé ce délai, aucune demande ne pourra être prise en compte.\n\nVeuillez vérifier vos résultats dans l'onglet 'Notes & Résultats' et compléter le formulaire d'inscription si nécessaire.\n\nCordialement,\nLe Service des Examens`,
    },
    {
      id: '2',
      sender: 'M. Lefèvre',
      avatar: 'ML',
      subject: 'Report du TP Base de Données de vendredi',
      preview: 'Report du TP Base de Données de vendredi',
      date: '6 septembre 2026 à 16:40',
      timeLabel: 'Hier',
      unread: true,
      folder: 'inbox',
      content: `Bonjour à tous,\n\nEn raison d'un déplacement professionnel, la séance de TP Base de Données prévue ce vendredi à 16h15 est reportée au mardi 15 septembre même heure en salle Info 1.\n\nMerci de préparer pour cette date la partie 3 du sujet disponible sur l'intranet.\n\nBonne semaine,\nM. Lefèvre`,
    },
    {
      id: '3',
      sender: 'Scolarité',
      avatar: 'SM',
      subject: 'Votre certificat de scolarité est disponible',
      preview: 'Votre certificat de scolarité est disponible',
      date: '3 septembre 2026 à 11:20',
      timeLabel: '03 sept.',
      unread: false,
      folder: 'inbox',
      content: `Bonjour Enzo,\n\nVotre certificat de scolarité pour l'année universitaire 2025-2026 a été validé et mis à disposition dans votre espace Documents.\n\nVous pouvez le télécharger dès maintenant au format PDF certifié.\n\nBien cordialement,\nLe secrétariat pédagogique`,
    },
    {
      id: '4',
      sender: 'Mme. Martin',
      avatar: 'MM',
      subject: 'Consignes pour le projet final Développement Web',
      preview: 'Consignes pour le projet final Développement Web',
      date: '1 septembre 2026 à 14:00',
      timeLabel: '01 sept.',
      unread: false,
      folder: 'inbox',
      content: `Bonjour,\n\nLe cahier des charges du projet de fin de semestre en Développement Web est en ligne.\n\nRappel : les groupes doivent être composés de 3 à 4 étudiants au maximum. Date de rendu final : 25 septembre 2026.\n\nMme. Martin`,
    },
    {
      id: '5',
      sender: 'BDE GES',
      avatar: 'BDE',
      subject: "Soirée d'intégration — Jeudi 12 septembre",
      preview: "Soirée d'intégration — Jeudi 12 septembre",
      date: '28 août 2026 à 18:30',
      timeLabel: '28 août',
      unread: false,
      folder: 'inbox',
      content: `Salut les étudiants !\n\nLe BDE vous convie à la grande soirée d'intégration annuelle le jeudi 12 septembre au Duplex Paris dès 22h.\n\nPréventes disponibles au foyer étudiant ou sur la billetterie en ligne.\n\nÀ très vite !`,
    },
    {
      id: '6',
      sender: 'Administration',
      avatar: 'AD',
      subject: 'Bienvenue pour cette nouvelle année universitaire',
      preview: 'Bienvenue pour cette nouvelle année universitaire',
      date: '25 août 2026 à 08:00',
      timeLabel: '25 août',
      unread: false,
      folder: 'inbox',
      content: `Chers étudiants, bienvenue pour cette rentrée 2025-2026 sur le portail MyGES-Mieux ! Nous vous souhaitons une excellente réussite dans vos études.`,
    },
  ];

  async getMessages(folder: string = 'inbox') {
    const list = this.messages.filter((m) => m.folder === folder);
    const unreadCount = this.messages.filter((m) => m.unread && m.folder === 'inbox').length;

    return {
      unreadCount,
      messages: list,
    };
  }

  async getMessageById(id: string): Promise<MessageItem> {
    const msg = this.messages.find((m) => m.id === id);
    if (!msg) {
      throw AppError.notFound(`Message avec l'identifiant ${id} non trouvé`);
    }
    msg.unread = false;
    return msg;
  }

  async markAsRead(id: string): Promise<MessageItem> {
    return this.getMessageById(id);
  }

  async createMessage(data: { recipient: string; subject: string; content: string }) {
    const newMsg: MessageItem = {
      id: String(Date.now()),
      sender: 'Enzo G.',
      avatar: 'EG',
      subject: data.subject,
      preview: data.subject,
      date: "Aujourd'hui à " + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      timeLabel: "Aujourd'hui",
      unread: false,
      content: data.content,
      folder: 'sent',
    };
    this.messages.push(newMsg);
    return newMsg;
  }
}

export const messagesService = new MessagesService();
