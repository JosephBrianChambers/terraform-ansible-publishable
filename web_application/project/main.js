var myApp = myApp || {}


myApp.rainbow = function(options) {
  var colorSize = options["colorSize"];
  var colorIndex = 0;
  var rgbColors = initRgbColors()

  function sin_to_int(i, phase) {
    var sin = Math.sin(Math.PI / colorSize * 2 * i + phase);
    return int = Math.floor(sin * 127) + 128;
  }

  function initRgbColors() {
    var colors = new Array(colorSize);

    for (var i=0; i<colorSize; i++) {
      var red = sin_to_int(i, 0 * Math.PI * 2/3); // 0   deg
      var blue = sin_to_int(i, 1 * Math.PI * 2/3); // 120 deg
      var green = sin_to_int(i, 2 * Math.PI * 2/3); // 240 deg

      colors[i] = [red,green,blue]
    }

    return colors
  }

  function nextRgbColor() {
    colorIndex = (colorIndex % (colorSize - 1)) + 1
    return rgbColors[colorIndex]
  }

  return {
    nextRgbColor: nextRgbColor
  }
}

myApp.buddaBoardRow = function() {
  var domElement = document.createElement("li")
  domElement.className = "row"

  function appendBox(box) {
    domElement.append(box.domElement)
  }

  return {
    domElement: domElement,
    appendBox: appendBox,
  }
}

myApp.buddaBoardBox = function() {
  var domElement = document.createElement("div")
  domElement.className = "box"
  setTransparency(0)
  setRgb([0,0,0])

  function getTransparency() {
    return parseFloat(domElement.dataset.transparency)
  }

  function setTransparency(transparency) {
    domElement.dataset.transparency = transparency;
  }

  function getRgb() {
    return domElement.dataset.rgb.split(",").map(Number)
  }

  function setRgb(rgb) {
    domElement.dataset.rgb = rgb;
  }

  function applyColor(rgb, transparency) {
    setRgb(`${rgb[0]}, ${rgb[1]}, ${rgb[2]}`)
    setTransparency(transparency)
    domElement.style.background = `rgba(${getRgb()}, ${getTransparency()})`
  }

  return {
    domElement: domElement,
    transparency: getTransparency,
    rgb: getRgb,
    applyColor: applyColor
  }
}

myApp.buddaBoard = function(rainbow) {
  let buddaBoardDomElement = document.getElementById("budda-board")
  let buddaBoxes = []
  let boardRows = 20;
  let boardColumns = 50;
  let transparencyDeltaTouch = 0.1
  let transparencyDeltaSaturate = 0.05
  let transparencyDeltaFade = -0.02

  for (var i = 0; i < boardRows; i++) {
    let row = new myApp.buddaBoardRow()
    buddaBoardDomElement.append(row.domElement)

    for (var j = 0; j < boardColumns; j++) {
      let box = new myApp.buddaBoardBox()
      row.appendBox(box)
      buddaBoxes.push(box)

      box.domElement.addEventListener("mouseover", function(event) {
        if (box.transparency() + transparencyDeltaTouch > 1) { return }

        var rgb = box.transparency() <= 0 ? rainbow.nextRgbColor() : box.rgb()
        box.applyColor(rgb, box.transparency() + transparencyDeltaTouch)
        setTimeout(function() { box.applyColor(rgb, box.transparency() + transparencyDeltaSaturate) }, 100)
        setTimeout(function() { box.applyColor(rgb, box.transparency() + transparencyDeltaSaturate) }, 200)
        setTimeout(function() { box.applyColor(rgb, box.transparency() + transparencyDeltaSaturate) }, 300)
        setTimeout(function() { box.applyColor(rgb, box.transparency() + transparencyDeltaSaturate) }, 400)
        setTimeout(function() { box.applyColor(rgb, box.transparency() + transparencyDeltaSaturate) }, 500)
        setTimeout(function() { box.applyColor(rgb, box.transparency() + transparencyDeltaSaturate) }, 600)
      });
    }
  }

  setInterval(function() {
    for (var i = 0; i < buddaBoxes.length; i++) {
      let box = buddaBoxes[i]
      let boxTransparency = box.transparency()

      if (boxTransparency > 0.0) {
        let transparency = boxTransparency + transparencyDeltaFade
        box.applyColor(box.rgb(), transparency)
      }
    }
  }, 400)
}

window.onload = function() {
  var rainbow = new myApp.rainbow({ colorSize: 200 })
  myApp.buddaBoard(rainbow)
}
