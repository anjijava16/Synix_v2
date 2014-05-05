/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Pierre.Venter
 */
public class HTML_Inputs {

    private String GROUP_DELIMITER = "~";
    private List<String> fromDate;
    private StringBuilder JSON_sb;
    private List<String> toDate;
    private List<String> ne = new ArrayList<>();
    private boolean aggregated = false;
    private List<String> tech;
    private List<String> vendor;
    private String level;

    public HTML_Inputs(StringBuilder JSON_sb) {
        this.JSON_sb = JSON_sb;
        parseJSON();
    }

    public List<String> getNe() {
        return ne;
    }

    public StringBuilder getJSON_sb() {
        return JSON_sb;
    }

    public boolean isAggregated() {
        return aggregated;
    }

    public List<String> getTech() {
        return tech;
    }

    public List<String> getVendor() {
        return vendor;
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

    private void parseJSON() {
        tech = getDataFromJSON("TECHNOLOGY");
        vendor = getDataFromJSON("VENDOR");
        setLevel();
        setNe();
        setAggregated(ne);
        addBasicGroupingToAggregatedElements();
        setFromDate();
        setToDate();
    }

    private void setNe() {
        switch (level) {
            case "BSC":
                ne.addAll(extractFromJSON("bsc"));
                break;
            case "RNC":
                ne.addAll(extractFromJSON("rnc"));
                break;
            case "CELL":
                if (tech.get(0).equalsIgnoreCase("2G")) {
                    ne.addAll(extractFromJSON("twoGNSNCellgroups"));
                }
                if (tech.get(0).equalsIgnoreCase("3G")) {
                    ne.addAll(extractFromJSON("threeGNSNCellgroups"));
                }
                if (ne.isEmpty()) {
                    ne.addAll(extractFromJSON("cells"));
                }
                break;
            default:
        }
    }

    private void addBasicGroupingToAggregatedElements() {
        String basicGrouping = GROUP_DELIMITER + "0";
        if (aggregated) {
            for (int i = 0; i < ne.size(); i++) {
                if (!elementAlreadyGrouped(ne.get(i))) {
                    ne.set(i, ne.get(i) + basicGrouping);
                } else {
                    removeUnselectedCellGroups();
                }
            }
        }
    }

    private void removeUnselectedCellGroups() {
        List<String> selectedGroups = getDataFromJSON("selectedCellGroups");
        for (int i = 0; i < ne.size(); i++) {
            String g = getGroupFromNE(i);
            if (!selectedGroups.contains(g)) {
                ne.remove(i);
            }
        }
    }

    private String getGroupFromNE(int i) {
        String ar[] = ne.get(i).split(GROUP_DELIMITER);
        return ar[1];
    }

    private boolean elementAlreadyGrouped(String e) {
        return e.contains("~");
    }

    private void setAggregated(List<String> lst) {
        if (lst.contains("Aggregate")) {
            lst.remove("Aggregate");
            aggregated = true;
        } else if (!lst.isEmpty()) {
            aggregated = lst.get(0).contains("~");
        }
    }

    private List<String> getDataFromJSON(String object) {
        List<String> data = new ArrayList<>();
        data.addAll(extractFromJSON(object));
        return data;
    }

    private List<String> extractFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, JSON_sb.toString());
    }

    private void setLevel() {
        if (extractFromJSON("CELLS").size() > 0) {
            level = "CELL";
        } else if (extractFromJSON("TECHNOLOGY").get(0).equalsIgnoreCase("2G")) {
            level = "BSC";
        } else {
            level = "RNC";
        }
    }

    private void setFromDate() {
        fromDate = extractFromJSON("timeFrom");
    }

    private void setToDate() {
        toDate = extractFromJSON("timeTo");
    }
}
