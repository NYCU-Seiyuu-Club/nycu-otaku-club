import type { ImageMetadata } from "astro";

import animeLogo from "../assets/clubs/logos/anime.webp";
import mangaLogo from "../assets/clubs/logos/manga.webp";
import vtuberLogo from "../assets/clubs/logos/vtuber.webp";
import boardgameLogo from "../assets/clubs/logos/boardgame.webp";
import rhythmgameLogo from "../assets/clubs/logos/rhythmgame.webp";
import cardgameLogo from "../assets/clubs/logos/cardgame.webp";
import jccLogo from "../assets/clubs/logos/jcc.webp";
import cosplayLogo from "../assets/clubs/logos/cosplay.webp";

export type ClubLinks = {
  website?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
  email?: string;
  /** Club-specific sign-up form (Google Form, custom site, etc.), shown as the primary CTA on the club page. */
  joinForm?: string;
};

export type Club = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  logo: ImageMetadata;
  /** Reserved for a future club mascot illustration; drop a file in
   *  src/assets/clubs/mascots/<slug>.webp and import it here when ready. */
  mascot?: ImageMetadata;
  room: string;
  links: ClubLinks;
};

// NOTE on data reliability (checked 2026-08-21, emails cross-checked 2026-08-22
// against clubportal.nycu.edu.tw/club/list/global, the official campus club directory):
// - manga / boardgame / rhythmgame / cardgame room numbers come from a single
//   source (校內社團入口網) and have not been independently cross-checked.
// - facebook links for rhythmgame / cardgame are new numeric-ID pages that
//   could not be verified by search; open them once and confirm before relying on them.
// - jcc has no fixed room number on record, only "every Wednesday night" in
//   the activity center (clubportal itself lists a joke Tokyo address for jcc's
//   room, obviously not real — ignored).
// - cosplay has no confirmed room number (clubportal says it has no clubroom at all).
// - anime / manga / rhythmgame / cardgame still have no known Instagram — none
//   turned up on clubportal either.
// Please double-check the flagged items with each club before treating this as final.
export const clubs: Club[] = [
  {
    slug: "anime",
    name: "動畫社",
    tagline: "陪你追番、辦上映會的動畫愛好者基地",
    description:
      "交大動畫社聚集喜歡日本動畫的同好，社課涵蓋新番討論、OP/ED 賞析與動畫鑑賞會，一起挖掘作品背後的細節與感動。",
    color: "#ef8354",
    logo: animeLogo,
    room: "活動中心 527",
    links: {
      website: "https://anime.nycu.cc",
      facebook: "https://www.facebook.com/nctuanime",
      email: "nctuanime@gmail.com",
    },
  },
  {
    slug: "manga",
    name: "漫畫社",
    tagline: "拿起筆，把喜歡的角色畫出來",
    description:
      "漫畫社以電繪與漫畫技巧教學為核心，透過社課分享分鏡、上色與角色設計心得，也會交流大家喜歡的漫畫作品。",
    color: "#6ea8fe",
    logo: mangaLogo,
    room: "活動中心 506",
    links: {
      facebook: "https://www.facebook.com/NCTUComicClub/",
      email: "nctucc.arcloli2@gmail.com",
    },
  },
  {
    slug: "vtuber",
    name: "虛擬偶像社",
    tagline: "把我們的油灑遍全世界，油 DAYO！",
    description:
      "交大 VTuber 社經營內容創作教學、社群經營與同好聯誼，並在 YouTube 頻道「青椒煉油廠」分享實作成果。",
    color: "#ff6fae",
    logo: vtuberLogo,
    room: "活動中心 537",
    links: {
      website: "https://nycu.moe",
      facebook: "https://www.facebook.com/nycu.vtuber",
      instagram: "https://www.instagram.com/nycu.vtuber/",
      email: "vtuber@nycu.moe",
      joinForm:
        "https://docs.google.com/forms/d/e/1FAIpQLScBX1FWQtAdBhxFU_PZGYEAnzFT2hpJTmq9ARMY5T8baEQvJw/viewform",
    },
  },
  {
    slug: "boardgame",
    name: "桌上遊戲社",
    tagline: "一張桌子，開一局就停不下來",
    description:
      "交大桌遊社透過定期社課帶大家認識各種類型的桌上遊戲，從輕鬆的派對遊戲到策略硬核作品都有機會玩到。",
    color: "#4fb286",
    logo: boardgameLogo,
    room: "活動中心 518",
    links: {
      facebook: "https://www.facebook.com/NCTUBG/",
      instagram: "https://www.instagram.com/nycubgc/",
      email: "nycu.boardgameclub@gmail.com",
    },
  },
  {
    slug: "rhythmgame",
    name: "音樂遊戲社",
    tagline: "跟著節奏，一起練譜面",
    description:
      "交大音樂遊戲社聚集喜歡音樂／節奏遊戲的同好，一起討論譜面、交流手法，也會相約挑戰紀錄。",
    color: "#b48cff",
    logo: rhythmgameLogo,
    room: "活動中心 533",
    links: {
      facebook: "https://www.facebook.com/profile.php?id=61565158105143",
      email: "drhuang0922@gmail.com",
    },
  },
  {
    slug: "cardgame",
    name: "卡牌遊戲社",
    tagline: "抽牌、佈局、決勝負",
    description:
      "交大卡牌遊戲社以集換式卡牌遊戲為主，社課會帶新手認識規則、練習構築牌組，也常舉辦社內對戰交流。",
    color: "#f2c14e",
    logo: cardgameLogo,
    room: "活動中心 530",
    links: {
      facebook: "https://www.facebook.com/profile.php?id=61556760723081",
      email: "nycutcgc@gmail.com",
    },
  },
  {
    slug: "jcc",
    name: "日本文化研究社",
    tagline: "從流行文化到傳統歷史，一起認識日本",
    description:
      "交大日本文化研究社下分偶像應援、流行文化、傳統文化、歷史地理四個次分組，社課於每週三晚上在活動中心舉行。",
    color: "#e0555f",
    logo: jccLogo,
    room: "尚無社辦",
    links: {
      website: "https://jcc.nycu.cc",
      facebook: "https://www.facebook.com/people/交大日本文化研究社/61591851335912/",
      instagram: "https://www.instagram.com/nycu.jcc/",
      x: "https://x.com/nycu_jcc",
      email: "nycu.seiyuu.club@gmail.com",
      joinForm: "https://join.jcc.nycu.cc/",
    },
  },
  {
    slug: "cosplay",
    name: "角色扮演社",
    tagline: "化妝、造型、拍照，把喜歡的角色變成自己",
    description:
      "交大角色扮演社分享化妝技巧、假髮造型與拍照修圖心得，也會集合社員的 cosplay 成果互相交流。",
    color: "#43c6d0",
    logo: cosplayLogo,
    room: "尚無社辦",
    links: {
      instagram: "https://www.instagram.com/nycu_cosplay_club/",
      email: "nycucosplayclub@gmail.com",
    },
  },
];

export function getClub(slug: string): Club | undefined {
  return clubs.find((club) => club.slug === slug);
}
