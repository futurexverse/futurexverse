// ==========================================
// FUTUREXVERSE DASHBOARD CORE LOGIC
// ==========================================

// Global Application State Store
let state = {
  currentWorkspace: 'client', // 'client' or 'admin'
  currentView: 'dashboard',   // page routing ID
  impersonating: false,
  impersonatedTenant: null,
  
  // Client Data Model
  leads: [
    { id: 1, name: 'Alice Thompson', email: 'alice@hightech.io', phone: '+1 (555) 014-2391', source: 'Website Widget', budget: 12000, status: 'Qualified', date: '2026-07-18' },
    { id: 2, name: 'Brad Cooper', email: 'brad@copperflow.com', phone: '+1 (555) 019-9482', source: 'Website Widget', budget: 4500, status: 'New', date: '2026-07-20' },
    { id: 3, name: 'Charlotte Green', email: 'charlotte@greenhouse.org', phone: '+1 (555) 012-3841', source: 'Zapier Synced', budget: 25000, status: 'Hot', date: '2026-07-15' },
    { id: 4, name: 'David Vance', email: 'vance@apexdev.co', phone: '+1 (555) 017-4829', source: 'Website Widget', budget: 8000, status: 'Won', date: '2026-07-12' },
    { id: 5, name: 'Emma Watson', email: 'emma@watsonmedia.net', phone: '+1 (555) 011-8930', source: 'Manual Entry', budget: 1500, status: 'Lost', date: '2026-07-08' },
    { id: 6, name: 'Frank Miller', email: 'frank@millerlogistics.com', phone: '+1 (555) 015-7733', source: 'Website Widget', budget: 18000, status: 'Qualified', date: '2026-07-19' }
  ],
  
  conversations: [
    {
      id: 1,
      name: 'Brad Cooper',
      email: 'brad@copperflow.com',
      unread: true,
      resolved: false,
      escalated: false,
      assignee: 'ai', // 'ai' or 'agent'
      time: '10 mins ago',
      messages: [
        { sender: 'incoming', content: 'Hello! I need to automate our appointment booking flow. How much does your Growth Plan cost?', time: '10 mins ago' },
        { sender: 'ai', content: 'Hi Brad! Our Growth Plan costs $49/month. It includes advanced AI assistant configs, CRM database access, and custom widget builders. Would you like me to book a quick demo for you?', time: '9 mins ago' },
        { sender: 'incoming', content: 'Yes, that would be great. Can we do tomorrow morning?', time: '8 mins ago' }
      ]
    },
    {
      id: 2,
      name: 'Frank Miller',
      email: 'frank@millerlogistics.com',
      unread: false,
      resolved: false,
      escalated: true,
      assignee: 'agent',
      time: '1 hour ago',
      messages: [
        { sender: 'incoming', content: 'I am trying to integrate Slack but I keep getting a credential authorization error.', time: '1 hour ago' },
        { sender: 'ai', content: 'I apologize for the integration issues, Frank. Let me connect you with a live agent immediately to troubleshoot.', time: '58 mins ago' }
      ]
    },
    {
      id: 3,
      name: 'Alice Thompson',
      email: 'alice@hightech.io',
      unread: true,
      resolved: false,
      escalated: false,
      assignee: 'ai',
      time: '3 hours ago',
      messages: [
        { sender: 'incoming', content: 'Does FutureXVerse support custom system prompt overrides?', time: '3 hours ago' },
        { sender: 'ai', content: 'Yes, Alice! You can specify unique System Prompts under your Assistant configuration settings to control tone, instructions, and factual thresholds.', time: '3 hours ago' }
      ]
    },
    {
      id: 4,
      name: 'David Vance',
      email: 'vance@apexdev.co',
      unread: false,
      resolved: true,
      escalated: false,
      assignee: 'ai',
      time: '1 day ago',
      messages: [
        { sender: 'incoming', content: 'Can I trial the platform before paying?', time: '1 day ago' },
        { sender: 'ai', content: 'Absolutely! We offer a 14-day fully-featured trial workspace for new businesses.', time: '1 day ago' }
      ]
    }
  ],

  appointments: [
    { guest: 'Charlotte Green', topic: 'Enterprise Integration Scoping', datetime: 'Jul 21, 2026 - 10:00 AM', platform: 'Google Meet', bookedBy: 'AI Assistant', status: 'Confirmed' },
    { guest: 'Frank Miller', topic: 'Logistics Workflow Automation Demo', datetime: 'Jul 22, 2026 - 2:30 PM', platform: 'Zoom Session', bookedBy: 'AI Assistant', status: 'Pending' },
    { guest: 'Brad Cooper', topic: 'Growth Plan Account Configuration', datetime: 'Jul 23, 2026 - 11:00 AM', platform: 'Google Meet', bookedBy: 'AI Assistant', status: 'Confirmed' }
  ],

  automations: [
    { id: 1, name: 'Push Qualified Leads to Slack', trigger: 'Lead status becomes Qualified', action: 'Slack Message to #sales-leads', active: true, lastRun: '2 hours ago' },
    { id: 2, name: 'Add Won Leads to HubSpot CRM', trigger: 'Lead status becomes Won', action: 'HubSpot Create Contact Payload', active: true, lastRun: '1 day ago' },
    { id: 3, name: 'Calendar Booking Notice to Team', trigger: 'AI Schedules Appointment', action: 'Email Dispatch to team@acme.com', active: false, lastRun: 'Never' }
  ],

  kbSources: [
    { id: 1, name: 'Acme_FAQs_2026.pdf', type: 'PDF Document', size: '1.2 MB', date: 'Jul 15, 2026' },
    { id: 2, name: 'Acme_Refund_Policy.docx', type: 'Word Doc', size: '340 KB', date: 'Jul 16, 2026' },
    { id: 3, name: 'https://acmecorp.com/features', type: 'Web URL Crawler', size: '4 Pages crawled', date: 'Jul 18, 2026' }
  ],

  integrations: [
    { key: 'openai', name: 'OpenAI API Node', desc: 'Queries ChatGPT systems for advanced workflows.', connected: true, logo: 'O' },
    { key: 'whatsapp', name: 'WhatsApp Business', desc: 'Allows deploying the assistant directly on chat threads.', connected: false, logo: 'W' },
    { key: 'slack', name: 'Slack Messaging', desc: 'Sends lead qualification alerts directly to sales channels.', connected: true, logo: 'S' },
    { key: 'calendar', name: 'Google Calendar API', desc: 'Book and coordinate appointment slots dynamically.', connected: true, logo: 'G' },
    { key: 'hubspot', name: 'HubSpot CRM', desc: 'Enrich lead contacts profiles directly inside HubSpot cards.', connected: false, logo: 'H' },
    { key: 'salesforce', name: 'Salesforce', desc: 'Synchronize large-scale client opportunities.', connected: false, logo: 'SF' },
    { key: 'zapier', name: 'Zapier Actions', desc: 'Connect FutureXVerse alerts to 5,000+ business applications.', connected: true, logo: 'Z' }
  ],

  team: [
    { id: 1, name: 'John Doe', email: 'john@acmecorp.com', role: 'Owner', date: 'Jul 10, 2026', permissions: 'Full Management Access' },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah@acmecorp.com', role: 'Agent', date: 'Jul 12, 2026', permissions: 'Read, Chat Intervene, CRM view' },
    { id: 3, name: 'Devon Lane', email: 'devon@acmecorp.com', role: 'Viewer', date: 'Jul 15, 2026', permissions: 'Read Only Analytics & logs' }
  ],

  notifications: [
    { id: 1, title: 'New Lead Qualified', body: 'Sarah Jenkins was qualified as Hot Lead ($12,000 budget)', time: '5m ago' },
    { id: 2, title: 'AI Assistant Escalated Thread', body: 'Frank Miller requested integration support (Live Agent assigned)', time: '1h ago' }
  ],

  // Admin Data Model
  adminClients: [
    { id: 1, company: 'Acme Corp', industry: 'SaaS Software', owner: 'John Doe', plan: 'Growth Plan', status: 'Active', convs: 148, leads: 34, created: 'Jul 10, 2026' },
    { id: 2, company: 'Deluge Logistics', industry: 'Supply Chain Logistics', owner: 'Frank Miller', plan: 'Enterprise Tier', status: 'Active', convs: 840, leads: 182, created: 'May 12, 2026' },
    { id: 3, company: 'Nova Spark', industry: 'E-commerce Retail', owner: 'Alice Thompson', plan: 'Growth Plan', status: 'Suspended', convs: 92, leads: 18, created: 'Jun 05, 2026' },
    { id: 4, company: 'Vapor Dynamics', industry: 'HVAC Construction', owner: 'David Vance', plan: 'Free Trial', status: 'Active', convs: 12, leads: 3, created: 'Jul 18, 2026' }
  ],

  adminTickets: [
    { id: 'TKT-991', tenant: 'Deluge Logistics', subject: 'Slack integrations fail with custom domains OAuth', priority: 'High', date: 'Jul 19, 2026', status: 'Open' },
    { id: 'TKT-983', tenant: 'Nova Spark', subject: 'Billing billing discrepancies on extra seat licenses', priority: 'Medium', date: 'Jul 18, 2026', status: 'Pending' },
    { id: 'TKT-972', tenant: 'Acme Corp', subject: 'Custom widget styling parameters caching delay', priority: 'Low', date: 'Jul 15, 2026', status: 'Resolved' }
  ],

  adminAuditLogs: [
    { actor: 'admin@futurexverse.com', action: 'Updated Global Token Rate Limits', ip: '192.168.1.10', resource: 'Settings', time: '10 mins ago', status: 'Success' },
    { actor: 'john@acmecorp.com', action: 'Impersonated by Platform Admin', ip: '192.168.1.10', resource: 'Impersonation Session', time: '1 hour ago', status: 'Success' },
    { actor: 'alice@novaspark.com', action: 'Account Suspended for invoice delinquency', ip: 'System Cron', resource: 'Client Database', time: '1 day ago', status: 'Success' }
  ]
};

