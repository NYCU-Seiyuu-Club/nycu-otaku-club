export type OrientationEvent = {
  date: string; // ISO date, e.g. "2026-09-10"
  weekday: string; // e.g. "四"
  clubSlug: string;
  time: string;
  location: string;
};

// 2026 迎新期間限定資訊。活動全部結束後，可以直接清空這個陣列或整段拿掉首頁的
// OrientationBanner 元件。
export const orientationEvents: OrientationEvent[] = [
  { date: "2026-09-10", weekday: "四", clubSlug: "cardgame", time: "19:00-22:00", location: "綜合一館 A203" },
  { date: "2026-09-11", weekday: "五", clubSlug: "boardgame", time: "19:00-22:00", location: "綜合一館 A203" },
  { date: "2026-09-14", weekday: "一", clubSlug: "jcc", time: "19:00-22:00", location: "綜合一館 A203" },
  { date: "2026-09-15", weekday: "二", clubSlug: "manga", time: "19:00-22:00", location: "綜合一館 A203" },
  { date: "2026-09-16", weekday: "三", clubSlug: "rhythmgame", time: "19:00-22:00", location: "綜合一館 A203" },
  { date: "2026-09-16", weekday: "三", clubSlug: "cosplay", time: "19:00-22:00", location: "綜合一館 A203" },
  { date: "2026-09-17", weekday: "四", clubSlug: "vtuber", time: "19:00-22:00", location: "綜合一館 A203" },
  { date: "2026-09-23", weekday: "三", clubSlug: "anime", time: "19:00-22:00", location: "綜合一館 A203" },
];

export const orientationRange = {
  start: orientationEvents[0]!.date,
  end: orientationEvents[orientationEvents.length - 1]!.date,
};
