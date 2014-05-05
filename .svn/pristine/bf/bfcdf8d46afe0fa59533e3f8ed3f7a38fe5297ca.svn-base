/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.dygraph;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.formbuilders.charts.HTML_Inputs;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;

/**
 *
 * @author Pierre.Venter
 */
public class GraphObject {

    private String CELL_GROUP_DELIMITER = "~";
    private String orderBy;
//    private String dateColumnName;
    private List<String> selectedObjectValues = new ArrayList<>();
    private List<String> selectedObjectNames;
    private List<String> selectedObjectDisplayNames = new ArrayList<>();
    private List<List> cellGroups = new ArrayList<>();
    private List<Integer> uniqueCellGroupID = new ArrayList<>();
//    private String kpiName;
    private HTML_Inputs inputs;

    public GraphObject(StringBuilder JSON_sb, String orderBy, DatabaseQueryObject dObject) {
        this.orderBy = orderBy;
//        this.dateColumnName = dateColumnName;
        inputs = new HTML_Inputs(JSON_sb);
//        this.kpiName = kpiName;
        initGraphObject();
    }

    public List<String> getSelectedObjectDisplayNames() {
        return selectedObjectDisplayNames;
    }

    public void setSelectedObjectValues(List<String> selectedObjectValues) {
        setUniqueCellGroupID(selectedObjectValues);
        if (uniqueCellGroupID.isEmpty()) {
            this.selectedObjectValues = selectedObjectValues;
        } else {
            setCellGroups(selectedObjectValues);
        }
    }

    private void initGraphObject() {
        List<String> selectedValues = inputs.getNe();
        setSelectedObjectValues(selectedValues);
        setSelectedObjectNames(getObjectNames());
    }

    private List<String> getObjectNames() {
        List<String> names = new ArrayList<>();
        String name = "";
        if (!inputs.getNe().isEmpty() && inputs.getLevel().equalsIgnoreCase("BSC")) {
            name = (inputs.isAggregated()) ? "BSC_GID" : "BSC_NAME";
        } else if (!inputs.getNe().isEmpty() && inputs.getLevel().equalsIgnoreCase("RNC")) {
            name = (inputs.isAggregated()) ? "RNC_ID" : "RNC_NAME";
        } else if (!inputs.getNe().isEmpty() && inputs.getLevel().equalsIgnoreCase("CELL") && inputs.getTech().get(0).equalsIgnoreCase("2G")) {
            name = (inputs.isAggregated()) ? "BTS_GID" : "BTS_GID";
        } else if (!inputs.getNe().isEmpty() && inputs.getLevel().equalsIgnoreCase("CELL") && inputs.getTech().get(0).equalsIgnoreCase("3G")) {
            name = (inputs.isAggregated()) ? "WCEL_ID" : "WCEL_ID";
        }
        for (int i = 0; i < inputs.getNe().size(); i++) {
            names.add(name);
            insertIntoSelectedObjectDisplayNames(inputs.getNe().get(i));
        }
        return names;
    }

    private void setCellGroups(List<String> selectedObjectValues) {
        List<String> cells = new ArrayList<>();
        int prevGroupIndex = -1;
        for (int i = 0; i < selectedObjectValues.size(); i++) {
            if (selectedObjectValues.get(i).contains(CELL_GROUP_DELIMITER)) {
                String[] ar = selectedObjectValues.get(i).split(CELL_GROUP_DELIMITER);
                int groupIndex = uniqueCellGroupID.indexOf(Integer.valueOf(ar[1]));
                if (prevGroupIndex == -1 || prevGroupIndex == groupIndex) {
                    cells.add(ar[0]);
                    prevGroupIndex = groupIndex;
                } else {
                    cellGroups.add(new ArrayList(cells));
                    cells.clear();
                    cells.add(ar[0]);
                    prevGroupIndex = groupIndex;
                }
            }
        }
        if (!cellGroups.contains(cells)) {
            cellGroups.add(cells);
        }
    }

//    public void setSqlQuery(String sqlQuery) {
//        this.sqlQuery = sqlQuery;
//    }
    private void setUniqueCellGroupID(List<String> selectedObjectValues) {
        for (int i = 0; i < selectedObjectValues.size(); i++) {
            if (selectedObjectValues.get(i).contains(CELL_GROUP_DELIMITER)) {
                String[] ar = selectedObjectValues.get(i).split(CELL_GROUP_DELIMITER);
                if (!uniqueCellGroupID.contains(Integer.valueOf(ar[1]))) {
                    uniqueCellGroupID.add(Integer.valueOf(ar[1]));
                }
            }
        }
    }

    public void setSelectedObjectNames(List<String> selectedObjectNames) {
        this.selectedObjectNames = selectedObjectNames;
    }

    public void insertIntoSelectedObjectDisplayNames(String s) {
        this.selectedObjectDisplayNames.add(s);
    }

//    public String getDateColumnName() {
//        return dateColumnName;
//    }
//
//    public String getKpiName() {
//        return kpiName;
//    }

    public String getOrderBy() {
        return orderBy;
    }

    public List<String> getSelectedObjectNames() {
        return selectedObjectNames;
    }

    public List<String> getSelectedObjectValues() {
        return selectedObjectValues;
    }

    public List<Integer> getUniqueCellGroupID() {
        return uniqueCellGroupID;
    }

    public List<String> getSelectedObjectValues(int groupIndex) {
        return cellGroups.get(groupIndex);
    }
//
//    public String getSqlQuery() {
//        return sqlQuery;
//    }
}
