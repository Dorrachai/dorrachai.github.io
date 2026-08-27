/**
 * Blog Module
 * Renders blog articles, supports tag & search filtering, and opens full-screen reading modal.
 */

const fallbackPostsData = [
  {
    id: "mastering-modern-web-performance",
    title: "Mastering Core Web Vitals: How to Achieve Sub-Second Load Times",
    date: "Aug 20, 2026",
    readTime: "5 min read",
    tags: ["Performance", "Web Dev", "Architecture"],
    summary: "Practical techniques to optimize Largest Contentful Paint (LCP) and Interaction to Next Paint (INP) without complicating your stack.",
    content: `### Introduction

Web performance isn't just a vanity metric—it directly impacts user engagement, SEO rankings, and conversion rates. In this post, we explore practical ways to make web apps blazing fast without over-engineering.

### 1. Optimize the Critical Rendering Path

The most frequent bottleneck in modern websites is excessive JavaScript execution blocking the main thread.

* **Minimize render-blocking CSS:** In-line critical styles and defer non-critical style sheets.
* **Modern image formats:** Always serve images in AVIF or WebP formats with explicit width and height dimensions to eliminate layout shifts (CLS).
* **Fetch Priority:** Use \`<link rel="preload" fetchpriority="high">\` for hero images and primary fonts.

\`\`\`html
<!-- High-priority hero image preloading -->
<link rel="preload" as="image" href="assets/hero.webp" fetchpriority="high">
\`\`\`

### 2. Taming INP (Interaction to Next Paint)

Interaction to Next Paint measures overall page responsiveness throughout the entire user lifecycle. Avoid running long-running tasks on the main thread during click or input handlers.

* Break long tasks using scheduler.yield() or requestAnimationFrame().
* Offload CPU-heavy parsing or calculations to Web Workers.

### Conclusion

By keeping your dependencies lightweight, optimizing assets proactively, and respecting the browser's main thread, you can consistently achieve 95+ performance scores.`
  },
  {
    id: "zero-build-static-sites-power",
    title: "The Renaissance of Zero-Build Static Websites",
    date: "Jul 15, 2026",
    readTime: "4 min read",
    tags: ["Frontend", "JavaScript", "Minimalism"],
    summary: "Why vanilla modern HTML5, CSS custom properties, and native ES modules are more capable than ever for portfolios and documentation.",
    content: `### The Shift Towards Simplicity

For years, the standard approach for any web project—even a simple blog or portfolio—was setting up massive bundlers, complex dependency trees, and thousands of node_modules packages.

Today, modern web standards have evolved to provide out-of-the-box superpowers that previously required third-party libraries.

### What Native Web Standards Give Us Today

1. **CSS Custom Properties & Nesting:** Native design tokens and clean hierarchy without Sass or PostCSS.
2. **CSS Grid & Container Queries:** Truly responsive component-level styling.
3. **Native ES Modules (import/export):** Modular, structured JavaScript directly in all evergreen browsers.
4. **Fetch & Web Storage APIs:** Lightweight state persistence and asynchronous data loading.

\`\`\`javascript
// Modern native module loading - zero bundler needed!
import { loadData } from './modules/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  renderDashboard(data);
});
\`\`\`

### Benefits of Going Zero-Build on GitHub Pages

* **Zero Deployment Friction:** Push code to Git, and your changes are live within seconds.
* **No Broken CI Dependencies:** No npm audit vulnerabilities or broken build scripts 2 years later.
* **Near-Instant Load Times:** Browsers download raw, clean assets directly from CDNs.

Simplicity isn't a compromise—it's a deliberate design advantage.`
  },
  {
    id: "building-effective-ai-developer-agents",
    title: "Architecting Autonomous AI Agents: Patterns and Lessons Learned",
    date: "Jun 02, 2026",
    readTime: "6 min read",
    tags: ["AI", "Architecture", "Engineering"],
    summary: "Key architectural principles for building reliable, agentic AI workflows with structured tool calling and reactive event loops.",
    content: `### Introduction to Agentic Workflows

Traditional LLM integrations rely on simple prompt-and-response mechanisms. Autonomous AI developer agents, however, operate in interactive feedback loops: observing environments, calling tools, validating results, and correcting course dynamically.

### Core Tenets of Robust Agent Systems

* **Deterministic Tool Signatures:** Provide strict JSON schemas and descriptive tool summaries to minimize ambiguity.
* **Self-Healing Error Handling:** When a tool call or build fails, feed the compiler output and stack trace directly back into the agent context.
* **Planning & Verification Separation:** Separate the research/planning phase from the execution phase to avoid premature destructive edits.

\`\`\`
[User Request] ➔ [Research & Plan] ➔ [User Approval] ➔ [Execute & Self-Heal] ➔ [Verify]
\`\`\`

### The Role of Context Management

Context windows are finite resources. Storing structured transcripts and utilizing subagents for deep research allows the primary orchestrator to maintain focus without getting overwhelmed by noisy logs.`
  }
];

