import { r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageHeader-DeDQgGHW.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.22em] text-cyan-signal",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base",
				children: description
			}) : null
		] }), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		}) : null]
	});
}
function GlassPanel({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `rounded-xl border border-border bg-card/72 shadow-panel backdrop-blur-xl ${className}`,
		children
	});
}
//#endregion
export { PageHeader as n, GlassPanel as t };
