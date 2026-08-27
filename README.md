# 🌟 Dorrachai's Developer Portfolio & Blog

A high-performance, modern, and fully responsive personal portfolio website featuring an interactive resume timeline, filterable project showcase, and built-in technical blog. 

Designed for **100% free hosting** on **GitHub Pages** with **zero build steps** and zero complex dependencies.

---

## ✨ Features

- 🌓 **Instant Dark/Light Mode**: Automatic system preference detection with toggle and `localStorage` persistence.
- ⚡ **Zero-Build Architecture**: Native ES6+ Modules, Semantic HTML5, and Modern CSS3 (Grid, Flexbox, Custom Properties, Glassmorphism).
- 📜 **Separated Content Layer (`data/`)**: Update your profile, resume, projects, and write blog posts by editing clean JSON files—no HTML modifications needed!
- 💼 **Interactive Resume & Skills**: Career timeline, education, certifications, and categorized skill badges.
- 🚀 **Filterable Projects Gallery**: Filter projects by category (AI, Full-Stack, Web Apps, Tools) with modal detail previews.
- ✍️ **Built-in Technical Blog**: Keyword search, tag filtering, and clean full-screen article reader modal with markdown rendering.
- 📱 **Mobile-First & Accessible**: Fully responsive layout with mobile drawer navigation, smooth scrolling, and WCAG-compliant design.
- 🤖 **GitHub Pages Automation**: Included GitHub Actions workflow (`.github/workflows/static.yml`) for continuous deployment.

---

## 📁 Project Structure

```
my-portfolio/
├── index.html              # Main webpage structure & SEO tags
├── css/
│   ├── main.css            # Design tokens, variables & typography
│   ├── layout.css          # Header, hero, navigation & responsive grids
│   ├── components.css      # Buttons, cards, modals, timeline & forms
│   └── animations.css      # Keyframes, scroll reveals & hover states
├── js/
│   ├── theme.js            # Light/Dark mode switcher
│   ├── main.js             # App bootstrap, typewriter effect & navigation
│   ├── resume.js           # Interactive resume & skills renderer
│   ├── projects.js         # Project gallery & modal popup handler
│   └── blog.js             # Blog articles, search, tag filters & reader modal
├── data/
│   ├── profile.json        # Bio, headline, contact & social links
│   ├── resume.json         # Experience, education, certifications & skills
│   ├── projects.json       # Project list, tags, GitHub & demo links
│   └── posts.json          # Blog articles with markdown content
├── assets/
│   └── images/             # Avatar & Favicon SVGs
├── .github/
│   └── workflows/
│       └── static.yml      # Automated GitHub Pages deployment
└── README.md
```

---

## 🚀 How to Enable Free Hosting on GitHub Pages

1. **Commit and push this folder to your repository:**
   ```bash
   git init
   git remote add origin https://github.com/Dorrachai/my-portfolio.git
   git add .
   git commit -m "Initial commit of portfolio website"
   git branch -M main
   git push -u origin main --force
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub: `https://github.com/Dorrachai/my-portfolio`
   - Click on **Settings** ➔ **Pages** (in the left sidebar).
   - Under **Build and deployment** ➔ **Source**:
     - Select **GitHub Actions** (recommended, it will use `.github/workflows/static.yml` automatically).
     - *Or* select **Deploy from a branch** ➔ select branch `main` and folder `/ (root)`.
   - Click **Save**.

3. **Your site will be live** at:
   `https://dorrachai.github.io/my-portfolio/`

---

## 📝 Customizing Your Content

You never have to touch complex HTML to update your portfolio! Simply edit the files in the `data/` directory:

### 1. Update Bio & Links (`data/profile.json`)
Edit your name, title, contact email, and social profiles.

### 2. Update Work History & Skills (`data/resume.json`)
Add or modify past roles, accomplishments, education, certifications, and technical skills.

### 3. Add or Edit Projects (`data/projects.json`)
Add new projects with tags, category (`ai`, `fullstack`, `web`, `tools`), GitHub URLs, and live demo links.

### 4. Publish Blog Posts (`data/posts.json`)
To publish a new article, add a new JSON object to `data/posts.json`:
```json
{
  "id": "my-new-post",
  "title": "How I Built My Portfolio",
  "date": "Aug 27, 2026",
  "readTime": "3 min read",
  "tags": ["Web Dev", "Tutorial"],
  "summary": "A quick walkthrough of my new zero-build portfolio website.",
  "content": "### Hello World\n\nWriting posts in markdown is super easy!"
}
```

---

## 💻 Local Preview

To preview the website locally on your computer:

* **Using Python:**
  ```bash
  python -m http.server 8000
  ```
  Open `http://localhost:8000` in your browser.

* **Using Node (npx):**
  ```bash
  npx serve .
  ```

* **Or simply open `index.html`** in any web browser!
