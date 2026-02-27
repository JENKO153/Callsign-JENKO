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
    id:      "2026-02-27-rainbow-beach-planning",
    title:   "Rainbow Beach — Planning Phase",
    date:    "2026-02-27",
    mood:    "Organised",
    tags:    ["4wd", "camping", "rainbow-beach", "gear", "planning"],
    summary: "The boys needed a trip, Bribie was fully booked, and somehow I ended up buying a portable toilet. Here's how Rainbow Beach came together.",
    km:      0,
    nights:  0,
    coffee:  5,
    content: `
      <p>
        It always starts the same way. The boys have been sitting around too long,
        everyone's climbing the walls, and someone fires off a "trip?" in the group chat.
        Two seconds later it's unanimous. No debate, no deliberation, no checking of
        calendars — just yes. Details to follow. We'll figure it out.
      </p>

      <p>
        First pick was Bribie Island. Close, easy, and familiar enough that there's not
        much that can go badly wrong. Except every campsite was fully booked. Of course
        they were. So my partner stepped in and threw Rainbow Beach on the table, and
        given that she grew up in Queensland and knows these places far better than I do,
        I wasn't going to argue. She said it goes alright. That's a solid enough
        endorsement for me. We'll find out soon enough whether she was right — or just
        trying to get us all out of the house for a few days.
      </p>

      <h3>QLD camping is a completely different beast</h3>

      <p>
        Quick bit of context for anyone else who made the move up from down south —
        Queensland camping does not operate like Victorian camping. Not even close.
      </p>

      <p>
        I grew up camping in Strathbogie in central Victoria. Bush bashing, river camps,
        bits of the High Country here and there. The whole system was beautifully simple:
        drive in, find a spot that looks good, set up camp. No bookings, no permits, no
        fees, no forms. If the spot was full you just drove a bit further in and found
        somewhere else. Total freedom, zero admin, and it cost you nothing except fuel
        and whatever food you brought.
      </p>

      <p>
        Queensland has a booking system, a fee for the campsite, and then on top of that
        a separate vehicle permit just to drive on the beach. Every vehicle, every trip,
        non-negotiable. Show up without both sorted and you're simply not getting in.
        There's no talking your way around it and there's no "just this once."
      </p>

      <p>
        Look, I get it. These places would get absolutely demolished without some kind of
        system in place — I've seen what unmanaged spots look like and it's not pretty.
        The permits probably do more good than I want to admit. I still don't love paying
        to go camping when I used to do it specifically to save money, but here we are.
        Pay to play. I've made my peace with it. Mostly.
      </p>

      <h3>Getting it all locked in</h3>

      <p>
        After a bit of research and some advice from people who've actually been there,
        we booked Zone 3 — by most accounts one of the better spots on the beach.
        There are apparently some seriously good sites further down the island but Zone 3
        came highly recommended and I wasn't going to second guess someone who actually
        knows the place. Car permits sorted for everyone in the group. All good on that front.
      </p>

      <p>
        We'll be entering from the southern end near Noosa, which puts us at roughly 10km
        of beach driving before we even reach camp. That'll be my first proper run on sand
        and I'm equal parts excited and aware that there are roughly a hundred ways to
        stuff it up before we even get the tents out. Tyre pressures will be checked.
        Then checked again. Then probably checked one more time just to be safe.
      </p>

      <p>
        Weather is currently looking pretty average for a beach trip, which is not exactly
        what you want to see when you're planning four days out in the open. But that's
        camping — the forecast is always either completely wrong or delivered as bad news
        just early enough to stress you out without being close enough to actually mean
        anything. We'll see what turns up on the day. Worst case we sit in camp, eat well,
        and call it a relaxing trip.
      </p>

      <h3>Fishing</h3>

      <p>
        Fishing is absolutely on the cards — it wouldn't be a beach trip without it.
        I don't have a dedicated surf setup yet, no long rod and heavy sinkers for
        punching baits out past the break, but I've got everything sorted for the smaller
        species closer in. Dart, bream, whiting — the kind of fishing where you're not
        expecting to land anything massive but you're still pretty stoked when you do.
        First beach trip, so keeping expectations realistic. If I come home with a feed
        I'll call it a success. If I don't, I'll blame the weather.
      </p>

      <h3>The kit overhaul</h3>

      <p>
        Right. This is the part where I come clean about the spending. I hadn't set
        myself up properly for this style of camping, and I used the trip as both the
        motivation and the justification to sort everything out in one go. All of it
        needed doing — some of it just needed a deadline to actually happen. The credit
        card took a hit but the kit is in good shape now and that's what matters.
        Mostly. The credit card is fine. Probably.
      </p>

      <p><strong>Battery setup</strong></p>
      <p>
        This one came out of a lesson I learned the hard way on the last trip. I'd bought
        a 12V camping air fryer without actually stopping to check whether my battery box
        could handle the draw. It could not. The battery I had was sized purely to run
        the fridge and nothing else — the air fryer hit it like a freight train and that
        was the end of that. Cold food, no hot lunch, and a very avoidable situation
        that was entirely my own fault for not thinking it through when I first bought
        the setup.
      </p>
      <p>
        Not making that mistake again. Went with a HardKorr Heavy Duty Battery Box Pro
        with a new 100Ah lithium battery. Fridge, air fryer, charging, lights, whatever
        else comes up — it'll handle all of it comfortably. Sorted properly this time
        and I won't have to think about it again.
      </p>

      <p><strong>Recovery gear</strong></p>
      <p>
        Picked up a full recovery bundle from BCF — snatch strap, shackles, tree trunk
        protector, the works. The bundle price came in at almost less than buying just
        the snatch strap on its own, which is either a legitimately great deal or says
        something about retail margins that I don't want to look too closely at. Either
        way it's all in the back of the car now and that's what counts. Going beach
        driving without recovery gear isn't a risk worth taking — especially on a first
        run when you're still figuring out the sand.
      </p>

      <p><strong>MaxTrax</strong></p>
      <p>
        Sand. Bought MaxTrax. If you need more explanation than that, I don't know
        what to tell you.
      </p>

      <p><strong>First aid kit</strong></p>
      <p>
        I've got heavier medical supplies sorted from my time in but
        somehow never got around to stocking the basics — bandaids, dressings, the
        everyday stuff you'd actually reach for most of the time. Picked up a proper
        vehicle first aid kit from Anaconda. No excuses now if someone does something
        stupid on the beach. Which, knowing the group, is a genuine possibility.
      </p>

      <p><strong>The portable toilet</strong></p>
      <p>
        I want it on the record that I did not want to buy this. It was not a purchase
        I made with any enthusiasm whatsoever. But Rainbow Beach requires a fully sealed,
        self-contained toilet as a condition of camping — you cannot just wander off into
        the scrub and handle things the old fashioned way — so I had absolutely no choice
        in the matter. It is now in the kit. It will be used. And we are never, under any
        circumstances, discussing it further in this or any future post.
      </p>

      <h3>Where things stand</h3>

      <p>
        Campsite booked. Permits sorted for every vehicle. Recovery kit packed and ready.
        Battery setup properly upgraded. MaxTrax loaded. First aid kit fully stocked.
        Fishing gear sorted for the conditions. And yes, the you-know-what is in the kit
        and we've all agreed not to make a big deal of it.
      </p>

      <p>
        Four days of beach driving, fishing, good food, and finding out what QLD camping
        is actually all about. Planning phase is done — the next post will be the trip
        itself, for better or worse.
      </p>

      <p>
        Here's hoping the weather pulls its head in.
      </p>
    `
  },
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