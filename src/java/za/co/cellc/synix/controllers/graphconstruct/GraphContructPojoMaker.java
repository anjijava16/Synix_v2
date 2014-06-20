/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers.graphconstruct;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.graphconstruct.highchart.HighChartGraphConstructPojo;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.utilities.HoursUtility;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author pierre.venter
 */
public class GraphContructPojoMaker {

    protected List<GraphData> gdObjects;
    protected List<String> labelNames;
    protected List<String> hours = new ArrayList<>();
    protected FormuladefPojo devPojo;
    protected List<HighChartGraphConstructPojo> hcgPojos = new ArrayList<>();
    protected HtmlInputProcessor htmlIp;

    public GraphContructPojoMaker(HtmlInputProcessor htmlIp, List<GraphData> gdObjects, List<String> labelNames, FormuladefPojo devPojo) {
        this.htmlIp = htmlIp;
        this.gdObjects = gdObjects;
        this.labelNames = labelNames;
        this.devPojo = devPojo;
        setHours();
    }

    public GraphConstructPojo getGraphConstructPojo() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public List<HighChartGraphConstructPojo> getGraphConstructPojos() throws Exception {
        return hcgPojos;
    }

    protected String stripQuotes(String s) {
        return s.replace("'", "");
    }

    protected String[] splitLabels(String l) {
        return l.split(",");
    }

    private void setHours() {
        HoursUtility hrs = new HoursUtility(htmlIp);
        hours.addAll(hrs.getHours());
    }

}
