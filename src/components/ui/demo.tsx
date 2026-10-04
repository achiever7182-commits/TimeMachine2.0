import React from "react";
import { PoemAnimation, TemporalCoreCube } from "@/components/ui/3d-animation";

/**
 * 3D Temporal Core Animation Demo
 * Showcases the rotating 3D incident telemetry cube integrated with TimeMachine state.
 */
export default function Demo() {
  return (
    <div className="p-6 bg-[#020609] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <TemporalCoreCube
          incidentId="INC-2048"
          incidentTitle="Multi-stage Compromise via Stolen Credentials"
          stage="Lateral Movement"
          minute={18}
          currentTime="14:32:18"
          currentRisk="CRITICAL"
        />
      </div>
    </div>
  );
}

export { PoemAnimation };
