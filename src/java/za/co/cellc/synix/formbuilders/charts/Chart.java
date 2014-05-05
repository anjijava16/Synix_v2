/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.persistance.statements.Temp_StatementInterface;

/**
 *
 * @author z0006cpz
 */
public class Chart implements Temp_StatementInterface {

//    private String DELIMITER = "<~>";
    private String WORST_CELL_ANNOTATION = "WORST_CELL";
    private int chart_columns = 1;
    private List<String> preparedstmntNames = new ArrayList<>();
//    private List<String> queries = new ArrayList<>();
    private List<String> titles = new ArrayList<>();
    private List<Float> targets = new ArrayList<>();
//    private String PRIMARY = "primary";
    private String roller_period;
    private int HEIGHT = 50; /// PERCENT
    private int WIDTH = 95; /// PERCENT
//    private String secondaryAxesName = "";
//    private char[] sQ = Character.toChars(34);
    private List<String> axes = new ArrayList<>();
//    private String[] columnNames;
    private StringBuilder sb;
    private ChartData chartData;
    private List<ResultsetParser> parserLST = new ArrayList<>();
    private List<Integer> divIDLST = new ArrayList<>();
//    private Object[] imageDevs;
    private String fillGraph;
//    private Database db = new Database();
    private List<String> tech;
    private List<String> vendor;
    private List<String> pages;
    private String level;

    public Chart() {
    }

    public String drawCharts(String level, StringBuilder sb, int divIndex) {
        this.level = level;
        this.sb = sb;
        initVariables();
        setChartColumns();
        setPreparedstmntNames(tech, vendor, "BSC");
//        setTitles(tech, vendor, "BSC");
        chartData = new ChartData();
        String out = "";
        out = createChartDivs(divIndex, out);
        out += closeTableRow();
        out = createCharts(divIndex, out);
        return out;
    }

    private String createChartDivs(int divIndex, String out) {
        String width = 100 / chart_columns + "%";
        out += "<head>";
        out += "<style type=\"text/css\">";
        out += ".many .dygraph-legend > span { display: none; }";
        out += ".many .dygraph-legend > span.highlight { display: inline; }";
        out += "</style>";
        out += "</head>";
        out += "<div id=\"chartFrame" + "_" + divIndex + "\">\n";
        out += "<table width=\"100%\" BORDER=0>\n";
        //        out += "<div id=\"images" + "_" + divIndex + "\">\n";
        for (int i = 0; i < preparedstmntNames.size(); i++) {
            ResultsetParser parser = chartData.parseQuery( level, targets.get(i));
            if (!emptyDataSet()) {
                parserLST.add(parser);
                divIDLST.add(i);
                int index = i % chart_columns;
                if (index == 0) {
                    if (i != 0) {
                        out += closeTableRow();
                    }
                    out += "        <tr>\n";
                }
                out += "<td width='" + width + "'>";
                out += "<div class=\"many \"id=\"div" + (i + 1) + "_" + divIndex + "\" style="
                        + "width:" + WIDTH + "%; height:" + HEIGHT + "%;>";
                out += "</div>\n";
                out += "<p align='center'><font color=\"gray\"><small><ins>Zoom in:</ins> click/drag &nbsp;&nbsp;&nbsp;<ins>Zoom out:</ins> double click</small></font>";
                out += "<table width=\"100%\" BORDER=1 cellpadding='3' cellspacing='0'>\n";
                out += "<tr>\n";
                out += "<td style=\"text-align:center\">";
                out += "<small><input type=\"checkbox\" id=\"0\" "
                        + "onclick=\"change(this,g_" + divIndex + i + "," + "div" + (i + 1) + "_" + divIndex + ")\">"
                        + "<font color= 'gray'><label for=\"0\"> Show target " + parser.getTarget() + "%</label></font>"
                        + "</small>"
                        + "</td>"
                        + "<td align='center'>"
                        + "<input type=\"button\" id='drillDownBtn_" + i + "' style='display: block;' disabled=\"\"; value=\"Drill Down\"; onclick=\"buttonClicked(" + i + ")\";/>"
                        + "</td>";
                out += "</tr>\n";
//                out += "<tr>\n";
//                out += "<td style=\"text-align:left\">\n";
//                out += "<small><div id=\"drillList_" + i + "\"></div></small>"
//                        + "</td>"
//                        + "<td style=\"text-align:right\">" 
//                        + "<button id='drillDownBtn'>Drill Down</button>"
//                        + "</td>";
//                out += "</tr>\n";
                out += "</table>\n";
                out += "<div id=\"demoimgDiv_" + divIndex + i + "\" style=\"display: none;\">\n";
                out += "<img id=\"demoimg_" + divIndex + i + "\" src=\"images/oraclesmall.png\"/>";
                out += "</div>";
                out += "<p style=\"text-align:left\"><button id=\"update-img_" + "_" + divIndex + i + "\" onclick="
                        + "\"createImage(g" + "_" + divIndex + i + ",'demoimg_" + divIndex + i + "','demoimgDiv_" + divIndex + i + "')\">Print chart</button> </p>";// (<em>Hint: Update the image after changing zoom</em>);
                closeTableCol();
                out += "<hr/>";
//                arrString+=":" + ("g" + "_" + divIndex + i + DELEMITER + "demoimg_" + divIndex + i + DELEMITER + "demoimgDiv_" + divIndex + i);
            } else {
                int index = i % chart_columns;
                if (index == 0) {
                    if (i != 0) {
                        out += closeTableRow();
                    }
                    out += "        <tr>\n";
                }
                out += "<td width=\"" + width + "\">";
                out += "<div class=\"many\"id=\"div" + (i + 1) + "_" + divIndex + "\" style="
                        + "width:" + WIDTH + "%; height:" + HEIGHT + "%;></div>\n";
                out += "<p align=\"center \"><font color=\"red"
                        + "\">" + preparedstmntNames.get(i) + ": <ins>No data returned by SQL query</ins></font>";
                out += "</div>";
                closeTableCol();
                out += "<hr/>";
            }
            stmnt.closeExecuteQueryStmnt();
        }
        return out;
    }

