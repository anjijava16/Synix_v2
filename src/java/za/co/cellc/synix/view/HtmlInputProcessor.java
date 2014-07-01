/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class HtmlInputProcessor {

//    private static HtmlInputProcessor instance;
    private List<String> fromDate;
    private StringBuilder selectionSb;
    private List<String> toDate;
    private List<String> networkElements = new ArrayList<>();
    private boolean aggregated = false;
    private boolean aggregationMultiGroup = false;
    private List<String> tech;
    private List<String> vendor;
    private String level;
    private String period;
    private String divId;
    private int logicalGroup;
    private JSON_Parser jp;
    private String chartType = Constants.DEFAULT_CHART_TYPE;

    public HtmlInputProcessor() {
    }

//    public static synchronized HtmlInputProcessor getInstance() {
////        if (instance == null) {
//            instance = new HtmlInputProcessor();
////        } else {
////        }
//        return new HtmlInputProcessor();
//    }
    private String chartPageColumns;
    private String fillGraph;
    private String rollerPeriod;
    private List<String> ctrlGroups;
    private List<String> cellGroups;
    private List<String> controllers;
    private List<String> cells;

    public void processInput(StringBuilder selectionSb) throws Exception {
        jp = new JSON_Parser(selectionSb.toString());
        try {
            parseJSON();
        } catch (Exception ex) {
            System.out.println("Error parsing HTML inputs selection: " + ex.getMessage());
            Logger.getLogger(HtmlInputProcessor.class.getName()).log(Level.SEVERE, null, ex);
            throw new Exception(ex);
        }
        this.selectionSb = selectionSb;
    }

    public List<String> getCtrlGroups() {
        return ctrlGroups;
    }

    public String getPeriod() {
        return period;
    }

    public void clear() {
        fromDate = new ArrayList<>();;
        selectionSb = new StringBuilder();
        toDate = new ArrayList<>();
        networkElements = new ArrayList<>();
        ctrlGroups = new ArrayList<>();
        cellGroups = new ArrayList<>();
        controllers = new ArrayList<>();
        cells = new ArrayList<>();
        aggregated = false;
        aggregationMultiGroup = false;
        tech = new ArrayList<>();
        vendor = new ArrayList<>();
        level = "";
        period = "";
        divId = "";
    }

    private void parseJSON() throws Exception {
        tech = getDataFromJSON("TECHNOLOGY");
        vendor = getDataFromJSON("VENDOR");
        setLevel();
        setCtrlGroups();
        setCellGroups();
        setControllers();
        setCells();
        setAggregated();
        setFromDate();
        setToDate();
        setPeriod();
        setLogicalGroup();
        setChartType();
        setDivId();
        setNetworkElements();
    }

    public List<String> getNetworkElements() {
        return networkElements;
    }

    public StringBuilder getSelectionSb() {
        return selectionSb;
    }

    public boolean isAggregated() {
        return aggregated;
    }

    public String getTechnology() {
        return tech.get(0);
    }

    public String getVendor() {
        return vendor.get(0);
    }

    public String getLevel() {
        return level;
    }

    public String getDivId() {
        return divId;
    }

    public String getToDate() {
        return toDate.get(0);
    }

    public String getFromDate() {
        return fromDate.get(0);
    }

    public boolean isAggregationMultiGroup() {
        return aggregationMultiGroup;
    }

    public List<String> getCellGroups() {
        return cellGroups;
    }

    public List<String> getControllers() {
        return controllers;
    }

    public List<String> getCells() {
        return cells;
    }

    private void setCtrlGroups() {
        ctrlGroups = extractFromJSON("ctrlGroups");
    }

    private void setCellGroups() {
        cellGroups = extractFromJSON("cellGroups");
    }

    private void setControllers() {
        controllers = extractFromJSON("controllers");
    }

    private void setCells() {
        cells = extractFromJSON("cells");
    }

    public String getChartType() {
        return chartType;
    }

    public int getLogicalGroup() {
        return logicalGroup;
    }

    private void setAggregated() { 
        switch (level) {
            case "Controller":
                aggregated=aggregationMultiGroup = ctrlGroups.size() > 0;
                break;
            case "Cell":
                aggregated=aggregationMultiGroup = cellGroups.size() > 0;
                break;
            default:
        }
    }

    private void setNetworkElements() {
        switch (level) {
            case "Controller":
                if (aggregated) {
                    networkElements = ctrlGroups;
                } else {
                    networkElements = controllers;
                }
                break;
            case "Cell":
                if (aggregated) {
                    networkElements = cellGroups;
                } else {
                    networkElements = cells;
                }
                break;
            default:
        }
    }
//    private void setAggregated(List<String> lst) {
////        if (lst.contains("Aggregate")) {
////            lst.remove("Aggregate");
////            aggregated = true;
////        } else if (!lst.isEmpty()) {
//        aggregated = lst.get(0).contains("~");
//        aggregationMultiGroup = true;
////        }
//    }

    private List<String> getDataFromJSON(String object) {
        List<String> data = new ArrayList<>();
        data.addAll(extractFromJSON(object));
        return data;
    }

    private List<String> extractFromJSON(String objectName) {
        return jp.getValuesForObject(objectName);
    }

    private void setLevel() {
        List<String> values = extractFromJSON("level");
        if (values.size() > 0) {
            level = values.get(0);
        }
    }

    private void setChartType() {
        List<String> values = extractFromJSON("chart_type");
        if (values.size() > 0) {
            chartType = values.get(0);
        }
    }

    private void setDivId() {
        List<String> values = extractFromJSON("divId");
        if (values.size() > 0) {
            divId = values.get(0);
        }
    }

    private void setPeriod() throws Exception {
        List<String> value = extractFromJSON("period");
        if (value.size() > 0) {
            period = value.get(0);
        } else {
            System.out.println("Error getting period: " + value);
            throw new Exception("Error getting period: " + value);
        }
    }

    private void setLogicalGroup() throws Exception {
        List<String> value = extractFromJSON("logicalGroup");
        if (value.size() > 0) {
            logicalGroup = Integer.valueOf(value.get(0));
        } else {
            System.out.println("Error getting logicalGroup: " + value);
            throw new Exception("Error getting logicalGroup: " + value);
        }
    }

    private void setFromDate() {
        fromDate = extractFromJSON("timeFrom");
    }

    private void setToDate() {
        toDate = extractFromJSON("timeTo");
    }

//    private void setChartPageColumns() {
//        chartPageColumns = extractFromJSON("chartPageColumns").get(0);
//    }
//
//    private void setFillGraph() {
//        fillGraph = extractFromJSON("fillGraph").get(0);
//    }
//
//    private void setRollerPeriod() {
//        rollerPeriod = extractFromJSON("chartRollerPeriod").get(0);
//    }
    public String getChartPageColumns() {
        return chartPageColumns;
    }

    public String getFillGraph() {
        return fillGraph;
    }

    public String getRollerPeriod() {
        return rollerPeriod;
    }

}
