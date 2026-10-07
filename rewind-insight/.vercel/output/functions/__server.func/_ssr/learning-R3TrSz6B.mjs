import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { _ as incidentReportService, x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { t as LearningDashboard } from "./LearningDashboard-B1l4Urp0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learning-R3TrSz6B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LearningRouteComponent() {
	const { currentReport, generateReport, currentMinute } = useDemo();
	(0, import_react.useEffect)(() => {
		if (!currentReport) generateReport();
	}, [currentReport, generateReport]);
	const report = currentReport || incidentReportService.generateIncidentReport("INC-2048", { minute: currentMinute });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight text-white",
				children: "Post-Incident Learning Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Systemic learnings, counterfactual damage prevention analysis, and strategic posture changes."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearningDashboard, { report })]
	});
}
//#endregion
export { LearningRouteComponent as component };