// ==========================================
// ROUTER & NAVIGATION ENGINE
// ==========================================

function switchView(workspace, view, element = null) {
  // Hide all views
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Highlight navigation item
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active', 'active-admin');
  });

  state.currentWorkspace = workspace;
  state.currentView = view;

  // Build target UI element string
  const targetPanelId = `view-${workspace}-${view}`;
  const targetPanel = document.getElementById(targetPanelId);
  
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  // Activate link style
  if (element) {
    if (workspace === 'admin') {
      element.classList.add('active-admin');
    } else {
      element.classList.add('active');
    }
  } else {
    // Attempt automatic navigation activation if element is not passed
    const selector = `a[onclick="switchView('${workspace}', '${view}', this)"]`;
    const sideLink = document.querySelector(selector);
    if (sideLink) {
      if (workspace === 'admin') {
        sideLink.classList.add('active-admin');
      } else {
        sideLink.classList.add('active');
      }
    }
  }

  // Update top bar breadcrumbs
  const workspaceBreadcrumb = document.getElementById('breadcrumb-workspace');
  const pageBreadcrumb = document.getElementById('breadcrumb-page');
  
  if (workspace === 'client') {
    workspaceBreadcrumb.innerText = state.impersonating ? `${state.impersonatedTenant} (Client)` : "Acme Corp (Client)";
  } else {
    workspaceBreadcrumb.innerText = "Platform Admin";
  }

  // Capitalize view breadcrumb
  const formattedViewName = view.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  pageBreadcrumb.innerText = formattedViewName;

  // Trigger page-specific data updates
  triggerViewDataRenders(workspace, view);
  
  // Close mobile navigation drawer if open
  document.getElementById('sidebar').classList.remove('mobile-open');
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.classList.remove('active');
}

function selectWorkspace(workspace) {
  // Toggle sidebar navigation sets
  const clientNav = document.getElementById('nav-section-client');
  const adminNav = document.getElementById('nav-section-admin');
  const indicatorDot = document.getElementById('workspace-indicator-dot');
  const workspaceBtnLabel = document.getElementById('current-workspace-name');
  
  // Update footer profile info
  const footerAvatar = document.getElementById('sidebar-user-avatar');
  const footerName = document.getElementById('sidebar-user-name');
  const footerRole = document.getElementById('sidebar-user-role');

  if (workspace === 'client') {
    clientNav.style.display = 'block';
    adminNav.style.display = 'none';
    indicatorDot.className = 'workspace-indicator';
    workspaceBtnLabel.innerText = state.impersonating ? state.impersonatedTenant : "Acme Corp";
    
    footerAvatar.innerText = "JD";
    footerName.innerText = "John Doe";
    footerRole.innerText = "Acme Owner";
    
    switchView('client', 'dashboard');
  } else {
    clientNav.style.display = 'none';
    adminNav.style.display = 'block';
    indicatorDot.className = 'workspace-indicator admin';
    workspaceBtnLabel.innerText = "Platform Admin";
    
    footerAvatar.innerText = "AD";
    footerName.innerText = "Devon Lane";
    footerRole.innerText = "Super Admin";
    
    switchView('admin', 'dashboard');
  }

  // Hide dropdown
  document.getElementById('workspace-dropdown').style.display = 'none';
}

function toggleWorkspaceDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('workspace-dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Global click listener to close dropdowns
window.addEventListener('click', () => {
  document.getElementById('workspace-dropdown').style.display = 'none';
});

// Mobile Drawer Trigger
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('mobile-open');
  if (overlay) overlay.classList.toggle('active');
}

// ==========================================
// VIEW-SPECIFIC DATA RENDERING FUNCTIONS
// ==========================================

