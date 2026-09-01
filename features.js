/** @typedef {{name: string, type: 'syntax', env?: 'module', code: string} | {name: string, type: 'api', check: function(): boolean}} FeatureDeclaration */
/** @typedef {{name: string, tests: FeatureDeclaration[]}} FeatureCategory */

/**
 * List of test categories and feature declarations
 * @type {FeatureCategory[]}
 */
var featureCategories = [
  {
    name: "Language Syntax & Grammar (Evaluated via eval)",
    tests: [
      {
        name: "ES Modules",
        type: "syntax",
        env: "module",
        code: "export {};",
      },
      { name: "Arrow Functions", type: "syntax", code: "() => {}" },
      {
        name: "let / const Block Scope",
        type: "syntax",
        code: "let x = 1; const y = 2;",
      },
      {
        name: "Template Literals",
        type: "syntax",
        code: "`hello ${1+1}`",
      },
      { name: "Classes", type: "syntax", code: "class TestFeature {}" },
      {
        name: "Destructuring Assignment",
        type: "syntax",
        code: "var [a, b] = [1, 2]; var {c} = {c:3};",
      },
      {
        name: "Shorthand Notation for Object Literals",
        type: "syntax",
        code: "var value = 1; ({value});",
      },
      {
        name: "Default Function Parameters",
        type: "syntax",
        code: "function test(a, b = 1) {}",
      },
      {
        name: "Rest & Spread Operators",
        type: "syntax",
        code: "var a = [1]; var b = [...a]; function f(...args){}",
      },
      {
        name: "for...of Loops",
        type: "syntax",
        code: "for (var value of [1]) { break; }",
      },
      {
        name: "Generator Functions",
        type: "syntax",
        code: "function* iterator() { yield 1; }",
      },
      {
        name: "Async / Await Syntax",
        type: "syntax",
        code: "async function test() { await Promise.resolve(); }",
      },
      {
        name: "import.meta",
        type: "syntax",
        env: "module",
        code: "export const url = import.meta.url;",
      },
      {
        name: "Async Generators",
        type: "syntax",
        code: "async function* iterator() { yield 1; }",
      },
      {
        name: "Object Rest / Spread Properties",
        type: "syntax",
        code: "var source = {a: 1, b: 2}; var {a, ...rest} = source; var copy = {...rest};",
      },
      {
        name: "RegExp Named Capture Groups",
        type: "syntax",
        code: "var match = /(?<year>\\d{4})/.exec('2026');",
      },
      {
        name: "RegExp Lookbehind Assertions",
        type: "syntax",
        code: "var match = /(?<=prefix)word/.test('prefixword');",
      },
      {
        name: "RegExp Unicode Property Escapes",
        type: "syntax",
        code: "var hasLetter = /\\p{L}/u.test('A');",
      },
      {
        name: "RegExp dotAll Flag",
        type: "syntax",
        code: "var match = /a.b/s.test('a\\nb');",
      },
      {
        name: "Module Namespace Object",
        type: "syntax",
        env: "module",
        code: 'import * as name from "module";',
      },
      {
        name: "Top-level await",
        type: "syntax",
        env: "module",
        code: "await Promise.resolve();",
      },
      {
        name: "Private Fields in Operator",
        type: "syntax",
        code: "class Foo { #value; has(object) { return #value in object; } }",
      },
      {
        name: "RegExp hasIndices Flag (d)",
        type: "syntax",
        code: "var match = /a/d.exec('a'); var indices = match.indices;",
      },
      {
        name: "RegExp Unicode Sets Flag (v)",
        type: "syntax",
        code: "var expression = /[\\p{ASCII}&&\\p{Letter}]/v;",
      },
      {
        name: "Optional Chaining (?.)",
        type: "syntax",
        code: "var obj = {}; var val = obj?.a?.b;",
      },
      {
        name: "Nullish Coalescing (??)",
        type: "syntax",
        code: "var val = null ?? 'default';",
      },
      {
        name: "Logical Assignment Operators (||=, &&=, ??=)",
        type: "syntax",
        code: "let a = 0; a ||= 1; let b = 1; b &&= 2;",
      },
      {
        name: "Numeric Separators",
        type: "syntax",
        code: "var total = 1_000_000;",
      },
      {
        name: "Private Class Fields (#field)",
        type: "syntax",
        code: "class Foo { #bar = 42; getBar() { return this.#bar; } }",
      },
      {
        name: "Class Static Initialization Blocks",
        type: "syntax",
        code: "class Counter { static { this.value = 1; } }",
      },
      {
        name: "JSON import",
        type: "syntax",
        env: "module",
        code: 'import data from "./data.json" with { type: "json" };',
      },
    ],
  },
  {
    name: "Global Objects & APIs",
    tests: [
      {
        name: "Promise",
        type: "api",
        check: function () {
          return typeof Promise !== "undefined";
        },
      },
      {
        name: "Fetch API",
        type: "api",
        check: function () {
          return typeof fetch !== "undefined";
        },
      },
      {
        name: "Prompt API (LanguageModel)",
        type: "api",
        check: function () {
          return (
            typeof LanguageModel !== "undefined" &&
            typeof LanguageModel.availability === "function" &&
            typeof LanguageModel.create === "function"
          );
        },
      },
      {
        name: "Prompt API Availability",
        type: "api",
        check: function () {
          if (
            typeof LanguageModel === "undefined" ||
            typeof LanguageModel.availability !== "function"
          ) {
            return false;
          }

          // availability() does not create a session or download a model.
          return LanguageModel.availability().then(function (availability) {
            return availability !== "unavailable";
          });
        },
      },
      {
        name: "Prompt API Session Methods",
        type: "api",
        check: function () {
          var prototype =
            typeof LanguageModel !== "undefined" && LanguageModel.prototype;

          return !!(
            prototype &&
            typeof prototype.append === "function" &&
            typeof prototype.clone === "function" &&
            typeof prototype.destroy === "function" &&
            typeof prototype.measureContextUsage === "function" &&
            typeof prototype.prompt === "function" &&
            typeof prototype.promptStreaming === "function"
          );
        },
      },
      {
        name: "Prompt API Context Properties",
        type: "api",
        check: function () {
          var prototype =
            typeof LanguageModel !== "undefined" && LanguageModel.prototype;

          return !!(
            prototype &&
            "contextUsage" in prototype &&
            "contextWindow" in prototype
          );
        },
      },
      {
        name: "Map & Set",
        type: "api",
        check: function () {
          return typeof Map !== "undefined" && typeof Set !== "undefined";
        },
      },
      {
        name: "Symbol",
        type: "api",
        check: function () {
          return typeof Symbol !== "undefined";
        },
      },
      {
        name: "Proxy & Reflect",
        type: "api",
        check: function () {
          return typeof Proxy !== "undefined" && typeof Reflect !== "undefined";
        },
      },
      {
        name: "BigInt",
        type: "api",
        check: function () {
          return typeof BigInt !== "undefined";
        },
      },
      {
        name: "WebAssembly",
        type: "api",
        check: function () {
          return typeof WebAssembly !== "undefined";
        },
      },
      {
        name: "IntersectionObserver",
        type: "api",
        check: function () {
          return typeof IntersectionObserver !== "undefined";
        },
      },
      {
        name: "ResizeObserver",
        type: "api",
        check: function () {
          return typeof ResizeObserver !== "undefined";
        },
      },
      {
        name: "localStorage",
        type: "api",
        check: function () {
          try {
            return typeof localStorage !== "undefined" && localStorage !== null;
          } catch (e) {
            return false;
          }
        },
      },
      {
        name: "Web Workers",
        type: "api",
        check: function () {
          return typeof Worker !== "undefined";
        },
      },
      {
        name: "AbortController & AbortSignal",
        type: "api",
        check: function () {
          return (
            typeof AbortController !== "undefined" &&
            typeof AbortSignal !== "undefined"
          );
        },
      },
      {
        name: "URL & URLSearchParams",
        type: "api",
        check: function () {
          return (
            typeof URL !== "undefined" && typeof URLSearchParams !== "undefined"
          );
        },
      },
      {
        name: "AbortSignal.timeout / any",
        type: "api",
        check: function () {
          return (
            typeof AbortSignal !== "undefined" &&
            typeof AbortSignal.timeout === "function" &&
            typeof AbortSignal.any === "function"
          );
        },
      },
      {
        name: "Fetch Request / Response / Headers / FormData",
        type: "api",
        check: function () {
          return (
            typeof Request !== "undefined" &&
            typeof Response !== "undefined" &&
            typeof Headers !== "undefined" &&
            typeof FormData !== "undefined"
          );
        },
      },
      {
        name: "TextEncoder & TextDecoder",
        type: "api",
        check: function () {
          return (
            typeof TextEncoder !== "undefined" &&
            typeof TextDecoder !== "undefined"
          );
        },
      },
      {
        name: "queueMicrotask",
        type: "api",
        check: function () {
          return typeof queueMicrotask === "function";
        },
      },
      {
        name: "globalThis",
        type: "api",
        check: function () {
          return typeof globalThis !== "undefined";
        },
      },
      {
        name: "Crypto getRandomValues",
        type: "api",
        check: function () {
          return (
            typeof crypto !== "undefined" &&
            typeof crypto.getRandomValues === "function"
          );
        },
      },
      {
        name: "MutationObserver",
        type: "api",
        check: function () {
          return typeof MutationObserver !== "undefined";
        },
      },
      {
        name: "PerformanceObserver",
        type: "api",
        check: function () {
          return typeof PerformanceObserver !== "undefined";
        },
      },
      {
        name: "BroadcastChannel",
        type: "api",
        check: function () {
          return typeof BroadcastChannel !== "undefined";
        },
      },
      {
        name: "MessageChannel",
        type: "api",
        check: function () {
          return typeof MessageChannel !== "undefined";
        },
      },
      {
        name: "WebSocket",
        type: "api",
        check: function () {
          return typeof WebSocket !== "undefined";
        },
      },
      {
        name: "EventSource",
        type: "api",
        check: function () {
          return typeof EventSource !== "undefined";
        },
      },
      {
        name: "Readable / Writable / Transform Streams",
        type: "api",
        check: function () {
          return (
            typeof ReadableStream !== "undefined" &&
            typeof WritableStream !== "undefined" &&
            typeof TransformStream !== "undefined"
          );
        },
      },
      {
        name: "Web Components",
        type: "api",
        check: function () {
          return (
            typeof customElements !== "undefined" &&
            typeof customElements.define === "function"
          );
        },
      },
      {
        name: "Shadow DOM",
        type: "api",
        check: function () {
          return (
            typeof Element !== "undefined" &&
            Element.prototype &&
            typeof Element.prototype.attachShadow === "function"
          );
        },
      },
      {
        name: "WebGL",
        type: "api",
        check: function () {
          return typeof WebGLRenderingContext !== "undefined";
        },
      },
      {
        name: "WebGL 2",
        type: "api",
        check: function () {
          return typeof WebGL2RenderingContext !== "undefined";
        },
      },
      {
        name: "Canvas 2D",
        type: "api",
        check: function () {
          try {
            return !!document.createElement("canvas").getContext("2d");
          } catch (_) {
            return false;
          }
        },
      },
      {
        name: "OffscreenCanvas",
        type: "api",
        check: function () {
          return typeof OffscreenCanvas !== "undefined";
        },
      },
      {
        name: "WebRTC",
        type: "api",
        check: function () {
          return typeof RTCPeerConnection !== "undefined";
        },
      },
      {
        name: "File APIs",
        type: "api",
        check: function () {
          return (
            typeof File !== "undefined" &&
            typeof FileReader !== "undefined" &&
            typeof Blob !== "undefined"
          );
        },
      },
      {
        name: "IndexedDB",
        type: "api",
        check: function () {
          return typeof indexedDB !== "undefined";
        },
      },
      {
        name: "Cache Storage",
        type: "api",
        check: function () {
          return typeof caches !== "undefined";
        },
      },
      {
        name: "Service Workers",
        type: "api",
        check: function () {
          return (
            typeof navigator !== "undefined" &&
            typeof navigator.serviceWorker !== "undefined"
          );
        },
      },
      {
        name: "Permissions API",
        type: "api",
        check: function () {
          return (
            typeof navigator !== "undefined" &&
            typeof navigator.permissions !== "undefined" &&
            typeof navigator.permissions.query === "function"
          );
        },
      },
      {
        name: "Notifications",
        type: "api",
        check: function () {
          return typeof Notification !== "undefined";
        },
      },
      {
        name: "Geolocation",
        type: "api",
        check: function () {
          return (
            typeof navigator !== "undefined" &&
            typeof navigator.geolocation !== "undefined"
          );
        },
      },
      {
        name: "Media Devices",
        type: "api",
        check: function () {
          return (
            typeof navigator !== "undefined" &&
            typeof navigator.mediaDevices !== "undefined" &&
            typeof navigator.mediaDevices.getUserMedia === "function"
          );
        },
      },
      {
        name: "Web Audio",
        type: "api",
        check: function () {
          return (
            typeof AudioContext !== "undefined" ||
            typeof webkitAudioContext !== "undefined"
          );
        },
      },
      {
        name: "WebGPU",
        type: "api",
        check: function () {
          return (
            typeof navigator !== "undefined" &&
            typeof navigator.gpu !== "undefined"
          );
        },
      },
      {
        name: "WebGPU Adapter",
        type: "api",
        check: function () {
          if (
            typeof navigator === "undefined" ||
            typeof navigator.gpu === "undefined" ||
            typeof navigator.gpu.requestAdapter !== "function"
          ) {
            return false;
          }

          return navigator.gpu.requestAdapter().then(function (adapter) {
            return !!adapter;
          });
        },
      },
      {
        name: "Secure Context",
        type: "api",
        check: function () {
          return typeof isSecureContext !== "undefined" && isSecureContext;
        },
      },
      {
        name: "structuredClone",
        type: "api",
        check: function () {
          return typeof structuredClone !== "undefined";
        },
      },
      {
        name: "HTML Dialog Element",
        type: "api",
        check: function () {
          return typeof HTMLDialogElement !== "undefined";
        },
      },
      {
        name: "Compression & Decompression Streams",
        type: "api",
        check: function () {
          return (
            typeof CompressionStream !== "undefined" &&
            typeof DecompressionStream !== "undefined"
          );
        },
      },
      {
        name: "Temporal",
        type: "api",
        check: function () {
          return (
            typeof Temporal !== "undefined" &&
            typeof Temporal.PlainDate === "function"
          );
        },
      },
    ],
  },
  {
    name: "Prototype & Helper Methods",
    tests: [
      {
        name: "Object.assign",
        type: "api",
        check: function () {
          return typeof Object.assign === "function";
        },
      },
      {
        name: "Object.entries / values",
        type: "api",
        check: function () {
          return (
            typeof Object.entries === "function" &&
            typeof Object.values === "function"
          );
        },
      },
      {
        name: "Object.fromEntries",
        type: "api",
        check: function () {
          return typeof Object.fromEntries === "function";
        },
      },
      {
        name: "Array.prototype.includes",
        type: "api",
        check: function () {
          return (
            Array.prototype && typeof Array.prototype.includes === "function"
          );
        },
      },
      {
        name: "Array.prototype.flat",
        type: "api",
        check: function () {
          return Array.prototype && typeof Array.prototype.flat === "function";
        },
      },
      {
        name: "Array.prototype.at",
        type: "api",
        check: function () {
          return Array.prototype && typeof Array.prototype.at === "function";
        },
      },
      {
        name: "Array.prototype.find / findIndex",
        type: "api",
        check: function () {
          return (
            Array.prototype &&
            typeof Array.prototype.find === "function" &&
            typeof Array.prototype.findIndex === "function"
          );
        },
      },
      {
        name: "Array.prototype.findLast / findLastIndex",
        type: "api",
        check: function () {
          return (
            Array.prototype &&
            typeof Array.prototype.findLast === "function" &&
            typeof Array.prototype.findLastIndex === "function"
          );
        },
      },
      {
        name: "String.prototype.replaceAll",
        type: "api",
        check: function () {
          return (
            String.prototype &&
            typeof String.prototype.replaceAll === "function"
          );
        },
      },
      {
        name: "String.prototype.startsWith / endsWith",
        type: "api",
        check: function () {
          return (
            String.prototype &&
            typeof String.prototype.startsWith === "function" &&
            typeof String.prototype.endsWith === "function"
          );
        },
      },
      {
        name: "String.prototype.padStart / padEnd",
        type: "api",
        check: function () {
          return (
            String.prototype &&
            typeof String.prototype.padStart === "function" &&
            typeof String.prototype.padEnd === "function"
          );
        },
      },
      {
        name: "String.prototype.matchAll",
        type: "api",
        check: function () {
          return (
            String.prototype && typeof String.prototype.matchAll === "function"
          );
        },
      },
      {
        name: "Number.isNaN / isInteger",
        type: "api",
        check: function () {
          return (
            typeof Number.isNaN === "function" &&
            typeof Number.isInteger === "function"
          );
        },
      },
      {
        name: "Math.trunc / sign / cbrt / hypot",
        type: "api",
        check: function () {
          return (
            typeof Math.trunc === "function" &&
            typeof Math.sign === "function" &&
            typeof Math.cbrt === "function" &&
            typeof Math.hypot === "function"
          );
        },
      },
      {
        name: "Promise.allSettled",
        type: "api",
        check: function () {
          return (
            typeof Promise !== "undefined" &&
            typeof Promise.allSettled === "function"
          );
        },
      },
      {
        name: "Promise.any",
        type: "api",
        check: function () {
          return (
            typeof Promise !== "undefined" && typeof Promise.any === "function"
          );
        },
      },
      {
        name: "Promise.prototype.finally",
        type: "api",
        check: function () {
          return (
            typeof Promise !== "undefined" &&
            Promise.prototype &&
            typeof Promise.prototype.finally === "function"
          );
        },
      },
      {
        name: "WeakRef & FinalizationRegistry",
        type: "api",
        check: function () {
          return (
            typeof WeakRef !== "undefined" &&
            typeof FinalizationRegistry !== "undefined"
          );
        },
      },
      {
        name: "Atomics",
        type: "api",
        check: function () {
          return typeof Atomics !== "undefined";
        },
      },
      {
        name: "Intl",
        type: "api",
        check: function () {
          return (
            typeof Intl !== "undefined" &&
            typeof Intl.DateTimeFormat === "function"
          );
        },
      },
      {
        name: "Object.hasOwn",
        type: "api",
        check: function () {
          return typeof Object.hasOwn === "function";
        },
      },
      {
        name: "Array.prototype.toReversed / toSorted / toSpliced / with",
        type: "api",
        check: function () {
          return (
            Array.prototype &&
            typeof Array.prototype.toReversed === "function" &&
            typeof Array.prototype.toSorted === "function" &&
            typeof Array.prototype.toSpliced === "function" &&
            typeof Array.prototype.with === "function"
          );
        },
      },
      {
        name: "Array.fromAsync",
        type: "api",
        check: function () {
          return typeof Array.fromAsync === "function";
        },
      },
      {
        name: "Promise.withResolvers",
        type: "api",
        check: function () {
          return (
            typeof Promise !== "undefined" &&
            typeof Promise.withResolvers === "function"
          );
        },
      },
    ],
  },
];
