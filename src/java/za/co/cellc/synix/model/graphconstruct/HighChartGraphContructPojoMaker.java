/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.graphconstruct;

import java.util.List;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.model.GraphData;

/**
 *
 * @author pierre.venter
 */
public class HighChartGraphContructPojoMaker extends GraphContructPojoMaker {

    public HighChartGraphContructPojoMaker(List<GraphData> gdObjects, List<String> labelNames, FormuladefPojo devPojo) throws Exception {
        super(gdObjects, labelNames,devPojo);
    }

    @Override
    public GraphConstructPojo getGraphConstructPojo() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
