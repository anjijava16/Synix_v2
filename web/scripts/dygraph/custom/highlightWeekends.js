/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//function highlightWeekends(target) {
//    return function(canvas, area, g) {
//        activeGraphCanvas = canvas;
//        activeGraphArea = area;
function highlightWeekends() {

    function highlight_period(x_start, x_end) {
        var canvas_left_x = activeGraph.toDomXCoord(x_start);
        var canvas_right_x = activeGraph.toDomXCoord(x_end);
        var canvas_width = canvas_right_x - canvas_left_x;
        activeGraphCanvas.fillStyle = "rgba(255, 255, 102, 1.0)";
        activeGraphCanvas.fillRect(canvas_left_x, activeGraphArea.y, canvas_width, activeGraphArea.h);
    }

    var min_data_x = activeGraph.getValue(0, 0);
    var max_data_x = activeGraph.getValue(activeGraph.numRows() - 1, 0);

    // get day of week
    var d = new Date(min_data_x);
    var dow = d.getUTCDay();

    var w = min_data_x;
    // starting on Sunday is a special case
    if (dow === 0) {
        highlight_period(w, w + 12 * 3600 * 1000);
    }
    // find first saturday
    while (dow !== 6) {
        w += 24 * 3600 * 1000;
        d = new Date(w);
        dow = d.getUTCDay();
    }
    // shift back 1/2 day to center highlight around the point for the day
//        w -= 12 * 3600 * 1000;
    while (w < max_data_x) {
        var start_x_highlight = w - 1 * 24 * 3600 * 1000;
        var end_x_highlight = w + 1 * 24 * 3600 * 1000;
        // make sure we don't try to plot outside the graph
        if (start_x_highlight < min_data_x) {
            start_x_highlight = min_data_x;
        }
        if (end_x_highlight > max_data_x) {
            end_x_highlight = max_data_x;
        }
        highlight_period(start_x_highlight, end_x_highlight);
        // calculate start of highlight for next Saturday
        w += 7 * 24 * 3600 * 1000;
    }
//        function highlight_target(top) {
//            activeGraphCanvas.fillStyle = 'green';
//            activeGraphCanvas.fillRect(area.x,  area.y, area.w,top);
////                activeGraphCanvas.fillRect(area.x, splitY, area.w, bottomHeight);
//        }
//        var splitDate = new Date(min_data_x);
//        var coords = activeGraph.toDomCoords(splitDate, target);
//        var splitY = coords[1];
//        var topHeight = splitY - area.y;
//        highlight_target(topHeight);
//    };
}
