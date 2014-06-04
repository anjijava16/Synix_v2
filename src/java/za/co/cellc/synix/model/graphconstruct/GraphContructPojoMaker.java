/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.graphconstruct;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.utilities.HoursUtility;

/**
 *
 * @author pierre.venter
 */
public class GraphContructPojoMaker {

    protected List<GraphData> gdObjects;
    protected List<String> labelNames;
    protected List<String> hours = new ArrayList<>();
    protected FormuladefPojo devPojo;

    public GraphContructPojoMaker(List<GraphData> gdObjects, List<String> labelNames, FormuladefPojo devPojo) {
        this.gdObjects = gdObjects;
        this.labelNames = labelNames;
        this.devPojo = devPojo;
        setHours();
    }

    public GraphConstructPojo getGraphConstructPojo() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    protected String stripQuotes(String s) {
        return s.replace("'", "");
    }

    protected String[] splitLabels(String l) {
        return l.split(",");
    }

    private void setHours() {
        HoursUtility hrs = new HoursUtility();
        hours.addAll(hrs.getHours());
    }

}
