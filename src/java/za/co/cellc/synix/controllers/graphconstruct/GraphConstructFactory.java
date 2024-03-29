/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers.graphconstruct;

import za.co.cellc.synix.controllers.graphconstruct.highchart.HighChartGraphContructPojoMaker;
import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.model.GraphData;

/**
 *
 * @author pierre.venter
 */
public class GraphConstructFactory {

    public static GraphContructPojoMaker create(String selection, List<GraphData> gdObjects, List<String> labelNames, FormuladefPojo devPojo) throws Exception {
        GraphContructPojoMaker gpm = null;
        if (selection.equals(Constants.ChartTypes.DYGRAPH.value())) {
            gpm = new DygraphGraphContructPojoMaker(gdObjects, labelNames, devPojo);
        } else if (selection.equals(Constants.ChartTypes.HIGH_CHART.value())) {
            gpm = new HighChartGraphContructPojoMaker(gdObjects, labelNames, devPojo);
        }
        return gpm;
    }
}
