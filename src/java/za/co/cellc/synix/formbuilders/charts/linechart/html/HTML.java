/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.linechart.html;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.formbuilders.charts.JSON_Parser;
import za.co.cellc.synix.formbuilders.charts.ResultsetParser;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;
import za.co.cellc.synix.formbuilders.charts.linechart.query.DisectedQuery;
import za.co.cellc.synix.formbuilders.charts.query.Query;

/**
 *
 * @author Pierre.Venter
 */
public class HTML {

    private String WORST_CELL_ANNOTATION = "WORST_CELL";
    private StringBuilder sb;
    private int divIndex;
    private DatabaseQueryObject dataObject;
//    private StringBuilder out = new StringBuilder();
    private List<String> tech;
    private List<String> vendor;
    private List<String> pages;
    private String level;
    private String fillGraph;
    private String roller_period;
    private String header;
    private String footer;

    public HTML(int divIndex, StringBuilder sb) {
        this.divIndex = divIndex;
//        this.dataObject = dataObject;
        this.sb = sb;
        initVariables();
        setHeader();
        setFooter();
    }

    public String getHeader() {
        return header;
    }

    public String getFooter() {
        return footer;
    }

    private void setHeader() {
        header = "<script>"
                + " var lines = [];";
    }

    private void setFooter() {
        footer = "</script> "
                + "<br><br><br>"
                //                + "<h1>Filters:</h1>"
                + "</div>";
    }

