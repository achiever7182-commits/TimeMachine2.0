import { memo } from "react";
import { chapterIds, chapterIndex } from "../engine/storyState";
import type { ChapterId } from "../engine/storyState";
import { useStory } from "../engine/StoryContext";

const RAIL_LABELS: Record<ChapterId, { n: string; label: string }> = {
  hero: { n: "00", label: "WELCOME" },
  system_online: { n: "01", label: "ONLINE" },
  intrusion: { n: "02", label: "INTRUSION" },
  attack: { n: "03", label: "ATTACK" },
  rewind: { n: "04", label: "REWIND" },
  reconstruction: { n: "05", label: "1st MOVE" },
  trace: { n: "06", label: "TRACE" },
  response: { n: "07", label: "COUNTER" },
  simulation: { n: "08", label: "FIGHT BACK" },
  defense: { n: "09", label: "DEFENSE" },
  secured: { n: "10", label: "SECURED" },
  finale: { n: "11", label: "FINALE" },
};

export const ChapterRail = memo(function ChapterRail() {
  const { frame, scrollToChapter } = useStory();
  const currentIdx = chapterIndex(frame.chapter);
  const ids = chapterIds();

  const navRail = ids.filter((_, i) => i > 0 && !(i > 8 && i < 11)) as ChapterId[];
  const visible = [
    "system_online",
    "intrusion",
    "attack",
    "rewind",
    "reconstruction",
    "trace",
    "response",
    "defense",
    "secured",
    "finale",
  ] as const;

  return (
    <nav className="tm-rail" aria-label="Cinematic chapters">
      <ol>
        {(visible as unknown as ChapterId[]).map((id) => {
          const isCurrent = currentIdx === chapterIndex(id);
          const info = RAIL_LABELS[id];
          return (
            <li key={id}>
              <button
                type="button"
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => scrollToChapter(id, { smooth: true })}
                title={`Go to chapter ${info.n} — ${info.label}`}
              >
                <span className="tm-rail-dot" aria-hidden />
                <span className="tm-font-mono tm-rail-label">{info.n}</span>
                <span className="tm-rail-label">{info.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
