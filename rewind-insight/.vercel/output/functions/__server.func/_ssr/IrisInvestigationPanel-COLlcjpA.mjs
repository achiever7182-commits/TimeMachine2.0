import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, S as Send, Tt as Bot, f as Sparkles, vt as ChevronUp, xt as ChevronDown } from "../_libs/lucide-react.mjs";
import { x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { t as irisService } from "./irisService-LaFd4rdD.mjs";
import { t as IrisMessage } from "./IrisMessage-BQssWEP_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/IrisInvestigationPanel-COLlcjpA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IrisInvestigationPanel({ defaultPrompt, suggestedQuestions, title = "IRIS Quick Investigation", compact = false }) {
	const { currentTime, currentMinute, counterfactualBranch, scenarioHistory } = useDemo();
	const [inputQuery, setInputQuery] = (0, import_react.useState)(defaultPrompt || "");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [isAnswering, setIsAnswering] = (0, import_react.useState)(false);
	const [isCollapsed, setIsCollapsed] = (0, import_react.useState)(compact);
	const irisContext = (0, import_react.useMemo)(() => {
		return irisService.createContext(currentMinute, counterfactualBranch, scenarioHistory);
	}, [
		currentMinute,
		counterfactualBranch,
		scenarioHistory
	]);
	const handleAsk = async (queryToAsk) => {
		const q = (queryToAsk ?? inputQuery).trim();
		if (!q || isAnswering) return;
		const userMsg = {
			id: `usr-${Date.now()}`,
			role: "USER",
			content: q,
			timestamp: currentTime
		};
		setMessages((prev) => [...prev, userMsg]);
		setInputQuery("");
		setIsAnswering(true);
		if (isCollapsed) setIsCollapsed(false);
		try {
			const resp = await irisService.ask(q, irisContext);
			const irisMsg = {
				id: `iris-${Date.now()}`,
				role: "IRIS",
				content: resp.answer,
				response: resp,
				timestamp: currentTime
			};
			setMessages((prev) => [...prev, irisMsg]);
		} catch (err) {
			setMessages((prev) => [...prev, {
				id: `err-${Date.now()}`,
				role: "IRIS",
				content: "Failed to query the incident investigation engine.",
				timestamp: currentTime
			}]);
		} finally {
			setIsAnswering(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border/80 bg-card/60 backdrop-blur-md shadow-panel overflow-hidden transition-all",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: () => setIsCollapsed(!isCollapsed),
			className: "flex items-center justify-between p-3.5 bg-secondary/30 cursor-pointer hover:bg-secondary/40 transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-7 items-center justify-center rounded-lg bg-cyan-signal/15 border border-cyan-signal/30 text-cyan-signal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-xs font-bold text-foreground flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[9px] text-cyan-signal font-normal",
						children: ["@", currentTime]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground",
					children: "Direct telemetry inspection & interpretation"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-muted-foreground hover:text-foreground",
				children: isCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
			})]
		}), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3.5 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: (suggestedQuestions ?? [
						"What did we know at this time?",
						"What did we miss?",
						"How did the attacker reach the database?"
					]).map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => handleAsk(prompt),
						disabled: isAnswering,
						className: "flex items-center gap-1 rounded border border-border/70 bg-background/50 px-2 py-0.5 text-[10px] text-foreground hover:border-cyan-signal/50 hover:bg-cyan-signal/10 disabled:opacity-50 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: prompt }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-2 opacity-60" })]
					}, prompt))
				}),
				messages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-64 space-y-3 overflow-y-auto pr-1",
					children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisMessage, { message: m }, m.id))
				}),
				isAnswering && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground italic py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 animate-spin text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IRIS analyzing incident reconstruction..." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						handleAsk();
					},
					className: "flex items-center gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: inputQuery,
						onChange: (e) => setInputQuery(e.target.value),
						placeholder: "Ask IRIS about this exact moment...",
						disabled: isAnswering,
						className: "h-8 flex-1 rounded-lg border border-border bg-secondary/30 px-3 text-[11px] text-foreground placeholder:text-muted-foreground focus:border-cyan-signal focus:outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: !inputQuery.trim() || isAnswering,
						className: "flex h-8 items-center gap-1 rounded-lg bg-cyan-signal px-3 font-mono text-[10px] font-bold text-background hover:bg-cyan-400 disabled:opacity-50 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ASK" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-2.5" })]
					})]
				})
			]
		})]
	});
}
//#endregion
export { IrisInvestigationPanel as t };
