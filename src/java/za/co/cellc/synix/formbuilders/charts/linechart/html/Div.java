/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.linechart.html;

import java.util.List;
import za.co.cellc.synix.formbuilders.charts.ResultsetParser;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;
import za.co.cellc.synix.formbuilders.charts.linechart.query.DisectedQuery;

/**
 *
 * @author Pierre.Venter
 */
public class Div {

    private int HEIGHT = 50; /// PERCENT
    private int WIDTH = 95; /// PERCENT
    private int divIndex;
//    private String out = "";
    private String width = 100 + "%";
    private int chartIndex = 0;
    private DatabaseQueryObject dataObject;
    private String header;

    public Div(int divIndex) {
        this.divIndex = divIndex;
        setHeader();
    }

    public String getHeader() {
        return header;
    }

//    public String getChartDivs() {
//        return createChartDivs();
//    }
    public String getChartDivs(DatabaseQueryObject dataObject, DisectedQuery disect) {
        this.dataObject = dataObject;
        String out = "";
//        for (int i = 0; i < dataObjects.size(); i++) {

        if (!disect.getChartData().isEmpty()) {
            out += "<tr>"
                    + "<td width='" + width + "'>"
                    + "<div class=\"many \"id=\"div" + (chartIndex + 1) + "_" + divIndex + "\" style="
                    + "width:" + WIDTH + "%; height:" + HEIGHT + "%;>"
                    + "</div>\n"
                    + "<p align='center'><font color=\"gray\"><small><ins>Zoom in:</ins> click/drag &nbsp;&nbsp;&nbsp;<ins>Zoom out:</ins> double click"
                    + "&nbsp;&nbsp;&nbsp;<ins>Target:</ins> <span style=\"background-color:#00FF00;color:#000000;\">" + dataObject.getTarget() + "%</span></small></font>"
                    + "<table width=\"100%\" BORDER=1 cellpadding='3' cellspacing='0'>\n"
                    + "<tr>\n";
//            out += addShowTargetCheckBox();
//                    + "<td style=\"text-align:center\">"
//                    + "<small><input type=\"checkbox\" id=\"0\" "
//                    + "onclick=\"change(this,g_" + divIndex + chartIndex + "," + "div" + (chartIndex + 1) + "_" + divIndex + ")\">"
//                    + "<font color= 'gray'><label for=\"0\"> Show target " + rsParser.getTarget() + "%</label></font>"
//                    + "</small>"
//                    + "</td>"
            out += drillDownButton();
//                    + "<td align='center'>"
//                    + "<input type=\"button\" id='drillDownBtn_" + chartIndex + "' style='display: block;' disabled=\"\"; value=\"Drill Down\"; onclick=\"buttonClicked(" + chartIndex + ")\";/>"
//                    + "</td>"
            out += "</tr>\n"
                    + "</table>\n"
                    + "<div id=\"demoimgDiv_" + divIndex + chartIndex + "\" style=\"display: none;\">\n"
                    + "<img id=\"demoimg_" + divIndex + chartIndex + "\" src=\"images/oraclesmall.png\"/>"
                    + "</div>"
                    + "<p style=\"text-align:left\"><button id=\"update-img_" + "_" + divIndex + chartIndex + "\" onclick="
                    + "\"createImage(g" + "_" + divIndex + chartIndex + ",'demoimg_" + divIndex + chartIndex + "','demoimgDiv_" + divIndex + chartIndex + "')\">Print chart</button> </p>";// (<em>Hint: Update the image after changing zoom</em>);
            out += closeTableCol();
//                out += "<hr/>";
            out += closeTableRow();
        } else {
            out += "<tr>\n"
                    + "<td width=\"" + width + "\">"
                    + "<div class=\"many\"id=\"div" + (chartIndex + 1) + "_" + divIndex + "\" style="
                    + "width:" + WIDTH + "%; height:" + HEIGHT + "%;></div>\n"
                    + "<p align=\"center \"><font color=\"red"
                    + "\">" + dataObject.getKpiName() + ": <ins>No data returned by SQL query</ins></font>"
                    + "</div>";
            out += closeTableCol();
//                out += "<hr/>";
        }
//        }
        out += "<br>"
                + "</table>";
        chartIndex++;
        return out;
    }

    private String drillDownButton() {
        return "<td align='center'>"
                + "<input type=\"button\" id='drillDownBtn_" + chartIndex + "' style='display: block;' disabled=\"\"; value=\"Drill Down\"; onclick=\"buttonClicked(" + chartIndex + ")\";/>"
                + "</td>";
    }

    private String addShowTargetCheckBox() {
        return "<td style=\"text-align:center\">"
                + "<small><input type=\"checkbox\" id=\"0\" "
                + "onclick=\"showTarget(" + dataObject.getTarget() + ",this,g_" + divIndex + chartIndex + "," + "div" + (chartIndex + 1) + "_" + divIndex + ")\">"
                + "<font color= 'gray'><label for=\"0\"> Show target " + dataObject.getTarget() + "%</label></font>"
                + "</small>"
                + "</td>";
    }

    private void setHeader() {
        header = "<head>"
                + "<style type=\"text/css\">"
                + ".many .dygraph-legend > span { display: none; }"
                + ".many .dygraph-legend > span.highlight { display: inline; }"
                + "</style>"
                + "</head>"
                + "<div id=\"chartFrame" + "_" + divIndex + "\">\n"
                + "<table width=\"100%\" BORDER=0>\n";
    }

    private String closeTableCol() {
        return "</td>\n";
    }

    private String closeTableRow() {
        return "</tr>\n";
    }
}
