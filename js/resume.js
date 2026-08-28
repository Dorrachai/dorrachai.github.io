/**
 * Resume Module
 * Renders work experience, education, certifications, and skills from data/resume.json
 */

const fallbackResumeData = {
  summary: "Software Engineer with a B.Sc. in Software Engineering from Blekinge Institute of Technology (BTH). Specializing in Test-Driven Development (TDD), prompt engineering, and modern full-stack web application development.",
  experience: [
    {
      role: "Software Engineering Researcher & Degree Project",
      company: "Blekinge Institute of Technology (BTH)",
      period: "2024 - 2025",
      location: "Karlskrona, Sweden",
      description: "Authored the research thesis 'Test-Driven Development: Exploring Prompt Engineering' investigating how AI-assisted prompt design improves TDD adoption and automated test creation.",
      highlights: [
        "Conducted empirical research on prompt engineering strategies for AI-assisted Test-Driven Development",
        "Evaluated test suite quality, code correctness, and developer productivity when integrating LLMs into the TDD cycle",
        "Archived thesis research on the DiVA academic portal"
      ]
    },
    {
      role: "Board Member & Student Representative",
      company: "Blekinge Studentkår (Student Union)",
      period: "2023 - 2024",
      location: "Karlskrona, Sweden",
      description: "Elected student representative managing student governance, university board communication, and student welfare initiatives.",
      highlights: [
        "Represented software engineering and technical students in university board meetings and quality councils",
        "Coordinated academic advocacy, event planning, and student body operational strategies",
        "Collaborated with faculty to improve curriculum feedback loops"
      ]
    },
    {
      role: "Full-Stack Software Developer",
      company: "Independent & Open Source Projects",
      period: "2022 - Present",
      location: "Sweden / Remote",
      description: "Architected and built web applications, developer CLI tooling, and minimal offline-first software.",
      highlights: [
        "Developed full-stack web applications with modern TypeScript, React, and Node.js backend services",
        "Applied rigorous unit testing and automated CI/CD workflows across projects",
        "Built zero-build, accessible static web tools emphasizing performance and web standards"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "Blekinge Institute of Technology (BTH)",
      period: "2021 - 2025",
      details: "Specialization in Software Engineering, Test-Driven Development (TDD), Distributed Systems, Algorithms, and Human-Computer Interaction."
    }
  ],
  certifications: [
    {
      name: "Thesis Publication: Test-Driven Development & Prompt Engineering",
      issuer: "DiVA Academic Archive / BTH",
      year: "2025"
    }
  ],
  skills: {
    "Core Engineering": [
      "Test-Driven Development (TDD)", "Prompt Engineering & LLMs", "Unit & Integration Testing (Jest, Vitest)", "Clean Architecture", "Agile & Scrum"
    ],
    "Frontend": [
      "TypeScript", "JavaScript (ES6+)", "React", "HTML5 & Semantic Web", "Modern CSS & Tailwind", "Web Performance"
    ],
    "Backend & Tools": [
      "Node.js", "Express", "Python", "REST APIs", "Git & GitHub", "Docker", "CI/CD Workflows"
    ],
    "Communication & Research": [
      "Empirical Research", "Technical Writing", "Student Governance & Leadership", "Cross-functional Collaboration"
    ]
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
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
