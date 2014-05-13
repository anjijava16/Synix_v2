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

    private static HtmlInputProcessor instance;
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
    private JSON_Parser jp;

    public static synchronized HtmlInputProcessor getInstance() {
        if (instance == null) {
            instance = new HtmlInputProcessor();
        } else {
        }
        return instance;
    }
    private String chartPageColumns;
    private String fillGraph;
    private String rollerPeriod;

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

    public String getPeriod() {
        return period;
    }

    public void clear() {
        fromDate = new ArrayList<>();;
        selectionSb = new StringBuilder();
        toDate = new ArrayList<>();
        networkElements = new ArrayList<>();
        aggregated = false;
        aggregationMultiGroup = false;
        tech = new ArrayList<>();
        vendor = new ArrayList<>();
        level = "";
        String period = "";
    }

    private HtmlInputProcessor() {
//        this.selectionSb = selectionSb;
//        parseJSON();
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

    public String getToDate() {
        return toDate.get(0);
    }

    public String getFromDate() {
        return fromDate.get(0);
    }

    public boolean isAggregationMultiGroup() {
        return aggregationMultiGroup;
    }

    private void parseJSON() throws Exception {
        tech = getDataFromJSON("TECHNOLOGY");
        vendor = getDataFromJSON("VENDOR");
        setLevel();
        setNe();
        setAggregated(networkElements);
//        addBasicGroupingToAggregatedElements();
        setFromDate();
        setToDate();
        setPeriod();
    }

    private void setNe() {
        switch (level) {
            case "CONTROLLER":
                if (tech.get(0).equalsIgnoreCase("2G")) {
                    networkElements.addAll(extractFromJSON("bsc"));
                } else {
                    networkElements.addAll(extractFromJSON("rnc"));
                }
                break;
            case "CELL":
                if (tech.get(0).equalsIgnoreCase("2G")) {
                    networkElements.addAll(extractFromJSON("twoGNSNCellgroups"));
                } else if (tech.get(0).equalsIgnoreCase("3G")) {
                    networkElements.addAll(extractFromJSON("threeGNSNCellgroups"));
                }
                if (networkElements.isEmpty()) {
                    networkElements.addAll(extractFromJSON("cells"));
                }
                break;
            default:
        }
    }

//    private void addBasicGroupingToAggregatedElements() {
//        String basicGrouping = Constants.GROUP_DELIMITER + "0";
//        if (aggregated) {
//            for (int i = 0; i < networkElements.size(); i++) {
//                if (!elementAlreadyGrouped(networkElements.get(i))) {
//                    networkElements.set(i, networkElements.get(i) + basicGrouping);
//                } else {
//                    removeUnselectedCellGroups();
//                }
//            }
//        }
//    }

//    private void removeUnselectedCellGroups() {
//        List<String> selectedGroups = getDataFromJSON("selectedCellGroups");
//        for (int i = 0; i < networkElements.size(); i++) {
//            String g = getGroupFromNE(i);
//            if (!selectedGroups.contains(g)) {
//                networkElements.remove(i);
//            }
//        }
//    }

//    private String getGroupFromNE(int i) {
//        String ar[] = networkElements.get(i).split(Constants.GROUP_DELIMITER);
//        return ar[1];
//    }
//
//    private boolean elementAlreadyGrouped(String e) {
//        return e.contains("~");
//    }

    private void setAggregated(List<String> lst) {

        if (lst.contains("Aggregate")) {
            lst.remove("Aggregate");
            aggregated = true;
        } else if (!lst.isEmpty()) {
            aggregated = lst.get(0).contains("~");
            aggregationMultiGroup = true;
        }
    }

    private List<String> getDataFromJSON(String object) {
        List<String> data = new ArrayList<>();
        data.addAll(extractFromJSON(object));
        return data;
    }

    private List<String> extractFromJSON(String objectName) {
        return jp.getValuesForObject(objectName);
    }

    private void setLevel() {
        if (extractFromJSON("CELLS").size() > 0) {
            level = "CELL";
        } else {
            level = "CONTROLLER";
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
