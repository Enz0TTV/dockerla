// ===== SHARED UTILITIES & API CLIENT =====

const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000/api/v1';

// Unified API Fetch Client
async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('myges_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data?.error?.message || data?.message || `Erreur ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.error(`[API Error] ${endpoint}:`, err);
    throw err;
  }
}

// Page loader
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.add('hidden');
  }, 400);
});

// Toast notifications
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Mobile menu
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

function getCachedUser() {
  try {
    const raw = localStorage.getItem('myges_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Dynamic greeting
function setGreeting(elementId, customName) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const user = getCachedUser();
  const name = customName || (user?.firstName ? user.firstName : 'Étudiant');
  const hour = new Date().getHours();
  let greeting;
  if (hour >= 6 && hour < 12) greeting = `Bonjour ${name} 👋`;
  else if (hour >= 12 && hour < 18) greeting = `Bon après-midi ${name}`;
  else if (hour >= 18 && hour < 22) greeting = `Bonsoir ${name}`;
  else greeting = `Bonne nuit ${name} 🌙`;
  el.textContent = greeting;
}

// Build sidebar HTML
function buildSidebar(activePage, profile) {
  const user = profile || getCachedUser();
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Mon Profil';
  const userRole = user ? user.role : 'Portail étudiant';
  const userInitials = user ? (user.avatarInitials || `${(user.firstName||'')[0]||''}${(user.lastName||'')[0]||''}`.toUpperCase()) : 'ME';

  const pages = [
    { section: 'Principal' },
    { id: 'dashboard', icon: '📊', label: 'Tableau de bord', href: 'dashboard.html' },
    { id: 'schedule', icon: '📅', label: 'Emploi du temps', href: 'schedule.html' },
    { id: 'grades', icon: '📝', label: 'Notes & Résultats', href: 'grades.html', badge: '3', badgeClass: 'info' },
    { id: 'absences', icon: '📋', label: 'Absences', href: 'absences.html', badge: '5', badgeClass: '' },
    { section: 'Services' },
    { id: 'documents', icon: '📄', label: 'Documents', href: 'documents.html' },
    { id: 'messages', icon: '💬', label: 'Messages', href: 'messages.html', badge: '2', badgeClass: 'info' },
    { id: 'stages', icon: '🏢', label: 'Stages', href: 'stages.html' },
    { id: 'settings', icon: '⚙️', label: 'Paramètres', href: 'settings.html' },
    { section: 'Développeur' },
    { id: 'status', icon: '⚡', label: 'Test Backend / DB', href: 'status.html' },
  ];

  let html = `
    <a href="dashboard.html" class="sidebar-logo">
      <div class="logo-icon">🎓</div>
      <h2>MyGES-Mieux</h2>
    </a>`;

  let currentNav = '';
  pages.forEach(item => {
    if (item.section) {
      if (currentNav) html += '</nav>';
      html += `<span class="sidebar-section">${item.section}</span><nav class="sidebar-nav">`;
      currentNav = item.section;
    } else {
      const activeClass = item.id === activePage ? ' class="active"' : '';
      let badgeHtml = '';
      if (item.badge) {
        badgeHtml = `<span class="nav-badge${item.badgeClass ? ' ' + item.badgeClass : ''}">${item.badge}</span>`;
      }
      html += `<a href="${item.href}"${activeClass}>
        <span class="nav-icon">${item.icon}</span> ${item.label}${badgeHtml}
      </a>`;
    }
  });
  html += '</nav>';

  html += `
    <div class="sidebar-spacer"></div>
    <div class="sidebar-bottom">
      <div class="sidebar-profile-container">
        <a href="settings.html" class="sidebar-profile" title="Voir les paramètres du profil">
          <div class="avatar" id="sidebarAvatar">${userInitials}</div>
          <div class="profile-info">
            <div class="name" id="sidebarName">${userName}</div>
            <div class="role" id="sidebarRole">${userRole}</div>
          </div>
        </a>
        <button type="button" class="sidebar-logout-btn" onclick="logoutUser()" title="Se déconnecter" aria-label="Se déconnecter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>`;

  return html;
}

// Global user logout handler
async function logoutUser() {
  try {
    await apiFetch('/auth/logout', { method: 'POST' }).catch(() => {});
  } finally {
    localStorage.removeItem('myges_token');
    localStorage.removeItem('myges_user');
    showToast('Déconnexion réussie', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 450);
  }
}

// Insert sidebar into page & fetch live profile
async function initSidebar(activePage) {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = buildSidebar(activePage);

    // Fetch user profile from API in background to update sidebar
    try {
      const res = await apiFetch('/auth/me');
      if (res.success && res.data) {
        const profile = res.data;
        localStorage.setItem('myges_user', JSON.stringify(profile));
        const nameEl = document.getElementById('sidebarName');
        const roleEl = document.getElementById('sidebarRole');
        const avatarEl = document.getElementById('sidebarAvatar');
        if (nameEl) nameEl.textContent = `${profile.firstName} ${profile.lastName}`;
        if (roleEl) roleEl.textContent = profile.role;
        if (avatarEl) avatarEl.textContent = profile.avatarInitials;

        const greetingEl = document.getElementById('greetingText');
        if (greetingEl) {
          setGreeting('greetingText', profile.firstName);
        }
      }
    } catch (e) {
      // Fallback to default
    }
  }
}