function triggerViewDataRenders(workspace, view) {
  // Client renders
  if (workspace === 'client') {
    if (view === 'dashboard') {
      renderClientDashboard();
    } else if (view === 'leads') {
      renderLeadsTable();
    } else if (view === 'conversations') {
      renderConversationsList();
    } else if (view === 'automations') {
      renderWorkflows();
    } else if (view === 'appointments') {
      renderAppointments();
    } else if (view === 'analytics') {
      initClientAnalyticsCharts();
    } else if (view === 'knowledge-base') {
      renderKbSources();
    } else if (view === 'widget-customization') {
      updateLiveWidgetPreview();
    } else if (view === 'integrations') {
      renderIntegrationsGrid();
    } else if (view === 'team') {
      renderTeamTable();
    }
  } 
  // Admin renders
  else if (workspace === 'admin') {
    if (view === 'dashboard') {
      initAdminDashboardCharts();
    } else if (view === 'clients') {
      renderAdminClientsTable();
    } else if (view === 'support-tickets') {
      renderAdminTicketsTable();
    } else if (view === 'audit-logs') {
      renderAdminAuditLogs();
    } else if (view === 'system-health') {
      renderSystemHealthChecks();
    }
  }
  
  // Re-run Lucide SVG icon generator on dynamically inserted elements
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// -----------------------------------------
// CLIENT: Dashboard Home Page
// -----------------------------------------
function renderClientDashboard() {
  // 1. Recent Conversations Table
  const recentConvsBody = document.getElementById('dashboard-recent-convs');
  recentConvsBody.innerHTML = '';
  
  // Grab top 3 conversations
  state.conversations.slice(0, 3).forEach(conv => {
    const lastMsg = conv.messages[conv.messages.length - 1];
    const unreadIndicator = conv.unread ? '<span style="width:6px; height:6px; background-color:var(--primary-blue); border-radius:50%; display:inline-block; margin-right:6px;"></span>' : '';
    const badgeType = conv.assignee === 'ai' ? '<span class="badge badge-hot">AI</span>' : '<span class="badge badge-qualified">Agent</span>';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:600; display:flex; align-items:center; gap:4px;">${unreadIndicator}${conv.name}</td>
      <td style="color:var(--text-secondary); max-width:240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${lastMsg ? lastMsg.content : ''}</td>
      <td>${badgeType}</td>
      <td style="color:var(--text-muted); font-size:0.75rem;">${conv.time}</td>
    `;
    row.style.cursor = 'pointer';
    row.onclick = () => {
      switchView('client', 'conversations');
      loadThreadIntoChat(conv.id);
    };
    recentConvsBody.appendChild(row);
  });

  // 2. Recent Leads CRM
  const recentLeadsBody = document.getElementById('dashboard-recent-leads');
  recentLeadsBody.innerHTML = '';
  
  // Grab top 3 leads
  state.leads.slice(0, 3).forEach(lead => {
    let statusClass = 'badge-new';
    if (lead.status === 'Qualified') statusClass = 'badge-qualified';
    if (lead.status === 'Hot') statusClass = 'badge-hot';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:600;">${lead.name}</td>
      <td style="color:var(--text-secondary);">${lead.email}</td>
      <td style="color:var(--text-secondary);">${lead.source}</td>
      <td><span class="badge ${statusClass}">${lead.status}</span></td>
    `;
    row.style.cursor = 'pointer';
    row.onclick = () => switchView('client', 'leads');
    recentLeadsBody.appendChild(row);
  });

  // 3. Automation Activity Feed
  const autoFeed = document.getElementById('dashboard-automation-feed');
  autoFeed.innerHTML = '';
  state.automations.forEach(auto => {
    const statusDot = auto.active ? 'var(--color-success)' : 'var(--text-muted)';
    const item = document.createElement('div');
    item.style.cssText = "display:flex; justify-content:space-between; align-items:center; font-size:0.8125rem;";
    item.innerHTML = `
      <div>
        <div style="font-weight:600; display:flex; align-items:center; gap:6px;">
          <span style="width:6px; height:6px; background-color:${statusDot}; border-radius:50%;"></span>
          ${auto.name}
        </div>
        <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">Triggered: ${auto.trigger}</div>
      </div>
      <div style="font-size:0.75rem; color:var(--text-muted);">${auto.lastRun}</div>
    `;
    autoFeed.appendChild(item);
  });

  // 4. Upcoming Appointments
  const apptsList = document.getElementById('dashboard-appointments-list');
  apptsList.innerHTML = '';
  state.appointments.slice(0, 2).forEach(appt => {
    const card = document.createElement('div');
    card.style.cssText = "padding:10px 12px; border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-hover);";
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <span style="font-weight:600; font-size:0.8125rem;">${appt.guest}</span>
        <span class="badge badge-won" style="font-size:0.65rem;">${appt.status}</span>
      </div>
      <div style="font-size:0.75rem; color:var(--text-secondary);">${appt.topic}</div>
      <div style="font-size:0.7rem; color:var(--text-muted); margin-top:6px; display:flex; align-items:center; gap:4px;">
        <i data-lucide="clock" style="width:12px; height:12px;"></i> ${appt.datetime}
      </div>
    `;
    apptsList.appendChild(card);
  });

  // Update home stat values
  document.getElementById('stat-conversations-count').innerText = state.conversations.length;
  document.getElementById('stat-leads-count').innerText = state.leads.length;
}

// -----------------------------------------
// CLIENT: Conversations (Inbox)
// -----------------------------------------
let currentInboxFilter = 'all';
let currentInboxSearch = '';
let activeConversationId = null;

function renderConversationsList() {
  const inboxStream = document.getElementById('inbox-threads-list');
  inboxStream.innerHTML = '';

  const filtered = state.conversations.filter(c => {
    // 1. Filter tabs
    if (currentInboxFilter === 'unread' && !c.unread) return false;
    if (currentInboxFilter === 'resolved' && !c.resolved) return false;
    if (currentInboxFilter === 'escalated' && !c.escalated) return false;
    if (currentInboxFilter === 'ai' && c.assignee !== 'ai') return false;
    if (currentInboxFilter === 'agent' && c.assignee !== 'agent') return false;
    
    // 2. Search box
    if (currentInboxSearch !== '') {
      const matchName = c.name.toLowerCase().includes(currentInboxSearch.toLowerCase());
      const matchEmail = c.email.toLowerCase().includes(currentInboxSearch.toLowerCase());
      return matchName || matchEmail;
    }
    return true;
  });

  if (filtered.length === 0) {
    inboxStream.innerHTML = '<div style="padding:40px; text-align:center; color:var(--text-muted); font-size:0.8125rem;">No threads found</div>';
    return;
  }

  filtered.forEach(c => {
    const lastMsg = c.messages[c.messages.length - 1];
    const initials = c.name.split(' ').map(n => n[0]).join('');
    const activeClass = c.id === activeConversationId ? 'active' : '';
    const unreadClass = c.unread ? 'unread' : '';
    
    const item = document.createElement('div');
    item.className = `conversation-item ${activeClass} ${unreadClass}`;
    item.innerHTML = `
      <div class="user-avatar">${initials}</div>
      <div class="conversation-item-body">
        <div class="conv-item-top">
          <span class="conv-item-name">${c.name}</span>
          <span class="conv-item-time">${c.time}</span>
        </div>
        <div class="conv-item-snippet">${lastMsg ? lastMsg.content : 'New conversation'}</div>
        <div class="conv-item-badges">
          ${c.assignee === 'ai' ? '<span class="badge badge-hot" style="font-size:0.65rem;">AI Bot</span>' : '<span class="badge badge-qualified" style="font-size:0.65rem;">Live Agent</span>'}
          ${c.escalated ? '<span class="badge badge-lost" style="font-size:0.65rem;">Escalated</span>' : ''}
          ${c.resolved ? '<span class="badge badge-won" style="font-size:0.65rem;">Resolved</span>' : ''}
        </div>
      </div>
    `;
    item.onclick = () => loadThreadIntoChat(c.id);
    inboxStream.appendChild(item);
  });
}

function loadThreadIntoChat(id) {
  activeConversationId = id;
  const c = state.conversations.find(conv => conv.id === id);
  if (!c) return;

  // Mark as read
  c.unread = false;
  renderConversationsList();
  renderUnreadNotificationsCount();

  // Switch visibility of chat placeholders
  document.getElementById('chat-pane-placeholder').style.display = 'none';
  const chatPane = document.getElementById('chat-pane-main');
  chatPane.style.display = 'flex';

  // Fill header details
  document.getElementById('chat-active-name').innerText = c.name;
  document.getElementById('chat-active-email').innerText = c.email;
  document.getElementById('chat-active-avatar').innerText = c.name.split(' ').map(n => n[0]).join('');
  document.getElementById('chat-assignee-select').value = c.assignee;

  // Render bubble messages history
  renderChatHistory(c);
}

function renderChatHistory(c) {
  const historyBox = document.getElementById('chat-active-history');
  historyBox.innerHTML = '';

  c.messages.forEach(msg => {
    const bubbleWrap = document.createElement('div');
    const incomingClass = msg.sender === 'incoming' ? 'incoming' : 'outgoing';
    bubbleWrap.className = `chat-bubble-container ${incomingClass}`;
    
    let bubbleTypeClass = 'agent';
    let label = 'Live Agent';
    if (msg.sender === 'ai') {
      bubbleTypeClass = 'ai';
      label = 'AI Assistant';
    } else if (msg.sender === 'incoming') {
      bubbleTypeClass = '';
      label = c.name;
    }

    bubbleWrap.innerHTML = `
      <div class="chat-bubble ${bubbleTypeClass}">${msg.content}</div>
      <div class="chat-meta">${label} • ${msg.time}</div>
    `;
    historyBox.appendChild(bubbleWrap);
  });

  // Scroll to bottom
  setTimeout(() => {
    historyBox.scrollTop = historyBox.scrollHeight;
  }, 50);
}

function filterInbox(filterTab) {
  currentInboxFilter = filterTab;
  document.querySelectorAll('#inbox-filter-tabs .inbox-filter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.innerText.toLowerCase() === filterTab || (filterTab === 'all' && tab.innerText === 'All') || (filterTab === 'ai' && tab.innerText === 'AI Only') || (filterTab === 'agent' && tab.innerText === 'Live Agent')) {
      tab.classList.add('active');
    }
  });
  renderConversationsList();
}

function filterInboxSearch(val) {
  currentInboxSearch = val;
  renderConversationsList();
}

function changeThreadAssignee(val) {
  if (!activeConversationId) return;
  const c = state.conversations.find(conv => conv.id === activeConversationId);
  if (!c) return;

  c.assignee = val;
  if (val === 'agent') {
    c.escalated = false;
  }
  toastNotification(`Thread assigned to ${val === 'ai' ? 'AI Assistant' : 'Live Agent'}`);
  renderConversationsList();
  loadThreadIntoChat(c.id);
}

function toggleThreadResolved() {
  if (!activeConversationId) return;
  const c = state.conversations.find(conv => conv.id === activeConversationId);
  if (!c) return;

  c.resolved = !c.resolved;
  toastNotification(`Thread marked as ${c.resolved ? 'Resolved' : 'Open'}`);
  renderConversationsList();
  loadThreadIntoChat(c.id);
}

function handleChatInputKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendLiveAgentMessage();
  }
}

function sendLiveAgentMessage() {
  const input = document.getElementById('chat-message-input');
  const txt = input.value.trim();
  if (txt === '' || !activeConversationId) return;

  const c = state.conversations.find(conv => conv.id === activeConversationId);
  if (!c) return;

  // Add agent message
  c.messages.push({
    sender: 'agent',
    content: txt,
    time: 'Just now'
  });

  // Automatically assign thread to live agent
  c.assignee = 'agent';
  
  input.value = '';
  loadThreadIntoChat(c.id);
  renderConversationsList();
}

// -----------------------------------------
// CLIENT: Leads CRM Table
// -----------------------------------------
let currentLeadsSearch = '';
let currentLeadsStatusFilter = 'all';

function renderLeadsTable() {
  const tbody = document.getElementById('leads-table-rows');
  tbody.innerHTML = '';

  const filtered = state.leads.filter(l => {
    // 1. Search text filter
    if (currentLeadsSearch !== '') {
      const matchName = l.name.toLowerCase().includes(currentLeadsSearch.toLowerCase());
      const matchEmail = l.email.toLowerCase().includes(currentLeadsSearch.toLowerCase());
      if (!matchName && !matchEmail) return false;
    }
    
    // 2. Status dropdown filter
    if (currentLeadsStatusFilter !== 'all') {
      if (l.status.toLowerCase() !== currentLeadsStatusFilter.toLowerCase()) return false;
    }
    return true;
  });

  // Display counters
  document.getElementById('leads-filtered-count').innerText = filtered.length;
  document.getElementById('leads-page-end').innerText = filtered.length;
  document.getElementById('leads-total-count').innerText = state.leads.length;

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:32px; color:var(--text-secondary);">No contact leads found</td></tr>';
    return;
  }

  filtered.forEach(l => {
    let badgeClass = 'badge-new';
    if (l.status === 'Qualified') badgeClass = 'badge-qualified';
    if (l.status === 'Hot') badgeClass = 'badge-hot';
    if (l.status === 'Won') badgeClass = 'badge-won';
    if (l.status === 'Lost') badgeClass = 'badge-lost';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:600;">${l.name}</td>
      <td>${l.email}</td>
      <td style="color:var(--text-secondary);">${l.phone}</td>
      <td>${l.source}</td>
      <td style="font-family:monospace; font-weight:600;">$${l.budget.toLocaleString()}</td>
      <td><span class="badge ${badgeClass}">${l.status}</span></td>
      <td style="color:var(--text-secondary);">${l.date}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="editLeadStatus(${l.id})">Modify Status</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function filterLeadsTable(val) {
  currentLeadsSearch = val;
  renderLeadsTable();
}

function filterLeadsByStatus(val) {
  currentLeadsStatusFilter = val;
  renderLeadsTable();
}

function editLeadStatus(leadId) {
  const l = state.leads.find(lead => lead.id === leadId);
  if (!l) return;

  const newStatus = prompt(`Change status for ${l.name} (New, Qualified, Hot, Won, Lost):`, l.status);
  if (newStatus && ['New', 'Qualified', 'Hot', 'Won', 'Lost'].includes(newStatus)) {
    l.status = newStatus;
    
    // Add activity logger triggers
    if (newStatus === 'Won') {
      addAutomationLogFeed(`Lead ${l.name} changed status to Won. Relayed HubSpot trigger.`);
    }

    toastNotification(`Lead ${l.name} status updated to ${newStatus}`);
    renderLeadsTable();
    renderClientDashboard();
  } else if (newStatus) {
    alert('Invalid status scope entered.');
  }
}

function exportLeads() {
  // Simulated client side CSV builder & downloader
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Name,Email,Phone,Source,Budget,Status,Date\r\n";
  
  state.leads.forEach(l => {
    csvContent += `"${l.name}","${l.email}","${l.phone}","${l.source}",${l.budget},"${l.status}","${l.date}"\r\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `futurexverse_leads_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toastNotification("CSV Leads document downloaded successfully");
}

// -----------------------------------------
// CLIENT: Automations List
// -----------------------------------------
function renderWorkflows() {
  const container = document.getElementById('workflows-list-container');
  container.innerHTML = '';

  state.automations.forEach(auto => {
    const activeChecked = auto.active ? 'checked' : '';
    const statusText = auto.active ? 'Active' : 'Deactivated';
    
    const card = document.createElement('div');
    card.className = 'workflow-card';
    card.innerHTML = `
      <div class="workflow-top">
        <div>
          <span class="workflow-title">${auto.name}</span>
          <div class="workflow-meta">Last executed: ${auto.lastRun}</div>
        </div>
        <label class="switch-control">
          <input type="checkbox" ${activeChecked} class="switch-input" onchange="toggleWorkflowActive(${auto.id}, this.checked)">
          <span class="switch-slider"></span>
          <span style="font-size:0.75rem; font-weight:600;" id="workflow-status-lbl-${auto.id}">${statusText}</span>
        </label>
      </div>
      <div class="workflow-steps-connector">
        <div class="workflow-step"><i data-lucide="zap" style="width:14px; color:var(--primary-purple);"></i> Trigger: ${auto.trigger}</div>
        <div class="workflow-connector-line"></div>
        <div class="workflow-step"><i data-lucide="play" style="width:14px; color:var(--primary-blue);"></i> Action: ${auto.action}</div>
      </div>
      <div class="workflow-bottom">
        <span style="font-size:0.75rem; color:var(--text-muted);">Integrations: Slack, Webhooks</span>
        <button class="btn btn-secondary btn-sm" onclick="deleteWorkflow(${auto.id})" style="color:var(--color-danger); border-color:transparent;"><i data-lucide="trash-2" style="width:12px;"></i> Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleWorkflowActive(id, val) {
  const auto = state.automations.find(a => a.id === id);
  if (!auto) return;

  auto.active = val;
  document.getElementById(`workflow-status-lbl-${id}`).innerText = val ? 'Active' : 'Deactivated';
  toastNotification(`Workflow "${auto.name}" ${val ? 'enabled' : 'disabled'}`);
}

function deleteWorkflow(id) {
  if (!confirm('Are you sure you want to delete this workflow?')) return;
  state.automations = state.automations.filter(a => a.id !== id);
  renderWorkflows();
  renderClientDashboard();
  toastNotification('Workflow automation deleted');
}

// -----------------------------------------
// CLIENT: Appointments Bookings
// -----------------------------------------
function renderAppointments() {
  const tbody = document.getElementById('appointments-table-rows');
  tbody.innerHTML = '';

  state.appointments.forEach(appt => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:600;">${appt.guest}</td>
      <td style="color:var(--text-secondary);">${appt.topic}</td>
      <td>${appt.datetime}</td>
      <td>${appt.platform}</td>
      <td>${appt.bookedBy}</td>
      <td><span class="badge badge-won">${appt.status}</span></td>
    `;
    tbody.appendChild(row);
  });
}

// -----------------------------------------
// CLIENT: Knowledge Base Sources
// -----------------------------------------
function renderKbSources() {
  const container = document.getElementById('kb-sources-container');
  container.innerHTML = '';

  state.kbSources.forEach(src => {
    let iconName = 'file-text';
    if (src.type.includes('URL')) iconName = 'link';
    if (src.type.includes('FAQ')) iconName = 'message-circle';
    
    const card = document.createElement('div');
    card.className = 'kb-source-card';
    card.innerHTML = `
      <div class="kb-source-icon">
        <i data-lucide="${iconName}" style="width:18px;"></i>
      </div>
      <div class="kb-source-info">
        <div class="kb-source-title" title="${src.name}">${src.name}</div>
        <div class="kb-source-size">${src.type} • ${src.size}</div>
        <div style="font-size:0.7rem; color:var(--text-muted); margin-top:4px;">Uploaded ${src.date}</div>
      </div>
      <button class="kb-delete-btn" onclick="deleteKbSource(${src.id})" title="Delete source">
        <i data-lucide="trash-2" style="width:14px;"></i>
      </button>
    `;
    container.appendChild(card);
  });
}

function deleteKbSource(id) {
  if (!confirm('Are you sure you want to delete this knowledge source?')) return;
  state.kbSources = state.kbSources.filter(src => src.id !== id);
  renderKbSources();
  toastNotification('Knowledge base source deleted');
}

// -----------------------------------------
// CLIENT: Connected Integrations
// -----------------------------------------
function renderIntegrationsGrid() {
  const container = document.getElementById('integrations-cards-container');
  container.innerHTML = '';

  state.integrations.forEach(integ => {
    const activeChecked = integ.connected ? 'checked' : '';
    const statusText = integ.connected ? 'Connected' : 'Not Connected';
    const statusDotClass = integ.connected ? 'connected' : '';

    const card = document.createElement('div');
    card.className = 'integration-card';
    card.innerHTML = `
      <div class="integration-card-top">
        <div class="integration-icon">${integ.logo}</div>
        <div class="integration-details">
          <div class="integration-name">${integ.name}</div>
          <div class="integration-description">${integ.desc}</div>
        </div>
      </div>
      <div class="integration-card-bottom">
        <div class="integration-status">
          <span class="integration-status-dot ${statusDotClass}"></span>
          <span id="integ-status-text-${integ.key}">${statusText}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="configureIntegration('${integ.name}')">Configure</button>
          <label class="switch-control">
            <input type="checkbox" ${activeChecked} class="switch-input" onchange="toggleIntegrationStatus('${integ.key}', this.checked)">
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleIntegrationStatus(key, val) {
  const integ = state.integrations.find(i => i.key === key);
  if (!integ) return;

  integ.connected = val;
  const statusLabel = document.getElementById(`integ-status-text-${key}`);
  const statusDot = statusLabel.previousElementSibling;
  
  if (val) {
    statusLabel.innerText = 'Connected';
    statusDot.classList.add('connected');
  } else {
    statusLabel.innerText = 'Not Connected';
    statusDot.classList.remove('connected');
  }

  toastNotification(`${integ.name} ${val ? 'connected' : 'disconnected'}`);
}

function configureIntegration(name) {
  toastNotification(`Configuration panel for ${name} opened`);
}

// -----------------------------------------
// CLIENT: Team Table
// -----------------------------------------
function renderTeamTable() {
  const tbody = document.getElementById('team-table-rows');
  tbody.innerHTML = '';

  state.team.forEach(t => {
    const initials = t.name.split(' ').map(n => n[0]).join('');
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="user-avatar" style="width:28px; height:28px; font-size:0.75rem;">${initials}</div>
          <span style="font-weight:600;">${t.name}</span>
        </div>
      </td>
      <td>${t.email}</td>
      <td><span class="badge badge-qualified">${t.role}</span></td>
      <td>${t.date}</td>
      <td style="font-size:0.8125rem; color:var(--text-secondary);">${t.permissions}</td>
      <td>
        ${t.role !== 'Owner' ? `<button class="btn btn-secondary btn-sm" onclick="removeTeamMember(${t.id})" style="color:var(--color-danger); border-color:transparent;"><i data-lucide="user-minus" style="width:12px;"></i> Revoke</button>` : ''}
      </td>
    `;
    tbody.appendChild(row);
  });
}

function removeTeamMember(id) {
  if (!confirm('Are you sure you want to revoke workspace access for this member?')) return;
  state.team = state.team.filter(t => t.id !== id);
  renderTeamTable();
  toastNotification('Team workspace access revoked');
}

// -----------------------------------------
// CLIENT: Live Widget Customizer Preview
// -----------------------------------------
function syncColorInputHex(val) {
  const picker = document.getElementById('widget-cfg-color');
  if (val.match(/^#[0-9A-F]{6}$/i)) {
    picker.value = val;
    updateLiveWidgetPreview();
  }
}

function updateLiveWidgetPreview() {
  const color = document.getElementById('widget-cfg-color').value;
  document.getElementById('widget-cfg-color-hex').value = color.toUpperCase();

  const radius = document.getElementById('widget-cfg-radius').value;
  const welcome = document.getElementById('widget-cfg-welcome').value;
  const avatarText = document.getElementById('widget-cfg-avatar').value;
  const pos = document.getElementById('widget-cfg-pos').value;

  // Apply visual properties to preview widget card elements
  const widgetBox = document.getElementById('mock-chat-box');
  const widgetHeader = document.getElementById('preview-widget-header');
  const welcomeTitle = document.getElementById('preview-widget-welcome-title');
  const avatarLogo = document.getElementById('preview-widget-avatar-logo');
  const outBubble = document.getElementById('preview-widget-out-bubble');
  const sendIcon = document.getElementById('preview-widget-send-color');
  const triggerBtn = document.getElementById('preview-widget-trigger');

  // Styles alignment
  widgetHeader.style.backgroundColor = color;
  outBubble.style.backgroundColor = color;
  sendIcon.style.color = color;
  triggerBtn.style.backgroundColor = color;

  welcomeTitle.innerText = welcome;
  avatarLogo.innerText = avatarText;

  widgetBox.style.borderRadius = radius;

  // Alignment positioning mockup
  const previewPanel = document.querySelector('.widget-preview-panel');
  if (pos === 'left') {
    widgetBox.style.alignSelf = 'flex-start';
    triggerBtn.style.alignSelf = 'flex-start';
  } else {
    widgetBox.style.alignSelf = 'flex-end';
    triggerBtn.style.alignSelf = 'flex-end';
  }
}

function saveWidgetStyles() {
  toastNotification('Custom widget design styles saved');
}

// -----------------------------------------
// CLIENT: Settings Tabs Switcher
// -----------------------------------------
function switchSettingsTab(tabId, btn) {
  document.querySelectorAll('.settings-content-section').forEach(section => {
    section.classList.remove('active');
  });
  document.querySelectorAll('.settings-nav-btn').forEach(navBtn => {
    navBtn.classList.remove('active');
  });

  document.getElementById(`settings-tab-${tabId}`).classList.add('active');
  btn.classList.add('active');
}

function toggleApiKeyVisibility() {
  const keyInput = document.getElementById('settings-apikey-val');
  if (keyInput.type === 'password') {
    keyInput.type = 'text';
  } else {
    keyInput.type = 'password';
  }
}

function copyApiKey() {
  const keyInput = document.getElementById('settings-apikey-val');
  keyInput.select();
  keyInput.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(keyInput.value);
  toastNotification("Secret API Key copied to clipboard");
}

function saveGeneralSettings() {
  const compName = document.getElementById('settings-company-name').value;
  
  if (state.impersonating) {
    state.impersonatedTenant = compName;
    document.getElementById('breadcrumb-workspace').innerText = `${compName} (Client)`;
  }
  
  toastNotification("Workspace details saved successfully");
}

function deleteWorkspaceConfirmation() {
  const confirmName = prompt('Are you sure you want to delete this workspace? Type "DELETE ACME" to verify:');
  if (confirmName === 'DELETE ACME') {
    toastNotification('Acme Corp workspace deleted permanently');
    selectWorkspace('admin');
  } else if (confirmName) {
    alert('Deletion confirm code mismatch');
  }
}

function saveAssistantSettings() {
  toastNotification('AI Assistant profile settings updated successfully');
}


// ==========================================
// ADMIN DASHBOARD RENDERING & MANAGEMENT
// ==========================================

// -----------------------------------------
// ADMIN: Clients CRM List Table
// -----------------------------------------
let currentAdminClientsSearch = '';

function renderAdminClientsTable() {
  const tbody = document.getElementById('admin-clients-table-rows');
  tbody.innerHTML = '';

  const filtered = state.adminClients.filter(c => {
    if (currentAdminClientsSearch !== '') {
      const matchCompany = c.company.toLowerCase().includes(currentAdminClientsSearch.toLowerCase());
      const matchOwner = c.owner.toLowerCase().includes(currentAdminClientsSearch.toLowerCase());
      const matchIndustry = c.industry.toLowerCase().includes(currentAdminClientsSearch.toLowerCase());
      return matchCompany || matchOwner || matchIndustry;
    }
    return true;
  });

  document.getElementById('admin-clients-count').innerText = filtered.length;

  filtered.forEach(c => {
    const statusClass = c.status === 'Active' ? 'badge-won' : 'badge-lost';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:600;">${c.company}</td>
      <td style="color:var(--text-secondary);">${c.industry}</td>
      <td>${c.owner}</td>
      <td><span class="badge badge-hot">${c.plan}</span></td>
      <td><span class="badge ${statusClass}">${c.status}</span></td>
      <td style="font-family:monospace; text-align:center;">${c.convs}</td>
      <td style="font-family:monospace; text-align:center;">${c.leads}</td>
      <td style="color:var(--text-secondary); font-size:0.8125rem;">${c.created}</td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="impersonateClient('${c.company}', '${c.owner}')" title="Impersonate"><i data-lucide="glasses" style="width:12px;"></i> Impersonate</button>
          <button class="btn btn-secondary btn-sm" onclick="toggleSuspendClient(${c.id})" style="color:var(--color-warning);">${c.status === 'Active' ? 'Suspend' : 'Unsuspend'}</button>
          <button class="btn btn-secondary btn-sm" onclick="deleteClientWorkspace(${c.id})" style="color:var(--color-danger);"><i data-lucide="trash-2" style="width:12px;"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function filterAdminClients(val) {
  currentAdminClientsSearch = val;
  renderAdminClientsTable();
}

function impersonateClient(companyName, ownerName) {
  state.impersonating = true;
  state.impersonatedTenant = companyName;

  // Toggle warning banner
  const banner = document.getElementById('impersonation-banner');
  banner.style.display = 'flex';
  banner.querySelector('span').innerHTML = `You are currently impersonating <strong>${companyName}</strong> (Owner: ${ownerName})`;

  // Switch Workspace context to client & navigate to its dashboard
  selectWorkspace('client');
  toastNotification(`Successfully impersonated ${companyName}`);
}

function stopImpersonation() {
  state.impersonating = false;
  state.impersonatedTenant = null;

  document.getElementById('impersonation-banner').style.display = 'none';
  selectWorkspace('admin');
  toastNotification("Exited impersonation. Returned to platform Admin view.");
}

function toggleSuspendClient(clientId) {
  const client = state.adminClients.find(c => c.id === clientId);
  if (!client) return;

  client.status = client.status === 'Active' ? 'Suspended' : 'Active';
  toastNotification(`Account for ${client.company} ${client.status === 'Active' ? 'activated' : 'suspended'}`);
  renderAdminClientsTable();
}

function deleteClientWorkspace(clientId) {
  const client = state.adminClients.find(c => c.id === clientId);
  if (!client) return;

  if (confirm(`CRITICAL: Are you sure you want to permanently delete the entire workspace instance for ${client.company}? This destroys all database backups.`)) {
    state.adminClients = state.adminClients.filter(c => c.id !== clientId);
    renderAdminClientsTable();
    toastNotification(`Workspace ${client.company} permanently deleted`);
  }
}

// -----------------------------------------
// ADMIN: Support Tickets Escalations
// -----------------------------------------
function renderAdminTicketsTable() {
  const tbody = document.getElementById('admin-tickets-table-rows');
  tbody.innerHTML = '';

  state.adminTickets.forEach(t => {
    let priorityClass = 'badge-low';
    if (t.priority === 'Medium') priorityClass = 'badge-medium';
    if (t.priority === 'High') priorityClass = 'badge-high';
    if (t.priority === 'Urgent') priorityClass = 'badge-urgent';

    let statusClass = 'badge-offline';
    if (t.status === 'Open') statusClass = 'badge-new';
    if (t.status === 'Resolved') statusClass = 'badge-won';
    if (t.status === 'Pending') statusClass = 'badge-hot';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:600;"><code>${t.id}</code></td>
      <td>${t.tenant}</td>
      <td style="max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${t.subject}</td>
      <td><span class="badge ${priorityClass}">${t.priority}</span></td>
      <td style="color:var(--text-secondary);">${t.date}</td>
      <td><span class="badge ${statusClass}">${t.status}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="changeTicketStatus('${t.id}')">Resolve</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function changeTicketStatus(ticketId) {
  const t = state.adminTickets.find(ticket => ticket.id === ticketId);
  if (!t) return;

  const newStatus = prompt(`Change ticket status for ${t.id} (Open, Pending, Resolved, Closed):`, t.status);
  if (newStatus && ['Open', 'Pending', 'Resolved', 'Closed'].includes(newStatus)) {
    t.status = newStatus;
    toastNotification(`Ticket ${t.id} set to ${newStatus}`);
    renderAdminTicketsTable();
  }
}

// -----------------------------------------
// ADMIN: System Health Indicators
// -----------------------------------------
const systemComponents = [
  { name: 'Gateway API Routes Router', status: 'healthy', value: '14ms latency' },
  { name: 'Supabase Main Database Cluster', status: 'healthy', value: 'Active (24 connections)' },
  { name: 'Clerk User Authentication Identity Server', status: 'healthy', value: 'Operational' },
  { name: 'Redis Microservice Queue Broker', status: 'healthy', value: '0 items in backlog' },
  { name: 'AWS S3 Assets & Documents Cloud Storage', status: 'healthy', value: '94% capacity' },
  { name: 'Postmark SMTP Transmissions Node', status: 'degraded', value: 'High queue delays (3m delay)' },
  { name: 'Zapier Webhook Relay Dispatcher', status: 'healthy', value: 'Operational' }
];

function renderSystemHealthChecks() {
  const container = document.getElementById('system-health-container');
  container.innerHTML = '';

  systemComponents.forEach(comp => {
    const indicatorClass = comp.status;
    const card = document.createElement('div');
    card.className = 'health-card';
    card.innerHTML = `
      <div class="health-left">
        <span class="health-status-indicator ${indicatorClass}"></span>
        <div>
          <span class="health-title">${comp.name}</span>
          <div class="health-value" style="margin-top:2px;">Status: ${comp.value}</div>
        </div>
      </div>
      <span style="font-size:0.7rem; font-weight:600; text-transform:uppercase; color:${comp.status === 'healthy' ? 'var(--color-success)' : 'var(--color-warning)'}">${comp.status}</span>
    `;
    container.appendChild(card);
  });
}

// -----------------------------------------
// ADMIN: Audit Trail Logs
// -----------------------------------------
let currentAuditSearch = '';

function renderAdminAuditLogs() {
  const tbody = document.getElementById('admin-audit-table-rows');
  tbody.innerHTML = '';

  const filtered = state.adminAuditLogs.filter(l => {
    if (currentAuditSearch !== '') {
      const matchActor = l.actor.toLowerCase().includes(currentAuditSearch.toLowerCase());
      const matchAction = l.action.toLowerCase().includes(currentAuditSearch.toLowerCase());
      const matchScope = l.resource.toLowerCase().includes(currentAuditSearch.toLowerCase());
      return matchActor || matchAction || matchScope;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:32px; color:var(--text-secondary);">No audit logs matched search filters</td></tr>';
    return;
  }

  filtered.forEach(log => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.actor}</td>
      <td style="font-weight:500;">${log.action}</td>
      <td style="font-family:monospace;">${log.ip}</td>
      <td><span class="badge badge-medium">${log.resource}</span></td>
      <td style="color:var(--text-secondary);">${log.time}</td>
      <td><span class="badge badge-won">${log.status}</span></td>
    `;
    tbody.appendChild(row);
  });
}

function filterAuditLogs(val) {
  currentAuditSearch = val;
  renderAdminAuditLogs();
}


// ==========================================
// MODAL CONTROLS & FORMS
// ==========================================

function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  
  // Clean KB form outputs if closing that specific modal
  if (id === 'modal-upload-kb') {
    document.getElementById('kb-selected-file-name').style.display = 'none';
    document.getElementById('kb-input-url').value = '';
    document.getElementById('kb-input-faq-q').value = '';
    document.getElementById('kb-input-faq-a').value = '';
  }
}

// Modal Form Actions

function triggerTrainAISave() {
  closeModal('modal-train-ai');
  toastNotification('AI Assistant training job initialized');
  addAutomationLogFeed('AI brain training job triggered. Crawling knowledge bases.');
}

function toggleKbUploadFields(val) {
  document.querySelectorAll('.kb-upload-input-group').forEach(group => {
    group.style.display = 'none';
  });
  document.getElementById(`kb-group-${val}`).style.display = 'block';
}

function handleKbFileSelect(input) {
  const file = input.files[0];
  const nameLabel = document.getElementById('kb-selected-file-name');
  if (file) {
    nameLabel.innerText = `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    nameLabel.style.display = 'block';
  } else {
    nameLabel.style.display = 'none';
  }
}

function triggerKbUploadSave() {
  const format = document.getElementById('kb-upload-format').value;
  let sourceName = '';
  let sourceType = '';
  let sourceSize = 'N/A';

  if (format === 'file') {
    const fileRef = document.getElementById('kb-file-ref');
    if (!fileRef.files[0]) {
      alert('Please browse for a document file to upload first.');
      return;
    }
    sourceName = fileRef.files[0].name;
    sourceType = fileRef.files[0].name.endsWith('.pdf') ? 'PDF Document' : 'Word Doc';
    sourceSize = `${(fileRef.files[0].size / 1024).toFixed(0)} KB`;
  } else if (format === 'url') {
    const urlVal = document.getElementById('kb-input-url').value;
    if (urlVal === '') {
      alert('Please input a target website URL crawler path.');
      return;
    }
    sourceName = urlVal;
    sourceType = 'Web URL Crawler';
    sourceSize = '8 Pages crawled';
  } else if (format === 'faq') {
    const faqQ = document.getElementById('kb-input-faq-q').value;
    if (faqQ === '') {
      alert('Please specify a Question.');
      return;
    }
    sourceName = faqQ;
    sourceType = 'Manual Q&A FAQ Pair';
    sourceSize = '1 Q&A block';
  }

  // Push new source details to dataset
  state.kbSources.push({
    id: state.kbSources.length + 1,
    name: sourceName,
    type: sourceType,
    size: sourceSize,
    date: 'Just now'
  });

  closeModal('modal-upload-kb');
  renderKbSources();
  toastNotification('Added source item to knowledge base');
  addAutomationLogFeed(`Uploaded new knowledge source file: ${sourceName}`);
}

function triggerWorkflowCreate() {
  const name = document.getElementById('modal-workflow-name').value;
  const trigger = document.getElementById('modal-workflow-trigger').options[document.getElementById('modal-workflow-trigger').selectedIndex].text;
  const action = document.getElementById('modal-workflow-action').options[document.getElementById('modal-workflow-action').selectedIndex].text;

  if (name.trim() === '') {
    alert('Please enter a descriptive workflow name.');
    return;
  }

  state.automations.push({
    id: state.automations.length + 1,
    name: name,
    trigger: trigger,
    action: action,
    active: true,
    lastRun: 'Never'
  });

  closeModal('modal-create-automation');
  renderWorkflows();
  renderClientDashboard();
  toastNotification(`Workflow automation "${name}" created`);
}

function triggerTeamInvite() {
  const name = document.getElementById('modal-team-name').value;
  const email = document.getElementById('modal-team-email').value;
  const role = document.getElementById('modal-team-role').value;

  if (name.trim() === '' || email.trim() === '') {
    alert('Please enter your teammate\'s name and email.');
    return;
  }

  state.team.push({
    id: state.team.length + 1,
    name: name,
    email: email,
    role: role,
    date: 'Just now',
    permissions: role === 'Admin' ? 'Full Edit Access' : role === 'Agent' ? 'Read & Chat Intervene' : 'Read Only access'
  });

  closeModal('modal-invite-team');
  renderTeamTable();
  toastNotification(`Sent workspace invitation link to ${email}`);
}

function triggerLeadCreate() {
  const name = document.getElementById('modal-lead-name').value;
  const email = document.getElementById('modal-lead-email').value;
  const phone = document.getElementById('modal-lead-phone').value;
  const budget = parseFloat(document.getElementById('modal-lead-budget').value) || 0;
  const source = document.getElementById('modal-lead-source').value;
  const status = document.getElementById('modal-lead-status').value;

  if (name.trim() === '' || email.trim() === '') {
    alert('Please supply the contact lead\'s name and email address.');
    return;
  }

  state.leads.unshift({
    id: state.leads.length + 1,
    name: name,
    email: email,
    phone: phone,
    source: source,
    budget: budget,
    status: status,
    date: new Date().toISOString().slice(0, 10)
  });

  closeModal('modal-add-lead');
  renderLeadsTable();
  renderClientDashboard();
  toastNotification(`Successfully added CRM lead contact ${name}`);
}

function triggerAnnouncementPublish() {
  const title = document.getElementById('modal-ann-title').value;
  const scope = document.getElementById('modal-ann-scope').value;
  const content = document.getElementById('modal-ann-content').value;

  if (title.trim() === '' || content.trim() === '') {
    alert('Please supply an announcement title and descriptive contents.');
    return;
  }

  // Push audit log trigger
  state.adminAuditLogs.unshift({
    actor: 'admin@futurexverse.com',
    action: `Published broadcast banner: ${title}`,
    ip: '192.168.1.10',
    resource: 'System Announcements',
    time: 'Just now',
    status: 'Success'
  });

  closeModal('modal-add-announcement');
  toastNotification('System-wide announcement broadcast published successfully');
}


// -----------------------------------------
// SANDBOX TEST AI CHAT PANEL
// -----------------------------------------
function handleTestChatInputKey(e) {
  if (e.key === 'Enter') {
    sendTestChatSandbox();
  }
}

function sendTestChatSandbox() {
  const input = document.getElementById('modal-test-chat-input');
  const txt = input.value.trim();
  if (txt === '') return;

  const chatHistory = document.getElementById('modal-test-chat-history');
  
  // 1. Add user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'mock-widget-bubble outgoing';
  userBubble.style.backgroundColor = document.getElementById('widget-cfg-color').value;
  userBubble.innerText = txt;
  chatHistory.appendChild(userBubble);
  
  input.value = '';
  chatHistory.scrollTop = chatHistory.scrollHeight;

  // 2. Generate simulated response delay
  setTimeout(() => {
    let response = "I'm analyzing your query using our custom knowledge models. We can automate this CRM process for you.";
    if (txt.toLowerCase().includes('pricing') || txt.toLowerCase().includes('cost')) {
      response = "Our subscription plans start at just $49/month for the Growth Tier, and we also offer custom pricing templates for large Enterprises.";
    } else if (txt.toLowerCase().includes('demo') || txt.toLowerCase().includes('book') || txt.toLowerCase().includes('meeting')) {
      response = "Perfect! I can lock in a session tomorrow morning at 10:00 AM. Would you like me to book it?";
    } else if (txt.toLowerCase().includes('integrate') || txt.toLowerCase().includes('connect')) {
      response = "FutureXVerse connects natively with WhatsApp, Slack, Zapier, HubSpot, and Salesforce. Simply connect them under Integrations.";
    }

    const aiBubble = document.createElement('div');
    aiBubble.className = 'mock-widget-bubble incoming';
    aiBubble.innerText = response;
    chatHistory.appendChild(aiBubble);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, 750);
}

// -----------------------------------------
// TOAST NOTIFICATIONS & FEED LOGGERS
// -----------------------------------------
function toastNotification(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close-btn" onclick="this.parentElement.remove()"><i data-lucide="x" style="width:14px; height:14px;"></i></button>
  `;
  container.appendChild(toast);
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 4000);

  // Initialize Lucide icons inside new toast
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function addAutomationLogFeed(txt) {
  // Prepends incremental reports to state automations timelines
  const activeAuto = state.automations[0];
  if (activeAuto) {
    activeAuto.lastRun = 'Just now';
  }
}

// Help Modal Info Redirect
function openDocsHelp() {
  toastNotification("Documentation portal opened in offline sandbox");
}

function toggleNotificationsModal() {
  const modal = document.getElementById('modal-notifications');
  const list = document.getElementById('notifications-modal-list');
  list.innerHTML = '';

  if (state.notifications.length === 0) {
    list.innerHTML = '<div style="padding:24px; text-align:center; color:var(--text-muted); font-size:0.8125rem;">No active alert notifications</div>';
  } else {
    state.notifications.forEach(n => {
      const item = document.createElement('div');
      item.style.cssText = "padding:12px 16px; border-bottom:1px solid var(--border-color); font-size:0.8125rem;";
      item.innerHTML = `
        <div style="font-weight:600; color:var(--text-main);">${n.title}</div>
        <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">${n.body}</div>
        <div style="font-size:0.7rem; color:var(--text-muted); margin-top:4px;">${n.time}</div>
      `;
      list.appendChild(item);
    });
  }

  openModal('modal-notifications');
}

function clearAllNotifications() {
  state.notifications = [];
  closeModal('modal-notifications');
  renderUnreadNotificationsCount();
  toastNotification("Notifications cleared");
}

function renderUnreadNotificationsCount() {
  const unreadBadge = document.getElementById('badge-unread-convs');
  const count = state.conversations.filter(c => c.unread).length;
  unreadBadge.innerText = count;
  unreadBadge.style.display = count === 0 ? 'none' : 'inline-block';

  // Toggle notification bell icon badge
  const indicator = document.getElementById('notif-indicator');
  indicator.style.display = state.notifications.length === 0 ? 'none' : 'block';
}

function handleGlobalSearch(val) {
  // Simple router filter redirect or trigger search depending on panel context
  if (state.currentWorkspace === 'client' && state.currentView === 'leads') {
    currentLeadsSearch = val;
    renderLeadsTable();
  } else if (state.currentWorkspace === 'client' && state.currentView === 'conversations') {
    currentInboxSearch = val;
    renderConversationsList();
  } else if (state.currentWorkspace === 'admin' && state.currentView === 'clients') {
    currentAdminClientsSearch = val;
    renderAdminClientsTable();
  }
}

function triggerLogout() {
  if (confirm('Verify: Would you like to sign out from your active FutureXVerse workspace session?')) {
    toastNotification('Session terminated. Redirecting to brand landing page...');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}


// ==========================================
// DATA VISUALIZATION ENGINES (CHART.JS)
// ==========================================

let clientChartMessages = null;
let clientChartLeadSources = null;
let adminChartRevenue = null;
let adminChartTokens = null;

function initClientAnalyticsCharts() {
  const ctxMessages = document.getElementById('chart-messages-time');
  const ctxSources = document.getElementById('chart-lead-sources');
  
  if (!ctxMessages || !ctxSources) return;

  // Clean existing charts if navigating back to page
  if (clientChartMessages) clientChartMessages.destroy();
  if (clientChartLeadSources) clientChartLeadSources.destroy();

  // Stripe Style - Clean lines, high grid spacing
  clientChartMessages = new Chart(ctxMessages, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Messages Exchanged',
        data: [142, 168, 204, 185, 230, 94, 112],
        borderColor: '#1E90FF', // brand blue
        backgroundColor: 'rgba(30, 144, 255, 0.05)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: '#1E90FF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { borderDash: [4, 4] }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });

  clientChartLeadSources = new Chart(ctxSources, {
    type: 'bar',
    data: {
      labels: ['Website Widget', 'Zapier Sync', 'Manual Entry', 'Direct Mail'],
      datasets: [{
        label: 'Leads Gathered',
        data: [142, 48, 12, 19],
        backgroundColor: ['#1E90FF', '#7B2FF7', '#E5E7EB', '#6B7280'],
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { borderDash: [4, 4] }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });
}

function initAdminDashboardCharts() {
  const ctxRev = document.getElementById('admin-chart-revenue');
  const ctxTok = document.getElementById('admin-chart-token-usage');

  if (!ctxRev || !ctxTok) return;

  if (adminChartRevenue) adminChartRevenue.destroy();
  if (adminChartTokens) adminChartTokens.destroy();

  // Aggregate ARR / MRR Monthly Growth Graph
  adminChartRevenue = new Chart(ctxRev, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'MRR Growth ($)',
        data: [32000, 37000, 42000, 48000, 52000, 57000, 61152],
        borderColor: '#7B2FF7', // brand purple
        backgroundColor: 'rgba(123, 47, 247, 0.05)',
        borderWidth: 2,
        tension: 0.2,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#7B2FF7'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { borderDash: [4, 4] }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });

  adminChartTokens = new Chart(ctxTok, {
    type: 'doughnut',
    data: {
      labels: ['GPT-4o Mini', 'GPT-4o', 'Claude 3.5 Sonnet', 'Others'],
      datasets: [{
        data: [65, 20, 10, 5],
        backgroundColor: ['#1E90FF', '#7B2FF7', '#10B981', '#E5E7EB'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { boxWidth: 12, font: { size: 10, family: 'Inter' } }
        }
      }
    }
  });
}


// ==========================================
// BOOTSTRAP INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize standard breadcrumbs & items
  selectWorkspace('client');
  renderUnreadNotificationsCount();
  
  // Set default form prompt configuration text inside fields
  document.getElementById('assistant-cfg-prompt').value = 
    "You are a professional assistant for Acme Corp, a business specializing in premium hardware integrations. Your goal is to gather lead contacts, answer service rates, and coordinate calendar bookings. Always maintain a helpful, factual, and concise tone. Transfer to live agents if technical integrations details are queried.";
  
  // Run Lucide icon creation
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
