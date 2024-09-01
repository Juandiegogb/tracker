document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }

  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

document.onload = (function () {
  var devtools = function () {};
  devtools.toString = function () {
    return "DevTools";
  };
  Object.defineProperty(window, "devtools", {
    get: function () {
      if (console.log !== devtools) {
        console.log = devtools;
      }
      if (console.dir !== devtools) {
        console.dir = devtools;
      }
      return devtools;
    },
  });
})();
