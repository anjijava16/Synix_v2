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

    private int HEIGHT = 80; /// PERCENT
    private int WIDTH = 95; /// PERCENT
    private int divIndex;
    private String TD_WIDTH = "95%";
    private String TD_HEIGHT = "600px";
    private String header = "";
    private String footer = "";

    public HighChartDivMaker(int divIndex) {
        this.divIndex = divIndex;
        setHeader();
        setFooter();
    }

    public String getHeader() {
        return header;
    }

    public String getFooter() {
        return footer;
    }

    public String getChartDivs(FormuladefPojo formulaDef, GraphConstructPojo gcp, int chartIndex) {
        StringBuilder out = new StringBuilder();

        if (!gcp.getData().isEmpty()) {
            String divId = "div" + (chartIndex + 1) + "_" + divIndex;
            out.append("<tr>"
                    + "<td width='" + TD_WIDTH + "' height='" + TD_HEIGHT + "'>"
                    + "<div class=\"many \"id=\"" + divId + "\" style='height:95%';>"
                    + "</div>\n");
            out.append(getShowHideButton(chartIndex));
            out.append(getHorizontalLine());
        }
        return out.toString();
    }

    private String getShowHideButton(int chartIndex) {
        String buttonId = "s_h_button" + (chartIndex + 1) + "_" + divIndex;
        return "<tr>"
                + "<td align='center'>"
                + "<input id=\"" + buttonId + "\" type=\"button\" value=\"Show / Hide All\">"
                + "</td>"
                + "</tr>";
    }

    private String getHorizontalLine() {
        return "<tr><td><HR><BR></td></tr>";
    }

    private void setHeader() {
        header = "<table width=\"100%\" BORDER=0>";
    }

    private void setFooter() {
        footer = "</table>";
    }
}
