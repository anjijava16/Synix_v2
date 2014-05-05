/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var activeGraphCanvas;
var activeGraphArea;
var activeGraph;

function highlightCanvas(target) {
    return function(canvas, area, g) {
        activeGraphCanvas = canvas;
        activeGraphArea = area;
        activeGraph=g;
        highlight_target(target, g);
        highlightWeekends();
}
}
function highlight_target(target, g) {
    var coords = g.toDomCoords(0, target);
    var splitY = coords[1];
    var topHeight = splitY - activeGraphArea.y;
    activeGraphCanvas.fillStyle = 'rgba(180, 255, 102, 1.0)';
    if (target < 50) {
        activeGraphCanvas.fillRect(activeGraphArea.x, activeGraphArea.h, activeGraphArea.w, topHeight);
    } else {
        activeGraphCanvas.fillRect(activeGraphArea.x, activeGraphArea.y, activeGraphArea.w, topHeight);
    }
}
function lowlight_target(target, g) {
    var coords = g.toDomCoords(0, target);
    var splitY = coords[1];
    var topHeight = splitY - activeGraphArea.y;
    activeGraphCanvas.fillStyle = 'rgba(255, 255, 255, 1.0)';
    if (target < 50) {
        activeGraphCanvas.fillRect(activeGraphArea.x, activeGraphArea.y, activeGraphArea.w, topHeight);
    } else {
        activeGraphCanvas.fillRect(activeGraphArea.x, activeGraphArea.h, activeGraphArea.w, topHeight);
    }
}       