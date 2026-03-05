import { idols, affiliateLink, amazonImg } from './data.js';
import { LANGS, T, fontFamily, idolName, idolTitle } from './i18n.js';

// ─── NAV items ────────────────────────────────────────────────────────────────
const NAV = [
  { icon: '📸', key: 'navBooks', active: true },
  { icon: '❤️', key: 'navSaved' },
  { icon: '🛒', key: 'navCart'  },
  { icon: '👤', key: 'navMe'    },
];

// ─── App state ────────────────────────────────────────────────────────────────
const state = { lang: 'zh', search: '', sort: 'rank', selected: null, ytId: null };

// ─── DOM helpers ──────────────────────────────────────────────────────────────
const $  = (id) => document.getElementById(id);
const ff = () => fontFamily(state.lang);
const t  = () => T[state.lang];

// ════════════════════════════════════════════════════════════════════════════
// YOUTUBE PLAYER
// ════════════════════════════════════════════════════════════════════════════
let ytPlayer = null;

function openYTPlayer(videoId) {
  state.ytId = videoId;
  const overlay = $('yt-player-overlay');
  const frame   = $('yt-player-frame');
  overlay.classList.add('open');
  frame.innerHTML = '<div id="yt-target"></div>';

  const init = () => {
    ytPlayer = new window.YT.Player('yt-target', {
      videoId,
      playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
      events: { onReady: (e) => e.target.playVideo() },
    });
  };

  if (window.YT && window.YT.Player) {
    init();
  } else {
    if (!document.getElementById('yt-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = init;
  }
}

function closeYTPlayer() {
  $('yt-player-overlay').classList.remove('open');
  if (ytPlayer) { try { ytPlayer.destroy(); } catch (_) {} ytPlayer = null; }
  $('yt-player-frame').innerHTML = '';
  state.ytId = null;
}

$('yt-close-btn').addEventListener('click', closeYTPlayer);
$('yt-player-overlay').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeYTPlayer(); });

