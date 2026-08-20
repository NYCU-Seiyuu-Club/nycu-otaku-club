# 國立陽明交通大學 宅文化連合

以 [Astro](https://astro.build) + [React](https://react.dev) 建構的社團聯合網站，部署於 GitHub Pages。網站網址為 https://otaku.nycu.cc。

## 版本紀錄

| 項目 | 版本 |
| :--- | :--- |
| Node 版本管理工具 | fnm 1.38.1 |
| Node | v23.11.1 |
| 套件管理工具 | pnpm 11.13.1（透過 `corepack enable` + `corepack prepare pnpm@latest --activate` 啟用） |
| astro | 7.2.4 |
| react | 19.2.8 |
| react-dom | 19.2.8 |
| @astrojs/react | 6.0.4 |
| tailwindcss | 4.3.3 |
| sharp | 0.35.3（僅用於本機把社團 LOGO 裁切成正方形 webp，跑完 build 不會用到） |

> 版本更新時請記得同步修改本表格，以及 `package.json` 的 `"packageManager"` 欄位。

## 專案結構

```text
/
├── .github/
│   └── workflows/
│       └── deploy.yml       # 推送到 main 分支時自動 build 並部署到 GitHub Pages
├── public/                   # 靜態資源（favicon、CNAME）
├── src/
│   ├── assets/
│   │   └── clubs/
│   │       ├── logos/        # 8 個社團的 LOGO（512x512 webp）
│   │       └── mascots/      # 預留：各社團吉祥物圖片，檔名對應 slug
│   ├── components/
│   │   ├── ClubCard.astro       # 首頁的社團連結卡片
│   │   ├── OrientationBanner.astro  # 首頁最上方、可收合的迎新期間限定橫幅
│   │   └── Quiz.tsx              # 測驗頁的計分互動元件（React island）
│   ├── data/
│   │   ├── clubs.ts          # 8 個社團的資料（介紹、社色、社辦、社群連結、LOGO）
│   │   └── orientation.ts    # 迎新場次資料（日期、社團、時間、地點）
│   ├── layouts/
│   │   └── Layout.astro      # 共用版型，引入全域樣式
│   ├── pages/
│   │   ├── index.astro                # 首頁（Linktree 風格社團卡片牆）
│   │   ├── clubs/[slug].astro         # 單一社團頁（靜態產生 8 頁）
│   │   └── quiz/index.astro           # 社團測驗頁
│   └── styles/
│       └── global.css        # Tailwind 進入點 + 深色主題色彩變數
├── astro.config.mjs           # Astro 設定（含自訂網域用的 site）
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml         # 允許 esbuild / sharp 的 postinstall 腳本執行
└── tsconfig.json               # TypeScript strict 設定
```

新增社團或修改資料時，改 `src/data/clubs.ts`、`src/data/orientation.ts` 就好，不用動到頁面樣板。

## 本機開發

```sh
pnpm install   # 安裝依賴
pnpm dev       # 啟動本機開發伺服器（預設 http://localhost:4321）
pnpm build     # 建置正式版靜態網站到 ./dist/
pnpm preview   # 在本機預覽 build 後的結果
```

## 部署

本專案使用官方的 [`withastro/action`](https://github.com/withastro/action)，推送到 `main` 分支時會自動建置並部署到 GitHub Pages（設定於 `.github/workflows/deploy.yml`），可以在 repo 的 **Actions** 頁籤查看部署進度與結果。

本站使用自訂網域 `otaku.nycu.cc`（DNS 指向 `nycu-seiyuu-club.github.io`），`astro.config.mjs` 的 `site` 設為 `https://otaku.nycu.cc`，自訂網域跑在網域根目錄所以不需要 `base`。`public/CNAME` 內容為 `otaku.nycu.cc`，build 時會一併輸出到 `dist/CNAME`，GitHub Pages 靠這個檔案辨識綁定的網域。
