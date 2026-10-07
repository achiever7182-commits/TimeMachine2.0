import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { A as SRGBColorSpace, C as Object3D, D as PointLight, E as PlaneGeometry, F as TorusGeometry, I as TubeGeometry, L as Vector2, M as ShadowMaterial, N as SphereGeometry, O as Raycaster, P as Texture, R as Vector3, S as MeshStandardMaterial, T as Plane, _ as LineBasicMaterial, a as PMREMGenerator, b as Mesh, c as BufferGeometry, d as CylinderGeometry, f as DirectionalLight, g as InstancedMesh, h as HemisphereLight, i as OrbitControls, j as Scene, k as RingGeometry, l as CanvasTexture, m as Group, n as mergeGeometries, o as WebGLRenderer, p as DynamicDrawUsage, r as RoundedBoxGeometry, s as BoxGeometry, t as RoomEnvironment, u as CatmullRomCurve3, v as LineSegments, w as PerspectiveCamera, x as MeshBasicMaterial, y as MathUtils } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/incident-time-machine-3d-BOeYEbR3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IncidentTimeMachine3D({ height = "100vh", className, embed = false, onStation, onReady }) {
	const rootRef = (0, import_react.useRef)(null);
	const handlers = (0, import_react.useRef)({
		onStation,
		onReady
	});
	(0, import_react.useEffect)(() => {
		handlers.current = {
			onStation,
			onReady
		};
	}, [onStation, onReady]);
	(0, import_react.useEffect)(() => {
		const root = rootRef.current;
		if (!root) return;
		let dispose;
		let cancelled = false;
		document.fonts.ready.then(() => {
			if (cancelled) return;
			dispose = initMachineScene(root, getComputedStyle(root).fontFamily, {
				embedded: embed,
				onStation: (id) => handlers.current.onStation?.(id),
				onReady: () => handlers.current.onReady?.()
			});
		});
		return () => {
			cancelled = true;
			dispose?.();
		};
	}, [embed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: [
			"incident-time-machine-3d",
			embed && "embed",
			className
		].filter(Boolean).join(" "),
		style: { height },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: STYLES } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "scene",
				role: "img",
				"aria-label": "Interactive 3D Incident Time Machine pipeline with five stages: Attack, Reconstruct, Rewind, Simulate, and Respond. Drag to rotate, scroll or pinch to zoom. Hover or tap a stage to take a closer look."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "topbar debug-ui",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "identity",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mark",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "17",
							height: "17",
							viewBox: "0 0 20 20",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M3 5l7 11 7-11M7 5l3 5 3-5",
								stroke: "currentColor",
								strokeWidth: "1.7",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Incident Time Machine" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Execution Pipeline" })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "status",
					id: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							id: "status-text",
							children: "Pipeline running"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "INC-2048" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scene-heading debug-ui",
				children: ["The pipeline you will traverse ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "index",
					children: "5 STAGES / 1 INCIDENT"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "coordinates debug-ui",
				children: "INCIDENT TIME MACHINE — RECONSTRUCT · REWIND · SIMULATE · RESPOND"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "journey",
				className: "debug-ui",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "journey-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "13",
							height: "13",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M3 4h10v9H3zM6 4V2h4v2m-5 4h6",
								stroke: "currentColor",
								strokeLinejoin: "round"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						id: "journey-title",
						children: "Incident INC-2048"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						id: "journey-detail",
						children: "Attack → Reconstruct → Rewind → Simulate → Respond"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "track",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { id: "journey-progress" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "labels" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "tooltip",
				role: "tooltip",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "controls debug-ui",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mode-bar",
					"aria-label": "Pipeline mode",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							"data-mode": "assembled",
							"aria-pressed": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M8 1.5l6 3.3v6.4l-6 3.3-6-3.3V4.8L8 1.5zM2 4.8l6 3.4 6-3.4M8 8.2v6.3",
									stroke: "currentColor",
									strokeLinejoin: "round"
								})
							}), "Assembled"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							"data-mode": "cutaway",
							"aria-pressed": "false",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M3 2h10v12H3zM8 2v12M10.5 4l2.5 2.5m-2.5 0L13 9m-2.5 0 2.5 2.5",
									stroke: "currentColor",
									strokeLinejoin: "round"
								})
							}), "Cutaway"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							"data-mode": "stations",
							"aria-pressed": "false",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M8 1.5l6 3-6 3-6-3 6-3zM2 8l6 3 6-3M2 11.5l6 3 6-3",
									stroke: "currentColor",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							}), "Stages"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							"data-mode": "order",
							"aria-pressed": "false",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M5 2.5l8 5.5-8 5.5v-11z",
									stroke: "currentColor",
									strokeLinejoin: "round"
								})
							}), "One incident"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "camera-row",
					"aria-label": "Camera",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "caption",
							children: "VIEW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-camera": "overview",
							"aria-pressed": "true",
							children: "Overview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-camera": "side",
							"aria-pressed": "false",
							children: "Side"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-camera": "top",
							"aria-pressed": "false",
							children: "Top"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-camera": "station",
							"aria-pressed": "false",
							children: "Stage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-camera": "flight",
							"aria-pressed": "false",
							children: "Flight"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "divider" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "play",
							"aria-label": "Pause the animation",
							"aria-pressed": "false",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "12",
								height: "12",
								viewBox: "0 0 12 12",
								fill: "currentColor",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "2",
									y: "1",
									width: "2.5",
									height: "10",
									rx: ".5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "7.5",
									y: "1",
									width: "2.5",
									height: "10",
									rx: ".5"
								})]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "wordmark",
						href: "https://vibecoding.tech",
						target: "_blank",
						rel: "noopener",
						children: ["made with AI agents · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "vibecoding.tech" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "footer-center debug-ui",
						children: "INCIDENT TIME MACHINE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hint debug-ui",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "13",
							height: "16",
							viewBox: "0 0 13 16",
							fill: "none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "2",
								y: "1",
								width: "9",
								height: "14",
								rx: "4.5",
								stroke: "currentColor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M6.5 4v3",
								stroke: "currentColor",
								strokeLinecap: "round"
							})]
						}), "Rotate. Zoom. Explore."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "loading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Initialising pipeline" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "error",
				role: "alert",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Could not start the 3D scene" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Check that WebGL is turned on in your browser." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => location.reload(),
						children: "Try again"
					})
				]
			})
		]
	});
}
function initMachineScene(root, fontFamily, options) {
	const cleanups = [];
	const frameWidth = () => root.clientWidth;
	const frameHeight = () => root.clientHeight;
	const listen = (target, type, handler) => {
		const fn = handler;
		target.addEventListener(type, fn);
		cleanups.push(() => target.removeEventListener(type, fn));
	};
	function $(id) {
		const el = root.querySelector(`#${id}`);
		if (!el) throw new Error(`Scene markup is missing #${id}`);
		return el;
	}
	function showError(message) {
		$("loading").classList.add("done");
		$("error").style.display = "block";
		if (message) $("error").querySelector("p").textContent = message;
	}
	const dispose = () => {
		for (const fn of cleanups.reverse()) fn();
		cleanups.length = 0;
	};
	try {
		const TAU = Math.PI * 2;
		const embedded = options.embedded;
		const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
		const palette = {
			amber: 16742938,
			white: 16052714,
			dark: 1514273,
			steel: 5857643
		};
		const scene = new Scene();
		const camera = new PerspectiveCamera(33, frameWidth() / frameHeight(), .1, 150);
		let renderer;
		try {
			renderer = new WebGLRenderer({
				antialias: true,
				alpha: true,
				powerPreference: "high-performance"
			});
		} catch (e) {
			showError("WebGL is not available. Turn on hardware acceleration in your browser settings and reload the page.");
			throw e;
		}
		renderer.setClearColor(0, 0);
		renderer.setPixelRatio(Math.min(devicePixelRatio, frameWidth() < 900 ? 1.5 : 1.75));
		renderer.setSize(frameWidth(), frameHeight());
		renderer.outputColorSpace = SRGBColorSpace;
		renderer.toneMapping = 4;
		renderer.toneMappingExposure = 1.12;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = 1;
		renderer.localClippingEnabled = true;
		$("scene").appendChild(renderer.domElement);
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = .065;
		controls.enablePan = false;
		controls.minDistance = 7;
		controls.maxDistance = 55;
		controls.minPolarAngle = .09;
		controls.maxPolarAngle = Math.PI * .475;
		controls.rotateSpeed = .48;
		controls.zoomSpeed = .7;
		if (embedded) {
			controls.enableZoom = false;
			if (matchMedia("(pointer:coarse)").matches) controls.enableRotate = false;
		}
		const pmrem = new PMREMGenerator(renderer), room = new RoomEnvironment();
		const env = pmrem.fromScene(room, .04);
		scene.environment = env.texture;
		scene.environmentIntensity = .62;
		room.dispose();
		pmrem.dispose();
		scene.add(new HemisphereLight(14411252, 2695450, 2));
		const key = new DirectionalLight(16773592, 4.2);
		key.position.set(-4, 12, 7);
		key.castShadow = true;
		key.shadow.mapSize.set(2048, 2048);
		Object.assign(key.shadow.camera, {
			left: -10,
			right: 10,
			top: 9,
			bottom: -9,
			near: .5,
			far: 35
		});
		key.shadow.normalBias = .035;
		key.shadow.bias = -2e-4;
		key.shadow.radius = 4;
		scene.add(key);
		const rim = new DirectionalLight(12899565, 3.1);
		rim.position.set(3, 7, -8);
		scene.add(rim);
		const warm = new PointLight(16760130, 28, 20, 2);
		warm.position.set(-4, 5, 3);
		scene.add(warm);
		const front = new DirectionalLight(16777215, 1);
		front.position.set(5, 3, 10);
		scene.add(front);
		const mat = (color, metalness = .1, roughness = .4, extra = {}) => new MeshStandardMaterial({
			color,
			metalness,
			roughness,
			...extra
		});
		const M = {
			body: mat(3159615, .75, .29),
			base: mat(2699063, .85, .32),
			edge: mat(7371142, .85, .24),
			chrome: mat(12831440, .92, .18),
			dark: mat(1185565, .45, .38),
			rubber: mat(725013, .1, .6),
			amber: mat(palette.amber, .52, .28),
			ivory: mat(14737108, .48, .26),
			copper: mat(12942917, .85, .3),
			black: mat(329993, 0, .6),
			light: mat(16742938, .2, .25, {
				emissive: 16742938,
				emissiveIntensity: 1.5
			}),
			whiteLight: mat(16774103, .1, .3, {
				emissive: 16773328,
				emissiveIntensity: 1.8
			}),
			green: mat(13031841, .1, .3, {
				emissive: 9548644,
				emissiveIntensity: .7
			}),
			glass: mat(8492190, .45, .16, {
				transparent: true,
				opacity: .19,
				depthWrite: false
			}),
			paper: mat(16052714, 0, .85)
		};
		const geometries = /* @__PURE__ */ new Map();
		function boxGeo(w, h, d, r = .04) {
			const k = `b${w},${h},${d},${r}`;
			if (!geometries.has(k)) geometries.set(k, r ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3)) : new BoxGeometry(w, h, d));
			return geometries.get(k);
		}
		function box(parent, w, h, d, x, y, z, m = M.body, r = .04) {
			const o = new Mesh(boxGeo(w, h, d, r), m);
			o.position.set(x, y, z);
			o.castShadow = true;
			o.receiveShadow = true;
			parent.add(o);
			return o;
		}
		function cyl(parent, r, h, x, y, z, m = M.chrome, r2 = r, segments = 24) {
			const k = `c${r},${r2},${h},${segments}`;
			if (!geometries.has(k)) geometries.set(k, new CylinderGeometry(r, r2, h, segments));
			const o = new Mesh(geometries.get(k), m);
			o.position.set(x, y, z);
			o.castShadow = true;
			o.receiveShadow = true;
			parent.add(o);
			return o;
		}
		function ball(parent, r, x, y, z, m = M.chrome) {
			const k = `s${r}`;
			if (!geometries.has(k)) geometries.set(k, new SphereGeometry(r, 12, 8));
			const o = new Mesh(geometries.get(k), m);
			o.position.set(x, y, z);
			parent.add(o);
			return o;
		}
		function tube(parent, pts, r, m = M.chrome) {
			const curve = new CatmullRomCurve3(pts.map((p) => new Vector3(...p)));
			const o = new Mesh(new TubeGeometry(curve, Math.max(12, pts.length * 7), r, 8, false), m);
			o.castShadow = true;
			parent.add(o);
			return o;
		}
		function screw(parent, x, y, z) {
			cyl(parent, .055, .026, x, y, z, M.chrome, void 0, 12);
			box(parent, .068, .005, .009, x, y + .014, z, M.dark, 0);
		}
		function canvasTexture(w, h, draw) {
			const c = document.createElement("canvas");
			c.width = w;
			c.height = h;
			const ctx = c.getContext("2d");
			draw(ctx, w, h);
			const t = new CanvasTexture(c);
			t.colorSpace = SRGBColorSpace;
			t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
			return {
				texture: t,
				canvas: c,
				ctx
			};
		}
		function print(ctx, txt, x, y, size = 20, color = "#f4f1ea", weight = 500) {
			ctx.fillStyle = color;
			ctx.font = `${weight} ${size}px ${fontFamily}`;
			ctx.fillText(txt, x, y);
		}
		function screenMaterial(texture) {
			return new MeshBasicMaterial({
				map: texture,
				toneMapped: false
			});
		}
		function screen(parent, w, h, x, y, z, tex) {
			const map = "texture" in tex ? tex.texture : tex;
			const o = new Mesh(new PlaneGeometry(w, h), screenMaterial(map));
			o.position.set(x, y, z);
			parent.add(o);
			return o;
		}
		const machine = new Group();
		scene.add(machine);
		const floor = new Mesh(new PlaneGeometry(70, 70), new ShadowMaterial({ opacity: .23 }));
		floor.rotation.x = -Math.PI / 2;
		floor.position.y = -.43;
		floor.receiveShadow = true;
		scene.add(floor);
		const shadow = canvasTexture(128, 128, (c, w, h) => {
			const g = c.createRadialGradient(64, 64, 12, 64, 64, 64);
			g.addColorStop(0, "rgba(0,0,0,.8)");
			g.addColorStop(.55, "rgba(0,0,0,.45)");
			g.addColorStop(1, "rgba(0,0,0,0)");
			c.fillStyle = g;
			c.fillRect(0, 0, w, h);
		});
		const contact = new Mesh(new PlaneGeometry(18, 13), new MeshBasicMaterial({
			map: shadow.texture,
			transparent: true,
			depthWrite: false,
			opacity: .65
		}));
		contact.rotation.x = -Math.PI / 2;
		contact.position.y = -.415;
		scene.add(contact);
		box(machine, 12.8, .38, 8.25, 0, -.09, 0, M.base, .17);
		box(machine, 12.6, .055, 8.08, 0, .13, 0, M.edge, .11);
		box(machine, 12.49, .09, 7.96, 0, .19, 0, M.body, .1);
		box(machine, 12.55, .027, 8.02, 0, -.19, 0, M.dark, .06);
		box(machine, 11.9, .026, .032, 0, -.17, 4.115, M.light, .01);
		for (const x of [-5.6, 5.6]) for (const z of [-3.35, 3.35]) {
			cyl(machine, .39, .25, x, -.31, z, M.rubber);
			cyl(machine, .29, .09, x, -.4, z, M.dark);
			screw(machine, x, .253, z);
		}
		for (const x of [-6.02, 6.02]) for (const z of [-3.73, 3.73]) screw(machine, x, .255, z);
		const plate = screen(machine, 7.35, .84, -.4, .25, 3.51, canvasTexture(1536, 176, (c, w, h) => {
			c.fillStyle = "#252b32";
			c.fillRect(0, 0, w, h);
			c.strokeStyle = "#4d545c";
			c.lineWidth = 2;
			c.strokeRect(2, 2, w - 4, h - 4);
			print(c, "TIME MACHINE", 45, 79, 40, "#d9d8cd", 650);
			print(c, "·  attack  ·  reconstruct  ·  rewind  ·  simulate  ·  respond", 440, 79, 34, "#b8bdc1", 450);
			print(c, "INCIDENT RESPONSE PIPELINE    /    RECONSTRUCT · REWIND · SIMULATE · RESPOND", 47, 133, 19, "#737e88", 500);
			print(c, "INC-2048", 1360, 130, 23, "#c57e45");
		}));
		plate.rotation.x = -Math.PI / 2;
		for (let i = 0; i < 16; i++) box(machine, .015, .009, .11 + i % 4 * .035, -5.6 + i * .09, .249, 3.5, M.edge, 0);
		const drafting = new Group();
		scene.add(drafting);
		const lineMat = new LineBasicMaterial({
			color: 6910330,
			transparent: true,
			opacity: .12
		});
		const draftingPoints = [];
		for (const r of [7.5, 8.1]) for (let i = 0; i < 120; i++) for (const j of [i, i + 1]) {
			const a = j / 120 * TAU;
			draftingPoints.push(new Vector3(Math.cos(a) * r, -.4, Math.sin(a) * r * .72));
		}
		for (let i = 0; i < 52; i++) {
			const a = i / 52 * TAU, r = 8.1;
			draftingPoints.push(new Vector3(Math.cos(a) * r, -.395, Math.sin(a) * r * .72), new Vector3(Math.cos(a) * (r + (i % 4 === 0 ? .16 : .07)), -.395, Math.sin(a) * (r + (i % 4 === 0 ? .16 : .07)) * .72));
		}
		drafting.add(new LineSegments(new BufferGeometry().setFromPoints(draftingPoints), lineMat));
		const definitions = [
			{
				id: "attack",
				name: "Attack",
				step: 1,
				output: "alert",
				pos: [
					-4.15,
					.29,
					-.65
				],
				desc: "Synthetic or real telemetry indicates suspicious activity and an incident begins."
			},
			{
				id: "reconstruct",
				name: "Reconstruct",
				step: 2,
				output: "context",
				pos: [
					-1.65,
					.29,
					-2.03
				],
				desc: "Reconstruct the organization, users, assets, evidence, attack path, and security state."
			},
			{
				id: "rewind",
				name: "Rewind",
				step: 3,
				output: "snapshot",
				pos: [
					1.5,
					.29,
					-2.08
				],
				desc: "Move the investigation timeline back to a critical decision point and inspect what was known."
			},
			{
				id: "simulate",
				name: "Simulate",
				step: 4,
				output: "branch",
				pos: [
					4.03,
					.29,
					.12
				],
				desc: "Create an isolated counterfactual branch and simulate alternative responses."
			},
			{
				id: "respond",
				name: "Respond",
				step: 5,
				output: "action",
				pos: [
					.93,
					.29,
					1.85
				],
				desc: "Select and approve the simulated response and execute the appropriate response workflow."
			}
		];
		const stations = [], cutPlane = new Plane(new Vector3(0, -1, 0), 10), shellMaterials = [];
		function shell(m) {
			const s = m.clone();
			s.clippingPlanes = [cutPlane];
			s.clipShadows = true;
			s.side = 2;
			shellMaterials.push(s);
			return s;
		}
		const S = {
			body: shell(M.body),
			ivory: shell(M.ivory),
			amber: shell(M.amber),
			edge: shell(M.edge)
		};
		const gears = [];
		function gear(parent, x, y, z, r = .3, vertical = false) {
			const g = new Group();
			g.position.set(x, y, z);
			if (vertical) g.rotation.x = Math.PI / 2;
			parent.add(g);
			cyl(g, r, .09, 0, 0, 0, M.copper);
			cyl(g, r * .66, .105, 0, 0, 0, M.dark);
			cyl(g, r * .22, .14, 0, 0, 0, M.chrome);
			for (let i = 0; i < 12; i++) {
				const a = i / 12 * TAU;
				const b = box(g, r * .26, .085, r * .2, Math.cos(a) * r, 0, Math.sin(a) * r, M.copper, .008);
				b.rotation.y = -a;
			}
			g.userData["moving"] = true;
			gears.push({
				g,
				vertical
			});
			return g;
		}
		definitions.forEach((d, i) => {
			const group = new Group();
			group.position.fromArray(d.pos);
			machine.add(group);
			const glowMat = M.light.clone();
			glowMat.emissiveIntensity = .5;
			box(group, 2.05, .12, 1.78, 0, .03, 0, M.dark, .1);
			box(group, 1.97, .03, 1.7, 0, .12, 0, glowMat, .09);
			box(group, 2.03, .17, 1.75, 0, .215, 0, M.body, .1);
			for (const x of [-.85, .85]) for (const z of [-.7, .7]) screw(group, x, .311, z);
			gear(group, -.35, .45, 0, .27);
			gear(group, .22, .45, .12, .21);
			box(group, .6, .15, .36, .52, .47, -.33, M.dark);
			for (let j = 0; j < 6; j++) box(group, .025, .16, .37, .3 + j * .08, .47, -.33, M.edge, .004);
			tube(group, [
				[
					-.7,
					.4,
					-.4
				],
				[
					-.55,
					.48,
					.4
				],
				[
					.35,
					.45,
					.6
				],
				[
					.7,
					.58,
					.23
				]
			], .023, M.light);
			screen(group, 1.54, .345, 0, .27, .891, canvasTexture(512, 116, (c) => {
				c.fillStyle = "#151a20";
				c.fillRect(0, 0, 512, 116);
				print(c, String(i + 1).padStart(2, "0"), 24, 76, 42, "#ff7a1a", 550);
				print(c, d.name.toUpperCase(), 111, 73, 35, "#d7d9d7", 550);
			}));
			const label = document.createElement("div");
			label.className = "station-label";
			label.setAttribute("aria-label", `Stage ${i + 1}: ${d.name} — ${d.desc}`);
			label.innerHTML = `<div class="stem"></div><div class="label-card"><div class="label-title"><span>${String(i + 1).padStart(2, "0")}</span>${d.name}</div><div class="label-meta">Stage ${d.step} · ${d.output}</div></div>`;
			$("labels").appendChild(label);
			cleanups.push(() => label.remove());
			stations.push({
				...d,
				group,
				base: new Vector3(...d.pos),
				glowMat,
				label,
				index: i,
				anchor: new Vector3(0, 2.5, 0)
			});
		});
		const attackStation = stations[0].group;
		box(attackStation, 1.74, .62, 1.33, 0, .65, -.05, S.ivory, .13);
		box(attackStation, 1.5, .1, 1.16, 0, .99, -.04, S.body, .025);
		for (const x of [-.68, .68]) {
			cyl(attackStation, .065, 1.73, x, 1.35, -.18, M.chrome);
			box(attackStation, .22, 1.8, .22, x, 1.37, -.44, S.ivory, .035);
		}
		box(attackStation, 1.82, .27, .4, 0, 2.28, -.35, S.amber, .045);
		box(attackStation, 1.55, .06, .06, 0, 2.13, -.115, M.chrome, .01);
		const printhead = new Group();
		attackStation.add(printhead);
		printhead.position.set(0, 1.9, -.08);
		printhead.userData["moving"] = true;
		box(printhead, .45, .36, .44, 0, 0, 0, M.body, .05);
		cyl(printhead, .11, .13, 0, -.24, .03, M.chrome, .04);
		box(printhead, .24, .045, .022, 0, .09, .23, M.light, .01);
		tube(attackStation, [
			[
				-.68,
				2.1,
				-.35
			],
			[
				-.42,
				2.52,
				-.4
			],
			[
				.25,
				2.5,
				-.4
			],
			[
				.35,
				2.01,
				-.12
			]
		], .032, M.dark);
		const reels = [];
		for (const [x, y] of [[-1.03, 1.82], [-.94, 2.78]]) {
			const reel = new Group();
			reel.position.set(x ?? 0, y ?? 0, -.48);
			attackStation.add(reel);
			reel.userData["moving"] = true;
			const core = cyl(reel, .4, .22, 0, 0, 0, M.dark);
			core.rotation.x = Math.PI / 2;
			for (const z of [-.14, .14]) {
				const disc = cyl(reel, .46, .045, 0, 0, z, M.chrome);
				disc.rotation.x = Math.PI / 2;
				for (let j = 0; j < 6; j++) {
					const a = j / 6 * TAU;
					const hole = cyl(reel, .1, .006, Math.cos(a) * .29, Math.sin(a) * .29, z + (z > 0 ? .026 : -.026), M.dark, void 0, 14);
					hole.rotation.x = Math.PI / 2;
				}
			}
			const axle = cyl(reel, .095, .37, 0, 0, 0, M.amber);
			axle.rotation.x = Math.PI / 2;
			reels.push(reel);
		}
		tube(attackStation, [
			[
				-1.36,
				2.66,
				-.48
			],
			[
				-1.5,
				2.34,
				-.48
			],
			[
				-1.34,
				1.92,
				-.48
			]
		], .045, M.dark);
		const alertTexture = canvasTexture(384, 640, () => {});
		function drawAlert(t) {
			const c = alertTexture.ctx, w = 384, h = 640;
			c.fillStyle = "#ff7a1a";
			c.fillRect(0, 0, w, h);
			c.fillStyle = "#c57e45";
			c.beginPath();
			c.arc(330, 205, 210, 0, TAU);
			c.fill();
			c.strokeStyle = "#171b20";
			c.lineWidth = 13;
			for (let i = 0; i < 3; i++) {
				c.beginPath();
				c.ellipse(194, 270, 90 - i * 21, 111, Math.sin(t * .25) * .3 + .4, 0, TAU);
				c.stroke();
			}
			print(c, "ALERT", 28, 57, 24, "#242320", 650);
			print(c, "DETECTED.", 24, 103, 42, "#242320", 700);
			c.fillStyle = "#171b20";
			c.beginPath();
			c.roundRect(25, 465, 334, 123, 12);
			c.fill();
			const texts = [
				"Suspicious login —",
				"lateral movement.",
				"Credential abuse",
				"detected at 02:14."
			];
			const n = Math.floor(t * .7) % 4;
			print(c, texts[n] ?? "", 45, 505, 25, "#f4f1ea", 550);
			print(c, texts[(n + 1) % 4] ?? "", 45, 547, 25, "#f4f1ea", 550);
			c.fillStyle = "#fff7d4";
			c.fillRect(27, 615, Math.max(10, t * .13 % 1 * 330), 5);
			alertTexture.texture.needsUpdate = true;
		}
		drawAlert(0);
		const outputAlert = new Group();
		outputAlert.userData["moving"] = true;
		attackStation.add(outputAlert);
		box(outputAlert, .62, 1.08, .055, 0, 1.36, .61, M.dark, .035);
		screen(outputAlert, .56, .98, 0, 1.36, .641, alertTexture);
		box(attackStation, 1.14, .12, .2, 0, .83, .66, M.dark, .025);
		for (const x of [-.42, .42]) {
			const r = cyl(attackStation, .115, .18, x, .92, .6, M.chrome);
			r.rotation.z = Math.PI / 2;
		}
		for (let i = 0; i < 5; i++) box(attackStation, .08, .03, .22, -.38 + i * .19, 1.011, -.02, M.edge, .005);
		const reconstructStation = stations[1].group;
		box(reconstructStation, 1.9, .66, 1.36, 0, .67, -.04, S.body, .11);
		const consoleTop = new Group();
		consoleTop.position.set(0, 1.01, -.08);
		consoleTop.rotation.x = -.32;
		reconstructStation.add(consoleTop);
		box(consoleTop, 1.76, .12, 1.27, 0, 0, 0, S.ivory, .04);
		const evidenceQueue = canvasTexture(640, 340, () => {});
		function drawEvidenceQueue(t) {
			const c = evidenceQueue.ctx;
			c.fillStyle = "#111b20";
			c.fillRect(0, 0, 640, 340);
			print(c, "EVIDENCE QUEUE", 25, 45, 21, "#acb9b8", 550);
			print(c, "03 / 08", 497, 45, 20, "#ff7a1a", 500);
			for (let i = 0; i < 3; i++) {
				const y = 74 + i * 76;
				c.fillStyle = "#202c30";
				c.beginPath();
				c.roundRect(21, y, 598, 61, 6);
				c.fill();
				c.fillStyle = i === 0 ? "#c57e45" : "#626f69";
				c.fillRect(34, y + 10, 27, 41);
				print(c, [
					"Attack path",
					"User timeline",
					"Asset inventory"
				][i] ?? "", 77, y + 29, 19, "#d4d8cc");
				print(c, i === 0 ? "ANALYSING" : "QUEUED", 77, y + 49, 11, i === 0 ? "#c57e45" : "#81948f");
				c.fillStyle = "#334348";
				c.fillRect(377, y + 26, 214, 7);
				c.fillStyle = i === 0 ? "#ff7a1a" : "#607475";
				c.fillRect(377, y + 26, i === 0 ? t * .15 % 1 * 214 : 41 + i * 27, 7);
			}
		}
		drawEvidenceQueue(0);
		const qs = screen(consoleTop, 1.53, .79, 0, .067, -.17, evidenceQueue);
		qs.rotation.x = -Math.PI / 2;
		const toggles = [];
		for (let i = 0; i < 4; i++) {
			const x = -.57 + i * .38;
			cyl(consoleTop, .074, .035, x, .1, .45, M.dark);
			const t = cyl(consoleTop, .025, .15, x, .19, .45, M.chrome);
			t.rotation.x = -.4;
			t.userData["moving"] = true;
			toggles.push(t);
			ball(consoleTop, .04, x, .275, .421, M.ivory);
		}
		cyl(reconstructStation, .075, .06, .77, 1.05, -.62, M.green);
		for (let i = 0; i < 7; i++) box(reconstructStation, .55, .027, .02, 0, .46 + i * .05, .655, M.dark, .003);
		const rewindStation = stations[2].group;
		box(rewindStation, 1.35, .18, .88, 0, .44, 0, S.ivory, .045);
		cyl(rewindStation, .095, 1.04, 0, .93, -.31, M.chrome);
		box(rewindStation, .56, .91, .14, 0, .99, -.34, S.body, .04);
		box(rewindStation, 2.42, 1.72, .2, 0, 1.94, -.17, S.ivory, .08);
		box(rewindStation, 2.28, 1.59, .1, 0, 1.94, -.044, M.dark, .045);
		screen(rewindStation, 2.16, 1.43, 0, 1.95, .011, canvasTexture(896, 592, (c, w, h) => {
			c.fillStyle = "#edece3";
			c.fillRect(0, 0, w, h);
			c.fillStyle = "#dedfd7";
			c.fillRect(0, 0, w, 56);
			c.fillStyle = "#adaeaa";
			for (let i = 0; i < 3; i++) {
				c.beginPath();
				c.arc(26 + i * 19, 27, 4, 0, TAU);
				c.fill();
			}
			print(c, "TIMELINE REWIND", 33, 100, 22, "#22282b", 650);
			print(c, "Events    Assets    Users", 535, 98, 14, "#6a7271");
			c.fillStyle = "#ff7a1a";
			c.beginPath();
			c.roundRect(32, 131, 287, 401, 10);
			c.fill();
			c.strokeStyle = "#242827";
			c.lineWidth = 8;
			for (let i = 0; i < 3; i++) {
				c.beginPath();
				c.ellipse(175, 320, 75 - i * 17, 94, .4, 0, TAU);
				c.stroke();
			}
			print(c, "T-04:12", 52, 181, 29, "#242827", 700);
			print(c, "DECISION", 52, 220, 29, "#242827", 700);
			print(c, "POINT", 52, 259, 29, "#242827", 700);
			print(c, "Critical moment.", 359, 197, 41, "#22282b", 600);
			print(c, "State restored.", 359, 252, 41, "#22282b", 600);
			print(c, "What was known at 02:14:", 362, 300, 19, "#77807b");
			print(c, "no isolation in place.", 362, 329, 19, "#77807b");
			for (let i = 0; i < 3; i++) {
				c.fillStyle = "#d1d5cd";
				c.fillRect(362, 363 + i * 16, 400 - i * 43, 5);
			}
			c.fillStyle = "#232a2b";
			c.beginPath();
			c.roundRect(359, 447, 279, 62, 7);
			c.fill();
			print(c, "Inspect state  ↗", 390, 486, 22, "#f4f1ea", 500);
			print(c, "REWOUND BY INCIDENT TIME MACHINE", 33, 571, 12, "#879088");
		}));
		ball(rewindStation, .024, 0, 2.747, -.05, M.dark);
		box(rewindStation, .21, .019, .008, 0, 1.149, .013, M.light, .003);
		screen(rewindStation, .685, .96, -.655, 1.86, .018, alertTexture);
		const flyBranch = new Group();
		flyBranch.userData["moving"] = true;
		rewindStation.add(flyBranch);
		box(flyBranch, .59, .77, .045, .94, .81, .55, M.ivory, .025);
		const branchTex = canvasTexture(220, 290, (c) => {
			c.fillStyle = "#f4f1ea";
			c.fillRect(0, 0, 220, 290);
			c.fillStyle = "#ff7a1a";
			c.fillRect(15, 16, 190, 168);
			c.fillStyle = "#272e30";
			c.beginPath();
			c.moveTo(94, 66);
			c.lineTo(140, 100);
			c.lineTo(94, 134);
			c.fill();
			print(c, "BRANCH", 17, 225, 23, "#283030", 600);
			c.fillStyle = "#b0b5b0";
			c.fillRect(17, 244, 153, 6);
			c.fillRect(17, 258, 104, 5);
		});
		screen(flyBranch, .55, .72, .94, .81, .575, branchTex);
		const simulateStation = stations[3].group;
		box(simulateStation, 1.75, 1.77, 1.02, 0, 1.24, -.13, S.body, .12);
		box(simulateStation, 1.58, .13, 1.09, 0, 2.16, -.13, S.amber, .04);
		box(simulateStation, 1.47, 1.38, .055, 0, 1.31, .405, M.dark, .025);
		screen(simulateStation, 1.31, 1.255, 0, 1.37, .44, canvasTexture(480, 460, (c) => {
			c.fillStyle = "#172224";
			c.fillRect(0, 0, 480, 460);
			print(c, "SIMULATIONS", 30, 51, 27, "#e8e8d8", 550);
			print(c, "Active · 3 branches", 30, 81, 16, "#869991");
			[
				"Isolate endpoint",
				"Disable user",
				"Block lateral move"
			].forEach((n, i) => {
				const y = 110 + i * 100;
				c.fillStyle = "#283839";
				c.beginPath();
				c.roundRect(22, y, 436, 83, 8);
				c.fill();
				c.fillStyle = [
					"#ff7a1a",
					"#bdbf9c",
					"#7d938e"
				][i] ?? "#626f69";
				c.beginPath();
				c.arc(58, y + 40, 19, 0, TAU);
				c.fill();
				print(c, String(i + 1), 49, y + 47, 20, "#1b2828", 600);
				print(c, n, 93, y + 33, 23, "#e6e8dc", 550);
				print(c, [
					"Simulating",
					"Pending",
					"Pending"
				][i] ?? "", 93, y + 58, 15, "#94a59b");
				print(c, "↗", 410, y + 49, 25, "#c57e45");
			});
		}));
		box(simulateStation, 1.27, .075, .29, 0, .57, .55, M.chrome, .02);
		for (let i = 0; i < 3; i++) box(simulateStation, 1.15, .021, .12, 0, .58 + i * .15, -.35, M.copper, .006);
		tube(simulateStation, [
			[
				.69,
				.43,
				-.2
			],
			[
				.89,
				.65,
				-.2
			],
			[
				.89,
				1.8,
				-.2
			],
			[
				.65,
				1.99,
				-.2
			]
		], .033, M.chrome);
		const incoming = new Group();
		incoming.userData["moving"] = true;
		simulateStation.add(incoming);
		box(incoming, .86, .42, .043, 0, 0, 0, M.light, .035);
		screen(incoming, .82, .39, 0, 0, .026, canvasTexture(432, 204, (c) => {
			c.fillStyle = "#ff7a1a";
			c.fillRect(0, 0, 432, 204);
			c.fillStyle = "#2a2e26";
			c.beginPath();
			c.arc(58, 98, 32, 0, TAU);
			c.fill();
			print(c, "I", 42, 112, 34, "#ff7a1a", 550);
			print(c, "INC-2048", 108, 91, 38, "#222822", 600);
			print(c, "Credential Compromise  +", 108, 138, 23, "#5b4c22", 500);
		}));
		const respondStation = stations[4].group;
		box(respondStation, 1.91, .63, 1.32, 0, .65, -.06, S.ivory, .12);
		box(respondStation, 1.96, .19, 1.38, 0, .42, -.04, S.body, .04);
		box(respondStation, 1.37, .09, .038, 0, .44, .66, M.dark, .01);
		box(respondStation, .37, .042, .03, 0, .45, .687, M.chrome, .009);
		box(respondStation, 1.02, .25, .91, -.33, 1.04, -.03, S.body, .045);
		for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) box(respondStation, .19, .085, .17, -.62 + col * .27, 1.21, .27 - row * .24, col === 2 && row === 2 ? M.amber : M.ivory, .022);
		box(respondStation, .64, .6, .52, .58, 1.04, -.15, S.body, .045);
		box(respondStation, .48, .07, .09, .59, 1.37, -.1, M.dark, .01);
		cyl(respondStation, .06, .65, -.35, 1.6, -.56, M.chrome);
		box(respondStation, 1.13, .46, .19, -.35, 1.98, -.56, S.body, .045);
		const responseTex = canvasTexture(512, 176, () => {});
		function drawResponse() {
			const c = responseTex.ctx;
			c.fillStyle = "#12231e";
			c.fillRect(0, 0, 512, 176);
			print(c, "RESPONSE APPROVED", 22, 44, 23, "#9cae91", 500);
			print(c, "EXECUTED", 26, 131, 66, "#ecedc7", 500);
		}
		drawResponse();
		screen(respondStation, 1.015, .349, -.35, 1.98, -.459, responseTex);
		const report = new Group();
		report.position.set(.59, 1.37, -.1);
		report.userData["moving"] = true;
		respondStation.add(report);
		const reportTex = canvasTexture(280, 540, (c) => {
			c.fillStyle = "#f4f1ea";
			c.fillRect(0, 0, 280, 540);
			print(c, "INCIDENT", 25, 52, 24, "#333d36", 650);
			print(c, "RESPONSE LOG", 32, 87, 19, "#566059");
			c.strokeStyle = "#8a9189";
			c.setLineDash([5, 6]);
			c.beginPath();
			c.moveTo(22, 115);
			c.lineTo(258, 115);
			c.stroke();
			print(c, "Action", 25, 154, 22, "#333d36");
			print(c, "Isolate endpoint", 25, 190, 21, "#333d36");
			print(c, "APPROVED", 25, 263, 31, "#333d36", 650);
			print(c, "Simulation only", 25, 317, 24, "#687067");
			for (let i = 0; i < 44; i++) {
				c.fillStyle = "#333d36";
				c.fillRect(25 + i * 5, 370, 1 + i % 3, 83);
			}
			print(c, "INC-2048", 81, 496, 17, "#59635b");
		});
		const rp = screen(report, .41, .83, 0, .415, .01, reportTex);
		rp.material.side = 2;
		report.rotation.x = -.16;
		const coin = new Group();
		coin.userData["moving"] = true;
		respondStation.add(coin);
		const coinDisc = cyl(coin, .22, .065, 0, 0, 0, M.amber, void 0, 32);
		coinDisc.rotation.x = Math.PI / 2;
		const coinRing = new Mesh(new TorusGeometry(.174, .014, 6, 32), M.light);
		coinRing.position.z = .037;
		coin.add(coinRing);
		const approvalBadge = screen(coin, .28, .28, 0, 0, .04, canvasTexture(128, 128, (c) => {
			c.clearRect(0, 0, 128, 128);
			c.textAlign = "center";
			print(c, "✓", 64, 95, 91, "#80561c", 650);
		}));
		approvalBadge.material.transparent = true;
		cyl(respondStation, .33, .09, 1.04, .39, .55, M.dark);
		cyl(respondStation, .26, .025, 1.04, .445, .55, M.copper);
		const path = new CatmullRomCurve3([
			[
				-3.95,
				.84,
				.65
			],
			[
				-3.1,
				.84,
				-.12
			],
			[
				-1.45,
				.84,
				-.79
			],
			[
				1.32,
				.84,
				-.8
			],
			[
				3.3,
				.84,
				.19
			],
			[
				3.43,
				.84,
				1.21
			],
			[
				1.35,
				.84,
				2.7
			],
			[
				-1.4,
				.84,
				2.52
			],
			[
				-3.54,
				.84,
				1.65
			]
		].map((p) => new Vector3(...p)), true, "catmullrom", .25);
		const belt = new Group();
		machine.add(belt);
		const frameMesh = new Mesh(new TubeGeometry(path, 150, .35, 8, true), M.dark);
		frameMesh.scale.y = .3;
		frameMesh.position.y = .51;
		belt.add(frameMesh);
		const beltCount = 148;
		const beltSlats = new InstancedMesh(boxGeo(.135, .065, .63, .012), M.body, beltCount);
		beltSlats.receiveShadow = true;
		beltSlats.castShadow = false;
		belt.add(beltSlats);
		beltSlats.instanceMatrix.setUsage(DynamicDrawUsage);
		const dummy = new Object3D(), pVec = new Vector3(), tVec = new Vector3();
		function updateBelt(t) {
			for (let i = 0; i < beltCount; i++) {
				const u = (i / beltCount + t * .012) % 1;
				path.getPointAt(u, pVec);
				path.getTangentAt(u, tVec);
				dummy.position.copy(pVec);
				dummy.rotation.set(0, -Math.atan2(tVec.z, tVec.x), 0);
				dummy.updateMatrix();
				beltSlats.setMatrixAt(i, dummy.matrix);
			}
			beltSlats.instanceMatrix.needsUpdate = true;
		}
		updateBelt(0);
		for (const side of [-1, 1]) {
			const pts = [];
			for (let i = 0; i <= 160; i++) {
				path.getPointAt(i / 160, pVec);
				path.getTangentAt(i / 160, tVec);
				pts.push(pVec.clone().add(new Vector3(-tVec.z * .36 * side, .09, tVec.x * .36 * side)));
			}
			belt.add(new Mesh(new TubeGeometry(new CatmullRomCurve3(pts), 160, .028, 6, false), M.chrome));
		}
		for (let i = 0; i < 16; i++) {
			const p = path.getPointAt(i / 16);
			cyl(belt, .045, .43, p.x, .53, p.z, M.chrome);
		}
		const pipes = new Group();
		machine.add(pipes);
		for (let i = 0; i < 4; i++) {
			const a = stations[i].base, b = stations[i + 1].base;
			const points = [
				a.clone().add(new Vector3(.4, .12, 0)),
				a.clone().lerp(b, .35).add(new Vector3(0, .1, -.6)),
				a.clone().lerp(b, .65).add(new Vector3(0, .1, -.6)),
				b.clone().add(new Vector3(-.4, .12, 0))
			];
			pipes.add(new Mesh(new TubeGeometry(new CatmullRomCurve3(points), 30, .054, 8, false), M.copper));
		}
		const packetTextures = [
			canvasTexture(256, 352, (c) => {
				c.fillStyle = "#c57e45";
				c.fillRect(0, 0, 256, 352);
				print(c, "ATTACK", 21, 48, 24, "#30362d", 650);
				print(c, "ALERT", 21, 79, 24, "#30362d", 650);
				c.strokeStyle = "#716431";
				c.lineWidth = 2;
				c.strokeRect(23, 112, 210, 139);
				print(c, "INC-2048", 42, 190, 37, "#30362d", 550);
				print(c, "CREDENTIAL / 01", 23, 320, 17, "#635728");
			}),
			canvasTexture(256, 352, (c) => {
				c.fillStyle = "#eeeae0";
				c.fillRect(0, 0, 256, 352);
				print(c, "CONTEXT", 24, 47, 22, "#3b403a", 650);
				print(c, "REBUILT", 24, 85, 15, "#8b8d80");
				for (let i = 0; i < 9; i++) {
					c.fillStyle = i === 4 ? "#c57e45" : "#aeb2a5";
					c.fillRect(24, 111 + i * 21, 190 - i % 3 * 24, 6);
				}
				print(c, "DONE  ✓", 24, 327, 17, "#786124", 600);
			}),
			alertTexture,
			branchTex,
			reportTex
		];
		const packets = [];
		for (let i = 0; i < 6; i++) {
			const g = new Group();
			g.userData["moving"] = true;
			machine.add(g);
			box(g, .47, .71, .04, 0, 0, 0, M.ivory, .022);
			const faces = packetTextures.map((tex) => {
				const s = screen(g, .43, .665, 0, 0, .024, tex);
				s.material.side = 2;
				s.visible = false;
				return s;
			});
			const halo = new Mesh(new RingGeometry(.4, .414, 40), new MeshBasicMaterial({
				color: 16742938,
				transparent: true,
				opacity: .8,
				side: 2,
				depthWrite: false
			}));
			halo.rotation.x = -Math.PI / 2;
			halo.position.y = -.37;
			g.add(halo);
			halo.visible = false;
			packets.push({
				group: g,
				faces,
				halo,
				stage: -1,
				phase: 0
			});
		}
		function nearestPort(x, z) {
			let best = 0, dist = Infinity;
			for (let i = 0; i < 300; i++) {
				const p = path.getPointAt(i / 300), d = (p.x - x) ** 2 + (p.z - z) ** 2;
				if (d < dist) {
					dist = d;
					best = i / 300;
				}
			}
			return best;
		}
		const reconstructU = nearestPort(-1.65, -.7);
		const rewindU = nearestPort(1.5, -.7);
		const respondU = nearestPort(.93, 2.65);
		function compact(group) {
			for (const child of [...group.children]) if (child.isGroup) compact(child);
			const buckets = /* @__PURE__ */ new Map();
			for (const object of group.children) {
				const child = object;
				if (!child.isMesh || child.isInstancedMesh || child.userData["moving"] || Array.isArray(child.material)) continue;
				const key = child.material.uuid;
				if (!buckets.has(key)) buckets.set(key, []);
				buckets.get(key).push(child);
			}
			for (const list of buckets.values()) {
				if (list.length < 2) continue;
				const geos = list.map((m) => {
					m.updateMatrix();
					return (m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()).applyMatrix4(m.matrix);
				});
				const merged = mergeGeometries(geos, false);
				for (const geo of geos) geo.dispose();
				if (!merged) continue;
				const mesh = new Mesh(merged, list[0].material);
				mesh.castShadow = list.some((x) => x.castShadow);
				mesh.receiveShadow = list.some((x) => x.receiveShadow);
				for (const m of list) group.remove(m);
				group.add(mesh);
			}
		}
		[
			incoming,
			report,
			coin,
			outputAlert,
			flyBranch,
			printhead,
			...reels
		].forEach((g) => g.userData["moving"] = true);
		compact(machine);
		stations.forEach((s) => s.group.traverse((o) => {
			o.userData["station"] = s.id;
		}));
		const pickables = stations.map((s) => s.group);
		let mode = "assembled", cameraMode = "overview", playing = !reduceMotion, simTime = 0, spread = 0, selected = "attack", hovered = null;
		let width = frameWidth(), height = frameHeight(), mobile = width <= 900, lastInteraction = performance.now(), dragging = false, wasDragged = false, downX = 0, downY = 0;
		let cameraAnimating = true, flightTime = 0, lastDraw = -1, visible = true, contextLost = false;
		const desiredPosition = new Vector3(), desiredTarget = new Vector3(0, 1, 0);
		const viewDirection = new Vector3(10.5, 10.8, 17).normalize();
		let baseDistance = 25, sized = false, readySent = false;
		function layoutCamera() {
			if (!frameWidth() || !frameHeight()) return;
			const first = !sized;
			sized = true;
			width = frameWidth();
			height = frameHeight();
			mobile = width <= 900;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.setViewOffset(width, height, mobile || !embedded ? 0 : -width * .21, mobile || embedded ? 0 : height * .025, width, height);
			const aspect = width / height;
			const availableWidth = mobile ? .91 : Math.min(.55, aspect > 2 ? .54 : .57);
			const horizontalFit = 17.3 / (2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * aspect * availableWidth);
			const verticalFit = 11.5 / (2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * (embedded ? .85 : .62));
			baseDistance = Math.max(horizontalFit, verticalFit) * (mobile ? .97 : 1) / (embedded ? mobile ? 1.15 : 1.45 : 1);
			controls.maxDistance = Math.max(55, baseDistance * 1.6);
			camera.updateProjectionMatrix();
			setCameraGoal();
			cameraAnimating = true;
			if (first) {
				camera.position.copy(desiredPosition);
				controls.target.copy(desiredTarget);
				controls.update();
				cameraAnimating = false;
			}
		}
		function setCameraGoal() {
			const expand = mode === "stations" ? 1.2 : 1;
			if (cameraMode === "station") {
				const s = stations.find((s) => s.id === selected);
				desiredTarget.copy(s.group.position).add(new Vector3(0, 1.25, 0));
				desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 9 : 12);
			} else {
				desiredTarget.set(0, 1, 0);
				const distance = baseDistance * expand;
				if (cameraMode === "side") desiredPosition.set(13, 5, 20).normalize().multiplyScalar(distance).add(desiredTarget);
				else if (cameraMode === "top") desiredPosition.set(.01, distance, .8).add(desiredTarget);
				else desiredPosition.copy(viewDirection).multiplyScalar(distance).add(desiredTarget);
			}
		}
		function syncButtons() {
			root.querySelectorAll("[data-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["mode"] === mode)));
			root.querySelectorAll("[data-camera]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["camera"] === cameraMode)));
			$("journey").classList.toggle("visible", mode === "order");
		}
		const modeAliases = {
			Assembled: "assembled",
			Cutaway: "cutaway",
			Stages: "stations",
			"One incident": "order",
			assembled: "assembled",
			cutaway: "cutaway",
			stations: "stations",
			order: "order"
		};
		const cameraAliases = {
			Overview: "overview",
			Side: "side",
			Top: "top",
			Stage: "station",
			Flight: "flight",
			overview: "overview",
			side: "side",
			top: "top",
			station: "station",
			flight: "flight"
		};
		function setMode(name) {
			if (!Object.hasOwn(modeAliases, name)) return false;
			mode = modeAliases[name];
			lastInteraction = performance.now();
			if (mode === "order") {
				simTime = 0;
				lastDraw = -1;
				play();
				cameraMode = "overview";
			} else if (cameraMode === "station") cameraMode = "overview";
			setCameraGoal();
			cameraAnimating = true;
			syncButtons();
			return true;
		}
		function focusStation(id) {
			if (!stations.find((s) => s.id === id)) return false;
			selected = id;
			if (mode === "order") mode = "assembled";
			cameraMode = "station";
			lastInteraction = performance.now();
			setCameraGoal();
			cameraAnimating = true;
			syncButtons();
			return true;
		}
		function setCamera(name) {
			if (!Object.hasOwn(cameraAliases, name)) return false;
			cameraMode = cameraAliases[name];
			if (mode === "order") mode = "assembled";
			lastInteraction = performance.now();
			flightTime = 0;
			setCameraGoal();
			cameraAnimating = true;
			syncButtons();
			return true;
		}
		function syncPlayback() {
			const b = $("play");
			b.setAttribute("aria-label", playing ? "Pause the animation" : "Resume the animation");
			b.setAttribute("aria-pressed", String(!playing));
			b.innerHTML = playing ? "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"currentColor\"><rect x=\"2\" y=\"1\" width=\"2.5\" height=\"10\" rx=\".5\"/><rect x=\"7.5\" y=\"1\" width=\"2.5\" height=\"10\" rx=\".5\"/></svg>" : "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"currentColor\"><path d=\"M3 1l8 5-8 5z\"/></svg>";
			$("status").classList.toggle("paused", !playing);
			$("status-text").textContent = playing ? "Pipeline running" : "Pipeline paused";
		}
		function play() {
			playing = true;
			syncPlayback();
			return true;
		}
		function pause() {
			playing = false;
			syncPlayback();
			return true;
		}
		const api = {
			setMode,
			focusStation,
			setCamera,
			play,
			pause
		};
		window.__machine = api;
		cleanups.push(() => {
			if (window.__machine === api) delete window.__machine;
		});
		root.querySelectorAll("[data-mode]").forEach((b) => listen(b, "click", () => setMode(b.dataset["mode"] ?? "")));
		root.querySelectorAll("[data-camera]").forEach((b) => listen(b, "click", () => setCamera(b.dataset["camera"] ?? "")));
		listen($("play"), "click", () => playing ? pause() : play());
		syncPlayback();
		layoutCamera();
		camera.position.copy(desiredPosition);
		controls.target.copy(desiredTarget);
		controls.update();
		cameraAnimating = false;
		listen(window, "resize", layoutCamera);
		const resizeObserver = new ResizeObserver(() => layoutCamera());
		resizeObserver.observe(root);
		cleanups.push(() => resizeObserver.disconnect());
		controls.addEventListener("start", () => {
			dragging = true;
			cameraAnimating = false;
			lastInteraction = performance.now();
		});
		controls.addEventListener("end", () => {
			dragging = false;
			lastInteraction = performance.now();
		});
		controls.addEventListener("change", () => {
			if (dragging) lastInteraction = performance.now();
		});
		const raycaster = new Raycaster(), pointer = new Vector2(), tooltip = $("tooltip");
		function hitStation(x, y) {
			pointer.set(x / width * 2 - 1, -y / height * 2 + 1);
			raycaster.setFromCamera(pointer, camera);
			const hits = raycaster.intersectObjects(pickables, true);
			return hits.length ? stations.find((s) => s.id === hits[0].object.userData["station"]) : null;
		}
		listen(renderer.domElement, "pointermove", (e) => {
			const rect = root.getBoundingClientRect();
			const rx = e.clientX - rect.left, ry = e.clientY - rect.top;
			if (Math.hypot(rx - downX, ry - downY) > 5) wasDragged = true;
			if (dragging) return;
			const s = hitStation(rx, ry);
			hovered = s ? s.id : null;
			renderer.domElement.style.cursor = s ? "pointer" : "grab";
			tooltip.classList.toggle("visible", !!s);
			if (s) {
				tooltip.querySelector("strong").innerHTML = `<span>${String(s.index + 1).padStart(2, "0")}</span>${s.name}`;
				tooltip.querySelector("p").textContent = s.desc;
				tooltip.style.left = Math.min(width - 255, Math.max(10, rx + 16)) + "px";
				tooltip.style.top = Math.max(10, Math.min(height - 95, ry - 65)) + "px";
			}
		});
		listen(renderer.domElement, "pointerleave", () => {
			hovered = null;
			tooltip.classList.remove("visible");
		});
		listen(renderer.domElement, "pointerdown", (e) => {
			const rect = root.getBoundingClientRect();
			downX = e.clientX - rect.left;
			downY = e.clientY - rect.top;
			wasDragged = false;
			tooltip.classList.remove("visible");
		});
		listen(renderer.domElement, "pointerup", (e) => {
			if (wasDragged) return;
			const rect = root.getBoundingClientRect();
			const s = hitStation(e.clientX - rect.left, e.clientY - rect.top);
			if (!s) return;
			focusStation(s.id);
			options.onStation?.(s.id);
		});
		listen(document, "visibilitychange", () => {
			visible = !document.hidden;
			lastFrame = performance.now();
		});
		const observer = new IntersectionObserver((entries) => {
			visible = entries[0].isIntersecting && !document.hidden;
			lastFrame = performance.now();
		}, { threshold: .01 });
		observer.observe(renderer.domElement);
		cleanups.push(() => observer.disconnect());
		listen(renderer.domElement, "webglcontextlost", (e) => {
			e.preventDefault();
			contextLost = true;
			showError("The graphics context was interrupted. The scene comes back on its own once WebGL is available again.");
		});
		listen(renderer.domElement, "webglcontextrestored", () => {
			contextLost = false;
			$("error").style.display = "none";
			lastFrame = performance.now();
		});
		const scratch = new Vector3(), anchor = new Vector3();
		const journeySteps = [
			["Incident INC-2048", "Credential Compromise · suspicious login detected"],
			["Reconstructing context", "Attack → users, assets, and evidence mapped"],
			["Rewinding timeline", "Reconstruct → decision point at T-04:12 restored"],
			["Simulating response", "Rewind → counterfactual branch: isolate endpoint"],
			["Response approved", "Simulate → action executed, incident contained"]
		];
		let prevJourney = -1, lastFrame = performance.now(), frameCount = 0, measureTime = 0, pixelRatio = renderer.getPixelRatio();
		let rafId = 0;
		function animate(now) {
			rafId = requestAnimationFrame(animate);
			const dt = Math.max(0, Math.min((now - lastFrame) / 1e3, .045));
			lastFrame = now;
			if (!visible || contextLost) return;
			if (playing) {
				simTime += dt;
				flightTime += dt;
			}
			const t = simTime, beat = t / 4 % 1, tact = t * TAU / 4, smooth = 1 - Math.exp(-dt * 5);
			spread = MathUtils.lerp(spread, mode === "stations" ? 1 : 0, smooth);
			cutPlane.constant = MathUtils.lerp(cutPlane.constant, mode === "cutaway" ? .99 : 10, smooth);
			stations.forEach((s, i) => {
				s.group.position.copy(s.base);
				s.group.position.x *= 1 + spread * .29;
				s.group.position.z *= 1 + spread * .37;
				s.group.position.y += spread * (i % 2 ? .32 : .55);
				const pulse = Math.pow(Math.max(0, Math.sin(tact - i * .9)), 7);
				s.glowMat.emissiveIntensity = MathUtils.lerp(s.glowMat.emissiveIntensity, hovered === s.id || cameraMode === "station" && selected === s.id ? 3.5 : .55 + pulse * .65, smooth);
			});
			belt.scale.set(1 + spread * .12, 1, 1 + spread * .15);
			pipes.scale.set(1 + spread * .25, 1, 1 + spread * .3);
			gears.forEach(({ g, vertical }, i) => {
				if (vertical) g.rotation.z = t * (i % 2 ? -1 : 1) * 1.1;
				else g.rotation.y = t * (i % 2 ? -1 : 1) * 1.1;
			});
			reels.forEach((r, i) => r.rotation.z = -t * (i ? .65 : .85));
			printhead.position.x = Math.sin(tact) * .42;
			printhead.position.y = 1.91 + Math.sin(tact * 2) * .055;
			outputAlert.position.y = beat * .25;
			flyBranch.position.y = Math.sin(tact) * .04;
			const orderPhase = t / 24 % 1;
			const respondBeat = mode === "order" ? MathUtils.clamp((orderPhase - .88) / .12, 0, 1) : beat;
			report.visible = coin.visible = mode !== "order" || orderPhase > .88;
			report.scale.y = .2 + Math.min(1, respondBeat * 1.5) * .8;
			coin.position.set(1.04, 2.7 - Math.min(1, respondBeat * 1.7) ** 2 * 2.17, .55);
			coin.rotation.y = t * 3.5;
			coin.scale.setScalar(respondBeat > .9 ? 1 - (respondBeat - .9) * 8 : 1);
			const incomingBeat = mode === "order" ? Math.min(1, orderPhase / .15) : beat;
			incoming.visible = mode !== "order" || orderPhase < .15;
			incoming.position.set(Math.sin(incomingBeat * Math.PI) * .24, 2.9 - incomingBeat * 1.9, 1.1 - incomingBeat * .55);
			incoming.rotation.z = Math.sin(incomingBeat * Math.PI) * -.14;
			incoming.scale.setScalar(Math.min(1, incomingBeat * 8 + .15, (1 - incomingBeat) * 7 + .1));
			toggles.forEach((o, i) => o.rotation.x = Math.sin(tact + i) > 0 ? -.4 : .4);
			if (t - lastDraw > 1 / 18 || lastDraw < 0) {
				drawAlert(t);
				drawEvidenceQueue(t);
				evidenceQueue.texture.needsUpdate = true;
				updateBelt(t);
				lastDraw = t;
			}
			packets.forEach((packet, i) => {
				const phase = (t / 24 + i / 6) % 1;
				packet.phase = phase;
				let stage;
				if (phase < .15) {
					stage = 0;
					const f = phase / .15;
					packet.group.position.copy(stations[3].group.position).add(new Vector3(0, 1.6, .6));
					scratch.copy(stations[0].group.position).add(new Vector3(0, 1.3, .65));
					packet.group.position.lerp(scratch, f);
					packet.group.position.y += Math.sin(f * Math.PI) * 2;
					packet.group.rotation.set(0, Math.sin(f * Math.PI) * .28, Math.sin(f * Math.PI) * -.1);
				} else {
					const u = (phase - .15) / .85 * respondU;
					path.getPointAt(u, packet.group.position);
					packet.group.position.x *= 1 + spread * .12;
					packet.group.position.z *= 1 + spread * .15;
					packet.group.position.y += .43;
					packet.group.rotation.set(0, .18, 0);
					stage = u < reconstructU * .7 ? 1 : u < rewindU * .96 ? 2 : u < respondU * .83 ? 3 : 4;
				}
				if (packet.stage !== stage) {
					packet.faces.forEach((f, j) => f.visible = j === stage);
					packet.stage = stage;
				}
				packet.group.visible = mode !== "order" || i === 0;
				packet.halo.visible = mode === "order" && i === 0;
				packet.group.scale.setScalar(mode === "order" ? 1.35 : 1);
				if (phase > .94) packet.group.scale.multiplyScalar(Math.max(.05, (1 - phase) / .06));
			});
			if (mode === "order") {
				const packet = packets[0], step = packet.stage;
				if (step !== prevJourney) {
					$("journey-title").textContent = (journeySteps[step] ?? journeySteps[0])[0] ?? "";
					$("journey-detail").textContent = (journeySteps[step] ?? journeySteps[0])[1] ?? "";
					prevJourney = step;
				}
				$("journey-progress").style.width = packet.phase * 100 + "%";
				if (!dragging && playing) {
					desiredTarget.copy(packet.group.position);
					desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 10 : 15);
					cameraAnimating = true;
				}
			} else if (cameraMode === "flight" && playing && !dragging) {
				const a = flightTime * .12, d = baseDistance * (mode === "stations" ? 1.2 : 1);
				desiredTarget.set(0, 1, 0);
				desiredPosition.set(Math.sin(a + .55) * d * .83, d * (.5 + Math.sin(a * .7) * .09), Math.cos(a + .55) * d * .83).add(desiredTarget);
				cameraAnimating = true;
			} else if (cameraMode === "station" && cameraAnimating) setCameraGoal();
			if (cameraAnimating && !dragging) {
				const speed = 1 - Math.exp(-dt * (mode === "order" ? 2.2 : 3));
				camera.position.lerp(desiredPosition, speed);
				controls.target.lerp(desiredTarget, speed);
				if (cameraMode !== "flight" && mode !== "order" && camera.position.distanceTo(desiredPosition) < .015 && controls.target.distanceTo(desiredTarget) < .015) cameraAnimating = false;
			}
			controls.autoRotate = playing && !reduceMotion && !dragging && !cameraAnimating && mode !== "order" && cameraMode === "overview" && now - lastInteraction > 6500;
			controls.autoRotateSpeed = .24;
			controls.update(dt);
			stations.forEach((s, i) => {
				const show = mode === "stations";
				s.label.classList.toggle("visible", show);
				if (!show) return;
				anchor.copy(s.group.position).add(s.anchor).project(camera);
				const offsets = mobile ? [
					[-30, 25],
					[-27, -50],
					[15, -65],
					[16, -1],
					[-5, 52]
				] : [
					[-48, -14],
					[-8, -64],
					[30, -12],
					[30, 20],
					[-12, 40]
				];
				let x = (anchor.x * .5 + .5) * width - 40 + (offsets[i]?.[0] ?? 0), y = (-anchor.y * .5 + .5) * height - 52 + (offsets[i]?.[1] ?? 0);
				x = MathUtils.clamp(x, mobile || !embedded ? 9 : width * .425, width - (mobile ? 123 : 165));
				y = MathUtils.clamp(y, 130, height - 200);
				s.label.style.transform = `translate(${x}px,${y}px)`;
			});
			renderer.render(scene, camera);
			if (!readySent && sized) {
				readySent = true;
				options.onReady?.();
			}
			if (playing) {
				frameCount++;
				measureTime += dt;
				if (measureTime > 4) {
					if (frameCount / measureTime < 43 && pixelRatio > 1) {
						pixelRatio = Math.max(1, pixelRatio - .25);
						renderer.setPixelRatio(pixelRatio);
					}
					frameCount = 0;
					measureTime = 0;
				}
			}
		}
		rafId = requestAnimationFrame(animate);
		cleanups.push(() => {
			cancelAnimationFrame(rafId);
			controls.dispose();
			const textures = /* @__PURE__ */ new Set();
			scene.traverse((object) => {
				const mesh = object;
				if (mesh.geometry) mesh.geometry.dispose();
				const list = mesh.material ? Array.isArray(mesh.material) ? mesh.material : [mesh.material] : [];
				for (const material of list) {
					for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value);
					material.dispose();
				}
			});
			geometries.forEach((g) => g.dispose());
			textures.forEach((t) => t.dispose());
			env.dispose();
			renderer.dispose();
			renderer.forceContextLoss();
			renderer.domElement.remove();
		});
		renderer.compile(scene, camera);
		$("loading").classList.add("done");
		$("error").style.display = "none";
		Object.defineProperty(window, "__machineDebug", {
			value: { getState: () => ({
				mode,
				camera: cameraMode,
				playing,
				time: simTime,
				spread,
				cutHeight: cutPlane.constant,
				width,
				height,
				embedded,
				drawCalls: renderer.info.render.calls,
				triangles: renderer.info.render.triangles,
				pixelRatio: renderer.getPixelRatio(),
				stations: stations.map((s) => {
					const p = s.group.position.clone().add(new Vector3(0, 1, 0)).project(camera);
					return {
						id: s.id,
						x: (p.x * .5 + .5) * width,
						y: (-.5 * p.y + .5) * height
					};
				})
			}) },
			configurable: true
		});
		cleanups.push(() => {
			delete window.__machineDebug;
		});
	} catch (error) {
		console.error("IncidentTimeMachine: failed to start", error);
		showError();
	}
	return dispose;
}
var STYLES = String.raw`
.incident-time-machine-3d { width: 100%; contain: layout; }
.incident-time-machine-3d { color-scheme: dark; --bg: #000000; --white: #f4f1ea; --amber: #ff7a1a; --muted: #81848b; --line: rgba(244, 241, 234, 0.11); }
.incident-time-machine-3d, .incident-time-machine-3d * { box-sizing: border-box; }
.incident-time-machine-3d { margin: 0; width: 100%; height: 100%; overflow: hidden; background: var(--bg); }
.incident-time-machine-3d { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: var(--white); font-size: 13px; -webkit-font-smoothing: antialiased; }
.incident-time-machine-3d { position: relative; overflow: hidden; }
.incident-time-machine-3d button, .incident-time-machine-3d a { -webkit-tap-highlight-color: transparent; }
.incident-time-machine-3d button { font: inherit; color: inherit; cursor: pointer; }
.incident-time-machine-3d button:focus-visible, .incident-time-machine-3d a:focus-visible { outline: 2px solid var(--amber); outline-offset: 5px; }
.incident-time-machine-3d #scene { position: absolute; inset: 0; touch-action: pan-y; outline: none; }
.incident-time-machine-3d.embed #scene { pointer-events: none !important; touch-action: auto !important; }
.incident-time-machine-3d.embed .debug-ui { display: none !important; }
.incident-time-machine-3d #scene canvas { display: block; width: 100%; height: 100%; }
.incident-time-machine-3d .vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 50% 48%, transparent 30%, rgba(0,0,0,0.12) 64%, rgba(0,0,0,0.65) 100%); }
.incident-time-machine-3d .topbar { position: absolute; inset: 28px 32px auto; display: flex; justify-content: space-between; align-items: center; pointer-events: none; }
.incident-time-machine-3d .identity { display: flex; gap: 13px; align-items: center; }
.incident-time-machine-3d .mark { width: 30px; height: 30px; border: 1px solid #55502f; border-radius: 9px; display: grid; place-items: center; color: var(--amber); background: #1c1b14; }
.incident-time-machine-3d .identity strong { display: block; font-weight: 550; letter-spacing: -0.2px; font-size: 13px; }
.incident-time-machine-3d .identity small { display: block; margin-top: 5px; font-size: 9px; letter-spacing: 1.55px; color: #73777f; text-transform: uppercase; }
.incident-time-machine-3d .status { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: 0.1px; color: #a6a79f; }
.incident-time-machine-3d .status i { width: 5px; height: 5px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 10px #ff7a1a60; }
.incident-time-machine-3d .status.paused i { background: #777; box-shadow: none; }
.incident-time-machine-3d .status span:last-child { font-variant-numeric: tabular-nums; color: #646971; margin-left: 12px; }
.incident-time-machine-3d .scene-heading { position: absolute; top: 110px; left: 24%; right: 24%; pointer-events: none; display: flex; align-items: center; gap: 12px; font-size: 9px; letter-spacing: 1.8px; color: #959790; text-transform: uppercase; }
.incident-time-machine-3d .scene-heading:before { content: ''; width: 22px; height: 1px; background: var(--amber); }
.incident-time-machine-3d .scene-heading .index { margin-left: auto; color: #4e535b; font-size: 9px; letter-spacing: 1px; }
.incident-time-machine-3d .coordinates { position: absolute; top: 150px; right: 33px; color: #52575f; writing-mode: vertical-rl; font: 9px ui-monospace, Menlo, SFMono-Regular, monospace; letter-spacing: 1.5px; pointer-events: none; }
.incident-time-machine-3d .controls { position: absolute; bottom: 79px; left: 26px; right: 26px; display: flex; align-items: center; flex-direction: column; gap: 16px; z-index: 5; }
.incident-time-machine-3d .mode-bar { display: flex; gap: 3px; align-items: center; padding: 5px; border: 1px solid #ffffff13; border-radius: 12px; background: rgba(25,28,32,0.87); box-shadow: 0 8px 30px #0003, inset 0 1px 0 #ffffff03; backdrop-filter: blur(16px); }
.incident-time-machine-3d .mode-bar button { border: 0; background: none; color: #a2a4a8; white-space: nowrap; padding: 11px 15px; display: flex; gap: 8px; align-items: center; font-size: 11px; font-weight: 500; border-radius: 8px; transition: background 0.2s, color 0.2s; }
.incident-time-machine-3d .mode-bar button:hover { background: #ffffff08; color: var(--white); }
.incident-time-machine-3d .mode-bar button[aria-pressed='true'] { background: var(--amber); color: #211c0d; box-shadow: 0 2px 12px #ff7a1a12; }
.incident-time-machine-3d svg { flex-shrink: 0; display: block; }
.incident-time-machine-3d .mode-bar svg { width: 14px; height: 14px; }
.incident-time-machine-3d .camera-row { display: flex; align-items: center; justify-content: center; gap: 4px; }
.incident-time-machine-3d .camera-row .caption { font-size: 9px; letter-spacing: 1.4px; color: #555b65; margin-right: 9px; }
.incident-time-machine-3d .camera-row button { border: 0; background: transparent; color: #6e747e; padding: 5px 9px; font-size: 10px; transition: color 0.2s; }
.incident-time-machine-3d .camera-row button:hover, .incident-time-machine-3d .camera-row button[aria-pressed='true'] { color: var(--white); }
.incident-time-machine-3d .camera-row button[aria-pressed='true']:after { content: ''; display: block; width: 3px; height: 3px; background: var(--amber); border-radius: 50%; margin: 5px auto -8px; }
.incident-time-machine-3d .camera-row .divider { width: 1px; height: 13px; background: var(--line); margin: 0 8px; }
.incident-time-machine-3d .camera-row #play { padding: 5px; width: 25px; height: 25px; display: grid; place-items: center; }
.incident-time-machine-3d .footer { position: absolute; bottom: 25px; left: 32px; right: 32px; display: flex; align-items: center; justify-content: space-between; gap: 12px; pointer-events: none; }
.incident-time-machine-3d .wordmark { font-size: 11px; letter-spacing: -0.1px; color: #6d7178; text-decoration: none; pointer-events: auto; }
.incident-time-machine-3d .wordmark span { color: #a1a49f; }
.incident-time-machine-3d .hint { display: flex; align-items: center; gap: 7px; color: #636972; font-size: 10px; }
.incident-time-machine-3d .hint svg { color: #8c8f91; }
.incident-time-machine-3d .footer-center { position: absolute; left: 50%; transform: translateX(-50%); font: 9px ui-monospace, Menlo, SFMono-Regular, monospace; letter-spacing: 1.5px; color: #3f454d; }
.incident-time-machine-3d #labels { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.incident-time-machine-3d .station-label { position: absolute; left: 0; top: 0; opacity: 0; transition: opacity 0.3s; will-change: transform; pointer-events: none; min-width: 138px; }
.incident-time-machine-3d .station-label.visible { opacity: 1; }
.incident-time-machine-3d .station-label .stem { height: 26px; width: 1px; background: linear-gradient(#ff7a1a00, #ff7a1a70); margin: 0 0 0 10px; }
.incident-time-machine-3d .station-label .label-card { background: #14171bee; backdrop-filter: blur(10px); border: 1px solid #ff7a1a40; border-radius: 6px; padding: 10px 13px; box-shadow: 0 4px 20px #0003; }
.incident-time-machine-3d .station-label .label-title { font-weight: 550; font-size: 12px; display: flex; gap: 10px; align-items: center; white-space: nowrap; }
.incident-time-machine-3d .station-label .label-title span { color: var(--amber); font: 9px ui-monospace, Menlo, monospace; }
.incident-time-machine-3d .station-label .label-meta { font-size: 9px; color: #8e939c; margin: 6px 0 0 24px; white-space: nowrap; }
.incident-time-machine-3d #tooltip { position: absolute; pointer-events: none; z-index: 10; opacity: 0; transition: opacity 0.15s; padding: 11px 14px; border: 1px solid #ffffff1a; background: #171a20ed; backdrop-filter: blur(12px); box-shadow: 0 8px 32px #0005; border-radius: 7px; max-width: 240px; }
.incident-time-machine-3d #tooltip.visible { opacity: 1; }
.incident-time-machine-3d #tooltip strong { font-size: 12px; font-weight: 550; }
.incident-time-machine-3d #tooltip strong span { font-size: 10px; color: var(--amber); margin-right: 8px; }
.incident-time-machine-3d #tooltip p { font-size: 10px; color: #9b9fa7; margin: 6px 0 0; line-height: 1.5; }
.incident-time-machine-3d #journey { position: absolute; left: 24%; right: 24%; top: 148px; opacity: 0; transform: translateY(-5px); transition: 0.4s; pointer-events: none; display: flex; align-items: center; gap: 13px; }
.incident-time-machine-3d #journey.visible { opacity: 1; transform: none; }
.incident-time-machine-3d .journey-icon { width: 28px; height: 28px; border: 1px solid #ff7a1a40; border-radius: 50%; display: grid; place-items: center; color: var(--amber); }
.incident-time-machine-3d #journey strong { font-size: 11px; font-weight: 500; }
.incident-time-machine-3d #journey small { display: block; font-size: 9px; margin-top: 4px; color: #7e858d; }
.incident-time-machine-3d #journey .track { height: 2px; background: #ffffff0b; flex: 1; margin-left: 8px; }
.incident-time-machine-3d #journey .track i { display: block; height: 100%; background: var(--amber); width: 0; }
.incident-time-machine-3d #loading { position: absolute; left: 50%; top: 48%; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 12px; color: #8c8f95; font-size: 11px; transition: opacity 0.4s; z-index: 20; }
.incident-time-machine-3d #loading i { height: 18px; width: 18px; border-radius: 50%; border: 1px solid #ff7a1a22; border-top-color: var(--amber); animation: incident-time-machine-3d-spin 1s linear infinite; }
@keyframes incident-time-machine-3d-spin { to { transform: rotate(360deg); } }
.incident-time-machine-3d #loading.done { opacity: 0; pointer-events: none; }
.incident-time-machine-3d #error { position: absolute; left: 27.5%; right: 27.5%; top: 40%; border: 1px solid #ff7a1a30; background: #191b1f; padding: 24px; border-radius: 12px; display: none; font-size: 13px; line-height: 1.7; }
.incident-time-machine-3d #error strong { color: var(--amber); font-weight: 500; }
.incident-time-machine-3d #error p { color: #9da1a8; margin: 8px 0 0; }
.incident-time-machine-3d #error button { border: 1px solid #ffffff22; background: #25292e; padding: 8px 14px; border-radius: 5px; margin-top: 14px; }
.incident-time-machine-3d.embed .debug-ui { display: none !important; }
.incident-time-machine-3d.embed .vignette { background: radial-gradient(ellipse at 71% 48%, transparent 30%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.55)); }
.incident-time-machine-3d.embed .footer { justify-content: flex-end; }
.incident-time-machine-3d.embed .wordmark { opacity: 0.65; }
@media (min-width: 901px) { .incident-time-machine-3d.embed #loading { left: 71%; } .incident-time-machine-3d.embed #error { left: 48%; right: 7%; } }
@media (min-width: 1600px) { .incident-time-machine-3d .topbar { inset: 38px 46px auto; } .incident-time-machine-3d .scene-heading { top: 142px; } .incident-time-machine-3d .controls { bottom: 100px; gap: 20px; } .incident-time-machine-3d .mode-bar button { padding: 13px 20px; font-size: 12px; } .incident-time-machine-3d .camera-row button { font-size: 11px; padding: 5px 12px; } .incident-time-machine-3d .footer { bottom: 35px; left: 46px; right: 46px; } .incident-time-machine-3d #journey { top: 182px; } .incident-time-machine-3d .coordinates { right: 47px; top: 185px; } }
@media (max-width: 900px) { .incident-time-machine-3d .topbar { inset: 24px 22px auto; } .incident-time-machine-3d .identity strong { font-size: 12px; } .incident-time-machine-3d .identity small { font-size: 8px; letter-spacing: 1.1px; } .incident-time-machine-3d .status { font-size: 9px; } .incident-time-machine-3d .status span:last-child { display: none; } .incident-time-machine-3d .scene-heading { left: 22px; right: 22px; top: 105px; font-size: 8px; letter-spacing: 1.3px; } .incident-time-machine-3d .coordinates { display: none; } .incident-time-machine-3d .controls { left: 12px; right: 12px; bottom: 84px; gap: 18px; } .incident-time-machine-3d .mode-bar { gap: 1px; padding: 4px; border-radius: 10px; } .incident-time-machine-3d .mode-bar button { padding: 11px 10px; font-size: 10px; gap: 6px; } .incident-time-machine-3d .mode-bar svg { width: 12px; height: 12px; } .incident-time-machine-3d .camera-row { gap: 0; } .incident-time-machine-3d .camera-row .caption { font-size: 8px; margin-right: 6px; } .incident-time-machine-3d .camera-row button { padding: 5px 8px; font-size: 9px; } .incident-time-machine-3d .camera-row .divider { margin: 0 5px; } .incident-time-machine-3d .footer { bottom: 25px; left: 22px; right: 22px; align-items: flex-end; } .incident-time-machine-3d .hint { font-size: 9px; max-width: 175px; line-height: 1.6; } .incident-time-machine-3d .footer-center { display: none; } .incident-time-machine-3d .vignette { background: radial-gradient(ellipse at 50% 47%, transparent 20%, #00000080 100%); } .incident-time-machine-3d #loading { left: 50%; } .incident-time-machine-3d #error { left: 7%; right: 7%; top: 35%; } .incident-time-machine-3d #journey { left: 24px; right: 24px; top: 143px; } .incident-time-machine-3d .station-label { min-width: 100px; } .incident-time-machine-3d .station-label .label-card { padding: 7px 9px; } .incident-time-machine-3d .station-label .label-title { font-size: 10px; gap: 7px; } .incident-time-machine-3d .station-label .label-meta { font-size: 8px; margin-left: 0; } .incident-time-machine-3d .station-label .stem { height: 17px; } .incident-time-machine-3d.embed .vignette { background: radial-gradient(ellipse at center, transparent 30%, #00000060 100%); } }
@media (max-width: 360px) { .incident-time-machine-3d .mode-bar button { padding: 10px 7px; } .incident-time-machine-3d .mode-bar svg { display: none; } .incident-time-machine-3d .camera-row .caption { display: none; } .incident-time-machine-3d .status { display: none; } }
@media (max-height: 570px) { .incident-time-machine-3d .topbar { top: 16px; } .incident-time-machine-3d .scene-heading { top: 70px; } .incident-time-machine-3d .controls { bottom: 50px; gap: 8px; } .incident-time-machine-3d .footer { bottom: 14px; } .incident-time-machine-3d #journey { top: 96px; } .incident-time-machine-3d .mode-bar button { padding-top: 8px; padding-bottom: 8px; } }
@media (prefers-reduced-motion: reduce) { .incident-time-machine-3d, .incident-time-machine-3d * { transition: none !important; } .incident-time-machine-3d #loading i { animation: none; } }
`;
//#endregion
export { IncidentTimeMachine3D as t };
