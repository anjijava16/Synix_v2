/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view;

import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;

/**
 *
 * @author Pierre.Venter
 */
public class KpiDivMaker {

    private int HEIGHT = 50; /// PERCENT
    private int WIDTH = 95; /// PERCENT
    private int divIndex;
    private String width = 100 + "%";
//    private int chartIndex = 0;
    private FormuladefPojo formulaDef;
    private String header;

    public KpiDivMaker(int divIndex) {
        this.divIndex = divIndex;
        setHeader();
    }

    public String getHeader() {
        return header;
    }

    public String getChartDivs(FormuladefPojo formulaDef, GraphConstructPojo gcp,int chartIndex) {
        this.formulaDef = formulaDef;
        StringBuilder out = new StringBuilder();

        if (!gcp.getData().isEmpty()) {
            out.append("<tr>"
                    + "<td width='" + width + "'>"
                    + "<div class=\"many \"id=\"div" + (chartIndex + 1) + "_" + divIndex + "\" style="
                    + "width:" + WIDTH + "%; height:" + HEIGHT + "%;>"
                    + "</div>\n"
                    + "<p align='center'><font color=\"gray\"><small><ins>Zoom in:</ins> click/drag &nbsp;&nbsp;&nbsp;<ins>Zoom out:</ins> double click"
                    + "&nbsp;&nbsp;&nbsp;<ins>Target:</ins> <span style=\"background-color:#00FF00;color:#000000;\">" + formulaDef.getTarget() + "%</span></small></font>"
                    + "<table width=\"100%\" BORDER=1 cellpadding='3' cellspacing='0'>\n"
                    + "<tr>\n");
            out.append(drillDownButton(chartIndex));
            out.append("</tr>\n"
                    + "</table>\n"
                    + "<div id=\"demoimgDiv_" + divIndex + chartIndex + "\" style=\"display: none;\">\n"
                    + "<img id=\"demoimg_" + divIndex + chartIndex + "\" src=\"images/oraclesmall.png\"/>"
                    + "</div>"
                    + "<p style=\"text-align:left\"><button id=\"update-img_" + "_" + divIndex + chartIndex + "\" onclick="
                    + "\"createImage(g" + "_" + divIndex + chartIndex + ",'demoimg_" + divIndex + chartIndex + "','demoimgDiv_" + divIndex + chartIndex + "')\">Print chart</button> </p>");// (<em>Hint: Update the image after changing zoom</em>);
            out.append(closeTableCol());
            out.append(closeTableRow());
        } else {
            out.append("<tr>\n"
                    + "<td width=\"" + width + "\">"
                    + "<div class=\"many\"id=\"div" + (chartIndex + 1) + "_" + divIndex + "\" style="
                    + "width:" + WIDTH + "%; height:" + HEIGHT + "%;></div>\n"
                    + "<p align=\"center \"><font color=\"red"
                    + "\">" + formulaDef.getChartTitle() + ": <ins>No data returned by SQL query</ins></font>"
                    + "</div>");
            out.append(closeTableCol());
        }
        out.append("<br>"
                + "</table>");
        chartIndex++;
        return out.toString();
    }

    private String drillDownButton(int chartIndex) {
        return "<td align='center'>"
                + "<input type=\"button\" id='drillDownBtn_" + chartIndex + "' style='display: block;' disabled=\"\"; value=\"Drill Down\"; onclick=\"buttonClicked(" + chartIndex + ")\";/>"
                + "</td>";
    }

//    private String addShowTargetCheckBox() {
//        return "<td style=\"text-align:center\">"
//                + "<small><input type=\"checkbox\" id=\"0\" "
//                + "onclick=\"showTarget(" + dataObject.getTarget() + ",this,g_" + divIndex + chartIndex + "," + "div" + (chartIndex + 1) + "_" + divIndex + ")\">"
//                + "<font color= 'gray'><label for=\"0\"> Show target " + dataObject.getTarget() + "%</label></font>"
//                + "</small>"
//                + "</td>";
//    }

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
