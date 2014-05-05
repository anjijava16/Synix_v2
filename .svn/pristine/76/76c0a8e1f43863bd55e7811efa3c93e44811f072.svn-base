/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.BscNameSingleton;
import za.co.cellc.synix.model.BtsNameSingleton;
import za.co.cellc.synix.model.RncNameSingleton;
import za.co.cellc.synix.model.WbtsNameSingleton;
import za.co.cellc.synix.model.WcellNameSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class QueryBuilder {

    private BscNameSingleton bscN;
    private BtsNameSingleton btsN;
    private RncNameSingleton rncN;
    private WbtsNameSingleton wbtsN;
    private WcellNameSingleton wcellN;
    private JSON_Parser jp = new JSON_Parser();
    private String dateClause;
    private String selectClause;
    private String fromClause;
    private String whereClause;
    private String groupByClause;
    private String orderByClause;
    private String level;
    private String period;
    private String networkElementColumnName;
    private String networkElementID;
    private String technology;
    private FormuladefPojo defPojo;
    private String selectionStr;
//    private List<String> labels;

    public QueryBuilder(FormuladefPojo defPojo, String selectionStr, boolean test) {
        this.defPojo = defPojo;
        this.selectionStr = selectionStr;
        bscN = BscNameSingleton.getInstance(test);
        BtsNameSingleton btsN = BtsNameSingleton.getInstance(test);
        RncNameSingleton rncN = RncNameSingleton.getInstance(test);
        WbtsNameSingleton wbtsN = WbtsNameSingleton.getInstance(test);
        WcellNameSingleton wcellN = WcellNameSingleton.getInstance(test);
    }

    public Map<String, String> getQueriesMap() throws Exception {
        Map<String, String> queriesMap = new HashMap<>();
        try {
            setTechnology();
            setLevel();
            setPeriod();
            setNetworkElementColumnName();
            List<String> networkElements = getNeElements();
            for (String ne : networkElements) {
                setNetworkElementID(ne);
                setSelectClause();
                setFromClause();
                setDateClause();
                setWhereClause();
                setGroupByClause();
                setOrderByClause();
                queriesMap.put(ne, makeQuery());
            }
        } catch (Exception ex) {
            System.out.println("Error building queries: " + ex.getMessage());
            Logger.getLogger(QueryBuilder.class.getName()).log(Level.SEVERE, null, ex);
            throw new Exception("Error building queries: ", ex);
        }
        return queriesMap;
    }

//    public List<String> getLabels() {
//        return labels;
//    }
    private void setSelectClause() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT ");
        sb.append(Constants.DATE_TIME_COL);
        sb.append(",");
        sb.append(defPojo.getAlgorythm());
        selectClause = sb.toString();
    }

    private void setFromClause() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append(" FROM ");
        sb.append(defPojo.getFlatTableName());
        fromClause = sb.toString();
    }

    private void setGroupByClause() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append(" GROUP BY ");
        sb.append(Constants.DATE_TIME_COL);
        groupByClause = sb.toString();
    }

    private void setOrderByClause() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append(" ORDER BY ");
        sb.append(Constants.DATE_TIME_COL);
        orderByClause = sb.toString();
    }

    private void setWhereClause() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append(" WHERE ");
        sb.append(dateClause);
        sb.append(" AND ");
        sb.append(" Upper(Period) = '").append(period.toUpperCase()).append("'");
        sb.append(" AND ");
        sb.append(" Upper(LEVEL_) = '").append(level.toUpperCase()).append("'");
        sb.append(" AND ");
        sb.append(networkElementColumnName);
        sb.append(" = '").append(networkElementID).append("'");
        whereClause = sb.toString();
    }

    private void setDateClause() throws Exception {
        String fromDate = jp.getValuesForObject("timeFrom", selectionStr).get(0);
        String toDate = jp.getValuesForObject("timeTo", selectionStr).get(0);
        StringBuilder sb = new StringBuilder();
        sb.append(Constants.DATE_TIME_COL);
        sb.append(" >=");
        sb.append(" to_date('").append(fromDate).append("','dd/mm/yyyy hh24:mi:ss')");
        sb.append(" AND ");
        sb.append(Constants.DATE_TIME_COL);
        sb.append(" <=");
        sb.append(" to_date('").append(toDate).append("','dd/mm/yyyy hh24:mi:ss')");
        dateClause = sb.toString();
    }

    private void setNetworkElementID(String neId) throws Exception {
        if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("2G")) {
            networkElementID = bscN.getGID(neId);
        } else if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("3G")) {
            networkElementID = rncN.getGID(neId);
        } else if (level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("2G")) {
            networkElementID = btsN.getGID(neId);
        } else if (level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("3G")) {
            networkElementID = wcellN.getGID(neId);
        } else {
            throw new Exception("Invalid network element ID: " + selectionStr);
        }
    }

    private void setTechnology() {
        technology = jp.getValuesForObject("technology", selectionStr).get(0);
    }

    private List<String> getNeElements() throws Exception {
        List<String> elementNames = null;
        if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("2G")) {
            elementNames = jp.getValuesForObject("bsc", selectionStr);
        } else if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("3G")) {
            elementNames = jp.getValuesForObject("rnc", selectionStr);
        } else if (level.equalsIgnoreCase("CELLS")) {
            elementNames = jp.getValuesForObject("cells", selectionStr);
        } else {
            System.out.println("Error setting element names");
            throw new Exception("Error setting element names");
        }
        return elementNames;
    }

    private void setLevel() throws Exception {
        String l;
        l = selectionStr.toUpperCase().contains("&BSC") ? "CONTROLLER" : "";
        if (l.isEmpty()) {
            l = selectionStr.toUpperCase().contains("&RNC") ? "CONTROLLER" : "";
        }
        if (l.isEmpty()) {
            l = selectionStr.toUpperCase().contains("&CELLS") ? "CELL" : "";
        }
        if (l.isEmpty()) {
            throw new Exception("Invalid level: " + selectionStr);
        }
        level = l;
    }

    private void setNetworkElementColumnName() throws Exception {
        if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("2G")) {
            networkElementColumnName = "BSC_GID";
        } else if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("3G")) {
            networkElementColumnName = "RNC_ID";
        } else if (level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("2G")) {
            networkElementColumnName = "BTS_GID";
        } else if (level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("3G")) {
            networkElementColumnName = "WCEL_ID";
        } else {
            throw new Exception("Invalid network element: " + selectionStr);
        }
    }

    private void setPeriod() throws Exception {
        period = jp.getValuesForObject("period", selectionStr).get(0);
    }

    private String makeQuery() {
        StringBuilder query = new StringBuilder();
        query.append(selectClause);
        query.append(fromClause);
        query.append(whereClause);
        query.append(groupByClause);
        query.append(orderByClause);
        return query.toString();
    }
}
