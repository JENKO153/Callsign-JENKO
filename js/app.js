// js/app.js — Callsign: JENKO

(function () {
  "use strict";

  /* ============================================================
     SVG ICON LIBRARY
     ============================================================ */
  var ICONS = {
    compass: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" style="display:none"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/><circle cx="12" cy="12" r="1"/></svg>`,
    tent:    `<svg viewBox="0 0 24 24"><path d="M3 20 12 4l9 16H3z"/><path d="m9 20 3-8 3 8"/></svg>`,
    jerryCan:`<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="15" rx="2"/><path d="M9 6V4h6v2"/><path d="M10 11h4"/><path d="M10 14h4"/><rect x="10" y="3" width="4" height="2" rx="1"/></svg>`,
    tracks:  `<svg viewBox="0 0 24 24"><rect x="2"  y="4"  width="4" height="6" rx="1"/><rect x="2"  y="14" width="4" height="6" rx="1"/><rect x="18" y="4"  width="4" height="6" rx="1"/><rect x="18" y="14" width="4" height="6" rx="1"/><path d="M6 7h12M6 17h12M6 12h12"/></svg>`,
    log:     `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9"  x2="8" y2="9"/></svg>`,
    media:   `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    about:   `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  };

  function icon(name) {
    return `<span class="fieldIcon">${ICONS[name] || ""}</span>`;
  }

  /* ============================================================
     MISSION PATCH SVG
     ============================================================ */
  var MISSION_PATCH = `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer stitching ring -->
      <circle cx="60" cy="60" r="57" fill="none" stroke="#7a1f2a" stroke-width="1.5"
        stroke-dasharray="3.5 3.5" opacity="0.6"/>
      <!-- Background -->
      <circle cx="60" cy="60" r="54" fill="#0f141a"/>
      <!-- Inner border -->
      <circle cx="60" cy="60" r="50" fill="none" stroke="#7a1f2a" stroke-width="1.5" opacity="0.8"/>
      <!-- Grid lines -->
      <g stroke="rgba(122,31,42,.12)" stroke-width="0.5">
        <line x1="10" y1="60" x2="110" y2="60"/>
        <line x1="60" y1="10" x2="60"  y2="110"/>
        <line x1="24" y1="24" x2="96"  y2="96"/>
        <line x1="96" y1="24" x2="24"  y2="96"/>
      </g>
      <!-- Crosshair -->
      <circle cx="60" cy="60" r="18" fill="none" stroke="rgba(122,31,42,.4)" stroke-width="1"/>
      <circle cx="60" cy="60" r="4"  fill="#7a1f2a" opacity="0.9"/>
      <line x1="60" y1="42" x2="60" y2="54" stroke="#7a1f2a" stroke-width="1.5" opacity="0.8"/>
      <line x1="60" y1="66" x2="60" y2="78" stroke="#7a1f2a" stroke-width="1.5" opacity="0.8"/>
      <line x1="42" y1="60" x2="54" y2="60" stroke="#7a1f2a" stroke-width="1.5" opacity="0.8"/>
      <line x1="66" y1="60" x2="78" y2="60" stroke="#7a1f2a" stroke-width="1.5" opacity="0.8"/>
      <!-- Top arc text path -->
      <path id="topArc" d="M 18,60 A 42,42 0 0,1 102,60" fill="none"/>
      <text font-family="ui-monospace,monospace" font-size="8" fill="#e8d5d7"
            font-weight="700" letter-spacing="3" text-anchor="middle">
        <textPath href="#topArc" startOffset="50%">CALLSIGN : JENKO</textPath>
      </text>
      <!-- Bottom arc text path -->
      <path id="botArc" d="M 18,60 A 42,42 0 0,0 102,60" fill="none"/>
      <text font-family="ui-monospace,monospace" font-size="7" fill="rgba(232,213,215,.55)"
            font-weight="600" letter-spacing="2.5" text-anchor="middle">
        <textPath href="#botArc" startOffset="50%">DAILY LOG // SITREP</textPath>
      </text>
      <!-- Corner marks -->
      <g stroke="#7a1f2a" stroke-width="1.2" opacity="0.5">
        <path d="M30 16 L30 22 L36 22"/>
        <path d="M90 16 L90 22 L84 22"/>
        <path d="M30 104 L30 98 L36 98"/>
        <path d="M90 104 L90 98 L84 98"/>
      </g>
    </svg>`;

  /* ============================================================
     UTILITIES
     ============================================================ */
  function getSortedPosts() {
    return [...(window.POSTS || [])].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, {
      year: "numeric", month: "long", day: "numeric"
    });
  }

  function readTime(html) {
    const text  = html.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200)) + " min read";
  }

  function tagBadge(t) {
    return `<span class="tag">#${t}</span>`;
  }

  function currentPage() {
    return location.pathname.split("/").pop() || "index.html";
  }

  /* ============================================================
     NAV
     ============================================================ */
  function initNav() {
    const path = currentPage();
    document.querySelectorAll("[data-nav]").forEach(a => {
      if (a.getAttribute("href") === path) a.classList.add("active");
    });

    const toggle     = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (toggle && mobileMenu) {
      toggle.addEventListener("click", () => {
        const open = mobileMenu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      mobileMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ============================================================
     SCROLL-TO-TOP
     ============================================================ */
  function initScrollTop() {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     HERO BANNER
     ============================================================ */
  function initHeroBanner() {
    const el = document.getElementById("heroBanner");
    if (!el) return;
    const src = el.dataset.src;
    if (src) {
      el.innerHTML = `<img src="${src}" alt="Hero banner">`;
    } else {
      el.innerHTML = `
        <div class="heroBannerPlaceholder">
          <div class="placeholderLabel">// ADD data-src="images/your-photo.jpg" TO USE YOUR OWN IMAGE //</div>
        </div>`;
    }
  }

  /* ============================================================
     READING PROGRESS BAR
     ============================================================ */
  function initReadingProgress() {
    const bar = document.getElementById("readProgressFill");
    if (!bar) return;
    let maxPct = 0;
    function update() {
      const doc   = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) return;
      const pct = (window.scrollY / total) * 100;
      if (pct > maxPct) {
        maxPct = pct;
        bar.style.width = Math.min(maxPct, 100).toFixed(2) + "%";
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ============================================================
     MISSION PATCH
     ============================================================ */
  function initMissionPatch() {
    document.querySelectorAll("[data-mission-patch]").forEach(el => {
      el.innerHTML = MISSION_PATCH;
    });
  }

  /* ============================================================
     ODOMETER COUNTERS
     ============================================================ */
  function initOdometer() {
    const el = document.getElementById("odometerGrid");
    if (!el) return;

    const posts  = getSortedPosts();
    const totals = posts.reduce((acc, p) => {
      acc.km     += Number(p.km     || 0);
      acc.nights += Number(p.nights || 0);
      acc.coffee += Number(p.coffee || 0);
      return acc;
    }, { km: 0, nights: 0, coffee: 0 });

    el.innerHTML = `
      <div class="odometerCard">
        <div class="odometerIcon">🛞</div>
        <div class="odometerValue" data-target="${totals.km}">0<span>km</span></div>
        <div class="odometerLabel">Driven</div>
      </div>
      <div class="odometerCard">
        <div class="odometerIcon">⛺</div>
        <div class="odometerValue" data-target="${totals.nights}">0<span>nts</span></div>
        <div class="odometerLabel">Nights out</div>
      </div>
      <div class="odometerCard">
        <div class="odometerIcon">☕</div>
        <div class="odometerValue" data-target="${totals.coffee}">0<span>cups</span></div>
        <div class="odometerLabel">Coffees</div>
      </div>`;

    // Animate counters when visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll("[data-target]").forEach(valueEl => {
          const target = parseInt(valueEl.dataset.target, 10);
          const unit   = valueEl.querySelector("span")
                         ? valueEl.querySelector("span").outerHTML : "";
          if (target === 0) {
            valueEl.innerHTML = `0${unit}`;
            return;
          }
          const duration = 900;
          const steps    = 30;
          const step     = Math.ceil(target / steps);
          let current    = 0;
          const tick = setInterval(() => {
            current = Math.min(current + step, target);
            valueEl.innerHTML = current.toLocaleString() + unit;
            valueEl.classList.toggle("tick", true);
            setTimeout(() => valueEl.classList.remove("tick"), 80);
            if (current >= target) clearInterval(tick);
          }, duration / steps);
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    observer.observe(el);
  }

  /* ============================================================
     HOME STATS
     ============================================================ */
  function initHomeStats() {
    const posts = getSortedPosts();
    if (!posts.length) return;
    const latest  = posts[0];
    const moodEl  = document.getElementById("latestMood");
    const dateEl  = document.getElementById("latestDate");
    const countEl = document.getElementById("postCount");
    if (moodEl)  moodEl.textContent  = latest.mood || "—";
    if (dateEl)  dateEl.textContent  = fmtDate(latest.date);
    if (countEl) countEl.textContent = String(posts.length);
  }

  /* ============================================================
     CLICKABLE CARDS — make entire card navigate on click
     ============================================================ */
  function initClickableCards() {
    // Blog list items
    document.querySelectorAll(".post-item[data-href]").forEach(card => {
      card.classList.add("clickable");
      card.addEventListener("click", e => {
        if (e.target.closest("a")) return; // let real links work normally
        window.location.href = card.dataset.href;
      });
    });

    // Media tiles
    document.querySelectorAll(".media-tile[data-href]").forEach(card => {
      card.classList.add("clickable");
      card.addEventListener("click", e => {
        if (e.target.closest("a, video")) return;
        window.location.href = card.dataset.href;
      });
    });

    // Sidebar items
    document.querySelectorAll(".sideItem[data-href]").forEach(card => {
      card.classList.add("clickable");
      card.addEventListener("click", e => {
        if (e.target.closest("a")) return;
        window.location.href = card.dataset.href;
      });
    });
  }

  /* ============================================================
     HOME — latest post card
     ============================================================ */
  function renderLatest() {
    const el = document.getElementById("latest");
    if (!el) return;
    const posts = getSortedPosts();

    if (!posts.length) {
      el.innerHTML = `<div class="card"><div class="emptyState">No logs yet — add your first entry in <b>js/posts.js</b></div></div>`;
      return;
    }

    const recent = posts.slice(0, 2);

    const cardHtml = (p, isFirst) => {
      const tags = (p.tags || []).map(tagBadge).join(" ");
      return `
        <div class="card recentCard">
          ${isFirst ? `<div class="recentBadge">Latest</div>` : ""}
          <div class="meta">
            <span>${fmtDate(p.date)}</span>
            <span>•</span>
            <span>Mood: ${p.mood || "—"}</span>
            <span>•</span>
            <span class="readTime">⏱ ${readTime(p.content || "")}</span>
          </div>
          <h2 class="h2">${p.title}</h2>
          <p class="small" style="margin:8px 0 0">${p.summary || ""}</p>
          ${tags ? `<div style="margin-top:12px; display:flex; gap:6px; flex-wrap:wrap;">${tags}</div>` : ""}
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a class="button" href="post.html?id=${encodeURIComponent(p.id)}">Read entry →</a>
          </div>
        </div>`;
    };

    el.innerHTML = `
      <div class="recentGrid">
        ${recent.map((p, i) => cardHtml(p, i === 0)).join("")}
      </div>
      <div style="margin-top:12px; text-align:right;">
        <a class="buttonGhost" href="blog.html" style="margin-top:0">View all logs →</a>
      </div>`;
  }

  /* ============================================================
     BLOG LIST + SEARCH + TAG FILTER
     ============================================================ */
  function initBlogFilter() {
    const listEl  = document.getElementById("blogList");
    if (!listEl) return;

    const searchEl = document.getElementById("blogSearch");
    const tagRowEl = document.getElementById("tagFilterRow");
    const countEl  = document.getElementById("filterCount");

    const posts      = getSortedPosts();
    let activeTag    = null;
    let searchQuery  = "";

    if (tagRowEl) {
      const allTags = [...new Set(posts.flatMap(p => p.tags || []))].sort();
      if (allTags.length) {
        tagRowEl.innerHTML =
          allTags.map(t => `<button class="tagBtn" data-tag="${t}">#${t}</button>`).join("") +
          `<button class="tagBtn" data-tag="__clear" id="tagClear" style="display:none">✕ clear</button>`;

        tagRowEl.addEventListener("click", e => {
          const btn = e.target.closest(".tagBtn");
          if (!btn) return;
          const tag = btn.dataset.tag;
          activeTag = (tag === "__clear" || activeTag === tag) ? null : tag;
          tagRowEl.querySelectorAll(".tagBtn").forEach(b => {
            b.classList.toggle("active", b.dataset.tag === activeTag);
          });
          const clearBtn = document.getElementById("tagClear");
          if (clearBtn) clearBtn.style.display = activeTag ? "inline-flex" : "none";
          render();
        });
      } else {
        tagRowEl.innerHTML = `<span class="small" style="color:var(--muted2)">No tags yet.</span>`;
      }
    }

    if (searchEl) {
      searchEl.addEventListener("input", () => {
        searchQuery = searchEl.value.trim().toLowerCase();
        render();
      });
    }

    function highlight(text, query) {
      if (!query) return text;
      const esc = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(new RegExp(`(${esc})`, "gi"), "<mark>$1</mark>");
    }

    function render() {
      let filtered = posts;
      if (activeTag)    filtered = filtered.filter(p => (p.tags || []).includes(activeTag));
      if (searchQuery)  filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery) ||
        (p.summary || "").toLowerCase().includes(searchQuery) ||
        (p.tags || []).some(t => t.includes(searchQuery))
      );

      if (countEl) {
        countEl.textContent = filtered.length === posts.length
          ? `${posts.length} entr${posts.length === 1 ? "y" : "ies"}`
          : `${filtered.length} of ${posts.length} entries`;
      }

      if (posts.length === 0) {
        listEl.innerHTML = `<div class="emptyState">No logs yet — add your first entry in <b>js/posts.js</b></div>`;
        return;
      }
      if (filtered.length === 0) {
        listEl.innerHTML = `<div class="noResults">// NO ENTRIES MATCH — TRY A DIFFERENT SEARCH //</div>`;
        return;
      }

      const href = p => `post.html?id=${encodeURIComponent(p.id)}`;
      const hl   = q => highlight(q, searchQuery);

      listEl.innerHTML = filtered.map(p => `
        <div class="post-item" data-href="${href(p)}">
          <div class="meta">
            <span>${fmtDate(p.date)}</span>
            <span>•</span>
            <span>Mood: ${p.mood || "—"}</span>
            <span>•</span>
            <span class="readTime">⏱ ${readTime(p.content || "")}</span>
          </div>
          <h3><a href="${href(p)}">${hl(p.title)}</a></h3>
          <p class="small" style="margin:0 0 12px">${hl(p.summary || "")}</p>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">${(p.tags || []).map(t => tagBadge(t)).join("")}</div>
        </div>`).join("");

      // Re-attach click handlers after re-render
      initClickableCards();
    }

    render();
  }

  /* ============================================================
     SINGLE POST PAGE
     ============================================================ */
  function renderSinglePost() {
    const el = document.getElementById("postView");
    if (!el) return;

    const params = new URLSearchParams(location.search);
    const id     = params.get("id");
    const posts  = getSortedPosts();
    const post   = id ? (window.POSTS || []).find(p => p.id === id) : posts[0];

    if (!post) {
      el.innerHTML = `
        <div class="card" style="margin-top:16px">
          <a class="btnBack" href="blog.html">← Back to logs</a>
          <div class="emptyState">Entry not found.</div>
        </div>`;
      return;
    }

    document.title = `Callsign: JENKO — ${post.title}`;

    const mediaHtml = (post.featuredMedia || []).map(m => {
      const cap = `<div class="cap"><p class="small" style="margin:0">${m.caption || ""}</p></div>`;
      return m.type === "video"
        ? `<div class="media-tile"><video src="${m.src}" controls></video>${cap}</div>`
        : `<div class="media-tile"><img src="${m.src}" alt="${m.caption || ""}" loading="lazy">${cap}</div>`;
    }).join("");

    const idx  = posts.findIndex(p => p.id === post.id);
    const prev = posts[idx + 1];
    const next = posts[idx - 1];

    const prevNext = `
      <div style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:8px;">
        ${prev ? `<a class="buttonGhost" href="post.html?id=${encodeURIComponent(prev.id)}" style="margin-top:0">← ${prev.title}</a>` : "<span></span>"}
        ${next ? `<a class="buttonGhost" href="post.html?id=${encodeURIComponent(next.id)}" style="margin-top:0">${next.title} →</a>` : ""}
      </div>`;

    el.innerHTML = `
      <div class="card" style="margin-top:16px">
        <a class="btnBack" href="blog.html">← Back to logs</a>
        <div class="meta">
          <span>${fmtDate(post.date)}</span>
          <span>•</span>
          <span>Mood: ${post.mood || "—"}</span>
          <span>•</span>
          <span class="readTime">⏱ ${readTime(post.content || "")}</span>
        </div>
        <h1 class="h1" style="margin-top:10px">${post.title}</h1>
        ${(post.tags || []).length
          ? `<div style="margin-top:12px; display:flex; gap:6px; flex-wrap:wrap;">${(post.tags || []).map(tagBadge).join("")}</div>`
          : ""}
        <hr class="sep">
        <div class="postBody">${post.content || ""}</div>
        ${mediaHtml ? `<hr class="sep"><div class="h3" style="margin-bottom:12px">Featured Media</div><div class="media-grid">${mediaHtml}</div>` : ""}
        <hr class="sep">
        ${prevNext}
      </div>`;
  }

  /* ============================================================
     MEDIA GALLERY
     ============================================================ */
  function renderMediaGallery() {
    const el = document.getElementById("mediaGrid");
    if (!el) return;

    const items = [];
    getSortedPosts().forEach(p => {
      (p.featuredMedia || []).forEach(m => {
        items.push({ ...m, postId: p.id, postTitle: p.title, date: p.date });
      });
    });

    if (items.length === 0) {
      el.innerHTML = `<div class="card" style="margin-top:16px"><div class="emptyState">No media yet — add images or videos to your posts in <b>js/posts.js</b></div></div>`;
      return;
    }

    el.innerHTML = items.map(m => {
      const postLink = `<a href="post.html?id=${encodeURIComponent(m.postId)}"><b>${m.postTitle}</b></a>`;
      const cap      = m.caption ? `<p style="margin:5px 0 0" class="small">${m.caption}</p>` : "";
      const media    = m.type === "video"
        ? `<video src="${m.src}" controls></video>`
        : `<img src="${m.src}" alt="${m.caption || ""}" loading="lazy">`;
      return `
        <div class="media-tile" data-href="post.html?id=${encodeURIComponent(m.postId)}">
          ${media}
          <div class="cap">
            <p class="small" style="margin:0">${fmtDate(m.date)} • ${postLink}</p>
            ${cap}
          </div>
        </div>`;
    }).join("");

    initClickableCards();
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-year]").forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    initNav();
    initScrollTop();
    initHeroBanner();
    initReadingProgress();
    initMissionPatch();
    initOdometer();
    initHomeStats();
    renderLatest();
    initBlogFilter();
    renderSinglePost();
    renderMediaGallery();
    initClickableCards();
  });

})();