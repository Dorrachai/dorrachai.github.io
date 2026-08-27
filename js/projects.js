/**
 * Projects Showcase Module
 * Filterable projects grid with category filtering and interactive preview modal
 */

const fallbackProjectsData = [
  {
    id: "project-ai-dashboard",
    title: "Nova - AI Analytics & Insight Dashboard",
    description: "An intelligent analytics dashboard that processes telemetry and user interactions with real-time AI summarization and anomaly detection.",
    category: "ai",
    featured: true,
    tags: ["AI / LLM", "TypeScript", "React", "TailwindCSS", "FastAPI"],
    github: "https://github.com/Dorrachai",
    demo: "https://example.com/demo",
    highlights: [
      "Real-time streaming charts with WebSockets",
      "Automated insight generation powered by Gemini models",
      "Interactive query filtering and customizable widget layouts"
    ]
  },
  {
    id: "project-cloud-vault",
    title: "CloudVault - Secure File Storage & Sharing",
    description: "End-to-end encrypted cloud storage platform with instant shareable links, version history, and role-based workspace permissions.",
    category: "fullstack",
    featured: true,
    tags: ["Full-Stack", "Node.js", "PostgreSQL", "Google Cloud", "Web Crypto API"],
    github: "https://github.com/Dorrachai",
    demo: "https://example.com/demo",
    highlights: [
      "Client-side encryption using AES-GCM and Web Crypto API",
      "Chunked multi-part upload engine handling files up to 10GB",
      "Granular file permission management and expiring share links"
    ]
  },
  {
    id: "project-dev-flow",
    title: "DevFlow - CLI Task & Workflow Automator",
    description: "A developer-first command-line tool to automate project scaffolding, git hooks, environment configurations, and continuous delivery.",
    category: "tools",
    featured: true,
    tags: ["Developer Tooling", "Go / Rust", "CLI", "GitHub Actions", "Docker"],
    github: "https://github.com/Dorrachai",
    demo: "https://github.com/Dorrachai",
    highlights: [
      "Over 1,200+ stars on GitHub and active community contributions",
      "Cross-platform binary support for macOS, Linux, and Windows",
      "Extensible plugin architecture with YAML declarative configurations"
    ]
  },
  {
    id: "project-pulse-commerce",
    title: "Pulse - Modern Headless E-Commerce",
    description: "Blazing-fast e-commerce storefront with instantaneous page transitions, multi-currency support, and optimized checkout funnel.",
    category: "web",
    featured: false,
    tags: ["E-Commerce", "Next.js", "Stripe API", "GraphQL", "Tailwind CSS"],
    github: "https://github.com/Dorrachai",
    demo: "https://example.com/demo",
    highlights: [
      "Sub-second page load times with server-side caching",
      "Dynamic cart synchronization with optimistic UI updates",
      "Integrated Stripe Elements checkout with 3D Secure verification"
    ]
  },
  {
    id: "project-markdown-notes",
    title: "ZenNote - Offline-First Markdown Studio",
    description: "Distraction-free markdown editor with live split-screen preview, LaTeX math typesetting, mind map generation, and local sync.",
    category: "web",
    featured: false,
    tags: ["Web App", "JavaScript", "IndexedDB", "PWA", "KaTeX"],
    github: "https://github.com/Dorrachai",
    demo: "https://example.com/demo",
    highlights: [
      "100% offline functionality as an installable Progressive Web App",
      "Automatic bidirectional link graph visualization",
      "Instant export to PDF, HTML, and presentation slides"
    ]
  },
  {
    id: "project-rest-inspector",
    title: "RestLens - API Debugger & Mock Server",
    description: "Lightweight in-browser API client and mock server generator to simulate latency, error responses, and OAuth token flows.",
    category: "tools",
    featured: false,
    tags: ["Open Source", "TypeScript", "Service Workers", "Web Standards"],
    github: "https://github.com/Dorrachai",
    demo: "https://example.com/demo",
    highlights: [
      "Zero-install web client using Service Worker request interception",
      "Dynamic OpenAPI / Swagger specification import and generation",
      "Auto-generated mock response engines for rapid frontend prototyping"
    ]
  }
];

let allProjects = [];

async function loadProjectsData() {
  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error('Fetch failed');
    return await res.json();
  } catch (err) {
    console.info('Using fallback projects data');
    return fallbackProjectsData;
  }
}

export async function initProjects() {
  allProjects = await loadProjectsData();
  renderProjects(allProjects);
  setupProjectFilters();
  setupProjectModal();
}

function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No projects found matching this category.</p>`;
    return;
  }

  container.innerHTML = projects.map(proj => `
    <div class="project-card reveal-on-scroll" data-category="${proj.category}">
      <div class="project-banner">
        ${getProjectIcon(proj.category)}
        ${proj.featured ? '<span class="project-badge-corner">Featured</span>' : ''}
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHTML(proj.title)}</h3>
        <p class="project-desc">${escapeHTML(proj.description)}</p>
        <div class="project-tags">
          ${proj.tags.map(t => `<span class="project-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        <div class="project-footer">
          <button class="btn btn-sm btn-outline view-project-details-btn" data-project-id="${proj.id}">
            View Details
          </button>
          <div class="project-links">
            ${proj.github ? `
              <a href="${escapeHTML(proj.github)}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="GitHub Repository">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            ` : ''}
            ${proj.demo ? `
              <a href="${escapeHTML(proj.demo)}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="Live Demo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Rebind click handlers for modal
  container.querySelectorAll('.view-project-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      const project = allProjects.find(p => p.id === id);
      if (project) openProjectModal(project);
    });
  });
}

function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      if (filter === 'all') {
        renderProjects(allProjects);
      } else {
        const filtered = allProjects.filter(p => p.category === filter);
        renderProjects(filtered);
      }
    });
  });
}

function getProjectIcon(category) {
  switch (category) {
    case 'ai':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path><circle cx="12" cy="12" r="4"></circle></svg>`;
    case 'fullstack':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`;
    case 'tools':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
  }
}

function setupProjectModal() {
  const overlay = document.getElementById('project-modal-overlay');
  const closeBtn = document.getElementById('project-modal-close');
  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener('click', closeProjectModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

function openProjectModal(project) {
  const overlay = document.getElementById('project-modal-overlay');
  const title = document.getElementById('project-modal-title');
  const body = document.getElementById('project-modal-body');
  if (!overlay || !title || !body) return;

  title.textContent = project.title;
  body.innerHTML = `
    <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 20px;">${escapeHTML(project.description)}</p>
    
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
      ${project.tags.map(t => `<span class="skill-chip">${escapeHTML(t)}</span>`).join('')}
    </div>

    ${project.highlights && project.highlights.length > 0 ? `
      <h3 style="font-size: 1.15rem; margin-bottom: 12px; color: var(--text-primary);">Key Architectural Highlights</h3>
      <ul style="padding-left: 20px; margin-bottom: 28px; color: var(--text-secondary);">
        ${project.highlights.map(h => `<li style="margin-bottom: 8px;">${escapeHTML(h)}</li>`).join('')}
      </ul>
    ` : ''}

    <div style="display: flex; gap: 14px; padding-top: 16px; border-top: 1px solid var(--border-color);">
      ${project.github ? `
        <a href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View Source Code
        </a>
      ` : ''}
      ${project.demo ? `
        <a href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Live Demo
        </a>
      ` : ''}
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const overlay = document.getElementById('project-modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
