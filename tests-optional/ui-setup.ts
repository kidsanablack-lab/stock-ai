import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

const g = globalThis as any;
g.window = dom.window;
g.document = dom.window.document;
Object.defineProperty(g, "navigator", { value: dom.window.navigator, configurable: true });
for (const key of ["HTMLElement", "HTMLInputElement", "Element", "Node", "Event", "KeyboardEvent", "MouseEvent", "MutationObserver", "getComputedStyle", "requestAnimationFrame", "cancelAnimationFrame"]) {
  g[key] = (dom.window as any)[key];
}
g.IS_REACT_ACT_ENVIRONMENT = true;
// jsdom does not implement these; the page only calls them for scrolling.
dom.window.Element.prototype.scrollIntoView = () => {};
(dom.window as any).matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });

// Components import .css files (handled by Next.js). Node should just ignore them.
import Module from "node:module";
(Module as any)._extensions[".css"] = () => {};
