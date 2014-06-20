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

    private int TARGET_LINE_WIDTH = 1;
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
    private HtmlInputProcessor htmlIp;
    private List<HighChartGraphConstructPojo> gcPojos;
    private StringBuilder sb = new StringBuilder();

    public HighChartContentMaker(HtmlInputProcessor htmlIp, int divIndex) {
        this.htmlIp = htmlIp;
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
        addShowHideButton(chartIndex);
        addIsolateSeriesMethod();
        sb.append("});");
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
        sb.append("layout: 'horizontal',");
        sb.append("align: 'center',");
        sb.append("verticalAlign: 'bottom',");
        sb.append("borderWidth: 1,"
                + "itemHoverStyle: {\n"
                + "                color: '#FF0000'\n"
                + "            },");
        sb.append("maxHeight: 90,");
        sb.append("padding: 5,"
                + "borderRadius: 5");
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
                + "                text: '" + getUnit() + "'\n"
                + "            }"
                //                + ",\n"
                //                + "            min: 75,\n"
                //                + "            max: 100\n"
                + "        },");

    }

    private String getUnit() {
        return formulaDef.getUnit();
    }

    private void addTooltip() {
//        sb.append("tooltip: {\n"
//                + "            shared: true,\n"
//                + "            crosshairs: true\n"
//                + "        },");
        sb.append("tooltip: {      \n"
                + "        borderRadius: 10,\n"
                + "        shared: true,\n"
                + "        crosshairs: true,\n"
                + "        useHTML: true,\n"
                + "            headerFormat: '<small>{point.key}</small><table>',\n"
                + "            pointFormat: '<tr><td style=\"color: {series.color}\"><b>{series.name}:</b> </td>' +\n"
                + "            '<td style=\"text-align: left\"><b>{point.y}</b></td></tr>',\n"
                + "            footerFormat: '</table>'"
                + "    },");
    }

    private void addPlotOptions() {
        sb.append("plotOptions: {"
                + "         line: {"
                + "                 animation:true,"
                + "                 lineWidth:1.5,"
                + "            },"
                //                + "            line: {"
                //                + "                 lineWidth: 1,"
                //                + "                 animation: false,"
                //                + "                 allowPointSelect: false,"
                //                + "                 marker: {"
                //                + "                     enabled: false"
                //                + "                 },"
                //                + "             },\n"
                + "            series: {\n"
                //           + "                allowPointSelect: true,"
                + "                cursor: 'pointer',\n"
                + "                point: {\n"
                + "                    events: {\n"
                + "                        click: function() {\n"
                //                + "                            alert ('Category: '+ this.category +', value: '+ this.y);\n"
                + "                        }\n"
                + "                    }\n"
                + "                },\n"
                //                + "             line: {"
                //                + "                 lineWidth: 1,"
                //                + "                 animation: false,"
                //                + "                 allowPointSelect: false,"
                //                + "                 marker: {"
                //                + "                     enabled: false"
                //                + "                 },"
                //                + "             }"
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
                if (isTargetObject(gcp)) {
                    addTargetFormatting();
                }
                sb.append("data: [").append(gcp.getData()).append("]");
                sb.append(",dashStyle: '").append(gcp.getDashStyle()).append("'");
                if (!isTargetObject(gcp)) {
                    addPointSelectEvent(gcp.getLabel());
                }
                if (i != gcPojos.size()) {
                    sb.append("},");
                } else {
                    sb.append("}");
                }
            }
        }
        sb.append("]");
        sb.append("});");
    }

    private void addPointSelectEvent(String seriesName) {
        sb.append(",\n"
                + "            point: {\n"
                + "                events: {\n"
                + "                    click: function () {\n"
                + "                        isolateSeries('" + seriesName + "');\n"
                + "                    }\n"
                + "\n"
                + "                }\n"
                + "            }");
    }

    private void addTargetFormatting() {
        sb.append("lineWidth: ").append(TARGET_LINE_WIDTH).append(",");
        sb.append("marker:{"
                + "     enabled: false"
                + "},");
    }

    private boolean isTargetObject(HighChartGraphConstructPojo gcp) {
        return gcp.getLabel().equalsIgnoreCase("TARGET");
    }

    private boolean mustPlotGraphConstructPojo(HighChartGraphConstructPojo p) {
        return p != null || !p.getData().isEmpty();
    }

    private void addShowHideButton(int chartIndex) {
        String divId = "'#div" + (chartIndex + 1) + "_" + divIndex + "'";
        String buttonId = "'#s_h_button" + (chartIndex + 1) + "_" + divIndex + "'";
        sb.append("var chart = $(" + divId + ").highcharts(),\n"
                + "        $button = $(" + buttonId + ");\n"
                + "    $button.click(function () {\n"
                //                + "         console.log(\"showHide\");"
                + "        var series = chart.series[0];\n"
                + "        if (series.visible) {\n"
                + "            $(chart.series).each(function () {\n"
                + "                //this.hide();\n"
                + "                this.setVisible(false, false);\n"
                + "            });\n"
                + "            chart.redraw();\n"
                //                        + "            $button.html('Show series');\n"
                + "        } else {\n"
                + "            $(chart.series).each(function () {\n"
                + "                //this.show();\n"
                + "                this.setVisible(true, false);\n"
                + "            });\n"
                + "            chart.redraw();\n"
                //                        + "            $button.html('Hide series');\n"
                + "        }\n"
                + "    });");
    }

    private void addIsolateSeriesMethod() {
        sb.append(" function isolateSeries(preserveSeriesName) {\n"
                + "        var series = chart.series[0];\n"
                + "        if (series.visible) {\n"
                + "            chart.tooltip.Shared=\"false\";"
                + "            $(chart.series).each(function () {\n"
                + "                if (this.name !== preserveSeriesName) {\n"
                + "                    this.setVisible(false, false);\n"
                + "                }\n"
                + "            });\n"
                + "            chart.redraw();\n"
                + "        } else {\n"
                + "             chart.tooltip.Shared=\"true\";"
                + "            $(chart.series).each(function () {\n"
                + "                this.setVisible(true, false);\n"
                + "            });\n"
                + "            chart.redraw();\n"
                + "        }\n"
                + "    };");
    }

    private void initVariables() {
        technology = htmlIp.getTechnology();//getDataFromJSON("TECHNOLOGY");
        vendor = htmlIp.getVendor();//getDataFromJSON("VENDOR");
        pages = htmlIp.getChartPageColumns();//getDataFromJSON("chartPageColumns");
        fillGraph = htmlIp.getFillGraph();//getDataFromJSON("fillGraph").get(0);
        rollerPeriod = htmlIp.getRollerPeriod();//getDataFromJSON("chartRollerPeriod").get(0);
    }
}
