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
import za.co.cellc.synix.utilities.DateConvert;
import za.co.cellc.synix.utilities.ListUtils;

/**
 *
 * @author pierre.venter
 */
public class HighChartGraphContructPojoMaker extends GraphContructPojoMaker {

    private ListUtils listUtils = new ListUtils();

    public HighChartGraphContructPojoMaker(List<GraphData> gdObjects, List<String> labelNames, FormuladefPojo devPojo) throws Exception {
        super(gdObjects, labelNames, devPojo);
    }

    @Override
    public List<HighChartGraphConstructPojo> getGraphConstructPojos() throws Exception {
        makeHighChartGraphConstructPojos();
        makeHighChartTargetConstructPojo();
        return super.getGraphConstructPojos();
    }

    private void makeHighChartTargetConstructPojo() throws Exception {
        if (!isTargetZero()) {
            String tdts = makeTargetDataTimeString();
            HighChartGraphConstructPojo hcgp = new HighChartGraphConstructPojo(tdts, "Target", devPojo.getChartTitle());
            hcgp.setColor(Constants.TARGET_COLOR);
            hcgPojos.add(hcgp);
        }
    }

    private boolean isTargetZero() {
        return devPojo.getTarget() == 0.0;
    }

    private String makeTargetDataTimeString() throws Exception {
        StringBuilder sb = new StringBuilder();
        Double target = devPojo.getTarget();
        for (String hr : hours) {
            String utcD = getUTCdate(hr);
            String value = target.toString();
            sb.append("[");
            sb.append(utcD);
            sb.append(",");
            sb.append(value);
            sb.append("]");
            if (!listUtils.isLastItemInStrList(hr, hours)) {
                sb.append(",\n");
            }
        }
        return sb.toString();
    }

    private void makeHighChartGraphConstructPojos() throws Exception {
        for (GraphData gd : gdObjects) {
            String dataTimeStr = makeDataTimeString(gd);
            String nE = gd.getNetworkElementId();
            HighChartGraphConstructPojo hcgp = new HighChartGraphConstructPojo(dataTimeStr, nE, devPojo.getChartTitle());
            hcgPojos.add(hcgp);
        }
    }

    private String makeDataTimeString(GraphData gd) throws Exception {
        StringBuilder sb = new StringBuilder();
        for (String hr : hours) {
            String utcD = getUTCdate(hr);
            String value = gd.getValueForDateTime(hr);
            value = value.isEmpty() ? null : value;
            sb.append("[");
            sb.append(utcD);
            sb.append(",");
            sb.append(value);
            sb.append("]");
            if (!listUtils.isLastItemInStrList(hr, hours)) {
                sb.append(",\n");
            }
        }
        return sb.toString();
    }

    private String getUTCdate(String dateStr) throws Exception {
        DateConvert dc = new DateConvert();
        return dc.dateStringToUTCdate(dateStr, Constants.GRAPH_DATE_FORMAT);
    }

//    private String concatenateGraphData() {
//        StringBuilder concatSb = new StringBuilder();
//        List<String> uLabelNames = makeUniqueListOfElementNames();
//        for (String hr : hours) {
//            concatSb.append(hr);
//            for (int i = 0; i < uLabelNames.size(); i++) {
//                String labelName = uLabelNames.get(i);
//                boolean found = false;
//                for (GraphData gd : gdObjects) {
//                    if (gd.equals(labelName)) {
//                        concatSb.append(",");
//                        concatSb.append(gd.getValueForDateTime(hr));
//                        found = true;
//                        break;
//                    }
//                }
//                if (!found) {
//                    concatSb.append(",");
//                }
//            }
//            concatSb.append("\\n");
//        }
//        return concatSb.toString();
//    }
//
//    private void setSeriesPojos() {
//        for (GraphData gd : gdObjects) {
//
//        }
//    }
//    private HighChartGraphConstructPojo getSeriesPojo(GraphData gd) {
//        HighChartGraphConstructPojo sp = new HighChartGraphConstructPojo();
//        sp.setColor(Constants.HighChartTypes.LINE.value());
//        sp.setName(gd.getNetworkElementId());
//        return null;
//    }
//
//    private String concatenateGraphData() {
//        StringBuilder concatSb = new StringBuilder();
//        List<String> uLabelNames = makeUniqueListOfElementNames();
//        for (String hr : hours) {
//            concatSb.append(hr);
//            for (int i = 0; i < uLabelNames.size(); i++) {
//                String labelName = uLabelNames.get(i);
//                boolean found = false;
//                for (GraphData gd : gdObjects) {
//                    if (gd.equals(labelName)) {
//                        concatSb.append(",");
//                        concatSb.append(gd.getValueForDateTime(hr));
//                        found = true;
//                        break;
//                    }
//                }
//                if (!found) {
//                    concatSb.append(",");
//                }
//            }
//            concatSb.append("\\n");
//        }
//        return concatSb.toString();
//    }
//
//    private String concatenateGraphLabels() {
//        StringBuilder concatSb = new StringBuilder();
//        List<String> uLabelNames = makeUniqueListFromLabelNames();
//        for (String uLblb : uLabelNames) {
//            concatSb.append(",");
//            concatSb.append(uLblb);
//        }
//        return concatSb.toString().substring(1);
//    }
//
//    private List<String> makeUniqueListOfElementNames() {
//        List<String> uElementNames = new ArrayList<>();
//        List<String> uLabelNames = makeUniqueListFromLabelNames();
//        for (String ul : uLabelNames) {
//            if (!ul.equalsIgnoreCase("'" + Constants.DATE_TIME_COL + "'")) {
//                uElementNames.add(stripQuotes(ul));
//            }
//        }
//        return uElementNames;
//    }
//
//    private List<String> makeUniqueListFromLabelNames() {
//        List<String> uniqueLabels = new ArrayList<>();
//        for (String l : labelNames) {
//            String[] labels = splitLabels(l);
//            for (String lbl : labels) {
//                if (!uniqueLabels.contains(lbl)) {
//                    uniqueLabels.add(lbl);
//                }
//            }
//        }
//        return uniqueLabels;
//    }
//
//    private String graphDataToHighChartSeriesData(GraphData gd) {
//        StringBuilder sb = new StringBuilder();
//        List<String> gData = gd.getData();
//        for (int i = 0; i < gData.size(); i++) {
//            String data = gData.get(i);
//            String dateTime = gd.getDateTime().get(i);
//
//        }
//        return sb.toString();
//    }
//
//    private String getUTCdateTime() {
//        return "";
//    }
}
