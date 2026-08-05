/// <reference path="./features.js" />

/*
 * NOTE: This script is deliberately written in pure ES3/ES5 JavaScript (var, standard functions)
 * so that old engines can execute this code without throwing syntax errors.
 */

if (!window.evaluateEsmFeature) {
  window.evaluateEsmFeature = function (test, callback) {
    // Fallback for environments that don't support ES Modules
    callback(false);
  };
}

var currentFilter = "all";

// Run custom syntax input
function runCustomTest() {
  var code = document.getElementById("custom-code-input").value;
  var resultDiv = document.getElementById("custom-result");

  try {
    eval(code);
    resultDiv.style.display = "block";
    resultDiv.className = "custom-result badge-pass";
    resultDiv.innerHTML =
      "<strong>Supported!</strong> Syntax evaluated successfully without errors.";
  } catch (err) {
    resultDiv.style.display = "block";
    resultDiv.className = "custom-result badge-fail";
    resultDiv.innerHTML =
      "<strong>Unsupported / Syntax Error:</strong> " + (err.message || err);
  }
}

// Render features to the page DOM
function renderApp() {
  var uaDiv = document.getElementById("ua-display");
  uaDiv.innerText = "User Agent: " + navigator.userAgent;

  var container = document.getElementById("results-container");
  container.innerHTML = "";

  var totalCount = 0;
  var passCount = 0;
  var failCount = 0;

  asyncForEach(
    featureCategories,
    function (next, category) {
      var catHeader = document.createElement("h3");
      catHeader.className = "section-title";
      catHeader.innerText = category.name;

      var grid = document.createElement("div");
      grid.className = "grid";

      asyncForEach(
        category.tests,
        function (next, test) {
          evaluateFeature(test, function (isSupported) {
            totalCount++;
            if (isSupported) {
              passCount++;
            } else {
              failCount++;
            }

            var statusClass = isSupported ? "pass" : "fail";
            var badgeText = isSupported ? "Pass" : "Fail";
            var badgeClass = isSupported ? "badge-pass" : "badge-fail";

            var item = document.createElement("div");
            item.className = "feature-item " + statusClass;
            item.setAttribute("data-name", test.name.toLowerCase());
            item.setAttribute("data-status", statusClass);

            item.innerHTML =
              '<div class="feature-info">' +
              '<div class="feature-name">' +
              test.name +
              "</div>" +
              '<div class="feature-type">' +
              test.type +
              "</div>" +
              "</div>" +
              '<div><span class="badge ' +
              badgeClass +
              '">' +
              badgeText +
              "</span></div>";

            grid.appendChild(item);
            setStatValues(totalCount, passCount, failCount);
            next();
          });
        },
        function () {
          container.appendChild(catHeader);
          container.appendChild(grid);
          next();
        },
      );
    },
    function () {
      setStatValues(totalCount, passCount, failCount);
    },
  );
}

function setStatValues(total, pass, fail) {
  // Update Header Metrics
  document.getElementById("stat-total").innerText = total;
  document.getElementById("stat-pass").innerText = pass;
  document.getElementById("stat-fail").innerText = fail;
}

// Evaluator engine runner
function evaluateFeature(test, callback) {
  try {
    if (test.env === "module") {
      // If the test is marked for ES Modules, use the module evaluator
      return window.evaluateEsmFeature(test, callback);
    }
    if (test.type === "syntax") {
      try {
        // Dynamic syntax evaluation safely wrapped in try/catch
        eval(test.code);
        return callback(true);
      } catch (e) {
        return callback(false);
      }
    } else if (test.type === "api") {
      try {
        return callback(!!test.check());
      } catch (e) {
        return callback(false);
      }
    }
    return callback(false);
  } catch (e) {
    return callback(false);
  }
}

// Filter by Pass / Fail
function setFilter(filterType, btnElement) {
  currentFilter = filterType;

  var buttons = document.querySelectorAll(".filter-btn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].className = "filter-btn";
  }
  btnElement.className = "filter-btn active";

  filterResults();
}

// Filter items by Search Query and Status
function filterResults() {
  var query = document.getElementById("search-input").value.toLowerCase();
  var items = document.querySelectorAll(".feature-item");

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var name = item.getAttribute("data-name");
    var status = item.getAttribute("data-status");

    var matchesQuery = name.indexOf(query) !== -1;
    var matchesStatus = currentFilter === "all" || status === currentFilter;

    if (matchesQuery && matchesStatus) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
}

// Utilities
function asyncForEach(list, callback, finalCallback) {
  var index = 0;
  function next() {
    setTimeout(function () {
      if (index < list.length) {
        callback(next, list[index], index, list);
        index++;
      } else {
        if (finalCallback) finalCallback();
      }
    }, 0);
  }
  next();
}

// Initial load
window.addEventListener("load", function () {
  renderApp();
});
