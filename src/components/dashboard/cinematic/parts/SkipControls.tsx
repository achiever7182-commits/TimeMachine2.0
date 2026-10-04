import { memo } from "react";
import { useStory } from "../engine/StoryContext";
import { SOUND_STORAGE_KEY, SKIPPED_STORAGE_KEY } from "../tokens";
import { useBooleanStorage } from "../engine/StoryContext";

export const SkipControls = memo(function SkipControls() {
  const { skip, frame, soundEnabled, setSoundEnabled } = useStory();
  const showSkip = frame.chapter !== "hero";
  return (
    <div className="tm-skip-bar">
      <button
        type="button"
        className="tm-btn"
        onClick={skip}
        title="Skip cinematic and enter the operational Dashboard view."
      >
        {showSkip ? "Skip intro / Enter operational view" : "Go to operational Dashboard"}
      </button>
      <SoundToggle enabled={soundEnabled} onChange={setSoundEnabled} />
    </div>
  );
});

interface SoundToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
}

function SoundToggle({ enabled, onChange }: SoundToggleProps) {
  // Use same storage key so top-level and inner toggle are in sync
  useBooleanStorage(SOUND_STORAGE_KEY, false);
  void SKIPPED_STORAGE_KEY;
  return (
    <button
      type="button"
      className="tm-btn"
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      title="Toggle sound (off by default, no autoplay)"
    >
      <span className="tm-font-mono">SOUND</span>
      <span className="tabular-nums">{enabled ? "ON" : "OFF"}</span>
    </button>
  );
}
