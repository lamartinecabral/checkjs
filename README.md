# checkjs

A dependency-free browser page for checking which JavaScript language features and Web APIs are available in the current browser.

Open the page to see the detected user agent, a pass/fail summary, and individual compatibility results.

## What It Checks

- Language syntax, including arrow functions, classes, destructuring, async/await, optional chaining, object rest/spread, generators, numeric separators, class static blocks, and modern regular expressions
- Global and Web Platform APIs such as `Promise`, `fetch`, `Map`, `WebAssembly`, observers, encoding, streams, Web Components, graphics, real-time communication, storage, and Web Workers
- Built-in helper methods including `Object.assign`, `Object.fromEntries`, immutable Array methods, modern String methods, Number and Math helpers, Promise helpers, memory-management APIs, and `Intl`

Syntax checks are evaluated dynamically so that an older browser can still load the evaluator even when it does not support the feature being tested.

## Run It

No install or build step is required.

1. Open `index.html` in a browser.
2. Review the total, supported, and unsupported counts.
3. Use the search field or status buttons to narrow the results.

For a local web server, run the following from the project directory:

```sh
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Interactive Syntax Evaluator

The **Interactive Syntax Evaluator** lets you enter JavaScript and test whether the current browser can parse and evaluate it. It displays a success message or the resulting error.

The evaluator executes entered code with `eval()`. Use it only with code you trust, since the code runs in the context of the page.

## Project Structure

```text
.
├── index.html     # Application markup
├── index.js       # Main application logic, UI rendering, stats, and evaluation runner
├── features.js    # Test categories and feature declarations (syntax, API, and module checks)
├── module.js      # ES module dynamic evaluation runner using Blob URLs
├── package.json   # NPM scripts
└── README.md      # Project documentation
```
