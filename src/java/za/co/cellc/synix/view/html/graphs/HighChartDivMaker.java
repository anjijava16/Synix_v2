/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view.html.graphs;

import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;

/**
 *
 * @author Pierre.Venter
 */
public class HighChartDivMaker {

//    private int HEIGHT = 80; /// PERCENT
//    private int WIDTH = 95; /// PERCENT
    private int divIndex;
//    private String width = 100 + "%";
    private String header = "";

    public HighChartDivMaker(int divIndex) {
        this.divIndex = divIndex;
        setHeader();
    }

    public String getHeader() {
        return header;
    }

    public String getChartDivs(FormuladefPojo formulaDef, GraphConstructPojo gcp, int chartIndex) {
        StringBuilder out = new StringBuilder();

        if (!gcp.getData().isEmpty()) {
            String buttonId = "s_h_button" + (chartIndex + 1) + "_" + divIndex;
            out.append("<div id=\"div").append(chartIndex + 1).append("_").append(divIndex).append("\"></div>");
//            out.append("<input id=\"" + buttonId + "\" type=\"button\" value=\"Show / Hide All\">");
//            out.append ("<button id=\"button\">Hide series</button>");
        }
        return out.toString();
    }
//        public String getChartDivs(FormuladefPojo formulaDef, GraphConstructPojo gcp, int chartIndex) {
//        StringBuilder out = new StringBuilder();
//
//        if (!gcp.getData().isEmpty()) {
//            out.append(""
//                    + "<table width=\"100%\" BORDER=0>\n<tr>"
//                    + "<td width='" + width + "'>"
//                    + "<div id=\"div" + (chartIndex + 1) + "_" + divIndex + "\" "
////                    + "style= width:" + WIDTH + "%; height:" + HEIGHT + "%;"
//                    + ">"
//                    + "</div>\n"
////                    + "<p align='center'><font color=\"gray\"><small><ins>Zoom in:</ins> click/drag &nbsp;&nbsp;&nbsp;<ins>Zoom out:</ins> double click"
////                    + "&nbsp;&nbsp;&nbsp;<ins>Target:</ins> <span style=\"background-color:#00FF00;color:#000000;\">" + formulaDef.getTarget() + "%</span></small></font>"
//                    + "<table width=\"100%\" BORDER=0 cellpadding='3' cellspacing='0'>\n"
//                    + "<tr>\n");
////            out.append(drillDownButton(chartIndex));
//            out.append("</tr>\n"
//                    + "</table>\n"
//                    + "</td>"
////                    + "<div id=\"demoimgDiv_" + divIndex + chartIndex + "\" style=\"display: none;\">\n"
////                    + "<img id=\"demoimg_" + divIndex + chartIndex + "\" src=\"images/oraclesmall.png\"/>"
////                    + "</div>"
////                    + "<p style=\"text-align:left\"><button id=\"update-img_" + "_" + divIndex + chartIndex + "\" onclick="
////                    + "\"createImage(g" + "_" + divIndex + chartIndex + ",'demoimg_" + divIndex + chartIndex + "','demoimgDiv_" + divIndex + chartIndex + "')\">Print chart</button> </p>");// (<em>Hint: Update the image after changing zoom</em>
//            );
////            out.append(closeTableCol());
////            out.append(closeTableRow());
//        } else {
//            out.append("<tr>\n"
//                    + "<td width=\"" + width + "\">"
//                    + "<div id=\"div" + (chartIndex + 1) + "_" + divIndex + "\" style="
//                    + "width:" + WIDTH + "%; height:" + HEIGHT + "%;></div>\n"
//                    + "<p align=\"center \">" + formulaDef.getChartTitle() + ": <ins>No data returned by SQL query</ins></font>"
//                    + "</div>");
//            out.append(closeTableCol());
//        }
//        out.append("<br>"
//                + "</tr>"
//                + "</table>");
//        chartIndex++;
//        return out.toString();
//    }

//    private String drillDownButton(int chartIndex) {
//        return "<td align='center'>"
//                + "<input type=\"button\" id='drillDownBtn_" + chartIndex + "' style='display: block;' disabled=\"\"; value=\"Drill Down\"; onclick=\"buttonClicked(" + chartIndex + ")\";/>"
//                + "</td>";
//    }
//    private String addShowTargetCheckBox() {
//        return "<td style=\"text-align:center\">"
//                + "<small><input type=\"checkbox\" id=\"0\" "
//                + "onclick=\"showTarget(" + dataObject.getTarget() + ",this,g_" + divIndex + chartIndex + "," + "div" + (chartIndex + 1) + "_" + divIndex + ")\">"
//                + "<font color= 'gray'><label for=\"0\"> Show target " + dataObject.getTarget() + "%</label></font>"
//                + "</small>"
//                + "</td>";
////    }
    private void setHeader() {
//        header = "<script src=\"http://code.highcharts.com/highcharts.js\"></script>"
//                + "<script src=\"http://code.highcharts.com/modules/exporting.js\"></script>";
    }
//    private String closeTableCol() {
//        return "</td>\n";
//    }
//    private String closeTableRow() {
//        return "</tr>\n";
//    }
}
