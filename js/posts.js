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
      { type: "image", src: "assets/media/sample-1.jpg", caption: "A photo from today (placeholder)." },
      { type: "video", src: "assets/media/sample-clip.mp4", caption: "A short clip (placeholder)." }
    ]
  },
  {
    id: "2026-02-22-training-day",
    title: "Training Day — Small Wins Add Up",
    date: "2026-02-22",
    mood: "Motivated",
    tags: ["training", "mindset"],
    summary: "Kept it simple today. Training, effort, and keeping momentum.",
    content: `
      <p>Nothing crazy — just a proper day done properly.</p>
      <p>I’m trying to build a rhythm where consistency is the win.</p>
    `,
    featuredMedia: [
      { type: "image", src: "assets/media/sample-2.jpg", caption: "Progress shot (placeholder)." }
    ]
  }
];