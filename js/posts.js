// js/posts.js
// Callsign: JENKO — Log Entries
//
// POST SCHEMA:
//   id            {string}   Unique slug e.g. "2026-02-23-short-title"
//   title         {string}   Post headline
//   date          {string}   ISO date "YYYY-MM-DD"
//   mood          {string}   One-word status e.g. "Focused", "Wrecked", "Locked In"
//   tags          {string[]} Array of lowercase tag words
//   summary       {string}   One-sentence teaser shown in lists
//   content       {string}   Full HTML body
//   featuredMedia {object[]} Optional: [{ type:"image"|"video", src:"...", caption:"..." }]
//
// ODOMETER FIELDS (all optional, numbers):
//   km            {number}   Kilometres driven this entry
//   nights        {number}   Nights camped this entry
//   coffee        {number}   Coffees consumed this entry (honour system)

window.POSTS = [
  {
    id:      "2026-02-23-first-day",
    title:   "First Entry — Kicking Off the Daily Log",
    date:    "2026-02-23",
    mood:    "Focused",
    tags:    ["daily", "life", "routine"],
    summary: "Starting the daily blog. What I'm building, what I'm learning, and what today looked like.",
    km:      0,
    nights:  0,
    coffee:  4,
    content: `
      <p>Welcome to the daily log.</p>
      <p>Today I set up this site so I can track what I'm doing each day without overthinking it.</p>
      <p>The goal is simple: show up, record the day, and stack progress.</p>
      <h3>Highlights</h3>
      <ul>
        <li>Built the site layout (Home, Logs, Media, About)</li>
        <li>Set up a simple post system for GitHub Pages</li>
        <li>Added a featured media gallery connected to posts</li>
      </ul>
    `,
    featuredMedia: [
      {
        type:    "image",
        src:     "images/sample-1.jpg",
        caption: "A photo from today (placeholder)."
      }
    ]
  }
];