// js/posts.js
window.POSTS = [
  {
    id: "2026-02-23-first-day",
    title: "First Entry — Kicking Off the Daily Log",
    date: "2026-02-23",
    mood: "Focused",
    tags: ["daily", "life", "routine"],
    summary: "Starting the daily blog. What I’m building, what I’m learning, and what today looked like.",
    content: `
      <p>Welcome to the daily log.</p>
      <p>Today I set up this site so I can track what I’m doing each day without overthinking it.</p>
      <p>The goal is simple: show up, record the day, and stack progress.</p>
      <h3>Highlights</h3>
      <ul>
        <li>Built the site layout (Home, Blog, Media, About)</li>
        <li>Set up a simple post system for GitHub Pages</li>
        <li>Added a featured media gallery connected to posts</li>
      </ul>
    `,
    featuredMedia: [
      { type: "image", src: "images/sample-1.jpg", caption: "A photo from today (placeholder)." }
    ]
  }
];