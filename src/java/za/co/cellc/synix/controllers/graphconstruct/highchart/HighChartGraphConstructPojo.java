/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers.graphconstruct.highchart;

import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;

/**
 *
 * @author pierre.venter
 */
public class HighChartGraphConstructPojo extends GraphConstructPojo {

    private String type = "line";
    private String color = null;
    private String dashStyle = "solid";

    public HighChartGraphConstructPojo(String data, String label, String chartTitle) {
        super(data, label, chartTitle);
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String getChartTitle() {
        return chartTitle;
    }

    @Override
    public String getData() {
        return data;
    }

    @Override
    public String getLabel() {
        return label;
    }

    public String getDashStyle() {
        return dashStyle;
    }

    public void setDashStyle(String dashStyle) {
        this.dashStyle = dashStyle;
    }

}
