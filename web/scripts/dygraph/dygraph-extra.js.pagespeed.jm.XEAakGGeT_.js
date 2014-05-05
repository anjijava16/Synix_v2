Dygraph.Export = {};
Dygraph.Export.DEFAULT_ATTRS = {backgroundColor: "transparent", titleFont: "bold 18px serif", titleFontColor: "black", axisLabelFont: "bold 14px serif", axisLabelFontColor: "black", labelFont: "normal 12px serif", labelFontColor: "black", legendFont: "bold 12px serif", legendFontColor: "black", vLabelLeft: 20, legendHeight: 20, legendMargin: 20, lineHeight: 30, maxlabelsWidth: 0, labelTopMargin: 35, magicNumbertop: 8};
Dygraph.Export.isSupported = function() {
    "use strict";
    try {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        return(!!canvas.toDataURL && !!context.fillText);
    } catch (e) {
    }
    return false;
};
Dygraph.Export.asPNG = function(dygraph, img, userOptions) {
    "use strict";
    var canvas = Dygraph.Export.asCanvas(dygraph, userOptions);
    img.src = canvas.toDataURL();
};
Dygraph.Export.asCanvas = function(dygraph, userOptions) {
    "use strict";
    var options = {}, canvas = Dygraph.createCanvas();
    Dygraph.update(options, Dygraph.Export.DEFAULT_ATTRS);
    Dygraph.update(options, userOptions);
    canvas.width = dygraph.width_;
    canvas.height = dygraph.height_ + options.legendHeight;
    Dygraph.Export.drawPlot(canvas, dygraph, options);
    Dygraph.Export.drawLegend(canvas, dygraph, options);
    return canvas;
};
Dygraph.Export.drawPlot = function(canvas, dygraph, options) {
    "use strict";
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var plotCanvas = dygraph.hidden_;
    var i = 0;
    ctx.drawImage(plotCanvas, 0, 0);
    var axesPluginDict = Dygraph.Export.getPlugin(dygraph, 'Axes Plugin');
    if (axesPluginDict) {
        var axesPlugin = axesPluginDict.plugin;
        for (i = 0; i < axesPlugin.ylabels_.length; i++) {
            Dygraph.Export.putLabel(ctx, axesPlugin.ylabels_[i], options, options.labelFont, options.labelFontColor);
        }
        for (i = 0; i < axesPlugin.xlabels_.length; i++) {
            Dygraph.Export.putLabel(ctx, axesPlugin.xlabels_[i], options, options.labelFont, options.labelFontColor);
        }
    }
    var labelsPluginDict = Dygraph.Export.getPlugin(dygraph, 'ChartLabels Plugin');
    if (labelsPluginDict) {
        var labelsPlugin = labelsPluginDict.plugin;
        Dygraph.Export.putLabel(ctx, labelsPlugin.title_div_, options, options.titleFont, options.titleFontColor);
        Dygraph.Export.putLabel(ctx, labelsPlugin.xlabel_div_, options, options.axisLabelFont, options.axisLabelFontColor);
        Dygraph.Export.putVerticalLabelY1(ctx, labelsPlugin.ylabel_div_, options, options.axisLabelFont, options.axisLabelFontColor, "center");
        Dygraph.Export.putVerticalLabelY2(ctx, labelsPlugin.y2label_div_, options, options.axisLabelFont, options.axisLabelFontColor, "center");
    }
    for (i = 0; i < dygraph.layout_.annotations.length; i++) {
        Dygraph.Export.putLabelAnn(ctx, dygraph.layout_.annotations[i], options, options.labelFont, options.labelColor);
    }
};
Dygraph.Export.putLabel = function(ctx, divLabel, options, font, color) {
    "use strict";
    if (!divLabel || !divLabel.style) {
        return;
    }
    var top = parseInt(divLabel.style.top, 10);
    var left = parseInt(divLabel.style.left, 10);
    if (!divLabel.style.top.length) {
        var bottom = parseInt(divLabel.style.bottom, 10);
        var height = parseInt(divLabel.style.height, 10);
        top = ctx.canvas.height - options.legendHeight - bottom - height;
    }
    top = top + options.magicNumbertop;
    var width = parseInt(divLabel.style.width, 10);
    switch (divLabel.style.textAlign) {
        case"center":
            left = left + Math.ceil(width / 2);
            break;
        case"right":
            left = left + width;
            break;
    }
    Dygraph.Export.putText(ctx, left, top, divLabel, font, color);
};
Dygraph.Export.putVerticalLabelY1 = function(ctx, divLabel, options, font, color, textAlign) {
    "use strict";
    if (!divLabel) {
        return;
    }
    var top = parseInt(divLabel.style.top, 10);
    var left = parseInt(divLabel.style.left, 10) + parseInt(divLabel.style.width, 10) / 2;
    var text = divLabel.innerText || divLabel.textContent;
    if (!left)
        left = options.vLabelLeft;
    if (textAlign == "center") {
        var textDim = ctx.measureText(text);
        top = Math.ceil((ctx.canvas.height - textDim.width) / 2 + textDim.width);
    }
    ctx.save();
    ctx.translate(0, ctx.canvas.height);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.fillText(text, top, left);
    ctx.restore();
};
Dygraph.Export.putVerticalLabelY2 = function(ctx, divLabel, options, font, color, textAlign) {
    "use strict";
    if (!divLabel) {
        return;
    }
    var top = parseInt(divLabel.style.top, 10);
    var right = parseInt(divLabel.style.right, 10) + parseInt(divLabel.style.width, 10) * 2;
    var text = divLabel.innerText || divLabel.textContent;
    if (textAlign == "center") {
        top = Math.ceil(ctx.canvas.height / 2);
    }
    ctx.save();
    ctx.translate(parseInt(divLabel.style.width, 10), 0);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.fillText(text, top, right - ctx.canvas.width);
    ctx.restore();
};
Dygraph.Export.putText = function(ctx, left, top, divLabel, font, color) {
    "use strict";
    var textAlign = divLabel.style.textAlign || "left";
    var text = divLabel.innerText || divLabel.textContent;
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = "middle";
    ctx.fillText(text, left, top);
};
Dygraph.Export.drawLegend = function(canvas, dygraph, options) {
    "use strict";
    var ctx = canvas.getContext("2d");
    var labelTopMargin = 10;
    var labelMargin = 5;
    var colors = dygraph.getColors();
    var labels = dygraph.attr_("labels").slice(1);
    var labelsWidth = 0;
    var i;
    for (i = 0; i < labels.length; i++) {
        labelsWidth = labelsWidth + ctx.measureText("- " + labels[i]).width + labelMargin;
    }
    var labelsX = Math.floor((canvas.width - labelsWidth) / 2);
    var labelsY = canvas.height - options.legendHeight + labelTopMargin;
    var labelVisibility = dygraph.attr_("visibility");
    ctx.font = options.legendFont;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    var usedColorCount = 0;
    for (i = 0; i < labels.length; i++) {
        if (labelVisibility[i]) {
            var txt = "- " + labels[i];
            ctx.fillStyle = colors[usedColorCount];
            usedColorCount++
            ctx.fillText(txt, labelsX, labelsY);
            labelsX = labelsX + ctx.measureText(txt).width + labelMargin;
        }
    }
};
Dygraph.Export.getPlugin = function(dygraph, name) {
    for (i = 0; i < dygraph.plugins_.length; i++) {
        if (dygraph.plugins_[i].plugin.toString() == name) {
            return dygraph.plugins_[i];
        }
    }
    return null;
}