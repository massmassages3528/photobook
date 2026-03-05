// js/i18n.js — グローバル window.I18N に公開（ES Modules不使用）
window.I18N = (function () {
  'use strict';

  var LANGS = [
    { code: 'zh', label: '繁中',   flag: '🇹🇼' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'EN',     flag: '🇺🇸' },
  ];

  var T = {
    zh: {
      appTitle: '寫真集',
      appSub: '日本性感女神精選',
      searchPlaceholder: '搜尋女神姓名、作品名稱',
      count: function(n){ return '共 ' + n + ' 件'; },
      sortRank: '人氣排行', sortPrice: '價格排序',
      publisher: '出版社', release: '發售日', price: '參考售價',
      name: '女神姓名', titleLabel: '寫真集名稱',
      buyAmazon: '前往Amazon購買',
      ytLabel: '📹 幕後花絮影片', ytPlay: '再生する',
      noResults: '找不到相符的結果',
      navBooks: '寫真集', navSaved: '收藏', navCart: '購物車', navMe: '我的',
      langLabel: '語言',
    },
    ko: {
      appTitle: '화보집',
      appSub: '일본 그라비아 아이돌 특선',
      searchPlaceholder: '아이돌 이름 · 작품명 검색',
      count: function(n){ return '총 ' + n + '개'; },
      sortRank: '인기순', sortPrice: '가격순',
      publisher: '출판사', release: '발매일', price: '참고 가격',
      name: '아이돌 이름', titleLabel: '화보집 제목',
      buyAmazon: 'Amazon에서 구매하기',
      ytLabel: '📹 메이킹 영상', ytPlay: '재생',
      noResults: '결과가 없습니다',
      navBooks: '화보집', navSaved: '찜', navCart: '장바구니', navMe: '마이',
      langLabel: '언어',
    },
    en: {
      appTitle: 'Photo Books',
      appSub: 'Japan Gravure Idol Collection',
      searchPlaceholder: 'Search by idol name or title…',
      count: function(n){ return n + ' items'; },
      sortRank: 'Popular', sortPrice: 'Price',
      publisher: 'Publisher', release: 'Release', price: 'Price',
      name: 'Idol Name', titleLabel: 'Title',
      buyAmazon: 'Buy on Amazon',
      ytLabel: '📹 Making Video', ytPlay: 'Play',
      noResults: 'No results found',
      navBooks: 'Books', navSaved: 'Saved', navCart: 'Cart', navMe: 'Me',
      langLabel: 'Language',
    },
  };

  function fontFamily(lang) {
    if (lang === 'ko') return "'Noto Sans KR', sans-serif";
    if (lang === 'zh') return "'Noto Serif TC', serif";
    return "'Cormorant Garamond', serif";
  }
  function idolName(idol, lang) {
    return lang === 'zh' ? idol.nameZh : lang === 'ko' ? idol.nameKo : idol.nameEn;
  }
  function idolTitle(idol, lang) {
    return lang === 'zh' ? idol.titleZh : lang === 'ko' ? idol.titleKo : idol.titleEn;
  }

  return { LANGS: LANGS, T: T, fontFamily: fontFamily, idolName: idolName, idolTitle: idolTitle };
})();
