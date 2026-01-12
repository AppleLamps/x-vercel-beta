# X.com Mock — Websites in Container

A faithful recreation of X.com's desktop interface showcasing a concept feature: **hosting static websites directly inside post media containers**.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ The Concept

This project demonstrates how X (formerly Twitter) could host entire static websites within the media container of posts. Instead of linking out to external sites, users can scroll through and interact with full websites directly in their feed.

**Demo features:**

- A main feed post containing an embedded SpaceX Lunar Voyager landing page
- Full scroll and interaction within the iframe container
- Seamless integration with the native X UI

## 🚀 Features

- **Pixel-Perfect UI**: Faithful recreation of X's desktop interface
- **Interactive Website Container**: `iframe` within post media allows embedded sites to be scrolled independently
- **Static Site Demo**: SpaceX Lunar Voyager product announcement as embedded content
- **Light Mode Design**: Clean, modern theme matching X's current design

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main layout
│   ├── globals.css           # Global styles
│   └── embedded-site/
│       └── page.tsx          # The embedded static website
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── Feed.tsx              # Main timeline with posts
│   ├── Post.tsx              # Post component with verified badges
│   ├── RightSidebar.tsx      # Search, trending, suggestions
│   └── WebsiteContainer.tsx  # iframe container for embedded sites
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🌐 Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/x-vercel)

Or deploy via CLI:

```bash
npm i -g vercel
vercel
```

## 📄 License

MIT