// ════════════════════════════════════════════════════════════════════════════
// DETAIL MODAL
// ════════════════════════════════════════════════════════════════════════════
function openModal(idol) {
  state.selected = idol;
  const lang = state.lang;
  const tx   = t();
  const font = ff();
  const name  = idolName(idol, lang);
  const title = idolTitle(idol, lang);

  // ── Hero image
  const heroImg     = $('modal-hero-img');
  const heroFallback = $('modal-hero-fallback');
  heroImg.style.opacity = '0';
  heroImg.style.display = 'none';
  heroFallback.style.background = idol.bg;
  $('modal-hero-fallback-char').textContent  = idol.name[0];
  $('modal-hero-fallback-char').style.color  = idol.accent;

  // Try loading Amazon image
  const src = amazonImg(idol.asin);
  heroImg.onload  = () => { heroImg.style.display = 'block'; heroImg.style.opacity = '1'; };
  heroImg.onerror = () => { heroImg.style.display = 'none'; };
  heroImg.src = src;

  // ── Modal chrome
  $('modal-sheet').style.border    = `1px solid ${idol.accent}22`;
  $('modal-accent-line').style.background =
    `linear-gradient(to right, ${idol.accent}cc, ${idol.accent}44, transparent)`;

  // ── Hero info
  const badge = $('modal-tag-badge');
  badge.textContent  = idol.tag[lang];
  badge.style.background = idol.accent;
  badge.style.fontFamily = font;
  $('modal-title-main').textContent  = title;
  $('modal-title-main').style.fontFamily = font;
  $('modal-name-sub').textContent  = `${name}（${idol.name}）`;
  $('modal-name-sub').style.fontFamily = font;

  // ── CTA buttons
  $('modal-cta').innerHTML = `
    <a class="btn-amazon" href="${affiliateLink(idol.asin)}" target="_blank" rel="noopener noreferrer" style="font-family:${font}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.817-1.776-.817-1.205 0-2.277.618-2.54 1.897-.054.284-.265.562-.549.576l-3.076-.333c-.259-.058-.547-.266-.472-.661.707-3.716 4.066-4.835 7.076-4.835 1.536 0 3.547.41 4.761 1.568 1.536 1.436 1.387 3.352 1.387 5.441v4.927c0 1.484.614 2.135 1.192 2.935.203.285.248.626-.011.838-.645.537-1.79 1.536-2.423 2.097l-.009-.011z"/>
        <path d="M20.945 19.745c-2.775 1.755-6.809 2.689-10.28 2.689-4.862 0-9.249-1.798-12.565-4.793-.26-.235-.028-.556.285-.374 3.575 2.078 7.997 3.329 12.562 3.329 3.079 0 6.466-.638 9.584-1.96.47-.201.863.309.414.609z"/>
      </svg>
      ${tx.buyAmazon} · ${idol.price}
    </a>
    <div class="btn-yt-link" id="cta-yt-btn" style="font-family:${font}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
      ${tx.ytLabel}
    </div>
  `;
  $('cta-yt-btn').addEventListener('click', () => { closeModal(); openYTPlayer(idol.youtubeId); });

  // ── YouTube thumbnail
  $('modal-yt-label-text').textContent  = tx.ytLabel;
  $('modal-yt-label-text').style.fontFamily = font;
  $('yt-thumb-img').src = `https://img.youtube.com/vi/${idol.youtubeId}/hqdefault.jpg`;

  const circle = $('yt-play-circle');
  circle.style.border     = `2.5px solid ${idol.accent}`;
  circle.style.boxShadow  = `0 0 28px ${idol.accent}66`;
  circle.querySelector('svg').setAttribute('fill', idol.accent);
  $('yt-play-label').textContent = tx.ytPlay;
  $('yt-thumb-card').onclick = () => { closeModal(); openYTPlayer(idol.youtubeId); };

  // ── Description
  $('modal-desc').textContent  = idol.desc[lang];
  $('modal-desc').style.fontFamily = font;

  // ── Details table
  const details = [
    [tx.name,       `${name}（${idol.name}）`],
    [tx.titleLabel, title],
    [tx.publisher,  idol.publisher],
    [tx.release,    idol.release],
    [tx.price,      idol.price],
  ];
  $('modal-details-table').innerHTML = details.map(([label, value], i) => `
    <div class="detail-row" style="${i === details.length - 1 ? 'border-bottom:none' : ''}">
      <span class="detail-label" style="font-family:${font}">${label}</span>
      <span class="detail-value" style="font-family:${font}">${value}</span>
    </div>
  `).join('');

  // Open
  $('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  state.selected = null;
}

$('modal-close-btn').addEventListener('click', closeModal);
$('modal-overlay').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });

