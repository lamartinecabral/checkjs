// Evaluator engine runner for Web Worker context
function evaluateWorkerFeature(test, callback) {
  if (test.type === "syntax") {
    try {
      // Dynamic syntax evaluation safely wrapped in try/catch
      eval(test.code);
      return callback(true);
    } catch (e) {
      console.log(e);
      return callback(false);
    }
  } else if (test.type === "api") {
    try {
      return callback(!!test.check());
    } catch (e) {
      console.log(e);
      return callback(false);
    }
  }
  return callback(false);
}

self.onmessage = function (event) {
  const test = event.data;
  evaluateWorkerFeature(test, function (result) {
    self.postMessage({ result: result });
  });
};
