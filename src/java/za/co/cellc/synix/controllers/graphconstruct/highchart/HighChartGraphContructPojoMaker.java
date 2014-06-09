/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers.graphconstruct.highchart;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphContructPojoMaker;
import za.co.cellc.synix.model.GraphData;

/**
 *
 * @author pierre.venter
 */
public class HighChartGraphContructPojoMaker extends GraphContructPojoMaker {

    private List<HighChartSeriesPojo> seriesPojos = new ArrayList<HighChartSeriesPojo>();

    public HighChartGraphContructPojoMaker(List<GraphData> gdObjects, List<String> labelNames, FormuladefPojo devPojo) throws Exception {
        super(gdObjects, labelNames, devPojo);
    }

    @Override
    public GraphConstructPojo getGraphConstructPojo() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private void setSeriesPojos() {
        for (GraphData gd : gdObjects) {

        }
    }

    private HighChartSeriesPojo getSeriesPojo(GraphData gd) {
        HighChartSeriesPojo sp = new HighChartSeriesPojo();
        sp.setColor(Constants.HighChartTypes.LINE.value());
        sp.setName(gd.getNetworkElementId());
        return null;
    }

    private String graphDataToHighChartSeriesData(GraphData gd) {
        StringBuilder sb = new StringBuilder();
        List<String> gData = gd.getData();
        for (int i = 0; i < gData.size(); i++) {
            String data = gData.get(i);
            String dateTime = gd.getDateTime().get(i);

        }
        return sb.toString();
    }

    private String getUTCdateTime() {
        return "";
    }
}
