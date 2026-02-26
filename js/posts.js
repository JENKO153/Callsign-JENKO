// js/posts.js
// Callsign: JENKO — Log Entries
//
// ─────────────────────────────────────────────────────────────
// POST SCHEMA
// ─────────────────────────────────────────────────────────────
//   id            {string}   Unique slug — use "YYYY-MM-DD-short-title" format
//   title         {string}   Post headline
//   date          {string}   ISO date "YYYY-MM-DD"
//   mood          {string}   One-word status e.g. "Focused", "Wrecked", "Locked In"
//   tags          {string[]} Lowercase tag words e.g. ["4wd", "camping", "fraser"]
//   summary       {string}   One-sentence teaser shown on the blog list and home page
//   content       {string}   Full HTML body of the post
//
// ─────────────────────────────────────────────────────────────
// ODOMETER FIELDS (all optional — leave out or set to 0)
// ─────────────────────────────────────────────────────────────
//   km            {number}   Kilometres driven this entry
//   nights        {number}   Nights camped this entry
//   coffee        {number}   Coffees consumed (honour system)
//
// ─────────────────────────────────────────────────────────────
// ADDING MEDIA TO A POST
// ─────────────────────────────────────────────────────────────
// Add a featuredMedia array to any post to attach photos or videos.
// They'll appear in a grid at the bottom of the post AND in the Media page.
//
// IMAGES:
//   featuredMedia: [
//     { type: "image", src: "images/your-photo.jpg", caption: "Optional caption." },
//     { type: "image", src: "images/another-photo.jpg", caption: "" },
//   ]
//
// VIDEOS:
//   featuredMedia: [
//     { type: "video", src: "images/your-video.mp4", caption: "Optional caption." },
//   ]
//
// MIX OF BOTH:
//   featuredMedia: [
//     { type: "image", src: "images/camp-setup.jpg",  caption: "Camp for the night." },
//     { type: "video", src: "images/track-run.mp4",   caption: "That descent was spicy." },
//     { type: "image", src: "images/sunrise.jpg",     caption: "" },
//   ]
//
// Put your image/video files in the images/ folder and reference them as shown above.
// ─────────────────────────────────────────────────────────────

window.POSTS = [
  {
    id:      "2026-02-26-who-is-jenko",
    title:   "Who Is Jenko — And Why Are We Here?",
    date:    "2026-02-26",
    mood:    "Focused",
    tags:    ["intro", "life", "about"],
    summary: "The obligatory intro post. Who I am, what this is, and why Fraser Island is already causing me stress.",
    km:      0,
    nights:  0,
    coffee:  3,
    content: `
      <p>
        Right. Intro post. Let's get this over with.
      </p>

      <p>
        Name's Jenko. Just an average bloke from Queensland who spends a probably
        unreasonable amount of time thinking about where to go next, how to justify
        the next gear purchase, and whether the amount of coffee I drink is technically
        a medical issue. The answer to that last one is yes, and I've chosen to ignore it.
      </p>

      <p>
        Background-wise — ex-military, which explains the callsign, the tendency to
        over-document everything, and the fact that I still feel slightly uncomfortable
        not having a plan. Civilian life is going fine. Thanks for asking.
      </p>

      <h3>So what even is this?</h3>

      <p>
        This is a log. Not a travel blog where everything looks perfect and nobody ever
        gets bogged. Not a gear review channel where I pretend I bought something because
        I researched it and not because it looked good on sale at 11pm. Just an honest
        record of what I'm up to — trips, fishing, camping, the gym when I can be
        bothered, road trips, and whatever random side quests appear between all of that.
      </p>

      <p>
        If something goes wrong — and it will — that'll be in here too. Probably with
        more detail than strictly necessary, because apparently I process things by
        writing them down. Don't psychoanalyse that.
      </p>

      <h3>What's actually coming up</h3>

      <p>
        The big one for mid-year is Fraser Island — K'gari. It's been sitting on the
        list long enough that it's starting to feel embarrassing, so this is the year
        it actually happens. Proper prep, proper planning, the whole deal. I'm already
        slightly stressed about it — mainly because I'm originally from Victoria, so it's
        mostly been bush bashing rather than beach driving. Sand driving is a different
        game entirely and I refuse to be that guy getting pulled out on his first run up
        the beach.
      </p>

      <p>
        Between now and then I'm working through smaller spots around Queensland —
        shaking out gear, finding good campsites, putting kilometres on the clock, and
        figuring out which of my "essential" purchases were actually essential.
        Spoiler: probably not all of them.
      </p>

      <p>
        QLD is genuinely ridiculous for how much there is to explore and I feel like
        I've barely touched it. That's the mission for the year — change that.
      </p>

      <h3>Why make it public?</h3>

      <p>
        Honestly? Because the best trip intel I've ever gotten came from some random
        bloke's blog post that hadn't been updated since 2014 but still had exactly the
        information I needed. If this ends up being that for someone down the track —
        good. If not, at least I'll remember where I've been instead of just vaguely
        gesturing at Queensland and saying "yeah I went somewhere around there once."
      </p>

      <p>
        That's about it. No big pitch, no merch link, no Patreon. Just a bloke, a 4WD,
        and an unhinged coffee habit. There will also be a TikTok and possibly an
        Instagram at some point — once I figure out how to make vertical video not look
        terrible.
      </p>

      <p>
        Stick around. It'll be worth it. Probably.
      </p>
    `
  }
];