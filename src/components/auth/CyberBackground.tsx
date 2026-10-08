import React, { useEffect, useRef } from "react";

interface Node {
  id: string;
  label: string;
  type: "endpoint" | "server" | "database" | "threat" | "gateway";
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulsePhase: number;
  isThreat?: boolean;
}

interface Packet {
  sourceIndex: number;
  targetIndex: number;
  progress: number;
  speed: number;
  isThreat?: boolean;
}

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    // Initial node definitions
    let nodes: Node[] = [];
    let packets: Packet[] = [];

    const initNodes = () => {
      const nodeCount = Math.max(14, Math.min(28, Math.floor(width / 60)));
      nodes = [];
      packets = [];

      const types: Array<Node["type"]> = ["endpoint", "server", "database", "gateway", "server"];
      const names = [
        "EP-104",
        "EP-209",
        "SRV-CORP-01",
        "DB-SQL-PROD",
        "GW-EDGE-01",
        "FW-DMZ-02",
        "AUTH-SRV-01",
        "KUBE-NODE-4",
        "SIEM-COLLECT-01",
        "DNS-CACHE",
        "EP-334",
        "EP-812",
        "DB-REPLICA-02",
        "API-GATEWAY-1",
      ];

      for (let i = 0; i < nodeCount; i++) {
        const isThreatNode = i === 3; // Exactly 1 subtle threat node
        nodes.push({
          id: `node-${i}`,
          label: isThreatNode ? "THREAT-ACTOR-X" : names[i % names.length] || `EP-${100 + i}`,
          type: isThreatNode ? "threat" : (types[i % types.length] ?? "server"),
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          pulsePhase: Math.random() * Math.PI * 2,
          isThreat: isThreatNode,
        });
      }

      // Initial packets
      for (let i = 0; i < 8; i++) {
        packets.push({
          sourceIndex: Math.floor(Math.random() * nodeCount),
          targetIndex: Math.floor(Math.random() * nodeCount),
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          isThreat: i === 0,
        });
      }
    };

    initNodes();

    let scanBeamY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep cyber background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#020609");
      bgGrad.addColorStop(0.5, "#03080D");
      bgGrad.addColorStop(1, "#050B11");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle digital perspective grid
      ctx.strokeStyle = "rgba(0, 229, 255, 0.025)";
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Horizontal Scanning Beam
      if (!prefersReducedMotion) {
        scanBeamY = (scanBeamY + 0.8) % (height + 100);
      } else {
        scanBeamY = height * 0.5;
      }

      const scanGrad = ctx.createLinearGradient(0, scanBeamY - 40, 0, scanBeamY + 40);
      scanGrad.addColorStop(0, "rgba(0, 229, 255, 0)");
      scanGrad.addColorStop(0.5, "rgba(0, 229, 255, 0.035)");
      scanGrad.addColorStop(1, "rgba(0, 229, 255, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanBeamY - 40, width, 80);

      // Thin bright leading line of scan beam
      ctx.strokeStyle = "rgba(0, 229, 255, 0.07)";
      ctx.beginPath();
      ctx.moveTo(0, scanBeamY);
      ctx.lineTo(width, scanBeamY);
      ctx.stroke();

      // Draw connection lines between nearby nodes
      const maxDistance = Math.min(220, width * 0.2);
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        if (!ni) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          if (!nj) continue;
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            const involvesThreat = ni.isThreat || nj.isThreat;

            ctx.strokeStyle = involvesThreat
              ? `rgba(255, 42, 42, ${alpha * 1.5})`
              : `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update packets traveling along lines
      packets.forEach((p) => {
        const s = nodes[p.sourceIndex];
        const t = nodes[p.targetIndex];
        if (!s || !t) return;

        if (!prefersReducedMotion) {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.sourceIndex = Math.floor(Math.random() * nodes.length);
            p.targetIndex = Math.floor(Math.random() * nodes.length);
          }
        }

        const px = s.x + (t.x - s.x) * p.progress;
        const py = s.y + (t.y - s.y) * p.progress;

        ctx.fillStyle = p.isThreat ? "#FF2A2A" : "#00E5FF";
        ctx.shadowColor = p.isThreat ? "rgba(255, 42, 42, 0.8)" : "rgba(0, 229, 255, 0.8)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw and update nodes
      nodes.forEach((n) => {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          n.pulsePhase += 0.02;

          // Bounce off screen boundaries gently
          if (n.x < 20 || n.x > width - 20) n.vx *= -1;
          if (n.y < 20 || n.y > height - 20) n.vy *= -1;
        }

        const pulse = (Math.sin(n.pulsePhase) + 1) / 2;
        const nodeColor = n.isThreat ? "#FF2A2A" : "#00E5FF";
        const ringColor = n.isThreat
          ? `rgba(255, 42, 42, ${0.15 + pulse * 0.25})`
          : `rgba(0, 229, 255, ${0.1 + pulse * 0.15})`;

        // Outer pulse ring
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4 + pulse * 6, 0, Math.PI * 2);
        ctx.stroke();

        // Node center
        ctx.fillStyle = nodeColor;
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.isThreat ? 3 : 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Subtle tech label
        ctx.fillStyle = n.isThreat ? "rgba(255, 42, 42, 0.45)" : "rgba(0, 229, 255, 0.35)";
        ctx.font = "9px 'JetBrains Mono', 'IBM Plex Mono', monospace";
        ctx.fillText(n.label, n.x + 8, n.y + 3);
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Canvas rendering network graph, packets, and scanning beam */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Radial vignette mask to focus attention towards content */}
      <div
        className="absolute inset-0 bg-radial from-transparent via-[#020609]/60 to-[#020609]/95"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 20%, rgba(2, 6, 9, 0.8) 75%, #020609 100%)",
        }}
      />

      {/* Ambient Cyber Data Streams */}
      <div className="absolute inset-0 flex justify-between px-6 opacity-15 overflow-hidden font-mono text-[9px] text-cyan-400 select-none">
        <div className="flex flex-col gap-1">
          <span>0x7F4A [AUTH]</span>
          <span>10.14.2.89</span>
          <span>SHA: c4a8e2</span>
          <span>EVT_2048</span>
          <span>TID_9041</span>
          <span>TLS_1.3_AES</span>
          <span>INIT_STREAM</span>
          <span>FRAME_0029</span>
        </div>
        <div className="hidden md:flex flex-col gap-1">
          <span>PORT: 443 [SYN]</span>
          <span>PKT_LEN: 1420</span>
          <span>RECON_ENGINE</span>
          <span>TIMEMACHINE_V2</span>
          <span>CHRONO_SYNC</span>
          <span>0xDEADBEEF</span>
          <span>DELTA: +0.02ms</span>
          <span>ROOT_CAUSE_SEARCH</span>
        </div>
        <div className="hidden lg:flex flex-col gap-1 text-right">
          <span>MITRE_T1078</span>
          <span>PRIV_ESC_MONITOR</span>
          <span>EDR_TELEMETRY</span>
          <span>AGENT_READY</span>
          <span>SOC_NODE_ALPHA</span>
          <span>0x992B40</span>
          <span>TRACE_COMPLETE</span>
        </div>
      </div>

      {/* Background Timeline Element (Communicates TimeMachine Core Concept) */}
      <div className="absolute bottom-12 left-0 right-0 hidden md:flex items-center justify-center opacity-25 select-none pointer-events-none">
        <div className="flex items-center gap-6 font-mono text-[10px] text-cyan-400/80 bg-card px-6 py-2 border-y border-cyan-500/10">
          <span className="text-cyan-300 font-bold">2026-09-28 TIMELINE:</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-cyan-400"></span> AUTH
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-cyan-400"></span> PROCESS
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-cyan-400"></span> NETWORK
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-cyan-400"></span> FILE
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="flex items-center gap-1.5 text-threat">
            <span className="size-1.5 rounded-full bg-threat animate-ping"></span> ALERT
          </span>
        </div>
      </div>
    </div>
  );
}
