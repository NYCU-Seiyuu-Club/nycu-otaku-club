# Club mascots (reserved)

Drop each club's mascot illustration here as `<slug>.webp` (square, same
slugs as in `src/data/clubs.ts`: anime, manga, vtuber, boardgame,
rhythmgame, cardgame, jcc, cosplay).

Then in `src/data/clubs.ts`:

```ts
import animeMascot from "../assets/clubs/mascots/anime.webp";
// ...
{
  slug: "anime",
  // ...
  mascot: animeMascot,
}
```

The club detail page and quiz result already reserve layout space for
`mascot` and will render it automatically once it's set — no template
changes needed.
