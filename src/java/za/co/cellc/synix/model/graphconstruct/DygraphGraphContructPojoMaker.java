/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.graphconstruct;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.model.GraphData;

/**
 *
 * @author pierre.venter
 */
public class DygraphGraphContructPojoMaker extends GraphContructPojoMaker {

    public DygraphGraphContructPojoMaker(List<GraphData> gdObjects, List<String> labelNames, FormuladefPojo devPojo) throws Exception {
        super(gdObjects, labelNames, devPojo);
    }

    @Override
    public GraphConstructPojo getGraphConstructPojo() {
        String dataStr = concatenateGraphData();
        String labels = concatenateGraphLabels();
        String title = devPojo.getChartTitle();
        return new GraphConstructPojo(dataStr, labels, title);
    }

    private String concatenateGraphData() {
        StringBuilder concatSb = new StringBuilder();
        List<String> uLabelNames = makeUniqueListOfElementNames();
        for (String hr : hours) {
            concatSb.append(hr);
            for (int i = 0; i < uLabelNames.size(); i++) {
                String labelName = uLabelNames.get(i);
                boolean found = false;
                for (GraphData gd : gdObjects) {
                    if (gd.equals(labelName)) {
                        concatSb.append(",");
                        concatSb.append(gd.getValueForDateTime(hr));
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    concatSb.append(",");
                }
            }
            concatSb.append("\\n");
        }
        return concatSb.toString();
    }

    private String concatenateGraphLabels() {
        StringBuilder concatSb = new StringBuilder();
        List<String> uLabelNames = makeUniqueListFromLabelNames();
        for (String uLblb : uLabelNames) {
            concatSb.append(",");
            concatSb.append(uLblb);
        }
        return concatSb.toString().substring(1);
    }

    private List<String> makeUniqueListOfElementNames() {
        List<String> uElementNames = new ArrayList<>();
        List<String> uLabelNames = makeUniqueListFromLabelNames();
        for (String ul : uLabelNames) {
            if (!ul.equalsIgnoreCase("'" + Constants.DATE_TIME_COL + "'")) {
                uElementNames.add(stripQuotes(ul));
            }
        }
        return uElementNames;
    }

    private List<String> makeUniqueListFromLabelNames() {
        List<String> uniqueLabels = new ArrayList<>();
        for (String l : labelNames) {
            String[] labels = splitLabels(l);
            for (String lbl : labels) {
                if (!uniqueLabels.contains(lbl)) {
                    uniqueLabels.add(lbl);
                }
            }
        }
        return uniqueLabels;
    }
}
