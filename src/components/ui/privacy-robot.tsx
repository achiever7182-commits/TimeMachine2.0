"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

// --- Curves & Materials (Adapted for TimeMachine) ---

class HeartCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  override getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}
const sharedHeartCurve = new HeartCurve();

// Base Materials matching TimeMachine (Graphite/Cyan)
const earBaseMat = new THREE.MeshStandardMaterial({
  color: "#111",
  roughness: 0.5,
});
const earRingMat = new THREE.MeshStandardMaterial({
  color: "#00d9ff",
  roughness: 0.3,
});
const earCenterMat = new THREE.MeshStandardMaterial({
  color: "#222",
  roughness: 0.8,
});
const antennaBaseMat = new THREE.MeshStandardMaterial({
  color: "#111",
  roughness: 0.4,
  metalness: 0.5,
});
const antennaStickMat = new THREE.MeshStandardMaterial({
  color: "#333",
  roughness: 0.4,
  metalness: 0.2,
});
const antennaTipMat = new THREE.MeshStandardMaterial({
  color: "#00d9ff",
  roughness: 0.2,
  toneMapped: false,
});
const eyeMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0, 2, 2.5), // Bright cyan eyes
  toneMapped: false,
  transparent: true,
});
const heartMat = new THREE.MeshBasicMaterial({
  color: "#00d9ff",
  toneMapped: false,
});

function ResponsiveGroup({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) {
  const { viewport } = useThree();
  const s = Math.min(1.1, viewport.width / 3.5) * scale;
  return <group scale={s}>{children}</group>;
}

function GlassCapsule({ color, power, intensity }: { color: string; power: number; intensity: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(color) },
      power: { value: power },
      intensity: { value: intensity },
    }),
    [color, power, intensity],
  );

  useFrame(() => {
    if (materialRef.current && materialRef.current.uniforms) {
      const u = materialRef.current.uniforms as Record<string, { value: unknown }>;
      if (u["color"]) (u["color"].value as THREE.Color).set(color);
      if (u["power"]) u["power"].value = power;
      if (u["intensity"]) u["intensity"].value = intensity;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[0.3, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function RobotEar({ position, scale = 1, isLeft = false }: { position: [number, number, number]; scale?: number; isLeft?: boolean }) {
  const dir = isLeft ? -1 : 1;
  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earBaseMat}>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>
      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earRingMat}>
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>
      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earCenterMat}>
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>
      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.01, 0]} castShadow receiveShadow material={antennaBaseMat}>
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow material={antennaStickMat}>
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh position={[0, 0.11, 0]} castShadow receiveShadow material={antennaTipMat}>
          <sphereGeometry args={[0.006, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

function RobotEye({
  position,
  rotation,
  scale = 1,
  blinkDuration = 0.15,
  blinkCycle = 3.0,
  isLovedRef,
  isAlertRef,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  blinkDuration?: number;
  blinkCycle?: number;
  isLovedRef: React.MutableRefObject<boolean>;
  isAlertRef: React.MutableRefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const normalEyesRef = useRef<THREE.Group>(null);
  const heartEyeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !normalEyesRef.current || !heartEyeRef.current) return;
    const isHeart = isLovedRef.current;
    const isAlert = isAlertRef.current;

    normalEyesRef.current.visible = !isHeart;
    heartEyeRef.current.visible = isHeart;

    const cycle = clock.getElapsedTime() % blinkCycle;
    let targetScaleY = 1;

    // Fast blink if not heart and not alert
    if (cycle < blinkDuration && !isHeart && !isAlert) {
      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);
      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
    }
    
    // Wide eyes if alert
    if (isAlert) targetScaleY = 1.3;

    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { topPath, bottomPath } = useMemo(() => {
    const w = 0.025;
    const h = 0.035;
    const r = 0.02;
    const g = 0.005;

    const tPath = new THREE.CurvePath<THREE.Vector3>();
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, g, 0), new THREE.Vector3(-w, h - r, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, h - r, 0), new THREE.Vector3(-w, h, 0), new THREE.Vector3(-w + r, h, 0)));
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, h, 0), new THREE.Vector3(w - r, h, 0)));
    tPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(w - r, h, 0), new THREE.Vector3(w, h, 0), new THREE.Vector3(w, h - r, 0)));
    tPath.add(new THREE.LineCurve3(new THREE.Vector3(w, h - r, 0), new THREE.Vector3(w, g, 0)));

    const bPath = new THREE.CurvePath<THREE.Vector3>();
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, -g, 0), new THREE.Vector3(-w, -(h - r), 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, -(h - r), 0), new THREE.Vector3(-w, -h, 0), new THREE.Vector3(-w + r, -h, 0)));
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, -h, 0), new THREE.Vector3(w - r, -h, 0)));
    bPath.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(w - r, -h, 0), new THREE.Vector3(w, -h, 0), new THREE.Vector3(w, -(h - r), 0)));
    bPath.add(new THREE.LineCurve3(new THREE.Vector3(w, -(h - r), 0), new THREE.Vector3(w, -g, 0)));

    return { topPath: tPath, bottomPath: bPath };
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heartEyeRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>
      <group ref={normalEyesRef}>
        <mesh material={eyeMat}><tubeGeometry args={[topPath, 20, 0.0035, 8, false]} /></mesh>
        <mesh material={eyeMat}><tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} /></mesh>
      </group>
    </group>
  );
}

