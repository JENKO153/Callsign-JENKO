// js/app.js
// Callsign: JENKO — Main Application Logic

(function () {
  "use strict";

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
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function readTime(html) {
    const text  = html.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const mins  = Math.max(1, Math.round(words / 200));
    return mins + " min read";
  }

  function tagBadge(t) {
    return `<span class="tag">#${t}</span>`;
  }

  function currentPage() {
    return location.pathname.split("/").pop() || "index.html";
  }

  /* ============================================================
     NAV — active state & hamburger menu
     ============================================================ */
  function initNav() {
    const path = currentPage();

    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.getAttribute("href") === path) a.classList.add("active");
    });

    const toggle     = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (toggle && mobileMenu) {
      toggle.addEventListener("click", () => {
        const open = mobileMenu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });

      mobileMenu.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ============================================================
     SCROLL-TO-TOP BUTTON
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
     HERO BANNER (index.html)
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
     READING PROGRESS BAR (post.html)
     — Fixed bar at top of viewport.
     — Tracks maximum scroll reached so scrolling back up
       does NOT shrink the bar — it only ever grows.
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

      // Only increase — never shrink when scrolling back up
      if (pct > maxPct) {
        maxPct = pct;
        bar.style.width = Math.min(maxPct, 100).toFixed(2) + "%";
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ============================================================
     HOME — latest post card
     ============================================================ */
  function renderLatest() {
    const el = document.getElementById("latest");
    if (!el) return;

    const posts  = getSortedPosts();
    const latest = posts[0];

    if (!latest) {
      el.innerHTML = `
        <div class="card">
          <div class="emptyState">No logs yet — add your first entry in <b>js/posts.js</b></div>
        </div>`;
      return;
    }

    const tags = (latest.tags || []).map(tagBadge).join(" ");

    el.innerHTML = `
      <div class="card">
        <div class="meta">
          <span>${fmtDate(latest.date)}</span>
          <span>•</span>
          <span>Mood: ${latest.mood || "—"}</span>
          <span>•</span>
          <span class="readTime">⏱ ${readTime(latest.content || "")}</span>
        </div>

        <h2 class="h2">${latest.title}</h2>
        <p class="small" style="margin:8px 0 0">${latest.summary || ""}</p>

        ${tags ? `<div style="margin-top:12px; display:flex; gap:6px; flex-wrap:wrap;">${tags}</div>` : ""}

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <a class="button" href="post.html?id=${encodeURIComponent(latest.id)}">Read entry →</a>
          <a class="buttonGhost" href="blog.html">All logs</a>
        </div>
      </div>`;
  }

  /* ============================================================
     BLOG LIST + SEARCH + TAG FILTER (blog.html)
     — Safe: renders the plain list even if filter HTML
       elements are absent, so the page never breaks.
     ============================================================ */
  function initBlogFilter() {
    const listEl  = document.getElementById("blogList");
    if (!listEl) return;

    const searchEl = document.getElementById("blogSearch");   // may be null
    const tagRowEl = document.getElementById("tagFilterRow"); // may be null
    const countEl  = document.getElementById("filterCount");  // may be null

    const posts    = getSortedPosts();
    let activeTag  = null;
    let searchQuery = "";

    // ── Build tag buttons ────────────────────────────────────────
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

    // ── Search listener ──────────────────────────────────────────
    if (searchEl) {
      searchEl.addEventListener("input", () => {
        searchQuery = searchEl.value.trim().toLowerCase();
        render();
      });
    }

    // ── Highlight matched text ───────────────────────────────────
    function highlight(text, query) {
      if (!query) return text;
      const esc = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(new RegExp(`(${esc})`, "gi"), "<mark>$1</mark>");
    }

    // ── Render ───────────────────────────────────────────────────
    function render() {
      let filtered = posts;

      if (activeTag) {
        filtered = filtered.filter(p => (p.tags || []).includes(activeTag));
      }

      if (searchQuery) {
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(searchQuery) ||
          (p.summary || "").toLowerCase().includes(searchQuery) ||
          (p.tags || []).some(t => t.includes(searchQuery))
        );
      }

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

      listEl.innerHTML = filtered.map(p => {
        const hl   = q => highlight(q, searchQuery);
        const tags = (p.tags || []).map(t => `<span class="tag">#${t}</span>`).join("");
        return `
          <div class="post-item">
            <div class="meta">
              <span>${fmtDate(p.date)}</span>
              <span>•</span>
              <span>Mood: ${p.mood || "—"}</span>
              <span>•</span>
              <span class="readTime">⏱ ${readTime(p.content || "")}</span>
            </div>
            <h3><a href="post.html?id=${encodeURIComponent(p.id)}">${hl(p.title)}</a></h3>
            <p class="small" style="margin:0 0 12px">${hl(p.summary || "")}</p>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">${tags}</div>
          </div>`;
      }).join("");
    }

    // Initial render
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
    const post   = id
      ? (window.POSTS || []).find(p => p.id === id)
      : posts[0];

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

        ${mediaHtml ? `
          <hr class="sep">
          <div class="h3" style="margin-bottom:12px">Featured Media</div>
          <div class="media-grid">${mediaHtml}</div>` : ""}

        <hr class="sep">
        ${prevNext}
      </div>`;
  }

  /* ============================================================
     MEDIA GALLERY PAGE
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
      el.innerHTML = `
        <div class="card" style="margin-top:16px">
          <div class="emptyState">No media yet — add images or videos to your posts in <b>js/posts.js</b></div>
        </div>`;
      return;
    }

    el.innerHTML = items.map(m => {
      const postLink = `<a href="post.html?id=${encodeURIComponent(m.postId)}"><b>${m.postTitle}</b></a>`;
      const cap      = m.caption ? `<p style="margin:5px 0 0" class="small">${m.caption}</p>` : "";
      const media    = m.type === "video"
        ? `<video src="${m.src}" controls></video>`
        : `<img src="${m.src}" alt="${m.caption || ""}" loading="lazy">`;

      return `
        <div class="media-tile">
          ${media}
          <div class="cap">
            <p class="small" style="margin:0">${fmtDate(m.date)} • ${postLink}</p>
            ${cap}
          </div>
        </div>`;
    }).join("");
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
    initHomeStats();
    renderLatest();
    initBlogFilter();
    renderSinglePost();
    renderMediaGallery();
  });

})();