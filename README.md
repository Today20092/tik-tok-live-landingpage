# Islamic Education — Resources for Seekers

Welcome to the **Islamic Education** landing page project! This is a modern, responsive, and visually appealing web application designed to provide educational resources for Islamic learning—focusing on Tawhid, the Five Pillars, the Quran, Hadith, and other primary sources. It is tailored for seekers, new Muslims, and curious learners.

## 🚀 What it is

This project is a static site built using a modern web development stack:
- **[Astro](https://astro.build/)** (v6) - The blazing-fast web framework for content-driven websites.
- **[React](https://react.dev/)** (v18) - For interactive UI components.
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) - For utility-first styling.
- **Vite** - For fast bundling and development.

The site features a beautiful dynamic design with an authentic Islamic geometric background (12-pointed star/dodecagram pattern), smooth theme toggling (Light/Dark mode), and beautifully styled interactive cards for links, FAQs, and YouTube embeds.

## 🔗 Live URL

The project is live at: [https://today20092.github.io/tik-tok-live-landingpage/](https://today20092.github.io/tik-tok-live-landingpage/)

## 🛠️ How to Access and Run Locally

To get this project up and running on your local machine, follow these steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js version 22.12.0 or higher installed.
- **npm**: Comes with Node.js.

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd tik-tok-live-landingpage
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:4321` (or the URL provided in your terminal) to view the site.

### Building for Production

To create an optimized production build:

```bash
npm run build
```
The built files will be generated in the `dist` directory, ready to be deployed to any static hosting provider (like Vercel, Netlify, Cloudflare Pages, or GitHub Pages).

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

- `src/pages/index.astro`: The main landing page.
- `src/components/`: Contains React components (`BioBlurb`, `LinkCard`, `FAQ`, `ThemeToggle`).
- `src/content/`: Contains the markdown/json files that power the content of the site (like FAQs, Links, and Bio).
- `src/styles/global.css`: Global styles and Tailwind imports.
- `public/`: Static assets like favicons.

## 🌙 Features

- **Responsive Design**: Looks great on mobile, tablet, and desktop.
- **Dark/Light Mode**: First-class support for both themes, toggled easily by the user and smoothly remembered.
- **Rich Embeds**: Native support for embedding YouTube videos and parsing rich Markdown content.
- **High Performance**: Built with Astro for zero-JS by default, hydrating only the interactive React components.