function generateGraphiteTexturesAsync(): Promise<{ colorMap: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const size = 512;
      const canvasC = document.createElement("canvas");
      const canvasB = document.createElement("canvas");
      canvasC.width = canvasB.width = size;
      canvasC.height = canvasB.height = size;
      const ctxC = canvasC.getContext("2d");
      const ctxB = canvasB.getContext("2d");

      if (ctxC && ctxB) {
        ctxC.fillStyle = "#ffffff"; // White base
        ctxC.fillRect(0, 0, size, size);
        ctxB.fillStyle = "#808080";
        ctxB.fillRect(0, 0, size, size);

        for (let i = 0; i < 5000; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const r = 0.5 + Math.random();
          const isDark = Math.random() > 0.5;

          ctxC.beginPath();
          ctxC.arc(x, y, r, 0, Math.PI * 2);
          ctxC.fillStyle = isDark ? "#cccccc" : "#ffffff";
          ctxC.fill();

          ctxB.beginPath();
          ctxB.arc(x, y, r, 0, Math.PI * 2);
          ctxB.fillStyle = isDark ? "#444" : "#ccc";
          ctxB.fill();
        }
      }

      const texC = new THREE.CanvasTexture(canvasC);
      const texB = new THREE.CanvasTexture(canvasB);
      texC.wrapS = texB.wrapS = THREE.RepeatWrapping;
      texC.wrapT = texB.wrapT = THREE.RepeatWrapping;
      texC.repeat.set(6, 3);
      texB.repeat.set(6, 3);
      texC.needsUpdate = true;
      texB.needsUpdate = true;

      resolve({ colorMap: texC, bumpMap: texB });
    }, 0);
  });
}

