// Evaluator engine runner for ES Modules
function evaluateEsmFeature(test, callback) {
  if (test.type === "syntax") {
    return moduleEval(test.code, callback);
  } else if (test.type === "api") {
    return moduleEval("(" + test.check.toString() + ")()", callback);
  }
  return callback(false);
}

function moduleEval(jsCode, callback) {
  try {
    var blob = new Blob([jsCode], { type: "text/javascript" });
    var blobUrl = URL.createObjectURL(blob);
    var script = document.createElement("script");
    script.src = blobUrl;
    script.type = "module";

    var failed = false;
    var errorListener = function (e) {
      failed = true;
      e.preventDefault();
    };
    window.addEventListener("error", errorListener);

    document.body.appendChild(script);

    script.onload = function (ev) {
      window.removeEventListener("error", errorListener);
      script.remove();
      URL.revokeObjectURL(blobUrl);

      if (!failed) callback(true);
      else callback(false);
    };

    script.onerror = function (ev) {
      window.removeEventListener("error", errorListener);
      script.remove();
      URL.revokeObjectURL(blobUrl);
      callback(false);
    };
  } catch (e) {
    callback(false);
  }
}

window.evaluateEsmFeature = evaluateEsmFeature;