    public StringBuilder getCharts(DatabaseQueryObject dataObject, DisectedQuery disect, int chartIndex) {
        this.dataObject = dataObject;
        return createCharts(disect, chartIndex);
    }

//    private String getSQLquery(DatabaseQueryObject dataObject) {
//        Query q = new Query(sb);
//        return q.parse(dataObject);
//    }
    private StringBuilder createCharts(DisectedQuery disection, int chartIndex) {
        StringBuilder out = new StringBuilder();
//        for (int i = 0; i < dataObjects.size(); i++) {
//            ResultsetParser parser = parserLST.get(i);
//            setAxis(parser.getAxis());
//            setColumnNames(i);
        if (!disection.getChartData().isEmpty()) {

            out.append("var g" + "_").append(divIndex).append(chartIndex).append(" = new Dygraph(");
            out.append("document.getElementById(\"div").append(chartIndex + 1).append("_").append(divIndex).append("\"),\n");
            out.append("\"").append(disection.getChartData()).append("\"" + ", {\n");
            out.append("labels: [ ").append(disection.getChartLabels()).append(" ],\n");
//            secondaryAxesName = "";
//            if (parser.isMultiRSchart()) {
//                for (int j = 2; j < columnNames.length; j++) {
//                    if (isOnSecondaryAxis(axes.get(j))) {
//                        out.append("" + columnNames[j] + ": {\n";
//                        out.append("axis: \n";
//                        if (secondaryAxesName.isEmpty()) {
//                            out.append("{";
//                            out.append("}\n";
//                            setSecondaryAxesName(columnNames[j]);
//                        } else {
//                            out.append(secondaryAxesName;
//                        }
//                        out.append("},\n";
//                    }
//                }
//            }

//            out.append("axes: {\n";
//            out.append("y2: {\n";
            // set axis-related properties here
            out.append("labelsKMB: true,"
                    + "animatedZooms: true,"
                    + "");
//                    + "highlightCallback: function(e, x, pts) {"
//                    + "                for (var i = 0; i < pts.length; i++) {"
//                    + "                  var y = pts[i].canvasy; "
//                    + "var splitDate = new Date(g" + "_" + divIndex + i + ".getValue(0, 0));\n"
//                    //                    + "var target = " + dataObjects.get(i).getTarget() + ";"
//                    + "var target = 98;"
//                    + "var dataY = g" + "_" + divIndex + i + ".toDataYCoord(target);"
//                    + "var domY = g" + "_" + divIndex + i + ".toDomYCoord(target);"
//                    + "var coords = g" + "_" + divIndex + i + ".toDomCoords(splitDate, dataY);"
//                    + "var area = g" + "_" + divIndex + i + ".getArea();"
////                    + "var topHeight = coords[1] - area.y;console.log(coords[1]);"
//                    + "var topHeight = area.h - domY;"
//                    + "console.log(domY);"
//                    + "console.log(area.y);"
//                    + "console.log(area.h);"
//                    + "console.log(topHeight);"
////                    + "console.log(area.h-target-(dataY-target));"
//                    //                    + "                  var yl= g" + "_" + divIndex + i + ".toDomYCoord(98);console.log(coords[1]);"
//                    + "                  lines[i].style.visibility = \"visible\";"
//                    + "                  lines[i].style.top = domY + \"px\";"
//                    + "                }"
//                    + "              },"
//                    + "              unhighlightCallback: function(e) {"
//                    + "                for (var i = 0; i < lines.length; i++) {"
//                    + "                  lines[i].style.visibility = \"hidden\";"
//                    + "                }"
//                    + "              },";
            out.append("'Target': {strokeWidth: 3, strokePattern: [7, 2, 2, 2]},");
            out.append("underlayCallback: highlightCanvas(").append(dataObject.getTarget()).append("),");
            out.append("drawCallback: addAnnotation(),");
//            out.append("},";
//            out.append("stackedGraph: isStacked,";
//            out.append("ylabel: 'Primary y-axis',";
//            out.append("y2label: 'Secondary y-axis',";
//            out.append("yAxisLabelWidth: 60,";

            out.append("rollPeriod: ").append(roller_period).append(",\n");
            out.append("title:'").append(dataObject.getChartTitle()).append("',\n");
//            out.append("xlabel: 'Date',\n";
//            out.append("ylabel: 'zoom in: click/drag zoom out: double click',\n";
            out.append("highlightSeriesOpts: {");
            out.append("strokeWidth: 2,");
            out.append("strokeBorderWidth: 1,");
            out.append("highlightCircleSize: 5,");
            out.append("},");
            out.append("showRoller: false,\n");
            out.append("errorBars: false,\n");
//            out.append("visibility: [" + setSeriesVisibility(parser) + "],";
            out.append("legend: 'always',\n");
            out.append("labelsDivStyles: { 'width': '2px' }\n");
            out.append("}\n");
            out.append(");\n");
//            out.append("g" + "_" + divIndex + i + ".updateOptions({ fillGraph: " + fillGraph + " });\n";
            out.append("g" + "_").append(divIndex).append(chartIndex).append(".updateOptions({");
            out.append("annotationClickHandler: function(ann, point, dg, event) {");
            out.append("    console.log(\"click: \" + nameAnnotation(ann));");
            out.append("},");
            out.append("annotationDblClickHandler: function(ann, point, dg, event) {");
            out.append("    console.log(\"dblclick: \" + nameAnnotation(ann));");
            out.append("},");
            out.append("annotationMouseOverHandler: function(ann, point, dg, event) {");
            out.append("},");
            out.append("annotationMouseOutHandler: function(ann, point, dg, event) {");
            out.append("},");
            out.append("pointClickCallback: function(event, p) {");
            out.append("    if (p.annotation)");
            out.append("return;");
            out.append("    var ann = {");
            out.append("series: p.name,");
            out.append("xval: p.xval,");
            out.append("kpi:'").append(dataObject.getChartTitle()).append("',");
            out.append("vendor:'").append(vendor.get(0)).append("',");
            out.append("tech:'").append(tech.get(0)).append("',");
            out.append("level:'").append(WORST_CELL_ANNOTATION).append("',");
            out.append("chartID: ").append(chartIndex);
//            out.append(",icon: 'images/dollar.png'");
            out.append(",shortText: clickCount");
//            out.append("text: \"Annotation #\" + graph_num");
            out.append("    };");
            out.append("    var anns = g" + "_").append(divIndex).append(chartIndex).append(".annotations();");
            out.append("    anns.push(ann);");
            out.append("g" + "_").append(divIndex).append(chartIndex).append(".setAnnotations(anns);"
                    + "clickCount++;");
//            out.append("    graph_num=" + i + ");");
            out.append("},");
            out.append("fillGraph: ").append(fillGraph);
            out.append(",rightGap: 30");
            out.append("});");
            out.append(addTargetLine("div" + (chartIndex + 1) + "_" + divIndex));
        } else {
            out.append("<tr>\n" + "<td width=\"100%\">" + "<div class=\"many\"id=\"div").append(chartIndex + 1).append("_").append(divIndex).append("\" style=" + "width:95%; height:50%;></div>\n" + "<p align=\"center \"><font color=\"red" + "\">").append(dataObject.getKpiName()).append(": <ins>No data returned by SQL query</ins></font>"
                    + "</div></tr>");
        }

        return out;
    }

    private String addTargetLine(String chartID) {
        return "var line = document.createElement(\"div\");"
                + "line.className = \"line yline\";"
                + "document.getElementById(\"" + chartID + "\").appendChild(line);"
                + "lines.push(line);";
    }

    private void initVariables() {
        tech = getDataFromJSON("TECHNOLOGY");
        vendor = getDataFromJSON("VENDOR");
        pages = getDataFromJSON("chartPageColumns");
        fillGraph = getDataFromJSON("fillGraph").get(0);
        roller_period = getDataFromJSON("chartRollerPeriod").get(0);
    }

    private List<String> getDataFromJSON(String object) {
        List<String> data = new ArrayList<>();
        data.addAll(extractFromJSON(object));
        return data;
    }

    private List<String> extractFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, sb.toString());
    }
}
