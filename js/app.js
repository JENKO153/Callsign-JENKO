// js/app.js
// Callsign: JENKO — Main Application Logic
// Features: nav, hero banner, reading progress bar, search + tag filter, media gallery

(function () {
  "use strict";

  /* ============================================================
     UTILITIES
     ============================================================ */

  /**
   * Sort posts newest-first.
   */
  function getSortedPosts() {
    return [...(window.POSTS || [])].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  /**
   * Format an ISO date string to a readable local date.
   * @param {string} iso - e.g. "2026-02-23"
   */
  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  /**
   * Estimate reading time from an HTML string.
   * @param {string} html
   * @returns {string} e.g. "2 min read"
   */
  function readTime(html) {
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.round(words / 200));
    return mins + " min read";
  }

  /**
   * Build a tag badge element.
   * @param {string} t
   */
  function tagBadge(t) {
    return `<span class="tag">#${t}</span>`;
  }

  /**
   * Get current page filename.
   */
  function currentPage() {
    return location.pathname.split("/").pop() || "index.html";
  }

  /* ============================================================
     NAV — active state & hamburger menu
     ============================================================ */
  function initNav() {
    const path = currentPage();

    // Highlight active link (desktop + mobile)
    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.getAttribute("href") === path) a.classList.add("active");
    });

    // Hamburger toggle
    const toggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (toggle && mobileMenu) {
      toggle.addEventListener("click", () => {
        const open = mobileMenu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });

      // Close menu when a link is clicked
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

    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     HOME — latest post card
     ============================================================ */
  function renderLatest() {
    const el = document.getElementById("latest");
    if (!el) return;

    const posts = getSortedPosts();
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
        <p class="small" style="margin: 8px 0 0">${latest.summary || ""}</p>

        ${tags ? `<div style="margin-top:12px; display:flex; gap:6px; flex-wrap:wrap;">${tags}</div>` : ""}

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <a class="button" href="post.html?id=${encodeURIComponent(latest.id)}">Read entry →</a>
          <a class="buttonGhost" href="blog.html">All logs</a>
        </div>
      </div>`;
  }

  /* ============================================================
     SINGLE POST PAGE
     ============================================================ */
  function renderSinglePost() {
    const el = document.getElementById("postView");
    if (!el) return;

    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const posts = getSortedPosts();
    const post = id
      ? (window.POSTS || []).find((p) => p.id === id)
      : posts[0];

    if (!post) {
      el.innerHTML = `
        <div class="card" style="margin-top:16px">
          <a class="btnBack" href="blog.html">← Back to logs</a>
          <div class="emptyState">Entry not found.</div>
        </div>`;
      return;
    }

    // Update page title
    document.title = `Callsign: JENKO — ${post.title}`;

    // Build media section
    const mediaHtml = (post.featuredMedia || [])
      .map((m) => {
        const cap = `<div class="cap"><p class="small" style="margin:0">${m.caption || ""}</p></div>`;
        return m.type === "video"
          ? `<div class="media-tile"><video src="${m.src}" controls></video>${cap}</div>`
          : `<div class="media-tile"><img src="${m.src}" alt="${m.caption || ""}" loading="lazy">${cap}</div>`;
      })
      .join("");

    // Previous / next navigation
    const idx = posts.findIndex((p) => p.id === post.id);
    const prev = posts[idx + 1];
    const next = posts[idx - 1];

    const prevNext = `
      <div style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:8px;">
        ${prev
          ? `<a class="buttonGhost" href="post.html?id=${encodeURIComponent(prev.id)}" style="margin-top:0">← ${prev.title}</a>`
          : "<span></span>"}
        ${next
          ? `<a class="buttonGhost" href="post.html?id=${encodeURIComponent(next.id)}" style="margin-top:0">${next.title} →</a>`
          : ""}
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

        ${
          (post.tags || []).length
            ? `<div style="margin-top:12px; display:flex; gap:6px; flex-wrap:wrap;">${(post.tags || []).map(tagBadge).join("")}</div>`
            : ""
        }

        <hr class="sep">

        <div class="postBody">${post.content || ""}</div>

        ${
          mediaHtml
            ? `<hr class="sep">
               <div class="h3" style="margin-bottom:12px">Featured Media</div>
               <div class="media-grid">${mediaHtml}</div>`
            : ""
        }

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
    getSortedPosts().forEach((p) => {
      (p.featuredMedia || []).forEach((m) => {
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

    el.innerHTML = items
      .map((m) => {
        const postLink = `<a href="post.html?id=${encodeURIComponent(m.postId)}"><b>${m.postTitle}</b></a>`;
        const cap = m.caption
          ? `<p style="margin:5px 0 0" class="small">${m.caption}</p>`
          : "";

        const media =
          m.type === "video"
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
      })
      .join("");
  }

  /* ============================================================
     HOME STATS — latest mood, date, post count
     ============================================================ */
  function initHomeStats() {
    const posts = getSortedPosts();
    if (!posts.length) return;

    const latest = posts[0];

    const moodEl  = document.getElementById("latestMood");
    const dateEl  = document.getElementById("latestDate");
    const countEl = document.getElementById("postCount");

    if (moodEl)  moodEl.textContent  = latest.mood || "—";
    if (dateEl)  dateEl.textContent  = fmtDate(latest.date);
    if (countEl) countEl.textContent = String(posts.length);
  }

  /* ============================================================
     HERO BANNER (index.html)
     ============================================================ */
  function initHeroBanner() {
    const el = document.getElementById("heroBanner");
    if (!el) return;

    const src = el.dataset.src;

    if (src) {
      // Real image supplied via data-src attribute
      el.innerHTML = `<img src="${src}" alt="Hero banner">`;
    } else {
      // Placeholder — swap out once you have an image
      el.innerHTML = `
        <div class="heroBannerPlaceholder">
          <div class="placeholderLabel">// REPLACE WITH YOUR IMAGE //</div>
        </div>`;
    }
  }

  /* ============================================================
     READING PROGRESS BAR (post.html)
     ============================================================ */
  function initReadingProgress() {
    const bar = document.getElementById("readProgressFill");
    if (!bar) return;

    function update() {
      const doc    = document.documentElement;
      const total  = doc.scrollHeight - doc.clientHeight;
      const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = Math.min(pct, 100).toFixed(2) + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ============================================================
     SEARCH + TAG FILTER (blog.html)
     ============================================================ */
  function initBlogFilter() {
    const listEl     = document.getElementById("blogList");
    const searchEl   = document.getElementById("blogSearch");
    const tagRowEl   = document.getElementById("tagFilterRow");
    const countEl    = document.getElementById("filterCount");
    if (!listEl || !searchEl || !tagRowEl) return;

    const posts       = getSortedPosts();
    let activeTag     = null;
    let searchQuery   = "";

    // ── Build tag list ──────────────────────────────────────────
    const allTags = [...new Set(posts.flatMap(p => p.tags || []))].sort();

    tagRowEl.innerHTML = allTags.map(t => `
      <button class="tagBtn" data-tag="${t}">#${t}</button>
    `).join("") + (allTags.length ? `
      <button class="tagBtn" data-tag="__clear" id="tagClear" style="display:none">✕ clear</button>
    ` : "");

    tagRowEl.addEventListener("click", e => {
      const btn = e.target.closest(".tagBtn");
      if (!btn) return;
      const tag = btn.dataset.tag;

      if (tag === "__clear") {
        activeTag = null;
      } else {
        activeTag = (activeTag === tag) ? null : tag;
      }

      // Update button states
      tagRowEl.querySelectorAll(".tagBtn[data-tag]").forEach(b => {
        b.classList.toggle("active", b.dataset.tag === activeTag);
      });

      const clearBtn = document.getElementById("tagClear");
      if (clearBtn) clearBtn.style.display = activeTag ? "inline-flex" : "none";

      render();
    });

    // ── Search input ────────────────────────────────────────────
    searchEl.addEventListener("input", () => {
      searchQuery = searchEl.value.trim().toLowerCase();
      render();
    });

    // ── Highlight matched text ───────────────────────────────────
    function highlight(text, query) {
      if (!query) return text;
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
    }

    // ── Render filtered list ─────────────────────────────────────
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

      if (filtered.length === 0) {
        listEl.innerHTML = `<div class="noResults">// NO ENTRIES MATCH — ADJUST SEARCH //</div>`;
        return;
      }

      listEl.innerHTML = filtered.map(p => {
        const hl      = q => highlight(q, searchQuery);
        const tags    = (p.tags || []).map(t => `<span class="tag">#${t}</span>`).join("");
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

    render();
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer(s)
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });

    initNav();
    initScrollTop();
    initHeroBanner();
    initReadingProgress();
    initHomeStats();
    renderLatest();
    initBlogFilter();      // replaces renderBlogList — handles search + tags
    renderSinglePost();
    renderMediaGallery();
  });
})();