    private String createCharts(int divIndex, String out) {
        out += "<br>";
        out += "</table>\n";
        out += "<script>\n";
        for (int i = 0; i < parserLST.size(); i++) {
            ResultsetParser parser = parserLST.get(i);
            setAxis(parser.getAxis());
//            setColumnNames(i);
            out += "var g" + "_" + divIndex + i + " = new Dygraph(";
            out += "document.getElementById(\"div" + (divIDLST.get(i) + 1) + "_" + divIndex + "\"),\n";
            out += "[" + parser.getData() + "], {\n";
            out += "labels: [ " + parser.getLabels() + " ],\n";
//            secondaryAxesName = "";
//            if (parser.isMultiRSchart()) {
//                for (int j = 2; j < columnNames.length; j++) {
//                    if (isOnSecondaryAxis(axes.get(j))) {
//                        out += "" + columnNames[j] + ": {\n";
//                        out += "axis: \n";
//                        if (secondaryAxesName.isEmpty()) {
//                            out += "{";
//                            out += "}\n";
//                            setSecondaryAxesName(columnNames[j]);
//                        } else {
//                            out += secondaryAxesName;
//                        }
//                        out += "},\n";
//                    }
//                }
//            }

//            out += "axes: {\n";
//            out += "y2: {\n";
            // set axis-related properties here
            out += "labelsKMB: true,\n";
            out += "'Target': {strokeWidth: 3, strokePattern: [7, 2, 2, 2]},";
            out += "underlayCallback: highlightWeekends(),";
            out += "drawCallback: addAnnotation(),";
//            out += "},";
//            out += "stackedGraph: isStacked,";
//            out += "ylabel: 'Primary y-axis',";
//            out += "y2label: 'Secondary y-axis',";
//            out += "yAxisLabelWidth: 60,";

            out += "rollPeriod: " + roller_period + ",\n";
            out += "title:'" + titles.get(i) + "',\n";
//            out += "xlabel: 'Date',\n";
//            out += "ylabel: 'zoom in: click/drag zoom out: double click',\n";
            out += "highlightSeriesOpts: {";
            out += "strokeWidth: 2,";
            out += "strokeBorderWidth: 1,";
            out += "highlightCircleSize: 5,";
            out += "},";
            out += "showRoller: false,\n";
            out += "errorBars: false,\n";
            out += "visibility: [" + setSeriesVisibility(parser) + "],";
            out += "legend: 'always',\n";
            out += "labelsDivStyles: { 'width': '2px' }\n";
            out += "}\n";
            out += ");\n";
//            out += "g" + "_" + divIndex + i + ".updateOptions({ fillGraph: " + fillGraph + " });\n";
            out += "g" + "_" + divIndex + i + ".updateOptions({";
            out += "annotationClickHandler: function(ann, point, dg, event) {";
            out += "    console.log(\"click: \" + nameAnnotation(ann));";
            out += "},";
            out += "annotationDblClickHandler: function(ann, point, dg, event) {";
            out += "    console.log(\"dblclick: \" + nameAnnotation(ann));";
            out += "},";
            out += "annotationMouseOverHandler: function(ann, point, dg, event) {";
            out += "},";
            out += "annotationMouseOutHandler: function(ann, point, dg, event) {";
            out += "},";
            out += "pointClickCallback: function(event, p) {";
            out += "    if (p.annotation)";
            out += "return;";
            out += "    var ann = {";
            out += "series: p.name,";
            out += "xval: p.xval,";
            out += "kpi:'" + titles.get(i) + "',";
            out += "vendor:'" + vendor.get(0) + "',";
            out += "tech:'" + tech.get(0) + "',";
            out += "level:'" + WORST_CELL_ANNOTATION + "',";
            out += "chartID: " + i;
//            out += ",icon: 'images/dollar.png'";
            out += ",shortText: clickCount";
//            out += "text: \"Annotation #\" + graph_num";
            out += "    };";
            out += "    var anns = g" + "_" + divIndex + i + ".annotations();";
            out += "    anns.push(ann);";
            out += "g" + "_" + divIndex + i + ".setAnnotations(anns);"
                    + "clickCount++;";
//            out += "    graph_num=" + i + ";";
            out += "},";
            out += "fillGraph: " + fillGraph;
            out += "});";
        }
        out += "function change(cBox,g,divObject){"
                + "g.setVisibility(0, cBox.checked);"
                + "}";
        out += "</script>";
        out += "<br><br><br>";
//        out += "<h1>Filters:</h1>";
//        out += getFilters();
//        out += "<strong><label>SQL Query:</label></strong> <br>";
//        out += chartData.getQueryString();2blocking,0.5drop per site 0.4/99% bsc

        out += "</div>";
        return out;
    }

