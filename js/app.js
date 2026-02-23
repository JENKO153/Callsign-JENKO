// js/app.js
function byDateDesc(a, b){
  return new Date(b.date) - new Date(a.date);
}

function getSortedPosts(){
  return [...(window.POSTS || [])].sort(byDateDesc);
}

function fmtDate(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" });
}

function setActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });
}

function renderLatest(){
  const el = document.getElementById("latest");
  if(!el) return;

  const posts = getSortedPosts();
  const latest = posts[0];

  if(!latest){
    el.innerHTML = `<div class="card"><p class="small">No logs yet. Add one in <b>js/posts.js</b>.</p></div>`;
    return;
  }

  el.innerHTML = `
    <div class="card">
      <div class="meta">
        <span>${fmtDate(latest.date)}</span>
        <span>•</span>
        <span>Mood: ${latest.mood || "—"}</span>
        <span>•</span>
        <span>${(latest.tags || []).map(t=>`<span class="tag">#${t}</span>`).join(" ")}</span>
      </div>

      <h2 class="h2">${latest.title}</h2>
      <p class="small" style="margin:0">${latest.summary || ""}</p>

      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a class="button" href="blog.html">Read more →</a>
        <a class="buttonGhost" href="post.html?id=${encodeURIComponent(latest.id)}">Open entry</a>
      </div>
    </div>
  `;
}

function renderBlogList(){
  const el = document.getElementById("blogList");
  if(!el) return;

  const posts = getSortedPosts();

  if(posts.length === 0){
    el.innerHTML = `<div class="post-item"><p class="small">No logs yet. Add one in <b>js/posts.js</b>.</p></div>`;
    return;
  }

  el.innerHTML = posts.map(p=>`
    <div class="post-item">
      <div class="meta">
        <span>${fmtDate(p.date)}</span>
        <span>•</span>
        <span>Mood: ${p.mood || "—"}</span>
      </div>

      <h3><a href="post.html?id=${encodeURIComponent(p.id)}">${p.title}</a></h3>
      <p class="small" style="margin:0 0 10px">${p.summary || ""}</p>

      <div>
        ${(p.tags || []).map(t=>`<span class="tag">#${t}</span>`).join(" ")}
      </div>
    </div>
  `).join("");
}

function renderSinglePost(){
  const el = document.getElementById("postView");
  if(!el) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const posts = getSortedPosts();
  const post = (window.POSTS || []).find(p=>p.id === id) || posts[0];

  if(!post){
    el.innerHTML = `<div class="card"><p class="small">Post not found.</p></div>`;
    return;
  }

  const media = (post.featuredMedia || []).map(m=>{
    if(m.type === "video"){
      return `
        <div class="media-tile">
          <video src="${m.src}" controls></video>
          <div class="cap"><p class="small" style="margin:0">${m.caption || ""}</p></div>
        </div>
      `;
    }
    return `
      <div class="media-tile">
        <img src="${m.src}" alt="">
        <div class="cap"><p class="small" style="margin:0">${m.caption || ""}</p></div>
      </div>
    `;
  }).join("");

  el.innerHTML = `
    <div class="card" style="margin-top:16px">
      <div class="meta">
        <span>${fmtDate(post.date)}</span>
        <span>•</span>
        <span>Mood: ${post.mood || "—"}</span>
      </div>

      <h1 class="h1" style="margin-top:10px">${post.title}</h1>

      <div style="margin-top:10px">
        ${(post.tags || []).map(t=>`<span class="tag">#${t}</span>`).join(" ")}
      </div>

      <hr class="sep">

      <div>${post.content || ""}</div>

      ${media ? `
        <hr class="sep">
        <h2 class="h2" style="margin:0 0 10px">Featured Media</h2>
        <div class="media-grid">${media}</div>
      ` : ""}
    </div>
  `;
}

function renderMediaGallery(){
  const el = document.getElementById("mediaGrid");
  if(!el) return;

  const items = [];
  getSortedPosts().forEach(p=>{
    (p.featuredMedia || []).forEach(m=>{
      items.push({ ...m, postId: p.id, postTitle: p.title, date: p.date });
    });
  });

  if(items.length === 0){
    el.innerHTML = `<div class="card" style="margin-top:16px"><p class="small">No media yet. Add images/videos to your posts.</p></div>`;
    return;
  }

  el.innerHTML = items.map(m=>{
    const meta = `${fmtDate(m.date)} • <a href="post.html?id=${encodeURIComponent(m.postId)}"><b>${m.postTitle}</b></a>`;
    if(m.type === "video"){
      return `
        <div class="media-tile">
          <video src="${m.src}" controls></video>
          <div class="cap">
            <p class="small" style="margin:0">${meta}</p>
            <p style="margin:6px 0 0" class="small">${m.caption || ""}</p>
          </div>
        </div>
      `;
    }
    return `
      <div class="media-tile">
        <img src="${m.src}" alt="">
        <div class="cap">
          <p class="small" style="margin:0">${meta}</p>
          <p style="margin:6px 0 0" class="small">${m.caption || ""}</p>
        </div>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", ()=>{
  setActiveNav();
  renderLatest();
  renderBlogList();
  renderSinglePost();
  renderMediaGallery();
});