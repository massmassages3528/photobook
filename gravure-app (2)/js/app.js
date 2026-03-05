// js/app.js — メインUIロジック（ES Modules不使用）
// 依存: window.DATA (data.js), window.I18N (i18n.js)
(function () {
  'use strict';

  var DATA  = window.DATA;
  var I18N  = window.I18N;
  var idols        = DATA.idols;
  var affiliateLink = DATA.affiliateLink;
  var amazonImg    = DATA.amazonImg;
  var LANGS        = I18N.LANGS;
  var T            = I18N.T;
  var fontFamily   = I18N.fontFamily;
  var idolName     = I18N.idolName;
  var idolTitle    = I18N.idolTitle;

  // ── NAV ──────────────────────────────────────────────────────────────────
  var NAV = [
    { icon: '📸', key: 'navBooks', active: true },
    { icon: '❤️', key: 'navSaved' },
    { icon: '🛒', key: 'navCart'  },
    { icon: '👤', key: 'navMe'    },
  ];

  // ── State ─────────────────────────────────────────────────────────────────
  var state = { lang: 'zh', search: '', sort: 'rank', selected: null, ytId: null };

  function $id(id) { return document.getElementById(id); }
  function tx()    { return T[state.lang]; }
  function ff()    { return fontFamily(state.lang); }

  // ════════════════════════════════════════════════════════════════════════
  // YOUTUBE PLAYER
  // ════════════════════════════════════════════════════════════════════════
  var ytPlayer = null;

  function openYTPlayer(videoId) {
    state.ytId = videoId;
    var overlay = $id('yt-player-overlay');
    var frame   = $id('yt-player-frame');
    overlay.classList.add('open');
    frame.innerHTML = '<div id="yt-target"></div>';

    function init() {
      ytPlayer = new window.YT.Player('yt-target', {
        videoId: videoId,
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
        events: { onReady: function(e){ e.target.playVideo(); } },
      });
    }

    if (window.YT && window.YT.Player) {
      init();
    } else {
      if (!document.getElementById('yt-api-script')) {
        var tag = document.createElement('script');
        tag.id  = 'yt-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = init;
    }
  }

  function closeYTPlayer() {
    $id('yt-player-overlay').classList.remove('open');
    if (ytPlayer) { try { ytPlayer.destroy(); } catch(e){} ytPlayer = null; }
    $id('yt-player-frame').innerHTML = '';
    state.ytId = null;
  }

  $id('yt-close-btn').addEventListener('click', closeYTPlayer);
  $id('yt-player-overlay').addEventListener('click', function(e){
    if (e.target === e.currentTarget) closeYTPlayer();
  });

  // ════════════════════════════════════════════════════════════════════════
  // DETAIL MODAL
  // ════════════════════════════════════════════════════════════════════════
  function openModal(idol) {
    state.selected = idol;
    var lang  = state.lang;
    var t     = tx();
    var font  = ff();
    var name  = idolName(idol, lang);
    var title = idolTitle(idol, lang);

    // Hero image
    var heroImg      = $id('modal-hero-img');
    var heroFallback = $id('modal-hero-fallback');
    heroImg.style.opacity = '0';
    heroImg.style.display = 'none';
    heroFallback.style.background = idol.bg;
    $id('modal-hero-fallback-char').textContent = idol.name[0];
    $id('modal-hero-fallback-char').style.color = idol.accent;
    heroImg.onload  = function(){ heroImg.style.display='block'; heroImg.style.opacity='1'; };
    heroImg.onerror = function(){ heroImg.style.display='none'; };
    heroImg.src = amazonImg(idol.asin);

    // Chrome
    $id('modal-sheet').style.border = '1px solid ' + idol.accent + '22';
    $id('modal-accent-line').style.background =
      'linear-gradient(to right,' + idol.accent + 'cc,' + idol.accent + '44,transparent)';

    // Hero info
    var badge = $id('modal-tag-badge');
    badge.textContent  = idol.tag[lang];
    badge.style.background  = idol.accent;
    badge.style.fontFamily  = font;
    $id('modal-title-main').textContent   = title;
    $id('modal-title-main').style.fontFamily = font;
    $id('modal-name-sub').textContent     = name + '（' + idol.name + '）';
    $id('modal-name-sub').style.fontFamily = font;

    // CTA
    $id('modal-cta').innerHTML =
      '<a class="btn-amazon" href="' + affiliateLink(idol.asin) + '" target="_blank" rel="noopener noreferrer" style="font-family:' + font + '">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.817-1.776-.817-1.205 0-2.277.618-2.54 1.897-.054.284-.265.562-.549.576l-3.076-.333c-.259-.058-.547-.266-.472-.661.707-3.716 4.066-4.835 7.076-4.835 1.536 0 3.547.41 4.761 1.568 1.536 1.436 1.387 3.352 1.387 5.441v4.927c0 1.484.614 2.135 1.192 2.935.203.285.248.626-.011.838-.645.537-1.79 1.536-2.423 2.097l-.009-.011z"/><path d="M20.945 19.745c-2.775 1.755-6.809 2.689-10.28 2.689-4.862 0-9.249-1.798-12.565-4.793-.26-.235-.028-.556.285-.374 3.575 2.078 7.997 3.329 12.562 3.329 3.079 0 6.466-.638 9.584-1.96.47-.201.863.309.414.609z"/></svg>' +
        t.buyAmazon + ' · ' + idol.price +
      '</a>' +
      '<div class="btn-yt-link" id="cta-yt-btn" style="font-family:' + font + '">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' +
        t.ytLabel +
      '</div>';
    $id('cta-yt-btn').addEventListener('click', function(){
      closeModal(); openYTPlayer(idol.youtubeId);
    });

    // YT thumbnail
    $id('modal-yt-label-text').textContent   = t.ytLabel;
    $id('modal-yt-label-text').style.fontFamily = font;
    $id('yt-thumb-img').src = 'https://img.youtube.com/vi/' + idol.youtubeId + '/hqdefault.jpg';
    var circle = $id('yt-play-circle');
    circle.style.border    = '2.5px solid ' + idol.accent;
    circle.style.boxShadow = '0 0 28px ' + idol.accent + '66';
    circle.querySelector('svg').setAttribute('fill', idol.accent);
    $id('yt-play-label').textContent = t.ytPlay;
    $id('yt-thumb-card').onclick = function(){ closeModal(); openYTPlayer(idol.youtubeId); };

    // Desc
    $id('modal-desc').textContent   = idol.desc[lang];
    $id('modal-desc').style.fontFamily = font;

    // Details table
    var details = [
      [t.name,       name + '（' + idol.name + '）'],
      [t.titleLabel, title],
      [t.publisher,  idol.publisher],
      [t.release,    idol.release],
      [t.price,      idol.price],
    ];
    $id('modal-details-table').innerHTML = details.map(function(row, i){
      return '<div class="detail-row"' + (i===details.length-1?' style="border-bottom:none"':'') + '>' +
        '<span class="detail-label" style="font-family:' + font + '">' + row[0] + '</span>' +
        '<span class="detail-value" style="font-family:' + font + '">' + row[1] + '</span>' +
        '</div>';
    }).join('');

    $id('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $id('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
    state.selected = null;
  }

  $id('modal-close-btn').addEventListener('click', closeModal);
  $id('modal-overlay').addEventListener('click', function(e){
    if (e.target === e.currentTarget) closeModal();
  });

  // ════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════
  function render() {
    var lang = state.lang;
    var t    = tx();
    var font = ff();

    // Sidebar
    $id('sb-logo').textContent   = t.appTitle;
    $id('sb-logo').style.fontFamily = font;
    $id('sb-sub').textContent    = t.appSub;
    $id('sb-lang-label').textContent = t.langLabel;

    $id('sb-nav').innerHTML = NAV.map(function(item){
      return '<button class="sidebar-nav-item' + (item.active?' active':'') + '" style="font-family:' + font + '">' +
        '<span class="sidebar-nav-icon">' + item.icon + '</span>' + t[item.key] +
        '</button>';
    }).join('');

    $id('sb-lang-btns').innerHTML = LANGS.map(function(l){
      return '<button class="sidebar-lang-btn' + (lang===l.code?' active':'') + '" data-lang="' + l.code + '">' +
        l.flag + ' ' + l.label + '</button>';
    }).join('');
    $id('sb-lang-btns').querySelectorAll('.sidebar-lang-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ state.lang=btn.dataset.lang; render(); });
    });

    // Header
    $id('h-title').textContent  = t.appTitle;
    $id('h-title').style.fontFamily = font;
    $id('h-sub').textContent    = t.appSub;

    $id('h-lang').innerHTML = LANGS.map(function(l){
      return '<button class="lang-btn' + (lang===l.code?' active':'') + '" data-lang="' + l.code + '">' +
        l.flag + ' ' + l.label + '</button>';
    }).join('');
    $id('h-lang').querySelectorAll('.lang-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ state.lang=btn.dataset.lang; render(); });
    });

    $id('search-input').placeholder   = t.searchPlaceholder;
    $id('search-input').style.fontFamily = font;

    // Sort
    $id('sort-btns').innerHTML = [['rank',t.sortRank],['price',t.sortPrice]].map(function(pair){
      return '<button class="sort-btn' + (state.sort===pair[0]?' active':'') + '" data-sort="' + pair[0] + '" style="font-family:' + font + '">' + pair[1] + '</button>';
    }).join('');
    $id('sort-btns').querySelectorAll('.sort-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ state.sort=btn.dataset.sort; render(); });
    });

    // Filter
    var q = state.search.trim().toLowerCase();
    var list = idols.filter(function(idol){
      if (!q) return true;
      return [idol.name,idol.reading,idol.nameZh,idol.nameKo,idol.nameEn,
              idol.title,idol.titleZh,idol.titleKo,idol.titleEn]
        .some(function(s){ return s && s.toLowerCase().indexOf(q) !== -1; });
    });
    if (state.sort === 'rank') {
      list = list.slice().sort(function(a,b){ return a.rank - b.rank; });
    }

    $id('result-count').textContent = t.count(list.length);

    // Cards
    var grid = $id('card-grid');
    if (list.length === 0) {
      grid.innerHTML = '<div class="no-results" style="font-family:' + font + '">' + t.noResults + '</div>';
    } else {
      grid.innerHTML = list.map(function(idol, i){
        var name  = idolName(idol, lang);
        var title = idolTitle(idol, lang);
        return '<article class="card" data-id="' + idol.id + '" style="animation:fadeInUp .45s ease ' + (i*0.06) + 's both;box-shadow:0 6px 32px rgba(0,0,0,.65),0 0 0 1px ' + idol.accent + '22">' +
          '<div class="card-img">' +
            '<div class="card-img-bg" style="background:' + idol.bg + '">' +
              '<span class="card-fallback-char" style="color:' + idol.accent + '">' + idol.name[0] + '</span>' +
            '</div>' +
            '<img class="card-cover" src="' + amazonImg(idol.asin) + '" alt="' + idol.name + '" onload="this.classList.add(\'loaded\')" onerror="this.style.display=\'none\'">' +
            '<div class="card-grad"></div>' +
            '<div class="card-hover-veil" style="background:linear-gradient(to top,' + idol.accent + '22,transparent)"></div>' +
            '<div class="card-rank" style="border:1px solid ' + idol.accent + '55;color:' + idol.accent + '">#' + idol.rank + '</div>' +
            '<div class="card-tag" style="background:' + idol.accent + '">' + idol.tag[lang] + '</div>' +
            '<div class="card-yt-badge"><svg width="8" height="8" viewBox="0 0 10 10" fill="white"><polygon points="0,0 10,5 0,10"/></svg> 動画あり</div>' +
            '<div class="card-title-text" style="font-family:' + font + '">' + title + '</div>' +
          '</div>' +
          '<div class="card-body">' +
            '<div class="card-name" style="font-family:' + font + '">' + name + '</div>' +
            '<div class="card-meta">' + idol.publisher + ' · ' + idol.release + '</div>' +
            '<div class="card-price" style="color:' + idol.accent + ';background:' + idol.accent + '18;border:1px solid ' + idol.accent + '35">' + idol.price + '</div>' +
          '</div>' +
        '</article>';
      }).join('');

      grid.querySelectorAll('.card').forEach(function(card){
        var idol = idols.find(function(x){ return x.id === +card.dataset.id; });
        card.addEventListener('click',      function(){ openModal(idol); });
        card.addEventListener('mousedown',  function(){ card.style.transform='scale(0.96)'; });
        card.addEventListener('mouseup',    function(){ card.style.transform=''; });
        card.addEventListener('mouseleave', function(){ card.style.transform=''; });
      });
    }

    // Tab bar
    $id('tabbar').innerHTML = NAV.map(function(item){
      return '<button class="tab-btn' + (item.active?' active':'') + '">' +
        '<span class="tab-icon">' + item.icon + '</span>' +
        '<span class="tab-label" style="font-family:' + font + '">' + t[item.key] + '</span>' +
        '</button>';
    }).join('');
  }

  // ════════════════════════════════════════════════════════════════════════
  // SEARCH
  // ════════════════════════════════════════════════════════════════════════
  $id('search-input').addEventListener('input', function(e){
    state.search = e.target.value;
    $id('search-clear').style.display = state.search ? 'flex' : 'none';
    render();
  });
  $id('search-clear').addEventListener('click', function(){
    state.search = '';
    $id('search-input').value = '';
    $id('search-clear').style.display = 'none';
    render();
  });

  // ════════════════════════════════════════════════════════════════════════
  // KEYBOARD
  // ════════════════════════════════════════════════════════════════════════
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      if (state.ytId)          closeYTPlayer();
      else if (state.selected) closeModal();
    }
  });

  // ════════════════════════════════════════════════════════════════════════
  // INIT
  // ════════════════════════════════════════════════════════════════════════
  render();

})();
