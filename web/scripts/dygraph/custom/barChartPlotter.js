/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function barChartPlotter(e) {
    return function() {
        var ctx = e.drawingContext;
        var points = e.points;
        var y_bottom = e.dygraph.toDomYCoord(0);

        // The RGBColorParser class is provided by rgbcolor.js, which is
        // packed in with dygraphs.
        var color = new RGBColorParser(e.color);
        color.r = Math.floor((255 + color.r) / 2);
        color.g = Math.floor((255 + color.g) / 2);
        color.b = Math.floor((255 + color.b) / 2);
        ctx.fillStyle = color.toRGB();

        // Find the minimum separation between x-values.
        // This determines the bar width.
        var min_sep = Infinity;
        for (var i = 1; i < points.length; i++) {
            var sep = points[i].canvasx - points[i - 1].canvasx;
            if (sep < min_sep)
                min_sep = sep;
        }

        var bar_width = Math.floor(2.0 / 4 * min_sep);

        // Do the actual plotting.
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var center_x = p.canvasx;
            console.log(p);
            ctx.fillRect(center_x - bar_width / 2, p.canvasy,
                    bar_width, y_bottom - p.canvasy);


            ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
                    bar_width, y_bottom - p.canvasy);
        }
    };
}

