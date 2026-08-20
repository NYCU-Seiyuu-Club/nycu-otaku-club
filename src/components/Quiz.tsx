import { useMemo, useState } from "react";
import { clubs, type Club } from "../data/clubs";

type ClubSlug = (typeof clubs)[number]["slug"];

type Option = {
  label: string;
  club: ClubSlug;
};

type Question = {
  prompt: string;
  options: Option[];
};

// Each question offers 4 of the 8 clubs as an option; across all 7 questions
// every club appears 3-4 times, so picking consistently for one club is
// enough to make it win. Feel free to rewrite prompts/options — the scoring
// logic just counts how many times each club's slug was picked.
const QUESTIONS: Question[] = [
  {
    prompt: "週五晚上，你比較想做什麼？",
    options: [
      { label: "窩著一口氣追完一整季新番", club: "anime" },
      { label: "打開繪圖軟體，畫下喜歡的角色", club: "manga" },
      { label: "揪朋友來一場桌遊夜，玩到捨不得回家", club: "boardgame" },
      { label: "練牌組、規劃套牌打法", club: "cardgame" },
    ],
  },
  {
    prompt: "你比較容易被什麼吸引？",
    options: [
      { label: "聲優的聲線和角色魅力", club: "anime" },
      { label: "直播主／VTuber 跟觀眾互動的瞬間", club: "vtuber" },
      { label: "一段譜面打到滿分的爽快感", club: "rhythmgame" },
      { label: "日本文化、語言背後的小知識", club: "jcc" },
    ],
  },
  {
    prompt: "朋友對你的印象是？",
    options: [
      { label: "手邊永遠有一枝筆和草稿本", club: "manga" },
      { label: "化妝、做道具、拍照都難不倒你", club: "cosplay" },
      { label: "是聚會桌遊局的靈魂人物", club: "boardgame" },
      { label: "鏡頭前完全不怯場", club: "vtuber" },
    ],
  },
  {
    prompt: "如果要在校內擺攤，你想負責什麼？",
    options: [
      { label: "辦動畫上映會、播精華片段", club: "anime" },
      { label: "開一桌，讓大家體驗抽卡對戰", club: "cardgame" },
      { label: "幫大家化裝、拍打卡照", club: "cosplay" },
      { label: "介紹日本文化小教室", club: "jcc" },
    ],
  },
  {
    prompt: "選一個你最想擁有的能力？",
    options: [
      { label: "下筆如有神，畫什麼像什麼", club: "manga" },
      { label: "手指極限操作，任何譜面都打得動", club: "rhythmgame" },
      { label: "口條超好，鏡頭前收放自如", club: "vtuber" },
      { label: "過目不忘，記得每部作品的細節", club: "anime" },
    ],
  },
  {
    prompt: "你的收藏欲主要花在？",
    options: [
      { label: "卡牌、稀有卡包", club: "cardgame" },
      { label: "桌遊本體、擴充包", club: "boardgame" },
      { label: "畫冊、原稿、同人誌", club: "manga" },
      { label: "周邊、模型，或是 cos 用的服裝道具", club: "cosplay" },
    ],
  },
  {
    prompt: "理想的社團聚會是？",
    options: [
      { label: "認識日本文化冷知識、交流語言", club: "jcc" },
      { label: "開實況、一起經營頻道", club: "vtuber" },
      { label: "大家一起連線尬分數", club: "rhythmgame" },
      { label: "排開桌子，一次跑好幾場遊戲", club: "boardgame" },
    ],
  },
];

function pickWinner(scores: Record<string, number>): Club {
  let winner = clubs[0]!;
  let best = -1;
  for (const club of clubs) {
    const score = scores[club.slug] ?? 0;
    if (score > best) {
      best = score;
      winner = club;
    }
  }
  return winner;
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const finished = step >= QUESTIONS.length;

  const winner = useMemo(() => (finished ? pickWinner(scores) : null), [finished, scores]);

  function choose(club: ClubSlug) {
    setScores((prev) => ({ ...prev, [club]: (prev[club] ?? 0) + 1 }));
    setStep((s) => s + 1);
  }

  function restart() {
    setScores({});
    setStep(0);
  }

  if (finished && winner) {
    return (
      <div className="flex w-full flex-col items-center rounded-2xl border border-border bg-surface p-6 text-center sm:p-10">
        <p className="text-sm font-bold text-ink-muted">測驗結果</p>

        <div className="mt-5 flex items-end gap-3">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-border sm:h-32 sm:w-32">
            <img src={winner.logo.src} alt={`${winner.name} 社徽`} className="h-full w-full object-cover" />
          </div>
          {/* Reserved mascot slot — see src/assets/clubs/mascots/README.md */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border text-center text-[11px] leading-tight text-ink-muted sm:h-24 sm:w-24">
            {winner.mascot ? (
              <img src={winner.mascot.src} alt={`${winner.name} 吉祥物`} className="h-full w-full object-cover" />
            ) : (
              <span>
                吉祥物
                <br />
                敬請期待
              </span>
            )}
          </div>
        </div>

        <h2 className="mt-6 text-2xl font-black">最適合你的社團是「{winner.name}」</h2>
        <p className="mt-1 text-sm font-bold" style={{ color: winner.color }}>
          {winner.tagline}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">{winner.description}</p>

        <a
          href={`/clubs/${winner.slug}/`}
          className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black text-canvas transition-opacity hover:opacity-90"
          style={{ backgroundColor: winner.color }}
        >
          加入{winner.name} →
        </a>

        <button
          type="button"
          onClick={restart}
          className="mt-4 text-sm text-ink-muted underline-offset-4 hover:underline"
        >
          重新測驗
        </button>
      </div>
    );
  }

  const question = QUESTIONS[step]!;

  return (
    <div className="flex w-full flex-col items-center rounded-2xl border border-border bg-surface p-6 sm:p-10">
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-canvas">
        <div
          className="h-full rounded-full bg-ink transition-[width] duration-300"
          style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <p className="self-start text-xs font-bold text-ink-muted">
        第 {step + 1} / {QUESTIONS.length} 題
      </p>
      <h2 className="mt-2 self-start text-xl font-black">{question.prompt}</h2>

      <div className="mt-6 flex w-full flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => choose(option.club)}
            className="rounded-xl border border-border bg-canvas px-5 py-3 text-left text-sm font-medium transition-colors hover:bg-surface-hover"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
