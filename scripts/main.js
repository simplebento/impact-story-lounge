const STEPS = [
  { name: 'VR Safety',     desc: 'Review and accept guidelines.' },
  { name: 'About You',     desc: 'Answer a few questions.'       },
  { name: 'Story Results', desc: 'Your hand-picked story revealed.' },
  { name: 'Step Inside',   desc: 'Enter the Impact Story Lounge.' },
];

const LOGO_SVG = `
  <svg class="logo-icon-svg" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="19" stroke="#FF6B47" stroke-width="2.5"/>
    <circle cx="22" cy="22" r="11.5" stroke="#FF6B47" stroke-width="2"/>
    <circle cx="22" cy="22" r="5" fill="#FF6B47"/>
  </svg>`;

// activeStep: 0–3 = that step is active (prev are done), 4 = all done
function buildSidebar(containerId, activeStep) {
  const stepsHTML = STEPS.map((s, i) => {
    const isDone   = i < activeStep;
    const isActive = i === activeStep;
    return `
      <div class="step-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}">
        <div class="step-dot"></div>
        <div class="step-labels">
          <div class="step-name">${s.name}</div>
          <div class="step-desc">${s.desc}</div>
        </div>
      </div>`;
  }).join('');

  document.getElementById(containerId).innerHTML = `
    <div class="sidebar-logo">
      ${LOGO_SVG}
      <div class="logo-wordmark">
        <span class="logo-brand-name">Impact <span class="logo-vr">VR</span></span>
        <span class="logo-sub">Health Sharing</span>
      </div>
    </div>
    <div class="sidebar-title">LET'S CUSTOMIZE YOUR EXPERIENCE</div>
    <div class="sidebar-desc">Answer the following questions to help us customize a unique VR experience made for you.</div>
    <div class="stepper">${stepsHTML}</div>`;
}

// Build all sidebars on load
buildSidebar('sidebar-safety',  0);
buildSidebar('sidebar-q1',      1);
buildSidebar('sidebar-q2',      1);
buildSidebar('sidebar-q3',      1);
buildSidebar('sidebar-outcome', 2);
buildSidebar('sidebar-final',   4);

// Navigation
function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function restart() {
  document.querySelectorAll('.option-card.selected').forEach(c => c.classList.remove('selected'));
  ['next-q1', 'next-q2', 'next-q3'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) { btn.classList.remove('enabled'); btn.disabled = true; }
  });
  document.getElementById('medical-check').checked = false;
  goTo('screen-attractor');
}

// Card selection — enables Next button when a card is picked
function selectCard(card, group, nextBtnId) {
  document.querySelectorAll(`[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  const btn = document.getElementById(nextBtnId);
  if (btn) {
    btn.classList.add('enabled');
    btn.disabled = false;
  }
}
