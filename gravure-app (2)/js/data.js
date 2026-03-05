// js/data.js — グローバル window.DATA に公開（ES Modules不使用）
window.DATA = (function () {
  'use strict';

  var ASSOCIATE_ID = 'yoursite-22';

  function affiliateLink(asin) {
    return 'https://www.amazon.co.jp/dp/' + asin + '/ref=nosim?tag=' + ASSOCIATE_ID;
  }
  function amazonImg(asin) {
    return 'https://images-na.ssl-images-amazon.com/images/P/' + asin + '.01.LZZZZZZZ.jpg';
  }

  var idols = [
    {
      id:1, rank:1,
      name:'加藤玲菜', reading:'かとうれな',
      nameZh:'加藤玲菜', nameKo:'카토 레나', nameEn:'Rena Kato',
      title:'日本一、ビキニが似合う19歳',
      titleZh:'日本第一適合比基尼的19歲',
      titleKo:'일본 최고, 비키니가 어울리는 19세',
      titleEn:"Japan's #1 Bikini Body at 19",
      publisher:'集英社 週プレ', release:'2026.02', price:'デジタル版',
      asin:'B0GLX9WVS4', accent:'#FF4081', bg:'#1a0010',
      tag:{zh:'2026新星', ko:'2026 신성', en:'2026 RISING'},
      desc:{
        zh:'現役護理系學生兼寫真女神，以「かとれな」暱稱在SNS爆紅。19歲清純外表下蘊藏驚人魅力，2026年格拉維亞界最受矚目的新生代。',
        ko:"현역 간호학과 학생이자 그라비아 여신. SNS에서 'かとれな'라는 애칭으로 폭발적 인기. 2026년 그라비아계 최고 주목주.",
        en:"Active nursing student turned gravure sensation. Known as 'Katorena' online — 19 years old and already 2026's most-watched newcomer.",
      },
      youtubeId:'zhzqdUJl0z8',
    },
    {
      id:2, rank:2,
      name:'豊島心桜', reading:'とよしまこころ',
      nameZh:'豐島心櫻', nameKo:'토요시마 코코사', nameEn:'Kokosa Toyoshima',
      title:'心桜ばかり', titleZh:'滿滿都是心櫻', titleKo:'온통 코코사', titleEn:'All About Kokosa',
      publisher:'集英社', release:'2023.09.29', price:'¥3,300',
      asin:'4087901874', accent:'#FF80AB', bg:'#1a0014',
      tag:{zh:'1st寫真集', ko:'1st 화보집', en:'DEBUT BOOK'},
      desc:{
        zh:'清純外表下藏著令人心動的魅力。1st寫真集在巴里島拍攝，充滿青春活力，完全展現了她最自然、最真實的一面。',
        ko:'청순한 외모 속에 숨겨진 설레는 매력. 1st 화보집은 발리에서 촬영, 가장 자연스럽고 생생한 모습을 담아냈다.',
        en:'Beneath her innocent looks lies a captivating allure. Her debut photobook shot in Bali captures her most natural, authentic self.',
      },
      youtubeId:'g99mPsdrXS8',
    },
    {
      id:3, rank:3,
      name:'沢口愛華', reading:'さわぐちあいか',
      nameZh:'澤口愛華', nameKo:'사와구치 아이카', nameEn:'Aika Sawaguchi',
      title:'でらあいか', titleZh:'超愛愛華', titleKo:'데라아이카', titleEn:'Dera Aika',
      publisher:'講談社', release:'2019.03.27', price:'¥3,080',
      asin:'4065150280', accent:'#FF6F00', bg:'#160900',
      tag:{zh:'Miss雜誌冠軍', ko:'미스매거진 그랑프리', en:'MISS MAG GRAND PRIX'},
      desc:{
        zh:'2018年Miss Magazine冠軍。在夏威夷與名古屋故鄉拍攝，「でら」是名古屋方言的「超級」，純真魅力滿溢的1st寫真集。',
        ko:'미스 매거진 2018 그랑프리. 하와이와 나고야에서 촬영. 「でら」는 나고야 방언으로 「매우」, 순수한 매력이 넘치는 1st 화보집.',
        en:"Miss Magazine 2018 Grand Prix. Shot in Hawaii and Nagoya. 'Dera' means 'super' in the Nagoya dialect — a sparkling debut full of charm.",
      },
      youtubeId:'6qGpsTpw5Pw',
    },
    {
      id:4, rank:4,
      name:'菊地姫奈', reading:'きくちひな',
      nameZh:'菊地姬奈', nameKo:'기쿠치 히나', nameEn:'Hina Kikuchi',
      title:'memory', titleZh:'memory', titleKo:'메모리', titleEn:'memory',
      publisher:'講談社', release:'2025.03.19', price:'¥3,300',
      asin:'4065379857', accent:'#00BCD4', bg:'#001418',
      tag:{zh:'2024年度グランプリ', ko:'2024 그랑프리', en:'2024 GRAND PRIX'},
      desc:{
        zh:'グラジャパ！アワード2024グランプリ。3rd写真集『memory』初版3万部が即重版。令和グラビア界の頂点に君臨。',
        ko:'그라지아파 어워드 2024 그랑프리. 3rd 화보집 『memory』 초판 3만 부 즉시 증쇄. 레이와 그라비아계 정점.',
        en:"Grajapa Award 2024 Grand Prix. 3rd photobook 'memory' sold 30,000 copies instantly — the undisputed queen of Reiwa gravure.",
      },
      youtubeId:'xxKhGGn-JOE',
    },
    {
      id:5, rank:5,
      name:'溝端葵', reading:'みぞばたあおい',
      nameZh:'溝端葵', nameKo:'미조바타 아오이', nameEn:'Aoi Mizobata',
      title:'ガチでブレイクする5秒前', titleZh:'爆紅前的5秒鐘',
      titleKo:'진짜 브레이크하기 5초 전', titleEn:'5 Seconds Before Breaking Through',
      publisher:'集英社 週プレ', release:'2025.03', price:'デジタル版',
      asin:'B0DZM9ZRPJ', accent:'#00E676', bg:'#001a08',
      tag:{zh:'2025年グランプリ', ko:'2025 그랑프리', en:'2025 GRAND PRIX'},
      desc:{
        zh:'グラジャパ！アワード2025グランプリ。2025年3月デビュー即話題を席巻、同年6月には初表紙。笑顔と圧倒的スタイルで2025年最大ブレイク。',
        ko:'그라지아파 어워드 2025 그랑프리. 2025년 3월 데뷔 즉시 화제 석권, 6월 첫 표지. 웃음과 압도적 스타일로 2025년 최대 브레이크.',
        en:'Grajapa Award 2025 Grand Prix. Debuted March 2025, first cover by June — the biggest breakout of 2025.',
      },
      youtubeId:'6qUT0vdyCW8',
    },
    {
      id:6, rank:6,
      name:'高野真央', reading:'たかのまお',
      nameZh:'高野真央', nameKo:'타카노 마오', nameEn:'Mao Takano',
      title:'恋の温度が1℃上がった瞬間', titleZh:'戀愛溫度升高1℃的瞬間',
      titleKo:'사랑의 온도가 1℃ 오른 순간', titleEn:'The Moment Love Rose 1°C',
      publisher:'集英社 週プレ', release:'2025.12', price:'デジタル版',
      asin:'B0G57RRNMZ', accent:'#F50057', bg:'#1a0008',
      tag:{zh:'ガチ恋必至', ko:'진심 연애 각', en:'MUST FALL IN LOVE'},
      desc:{
        zh:'天然魅力讓人不知不覺認真愛上。豐滿撩人的身材與迷人笑靨令無數粉絲心甘情願淪陷。SNS上被粉絲譽為「最讓人ガチ恋的女神」。',
        ko:'자연스럽게 진심으로 빠져들게 만드는 천연 매력. 풍만한 몸매와 매혹적인 미소로 수많은 팬을 진심 연애시키는 여신.',
        en:"Her natural charm pulls you in before you realize it. With an irresistible figure and warm smile, she's the idol fans genuinely fall in love with.",
      },
      youtubeId:'hGcheAKMyN8',
    },
    {
      id:7, rank:7,
      name:'東雲うみ', reading:'しののめうみ',
      nameZh:'东云海', nameKo:'시노노메 우미', nameEn:'Umi Shinonome',
      title:'きみはうみがすき', titleZh:'你喜歡大海嗎',
      titleKo:'너는 바다를 좋아해', titleEn:'Do You Love the Sea?',
      publisher:'トランスワールドジャパン', release:'2023.04', price:'¥3,300',
      asin:'B0BTM173N4', accent:'#00B0FF', bg:'#001a2e',
      tag:{zh:'二刀流女神', ko:'이도류 여신', en:'DUAL WEAPON GODDESS'},
      desc:{
        zh:'Gカップバストと100cmヒップを誇る「グラビア界の二刀流」。その豊かすぎる曲線美でSNSを席巻し、重版を重ねるほどの人気を誇るグラビア女王。',
        ko:'G컵 바스트와 100cm 힙을 자랑하는 "그라비아계의 이도류". 넘쳐흐르는 곡선미로 SNS를 석권, 중쇄를 거듭하는 그라비아 여왕.',
        en:"Dubbed the 'dual weapon' of gravure, she wields a G-cup bust and 100cm hips with devastating effect.",
      },
      youtubeId:'6TYR82SV6k0',
    },
    {
      id:8, rank:8,
      name:'葉月くれあ', reading:'はづきくれあ',
      nameZh:'叶月光', nameKo:'하즈키 쿠레아', nameEn:'Kurea Hazuki',
      title:'clarus', titleZh:'clarus（光明）', titleKo:'clarus（빛나는）', titleEn:'clarus',
      publisher:'講談社', release:'2025.08', price:'¥3,278',
      asin:'4065410819', accent:'#FFD700', bg:'#1a1500',
      tag:{zh:'ミスマガ女王', ko:'미스마가 그랑프리', en:'MISS MAGAZINE QUEEN'},
      desc:{
        zh:'「ミスマガジン2024」グランプリ受賞の史上最年長グランプリ。TikTokフォロワー急増、映画初出演も決定。あざと可愛さと大人っぽさが共存する次世代スター。',
        ko:'「미스마가진 2024」 그랑프리 역대 최연장 수상자. TikTok 팔로워 폭증, 영화 데뷔도 확정.',
        en:"Miss Magazine 2024's oldest-ever grand prize winner. TikTok following exploded overnight — dangerously cute and charmingly calculated about it.",
      },
      youtubeId:'y88OomGn42Q',
    },
    {
      id:9, rank:9,
      name:'田中美久', reading:'たなかみく',
      nameZh:'田中美久', nameKo:'타나카 미쿠', nameEn:'Miku Tanaka',
      title:'ぜんぶ、ほんと', titleZh:'全部，都是真心', titleKo:'전부, 진짜야', titleEn:'All of It Is Real',
      publisher:'集英社', release:'2026.03', price:'¥3,300',
      asin:'4087902161', accent:'#FF6B6B', bg:'#1a0505',
      tag:{zh:'令和最強ボディ', ko:'레이와 최강 바디', en:'REIWA BODY GODDESS'},
      desc:{
        zh:'元HKT48の「令和のグラビアヴィーナス」。ポルトガルロケの3rd写真集で過去最大露出に挑戦。女優業でも頭角を現す。',
        ko:'전 HKT48의 "레이와 그라비아 비너스". 포르투갈 로케 3rd 사진집에서 역대 최고 노출에 도전. 배우로도 두각.',
        en:"Former HKT48's 'Venus of the Reiwa era.' Third photobook shot in Portugal — her relentlessly sculpted body is considered Japan's finest.",
      },
      youtubeId:'S1RqitsyDWE',
    },
    {
      id:10, rank:10,
      name:'本郷柚巴', reading:'ほんごうゆずは',
      nameZh:'本乡柚巴', nameKo:'혼고 유즈하', nameEn:'Yuzuha Hongo',
      title:'いつのまに、', titleZh:'不知不覺間，', titleKo:'어느새，', titleEn:'Before I Knew It,',
      publisher:'講談社', release:'2025.12', price:'¥3,300',
      asin:'4065419743', accent:'#FF9100', bg:'#1a0d00',
      tag:{zh:'グラビアシンデレラ', ko:'그라비아 신데렐라', en:'GRAVURE CINDERELLA'},
      desc:{
        zh:'元NMB48の「グラビアシンデレラ」が活動10周年でカナダ・バンクーバーから新境地を届ける。笑顔と色気の両立で女性ファンをも虜にする。',
        ko:'전 NMB48의 "그라비아 신데렐라"가 활동 10주년을 맞아 캐나다 밴쿠버에서 새로운 경지를 선보인다.',
        en:"Former NMB48's 'Gravure Cinderella' celebrates 10 years with her boldest Vancouver shoot yet.",
      },
      youtubeId:'b0en2DiR29M',
    },
    {
      id:11, rank:11,
      name:'榎原依那', reading:'えのはらいな',
      nameZh:'榎原依那', nameKo:'에노하라 이나', nameEn:'Ina Enohara',
      title:'I am Ina', titleZh:'我就是依那', titleKo:'나는 이나', titleEn:'I am Ina',
      publisher:'講談社', release:'2025.12', price:'¥3,300',
      asin:'406541654X', accent:'#00E5FF', bg:'#00101a',
      tag:{zh:'令和の国宝BODY', ko:'레이와의 국보 바디', en:'NATIONAL TREASURE BODY'},
      desc:{
        zh:'デビュー5ヶ月でFRIDAY完売・重版を連発した「グラビア界の超新星」。グラデミー賞MVG（大賞）を受賞した令和最注目のボディ。',
        ko:'데뷔 5개월에 FRIDAY 완판·중쇄를 연발한 "그라비아계의 초신성". 그라데미상 MVG(대상) 수상.',
        en:"The 'supernova' who sold out FRIDAY within months of debut and picked up the Grademie Award's grand prize.",
      },
      youtubeId:'82KJeb8Mib0',
    },
    {
      id:12, rank:12,
      name:'南みゆか', reading:'みなみみゆか',
      nameZh:'南美结花', nameKo:'미나미 미유카', nameEn:'Miyuka Minami',
      title:'南風', titleZh:'南風', titleKo:'남풍（南風）', titleEn:'Southern Wind',
      publisher:'秋田書店', release:'2024.07', price:'¥3,300',
      asin:'4253011268', accent:'#76FF03', bg:'#061a00',
      tag:{zh:'現役JK最強ボディ', ko:'현역 JK 최강 바디', en:'STRONGEST JK BODY'},
      desc:{
        zh:'三重県出身の次世代アイドルグラドル。現役JK最強ボディと称され、フィリピンロケのファースト写真集で少女と大人の境界を鮮烈に刻み込む。',
        ko:'미에현 출신의 차세대 아이돌 그라비아. 현역 JK 최강 바디로 불리며 필리핀 로케 1st 사진집.',
        en:"The next-gen idol-gravure hybrid from Mie. Her Philippines debut photobook captures the electric moment between girlhood and womanhood.",
      },
      youtubeId:'7tkBCkBZ3gw',
    },
  ];

  return { idols: idols, affiliateLink: affiliateLink, amazonImg: amazonImg };
})();