    private String setSeriesVisibility(ResultsetParser parser) {
        List<Boolean> seriesVisibility = new ArrayList<>();
        String[] labels = parser.getLabels().split(parser.getCHART_DATA_DELIMITER());
        for (int i = 1; i < labels.length; i++) {
            if (labels[i].toLowerCase().contains("target")) {
                seriesVisibility.add(false);
            } else {
                seriesVisibility.add(true);
            }
        }
        return booleanArrayToString(seriesVisibility);
    }

    private String booleanArrayToString(List<Boolean> array) {
        String s = "";
        for (boolean b : array) {
            s += "," + b;
        }
        if (s.isEmpty()) {
            return s;
        }
        return s.substring(1);
    }

    private boolean emptyDataSet() {
        return chartData.isRsEmpty();
    }

    private void initVariables() {
        tech = getDataFromJSON("TECHNOLOGY");
        vendor = getDataFromJSON("VENDOR");
        pages = getDataFromJSON("chartPageColumns");
        fillGraph = getDataFromJSON("fillGraph").get(0);
        roller_period = getDataFromJSON("chartRollerPeriod").get(0);
    }

    private void setChartColumns() {
        if (!pages.isEmpty()) {
            String p = pages.get(0);
            try {
                chart_columns = Integer.parseInt(p);
            } catch (Exception e) {
            }
        }
    }

//    private void setColumnNames(int index) {
//        columnNames = parserLST.get(index).getLabels().split(",");
//    }
    private void setAxis(List<String> ax) {
        axes.addAll(ax);
    }

//    private boolean isOnSecondaryAxis(String axis) {
//        return !(axis.equalsIgnoreCase(PRIMARY));
//    }
//
//    private void setSecondaryAxesName(String name) {
//        secondaryAxesName = name;
//    }
    private String closeTableCol() {
        String out = "            </td>\n";
        return out;
    }