// ════════════════════════════════════════════════════════════════════════════
// RENDER
// ════════════════════════════════════════════════════════════════════════════
function render() {
  const lang = state.lang;
  const tx   = t();
  const font = ff();

  // ── Sidebar
  $('sb-logo').textContent  = tx.appTitle;
  $('sb-logo').style.fontFamily = font;
  $('sb-sub').textContent   = tx.appSub;
  $('sb-lang-label').textContent = tx.langLabel;

  $('sb-nav').innerHTML = NAV.map((item) => `
    <button class="sidebar-nav-item${item.active ? ' active' : ''}" style="font-family:${font}">
      <span class="sidebar-nav-icon">${item.icon}</span>${tx[item.key]}
    </button>
  `).join('');

  $('sb-lang-btns').innerHTML = LANGS.map((l) => `
    <button class="sidebar-lang-btn${lang === l.code ? ' active' : ''}" data-lang="${l.code}">
      ${l.flag} ${l.label}
    </button>
  `).join('');
  $('sb-lang-btns').querySelectorAll('.sidebar-lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => { state.lang = btn.dataset.lang; render(); });
  });

  // ── Header
  $('h-title').textContent  = tx.appTitle;
  $('h-title').style.fontFamily = font;
  $('h-sub').textContent    = tx.appSub;

  $('h-lang').innerHTML = LANGS.map((l) => `
    <button class="lang-btn${lang === l.code ? ' active' : ''}" data-lang="${l.code}">
      ${l.flag} ${l.label}
    </button>
  `).join('');
  $('h-lang').querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => { state.lang = btn.dataset.lang; render(); });
  });

  $('search-input').placeholder  = tx.searchPlaceholder;
  $('search-input').style.fontFamily = font;

  // ── Sort buttons
  $('sort-btns').innerHTML = [['rank', tx.sortRank], ['price', tx.sortPrice]].map(([val, label]) => `
    <button class="sort-btn${state.sort === val ? ' active' : ''}" data-sort="${val}" style="font-family:${font}">${label}</button>
  `).join('');
  $('sort-btns').querySelectorAll('.sort-btn').forEach((btn) => {
    btn.addEventListener('click', () => { state.sort = btn.dataset.sort; render(); });
  });

  // ── Filter + sort
  const q = state.search.trim().toLowerCase();
  let list = idols.filter((idol) => {
    if (!q) return true;
    return [idol.name, idol.reading, idol.nameZh, idol.nameKo, idol.nameEn,
            idol.title, idol.titleZh, idol.titleKo, idol.titleEn]
      .some((s) => s?.toLowerCase().includes(q));
  });
  if (state.sort === 'rank') list = [...list].sort((a, b) => a.rank - b.rank);

  $('result-count').textContent = tx.count(list.length);

  // ── Card grid
  const grid = $('card-grid');
  if (list.length === 0) {
    grid.innerHTML = `<div class="no-results" style="font-family:${font}">${tx.noResults}</div>`;
  } else {
    grid.innerHTML = list.map((idol, i) => {
      const name  = idolName(idol, lang);
      const title = idolTitle(idol, lang);
      return `
        <article class="card" data-id="${idol.id}"
          style="
            animation: fadeInUp .45s ease ${i * 0.06}s both;
            box-shadow: 0 6px 32px rgba(0,0,0,.65), 0 0 0 1px ${idol.accent}22;
          ">
          <div class="card-img">
            <div class="card-img-bg" style="background:${idol.bg}">
              <span class="card-fallback-char" style="color:${idol.accent}">${idol.name[0]}</span>
            </div>
            <img class="card-cover"
              src="${amazonImg(idol.asin)}"
              alt="${idol.name}"
              onload="this.classList.add('loaded')"
              onerror="this.style.display='none'" />
            <div class="card-grad"></div>
            <div class="card-hover-veil" style="background:linear-gradient(to top,${idol.accent}22,transparent)"></div>
            <div class="card-rank" style="border:1px solid ${idol.accent}55;color:${idol.accent}">#${idol.rank}</div>
            <div class="card-tag" style="background:${idol.accent}">${idol.tag[lang]}</div>
            <div class="card-yt-badge">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="white"><polygon points="0,0 10,5 0,10"/></svg>
              動画あり
            </div>
            <div class="card-title-text" style="font-family:${font}">${title}</div>
          </div>
          <div class="card-body">
            <div class="card-name" style="font-family:${font}">${name}</div>
            <div class="card-meta">${idol.publisher} · ${idol.release}</div>
            <div class="card-price" style="color:${idol.accent};background:${idol.accent}18;border:1px solid ${idol.accent}35">${idol.price}</div>
          </div>
        </article>
      `;
    }).join('');

    // Card interactions
    grid.querySelectorAll('.card').forEach((card) => {
      const idol = idols.find((x) => x.id === +card.dataset.id);
      card.addEventListener('click',      () => openModal(idol));
      card.addEventListener('mousedown',  () => { card.style.transform = 'scale(0.96)'; });
      card.addEventListener('mouseup',    () => { card.style.transform = ''; });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  // ── Tab bar
  $('tabbar').innerHTML = NAV.map((item) => `
    <button class="tab-btn${item.active ? ' active' : ''}">
      <span class="tab-icon">${item.icon}</span>
      <span class="tab-label" style="font-family:${font}">${tx[item.key]}</span>
    </button>
  `).join('');
}

// ════════════════════════════════════════════════════════════════════════════
// SEARCH
// ════════════════════════════════════════════════════════════════════════════
$('search-input').addEventListener('input', (e) => {
  state.search = e.target.value;
  $('search-clear').style.display = state.search ? 'flex' : 'none';
  render();
});
$('search-clear').addEventListener('click', () => {
  state.search = '';
  $('search-input').value = '';
  $('search-clear').style.display = 'none';
  render();
});

// ════════════════════════════════════════════════════════════════════════════
// KEYBOARD
// ════════════════════════════════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.ytId)      closeYTPlayer();
    else if (state.selected) closeModal();
  }
});

// ════════════════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════════════════
render();
