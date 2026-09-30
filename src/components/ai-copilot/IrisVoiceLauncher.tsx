import { Bot } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const IrisVoiceAgent = lazy(() =>
  import("./IrisVoiceAgent").then(({ IrisVoiceAgent: Component }) => ({ default: Component })),
);

export function IrisVoiceLauncher() {
  const [isActivated, setIsActivated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[2147483647]">
      {isActivated ? (
        <Suspense
          fallback={
            <section
              role="status"
              className="pointer-events-auto fixed bottom-4 right-4 rounded-xl border border-cyan-signal/40 bg-card/95 px-4 py-3 text-sm text-foreground shadow-panel"
            >
              Loading IRIS voice...
            </section>
          }
        >
          <IrisVoiceAgent autoStart />
        </Suspense>
      ) : (
        <button
          type="button"
          onClick={() => setIsActivated(true)}
          className="pointer-events-auto fixed bottom-4 right-4 grid size-14 place-items-center rounded-full border border-cyan-signal/60 bg-cyan-signal text-background shadow-[0_0_30px_color-mix(in_oklab,var(--cyan-signal)_35%,transparent)] transition-transform hover:scale-105 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Talk to IRIS by voice"
          title="Talk to IRIS by voice"
        >
          <Bot className="size-6" aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body,
  );
}
