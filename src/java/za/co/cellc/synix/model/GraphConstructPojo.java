/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

/**
 *
 * @author Pierre.Venter
 */
public class GraphConstructPojo {

    String data;
    String label;
    String chartTitle;

    public GraphConstructPojo(String data, String label, String chartTitle) {
        this.data = data;
        this.label = label;
        this.chartTitle = chartTitle;
    }

    public String getChartTitle() {
        return chartTitle;
    }

    public void setChartTitle(String chartTitle) {
        this.chartTitle = chartTitle;
    }

    public String getData() {
        return data;
    }

    public String getLabel() {
        return label;
    }

    public boolean equals(String chartTitle) {
        return this.chartTitle.equalsIgnoreCase(chartTitle);
    }
}
