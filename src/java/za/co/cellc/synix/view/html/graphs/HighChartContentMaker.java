/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view.html.graphs;

import java.util.List;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import za.co.cellc.synix.controllers.graphconstruct.highchart.HighChartGraphConstructPojo;
import za.co.cellc.synix.utilities.ListUtils;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class HighChartContentMaker {

    private String WORST_CELL_ANNOTATION = "WORST_CELL";
//    private StringBuilder sb;
    private int divIndex;
    private FormuladefPojo formulaDef;
    private String technology;
    private String vendor;
    private String pages;
    private String level;
    private String fillGraph;
    private String rollerPeriod;
    private String header;
    private String footer;
    private HtmlInputProcessor htmlIp = HtmlInputProcessor.getInstance();
    private List<HighChartGraphConstructPojo> gcPojos;
    private StringBuilder sb = new StringBuilder();

    public HighChartContentMaker(int divIndex) {
        this.divIndex = divIndex;
//        this.sb = sb;
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
        header = "<script type=\"text/javascript\">";
    }

    private void setFooter() {
        footer = "</script> "
                + "<br><br><br>"
                //                + "<h1>Filters:</h1>"
                + "</div>";
    }

    public StringBuilder getCharts(FormuladefPojo formulaDef, List<HighChartGraphConstructPojo> gcPojos, int chartIndex) {
        this.formulaDef = formulaDef;
        this.gcPojos = gcPojos;
        initialiseChart(chartIndex);
        addXaxis();
        addYaxis();
        addTooltip();
        addPlotOptions();
        addSeries();
        return sb;
    }

    private void initialiseChart(int chartIndex) {
        sb.append("$(function () {");
        sb.append("$('#div").append(chartIndex + 1).append("_").append(divIndex);
        sb.append("').highcharts({");
        sb.append("chart: {");
        sb.append("zoomType: 'xy'");
        sb.append("},");
        sb.append("legend: {");
        sb.append("layout: 'vertical',");
        sb.append("align: 'right',");
        sb.append("verticalAlign: 'middle',");
        sb.append("borderWidth: 1");
        sb.append("},");
        sb.append("title: {");
        sb.append("text: '");
        sb.append(gcPojos.get(0).getChartTitle());
        sb.append("'");
        sb.append("},");
        sb.append("subtitle: {");
        sb.append("text: 'Click-Drag mouse to zoom'");
        sb.append("},");
    }

    private void addXaxis() {
        sb.append("xAxis: {\n"
                + "            type: 'datetime',\n"
                + "            dateTimeLabelFormats: { \n"
                + "                month: '%e. %b',\n"
                + "                year: '%b'\n"
                + "            },\n"
                + "            title: {\n"
                + "                text: 'Date'\n"
                + "            }\n"
                + "        },");
    }

    private void addYaxis() {
        sb.append("yAxis: {\n"
                + "            title: {\n"
                + "                text: 'percentage (%)'\n"
                + "            }"
                //                + ",\n"
                //                + "            min: 75,\n"
                //                + "            max: 100\n"
                + "        },");

    }

    private void addTooltip() {
        sb.append("tooltip: {\n"
                + "            shared: true,\n"
                + "            crosshairs: true\n"
                + "        },");
    }

    private void addPlotOptions() {
        sb.append("plotOptions: {\n"
                + "            series: {\n"
                + "                cursor: 'pointer',\n"
                + "                events: {\n"
                + "                    click: function () {\n"
                + "                        alert('Category: ' + this.category + ', value: ' + this.y);\n"
                + "                    }\n"
                + "                }\n"
                + "            },\n"
                + "            area: {\n"
                + "                marker: {\n"
                + "                    radius: 1\n"
                + "                },\n"
                + "                lineWidth: 1,\n"
                + "                states: {\n"
                + "                    hover: {\n"
                + "                        lineWidth: 1\n"
                + "                    }\n"
                + "                },\n"
                + "                threshold: null\n"
                + "            }\n"
                + "        },");
    }

    private void addSeries() {
        int i = 0;
        sb.append("series: [ ");
        for (HighChartGraphConstructPojo gcp : gcPojos) {
            i++;
            if (mustPlotGraphConstructPojo(gcp)) {
                sb.append("{ ");
                sb.append("type: '").append(gcp.getType()).append("',");
                if (gcp.getColor() != null) {
                    sb.append("color: '").append(gcp.getColor()).append("',");
                }
                sb.append("name: '").append(gcp.getLabel()).append("',");
                sb.append("data: [").append(gcp.getData()).append("]");
                if (i != gcPojos.size()) {
                    sb.append("},");
                } else {
                    sb.append("}");
                }
            }
        }
        sb.append("]");
        sb.append("});\n"
                + "});");
    }

    private boolean mustPlotGraphConstructPojo(HighChartGraphConstructPojo p) {
        return p != null || !p.getData().isEmpty();
    }

    private void initVariables() {
        technology = htmlIp.getTechnology();//getDataFromJSON("TECHNOLOGY");
        vendor = htmlIp.getVendor();//getDataFromJSON("VENDOR");
        pages = htmlIp.getChartPageColumns();//getDataFromJSON("chartPageColumns");
        fillGraph = htmlIp.getFillGraph();//getDataFromJSON("fillGraph").get(0);
        rollerPeriod = htmlIp.getRollerPeriod();//getDataFromJSON("chartRollerPeriod").get(0);
    }
}