    private String closeTableRow() {
        String out = "        </tr>\n";
        return out;
    }

    private void setPreparedstmntNames(List<String> tech, List<String> vendor, String level) {
        try {
            ResultSet rs = stmnt.executeQuery("SELECT QUERY_NAME,Chart_Title,Target,Query_ FROM Queries"
                    + " WHERE (" + listToWhereString("TECHNOLOGY", tech)
                    + ") AND (" + listToWhereString("VENDOR", vendor) + ")"
                    + " AND LEVEL_ = '" + level + "' ORDER BY PRIORITY");
            while (rs.next()) {
                preparedstmntNames.add(rs.getString(1));
                titles.add(rs.getString(2).replace("_", " "));
                targets.add(rs.getFloat(3));
//                queries.add(rs.getString(4));
            }
            rs.close();
            stmnt.closeExecuteQueryStmnt();
        } catch (SQLException ex) {
            Logger.getLogger(Chart.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

//    private void setTitles(List<String> tech, List<String> vendor, String level) {
//        List<String> names = new ArrayList<>();
//        try {
//            ResultSet rs = db.executeQuery("SELECT Chart_Title FROM Queries"
//                    + " WHERE (" + listToWhereString("TECHNOLOGY", tech)
//                    + ") AND (" + listToWhereString("VENDOR", vendor) + ")"
//                    + " AND LEVEL_ = '" + level + "' ORDER BY PRIORITY");
//            while (rs.next()) {
//                names.add(rs.getString(1));
//            }
//            rs.close();
//            db.closeExecuteQueryStmnt();
//            titles = names.toArray();
//        } catch (SQLException ex) {
//            Logger.getLogger(Chart.class.getName()).log(Level.SEVERE, null, ex);
//        }
//    }
    private String getFilters() {
        String from = extractFromJSON("timeFrom").get(0);
        String to = extractFromJSON("timeTo").get(0);
        List<String> tech = getDataFromJSON("TECHNOLOGY");
        List<String> vendor = getDataFromJSON("VENDOR");
//        List<String> rc = getDataFromJSON("RC");
//        List<String> cluster = getDataFromJSON("CLUSTER");
//        List<String> includedCells = getDataFromJSON("includeCellschart");
//        List<String> excludedCells = getDataFromJSON("excludeCellschart");
        String out = "<strong><label>From:</label></strong> " + from;
        out += "<br>";
        out += "<strong><label>To:</label></strong> " + to;
        out += "<br>";
        out += "<strong><label>Technology:</label></strong> " + listToSTR(tech);
        out += "<br>";
        out += "<strong><label>Vendor:</label></strong> " + listToSTR(vendor);
        out += "<br>";
//        out += "<strong><label>RefClusters:</label></strong> " + listToSTR(rc);
//        out += "<br>";
//        out += "<strong><label>Clusters:</label></strong> " + listToSTR(cluster);
//        out += "<br>";
//        out += "<strong><label>Included Cells:</label></strong> " + listToSTR(includedCells);
//        out += "<br>";
//        out += "<strong><label>Excluded Cells:</label></strong> " + listToSTR(excludedCells);
//        out += "<br>";
        return out;
    }

    private String listToSTR(List<String> lst) {
        String str = "";
        for (String l : lst) {
            str += "," + l;
        }
        if (lst.isEmpty()) {
            return str;
        }
        return str.substring(1);
    }

    private List<String> getDataFromJSON(String object) {
        List<String> data = new ArrayList<String>();
        data.addAll(extractFromJSON(object));
        return data;
    }

    private List<String> extractFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, sb.toString());
    }

    private String listToWhereString(String columnName, List<String> lst) {
        String str = "";
        for (int i = 0; i < lst.size(); i++) {
            str += columnName + " = '" + lst.get(i) + "'";
            if (i < (lst.size() - 1)) {
                str += " OR ";
            }
        }
        return str;
    }
}