function RobotPrototype({
  isPasswordFocused,
  messageVisible,
}: {
  isPasswordFocused: boolean;
  messageVisible: boolean;
}) {
  const isLovedRef = useRef(false);
  const isAlertRef = useRef(false);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const [textures, setTextures] = useState<{ colorMap: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null }>({ colorMap: null, bumpMap: null });

  // Custom state for wandering
  const targetWander = useRef(new THREE.Vector3(0, 0, 0));
  const timeOffset = useRef(Math.random() * 100);

  const design = {
    pantallaColor: "#00d9ff", // Cyan glass
    pantallaGrosor: 2.5,
    pantallaBrillo: 0.6,
    separacionOjos: 0.07,
    tamañoOrejas: 1.3,
    escalaOjos: 1.1,
    parpadeoFrecuencia: 4.0,
    parpadeoDuracion: 0.15,
    colorChasis: "#ffffff",
    alturaCabeza: 0.6,
  };

  // Track global pointer since canvas has pointer-events-none
  const pointerRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;
    const dt = Math.min(delta, 0.1);

    const tx = pointerRef.current.x;
    const ty = pointerRef.current.y;
    const maxMoveX = state.viewport.width / 3.5;
    const maxMoveY = state.viewport.height / 3.5;

    let targetX = 0;
    let targetY = -0.3;
    let targetZ = 0;
    let headTargetRotY = 0;
    let headTargetRotX = 0;
    let bodyTargetRotY = 0;
    let bodyTargetRotX = 0;
    let bodyTargetRotZ = 0;

    isAlertRef.current = isPasswordFocused;

    if (isPasswordFocused) {
      // Escape mode: Run to bottom-left corner and face user
      targetX = -2.5;
      targetY = -1.5 + Math.abs(Math.sin(state.clock.elapsedTime * 15)) * 0.1;
      targetZ = 0;
      
      const relativeX = targetX - bodyRef.current.position.x;
      if (Math.abs(relativeX) > 0.2) {
        bodyTargetRotY = relativeX > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else {
        bodyTargetRotY = 0;
      }
      headTargetRotY = 0;
      headTargetRotX = 0;
    } else {
      // Precise cursor tracking mode (Idle)
      const desiredX = tx * maxMoveX;
      const desiredY = ty * maxMoveY;
      
      // Clamp position to Safe Zones
      let safeX = desiredX;
      let safeY = desiredY;

      // 1. Keep away from the right-side form
      safeX = Math.min(safeX, 0.2); 

      // 2. Keep on screen
      targetX = Math.max(-3.0, safeX);
      targetY = Math.max(-2.0, Math.min(safeY, 1.5));
      
      // Add tiny breathing bob
      targetY += Math.abs(Math.sin(state.clock.elapsedTime * 2)) * 0.02; 

      const relativeX = tx - bodyRef.current.position.x / 2.5;
      
      bodyTargetRotY = -relativeX * 0.95;
      bodyTargetRotX = relativeX * relativeX * 0.0 - ty * 0.25;
      bodyTargetRotZ = -relativeX * 0.15;

      headTargetRotY = relativeX * 1.8;
      headTargetRotX = -ty * 0.3;
    }

    const moveSpeed = isPasswordFocused ? 8.0 : 3.0;
    
    bodyRef.current.position.x = THREE.MathUtils.lerp(bodyRef.current.position.x, targetX, moveSpeed * dt);
    bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, targetY, moveSpeed * dt);
    bodyRef.current.position.z = THREE.MathUtils.lerp(bodyRef.current.position.z, targetZ, moveSpeed * dt);

    bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, bodyTargetRotY, 10.0 * dt);
    bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, bodyTargetRotX, 10.0 * dt);
    bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, bodyTargetRotZ, 10.0 * dt);

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headTargetRotY, 15.0 * dt);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, headTargetRotX, 15.0 * dt);
  });

  useEffect(() => {
    let mounted = true;
    let generatedMaps: { colorMap: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null = null;
    generateGraphiteTexturesAsync().then((res) => {
      if (mounted) {
        generatedMaps = res;
        setTextures(res);
      } else {
        res.colorMap.dispose();
        res.bumpMap.dispose();
      }
    });
    return () => {
      mounted = false;
      if (generatedMaps) {
        generatedMaps.colorMap.dispose();
        generatedMaps.bumpMap.dispose();
      }
    };
  }, []);

  const neckParams = { baseR: 0.215, baseH: -0.05, midR: 0.28, midH: 0.02, lipBottomR: 0.295, lipBottomH: 0.045, lipTopR: 0.27, lipTopH: 0.055, innerR: 0.1, innerDropH: 0.0 };
  const bodyParams = { bodyBevelR: 0.235, bodyBevelY: 0.34, bodyBevelT: 0.025 };

  const neckProfile = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(neckParams.innerR, neckParams.baseH));
    points.push(new THREE.Vector2(neckParams.baseR, neckParams.baseH));
    points.push(new THREE.Vector2(neckParams.midR, neckParams.midH));
    points.push(new THREE.Vector2(neckParams.lipBottomR, neckParams.lipBottomH));
    points.push(new THREE.Vector2(neckParams.lipTopR, neckParams.lipTopH));
    points.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH));
    points.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH - neckParams.innerDropH));
    return points;
  }, [neckParams]);

  const headMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#050505", roughness: 1.0, metalness: 0.0 }), []);

  if (!textures.colorMap) return null;

  return (
    <group ref={bodyRef} position={[0, -0.3, 0]}>
      
      {/* Speech Bubble attached to the body */}
      <Html position={[0.6, 1.2, 0]} center zIndexRange={[100, 0]}>
        <AnimatePresence>
          {messageVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="pointer-events-none relative flex w-64 flex-col gap-2 rounded-sm border border-cyan-500/50 bg-background p-4 shadow-[0_0_20px_rgba(0,217,255,0.15)] backdrop-blur-md"
            >
              {/* HUD Brackets */}
              <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-cyan-500" />
              <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-cyan-500" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-cyan-500" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-cyan-500" />
              
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                <Lock className="size-3" /> Privacy Guard
              </div>
              <p className="font-sans text-sm font-semibold text-white">
                "Your privacy matters the most."
              </p>
              <div className="border-t border-cyan-500/20 pt-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                System Advisory:<br/>
                <span className="text-cyan-500/70">Credentials should remain private.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Html>

      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />
        <meshStandardMaterial color={design.colorChasis} map={textures.colorMap} bumpMap={textures.bumpMap} bumpScale={0.005} roughness={0.8} metalness={0.2} envMapIntensity={0.5} />
      </mesh>

      <mesh position={[0, bodyParams.bodyBevelY, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[bodyParams.bodyBevelR, bodyParams.bodyBevelT, 32, 64]} />
        <meshStandardMaterial color={design.colorChasis} map={textures.colorMap} bumpMap={textures.bumpMap} bumpScale={0.005} roughness={0.8} metalness={0.2} />
      </mesh>

      <mesh position={[0, 0.38, 0]} receiveShadow castShadow>
        <latheGeometry args={[neckProfile, 64]} />
        <meshStandardMaterial color={design.colorChasis} map={textures.colorMap} bumpMap={textures.bumpMap} bumpScale={0.005} roughness={0.8} metalness={0.2} />
      </mesh>

      <group ref={headRef} position={[0, design.alturaCabeza, 0]}>
        <mesh material={headMat} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>
        <GlassCapsule color={design.pantallaColor} power={design.pantallaGrosor} intensity={design.pantallaBrillo} />
        <group position={[0, -0.02, 0.29]}>
          <RobotEye position={[-design.separacionOjos, 0, 0]} rotation={[0, -0.2, 0]} scale={design.escalaOjos} blinkDuration={design.parpadeoDuracion} blinkCycle={design.parpadeoFrecuencia} isLovedRef={isLovedRef} isAlertRef={isAlertRef} />
          <RobotEye position={[design.separacionOjos, 0, 0]} rotation={[0, 0.2, 0]} scale={design.escalaOjos} blinkDuration={design.parpadeoDuracion} blinkCycle={design.parpadeoFrecuencia} isLovedRef={isLovedRef} isAlertRef={isAlertRef} />
        </group>
        <RobotEar position={[-0.29, 0, 0]} isLeft={true} scale={design.tamañoOrejas} />
        <RobotEar position={[0.29, 0, 0]} isLeft={false} scale={design.tamañoOrejas} />
      </group>
    </group>
  );
}

export function PrivacyRobot({ isPasswordFocused }: { isPasswordFocused: boolean }) {
  const [messageVisible, setMessageVisible] = useState(false);
  const cooldownRef = useRef(false);

  useEffect(() => {
    let t1: NodeJS.Timeout | undefined;
    let t2: NodeJS.Timeout | undefined;

    if (isPasswordFocused && !cooldownRef.current) {
      cooldownRef.current = true;
      t1 = setTimeout(() => setMessageVisible(true), 600);
      t2 = setTimeout(() => {
        setMessageVisible(false);
        cooldownRef.current = false;
      }, 4000);
    } else if (!isPasswordFocused) {
      setMessageVisible(false);
    }

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [isPasswordFocused]);

  // If reduced motion is enabled, we could skip canvas entirely or simplify
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  if (prefersReducedMotion) return null; // Accessibility: hide decorative 3d on reduced motion

  return (
    <div className="pointer-events-none absolute inset-0 z-30 hidden lg:block" aria-hidden="true">
      <Canvas style={{ pointerEvents: 'none' }} shadows camera={{ position: [0, 0, 7], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.4} color="#00d9ff" />
        <directionalLight position={[0, 5, 5]} intensity={1.5} color="#fff" castShadow />
        <directionalLight position={[-5, 2, -5]} intensity={0.5} color="#00d9ff" />
        <ResponsiveGroup scale={1.2}>
          <RobotPrototype isPasswordFocused={isPasswordFocused} messageVisible={messageVisible} />
        </ResponsiveGroup>
      </Canvas>
    </div>
  );
}