let allPosts = [];

async function loadPostsData() {
  try {
    const res = await fetch('data/posts.json');
    if (!res.ok) throw new Error('Fetch failed');
    return await res.json();
  } catch (err) {
    console.info('Using fallback posts data');
    return fallbackPostsData;
  }
}

export async function initBlog() {
  allPosts = await loadPostsData();
  renderBlogPosts(allPosts);
  setupBlogSearchAndFilter();
  setupBlogModal();
}

function renderBlogPosts(posts) {
  const container = document.getElementById('blog-grid');
  if (!container) return;

  if (posts.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No blog articles found matching your query.</p>`;
    return;
  }

  container.innerHTML = posts.map(post => `
    <article class="blog-card reveal-on-scroll" data-post-id="${post.id}">
      <div class="blog-meta">
        <span class="blog-tag">${escapeHTML(post.tags[0] || 'Article')}</span>
        <span>•</span>
        <time datetime="${escapeHTML(post.date)}">${escapeHTML(post.date)}</time>
        <span>•</span>
        <span>${escapeHTML(post.readTime)}</span>
      </div>
      <h3 class="blog-title">${escapeHTML(post.title)}</h3>
      <p class="blog-summary">${escapeHTML(post.summary)}</p>
      <div class="blog-read-more">
        <span>Read Full Article</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-post-id');
      const post = allPosts.find(p => p.id === id);
      if (post) openBlogModal(post);
    });
  });
}

function setupBlogSearchAndFilter() {
  const searchInput = document.getElementById('blog-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderBlogPosts(allPosts);
      return;
    }

    const filtered = allPosts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some(t => t.toLowerCase().includes(query))
    );
    renderBlogPosts(filtered);
  });
}

function setupBlogModal() {
  const overlay = document.getElementById('blog-modal-overlay');
  const closeBtn = document.getElementById('blog-modal-close');
  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener('click', closeBlogModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBlogModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeBlogModal();
    }
  });
}

function openBlogModal(post) {
  const overlay = document.getElementById('blog-modal-overlay');
  const title = document.getElementById('blog-modal-title');
  const body = document.getElementById('blog-modal-body');
  if (!overlay || !title || !body) return;

  title.textContent = post.title;
  
  const parsedHtml = parseSimpleMarkdown(post.content);
  body.innerHTML = `
    <div style="display: flex; gap: 12px; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
      <span>Published: <strong>${escapeHTML(post.date)}</strong></span>
      <span>•</span>
      <span>${escapeHTML(post.readTime)}</span>
      <span>•</span>
      <span>Tags: ${post.tags.map(t => `<span class="skill-chip" style="font-size: 0.75rem; padding: 2px 6px;">${escapeHTML(t)}</span>`).join(' ')}</span>
    </div>
    <div class="article-content">
      ${parsedHtml}
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
  const overlay = document.getElementById('blog-modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Lightweight Markdown Parser for headings, bold, code blocks, lists, paragraphs
 */
function parseSimpleMarkdown(md) {
  if (!md) return '';
  let html = md;

  // Code blocks ```lang\ncode\n```
  html = html.replace(/```([\s\S]*?)```/g, (match, p1) => {
    return `<pre><code>${escapeHTML(p1.trim())}</code></pre>`;
  });

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, (match, p1) => {
    return `<code>${escapeHTML(p1)}</code>`;
  });

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Unordered list items
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
  // Clean redundant nested uls
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // Ordered list items
  html = html.replace(/^\d+\.\s+(.*$)/gim, '<li>$1</li>');

  // Paragraphs
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs.map(p => {
    p = p.trim();
    if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<ul') || p.startsWith('<ol')) {
      return p;
    }
    return `<p>${p}</p>`;
  }).join('');

  return html;
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
