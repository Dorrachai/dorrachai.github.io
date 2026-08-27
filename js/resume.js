/**
 * Resume Module
 * Renders work experience, education, certifications, and skills from data/resume.json
 */

const fallbackResumeData = {
  summary: "Full-Stack Software Engineer with expertise in building responsive web applications, robust cloud backend APIs, and developer productivity tools.",
  experience: [
    {
      role: "Senior Full-Stack Developer",
      company: "Tech Innovations Lab",
      period: "2024 - Present",
      location: "Remote",
      description: "Led frontend and backend development for high-traffic SaaS applications. Spearheaded transition to modern micro-frontends and CI/CD pipelines.",
      highlights: [
        "Architected scalable web apps handling 50k+ daily active users with 99.9% uptime",
        "Improved web performance and Core Web Vitals (LCP < 1.2s, INP < 100ms)",
        "Mentored junior developers and established automated testing standards"
      ]
    },
    {
      role: "Frontend / Web Developer",
      company: "Digital Solutions Studio",
      period: "2022 - 2024",
      location: "Hybrid",
      description: "Designed, developed, and maintained interactive user interfaces and client web portals across multiple industries.",
      highlights: [
        "Built 15+ bespoke client web applications using modern JavaScript/TypeScript and CSS systems",
        "Integrated REST and GraphQL APIs with real-time WebSocket state management",
        "Achieved 100/100 Google Lighthouse scores for accessibility and SEO"
      ]
    },
    {
      role: "Junior Software Engineer",
      company: "NextGen Software",
      period: "2021 - 2022",
      location: "On-site",
      description: "Developed backend microservices, database schemas, and unit test suites.",
      highlights: [
        "Implemented secure authentication and role-based access control (RBAC)",
        "Authored API documentation and automated end-to-end integration tests"
      ]
    }
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      institution: "University of Technology",
      period: "2017 - 2021",
      details: "Focus on Software Engineering, Distributed Systems, Algorithms, and Human-Computer Interaction."
    }
  ],
  certifications: [
    {
      name: "Google Cloud Certified Professional Cloud Developer",
      issuer: "Google Cloud",
      year: "2024"
    },
    {
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta",
      year: "2023"
    }
  ],
  skills: {
    "Frontend": ["JavaScript (ES6+)", "TypeScript", "HTML5 & Semantic Web", "CSS3 / Modern CSS", "Tailwind CSS", "React", "Vue.js", "Web Performance"],
    "Backend & APIs": ["Node.js", "Express", "Python", "REST APIs", "GraphQL", "PostgreSQL", "MongoDB", "Redis"],
    "Cloud & DevOps": ["Git & GitHub", "GitHub Actions", "Docker", "Google Cloud Platform", "Firebase", "Vercel / Netlify", "CI/CD"],
    "Tools & Practices": ["Agile / Scrum", "Test-Driven Development (Jest / Vitest)", "UI/UX Design (Figma)", "Accessibility (WCAG)", "SEO Optimization"]
  }
};

async function loadResumeData() {
  try {
    const response = await fetch('data/resume.json');
    if (!response.ok) throw new Error('Network response not ok');
    return await response.json();
  } catch (err) {
    console.info('Using embedded fallback for resume data:', err.message);
    return fallbackResumeData;
  }
}

export async function initResume() {
  const data = await loadResumeData();
  renderExperience(data.experience);
  renderEducation(data.education);
  renderCertifications(data.certifications);
  renderSkills(data.skills);
}

function renderExperience(experienceList) {
  const container = document.getElementById('experience-timeline');
  if (!container || !experienceList) return;

  container.innerHTML = experienceList.map(item => `
    <div class="timeline-item reveal-on-scroll">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${escapeHTML(item.period)}</div>
      <h3 class="timeline-role">${escapeHTML(item.role)}</h3>
      <div class="timeline-company">${escapeHTML(item.company)} • ${escapeHTML(item.location)}</div>
      <p class="timeline-desc">${escapeHTML(item.description)}</p>
      ${item.highlights && item.highlights.length > 0 ? `
        <ul class="timeline-highlights">
          ${item.highlights.map(h => `<li>${escapeHTML(h)}</li>`).join('')}
        </ul>
      ` : ''}
    </div>
  `).join('');
}

function renderEducation(educationList) {
  const container = document.getElementById('education-timeline');
  if (!container || !educationList) return;

  container.innerHTML = educationList.map(item => `
    <div class="timeline-item reveal-on-scroll">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${escapeHTML(item.period)}</div>
      <h3 class="timeline-role">${escapeHTML(item.degree)}</h3>
      <div class="timeline-company">${escapeHTML(item.institution)}</div>
      <p class="timeline-desc">${escapeHTML(item.details)}</p>
    </div>
  `).join('');
}

function renderCertifications(certList) {
  const container = document.getElementById('certifications-list');
  if (!container || !certList) return;

  container.innerHTML = certList.map(cert => `
    <div class="skill-chip" style="margin-bottom: 8px; width: 100%; justify-content: space-between;">
      <span><strong>${escapeHTML(cert.name)}</strong> (${escapeHTML(cert.issuer)})</span>
      <span style="color: var(--accent-primary); font-size: 0.8rem;">${escapeHTML(cert.year)}</span>
    </div>
  `).join('');
}

function renderSkills(skillsObj) {
  const container = document.getElementById('skills-container');
  if (!container || !skillsObj) return;

  const categories = Object.entries(skillsObj);
  container.innerHTML = categories.map(([category, skills]) => `
    <div class="skill-group reveal-on-scroll">
      <h4 class="skill-group-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        ${escapeHTML(category)}
      </h4>
      <div class="skill-chips-container">
        ${skills.map(skill => `<span class="skill-chip">${escapeHTML(skill)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
