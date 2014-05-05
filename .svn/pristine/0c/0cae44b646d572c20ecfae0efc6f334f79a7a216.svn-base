/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function highlightPeriod(period) {
    return function(canvas, area, g) {
        canvas.fillStyle = "rgba(102, 255, 102, 1.0)";
        var canvas_left_x = g.toDomXCoord(period - 900000);
        var canvas_right_x = g.toDomXCoord(period + 900000);
        var canvas_width = canvas_right_x - canvas_left_x;
        canvas.fillRect(canvas_left_x, area.y, canvas_width, area.h);
    };
}