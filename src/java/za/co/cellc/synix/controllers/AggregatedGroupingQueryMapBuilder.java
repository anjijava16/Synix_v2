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
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class AggregatedGroupingQueryMapBuilder extends QueryMapBuilder {

    public AggregatedGroupingQueryMapBuilder(HtmlInputProcessor htmlIp, FormuladefPojo defPojo, int mapType, boolean test) throws Exception {
        super(htmlIp, defPojo, mapType, test);
        this.defPojo = defPojo;
    }

    @Override
    public Map<String, String> getQueriesMap() throws Exception {
        System.out.println(hUtil.timeStamp() + " getQueriesMap start");
        Map<String, String> queriesMap = new HashMap<>();
        try {
            List<String> groupingNumbers = getGroupingNumbers();
            for (String groupingNumber : groupingNumbers) {
                List<String> elementNames = getElementIdsFromGroup(groupingNumber);
                setSelectClause();
                setFromClause();
                setDateClause();
                setWhereClause(elementNames);
                setGroupByClause();
                setOrderByClause();
                String mapKey = getMapKey(groupingNumber);
                queriesMap.put(mapKey.toString(), makeQuery());
            }

        } catch (Exception ex) {
            System.out.println("Error building queries: " + ex.getMessage());
            Logger.getLogger(AggregatedGroupingQueryMapBuilder.class.getName()).log(Level.SEVERE, null, ex);
            throw new Exception("Error building queries: ", ex);
        }
        System.out.println(hUtil.timeStamp() + " map built");
        return queriesMap;
    }

    private String getMapKey(String groupingNumber) {
        StringBuilder mapKey = new StringBuilder();
        mapKey.append("'");
        mapKey.append(Constants.DATE_TIME_COL);
        mapKey.append("','Group_").append(groupingNumber).append("'");
        return mapKey.toString();
    }

//    private List<String> getElementNamesFromGroup(String groupId) {
//        List<String> groupMembers = new ArrayList<>();
//        List<String> names = htmlIp.getNetworkElements();
//        for (String n : names) {
//            if (n.endsWith("~" + groupId)) {
//                String s = stripGroupingHyphen(n);
//                groupMembers.add(s);
//            }
//        }
//        return groupMembers;
//    }
    private List<String> getElementIdsFromGroup(String groupId) {
        List<String> groupMembers = new ArrayList<>();
        List<String> elementIds = new ArrayList<>();
        List<String> names = htmlIp.getNetworkElements();
        for (String n : names) {
            if (n.endsWith("~" + groupId)) {
                String s = stripGroupingHyphen(n);
                groupMembers.add(s);
            }
        }
        for (String ne : groupMembers) {
            elementIds.addAll(elementNameSingleton.getGids(ne));
        }
        return elementIds;
    }

    private String stripGroupingHyphen(String s) {
        String[] ar = s.split("~");
        return ar[0];
    }

    private List<String> getGroupingNumbers() {
        List<String> groupNumbers = new ArrayList<>();
        List<String> names = htmlIp.getNetworkElements();
        for (String n : names) {
            String groupingNumber = getGroupNumberFromElement(n);
            if (!groupNumbers.contains(groupingNumber)) {
                groupNumbers.add(groupingNumber);
            }
        }
        return groupNumbers;
    }

    private String getGroupNumberFromElement(String element) {
        String ar[] = element.split("~");
        return ar[ar.length - 1];
    }

    private void setSelectClause() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT ");
        sb.append(selectionPrefix);
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
        sb.append(groupingParamter);
        groupByClause = sb.toString();
    }

    private void setOrderByClause() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append(" ORDER BY ");
        sb.append(groupingParamter);
        orderByClause = sb.toString();
    }

    private void setWhereClause(List<String> elementNames) throws Exception {
        int counter = 0;
//        List<String> networkElements = getNeElements();
        StringBuilder sb = new StringBuilder();
        sb.append(" WHERE ");
        sb.append(dateClause);
        sb.append(" AND ");
        sb.append(" Period = '").append(period.toUpperCase()).append("'");
        sb.append(" AND ");
        sb.append(" LEVEL_ = '").append(level.toUpperCase()).append("'");
        sb.append(" AND (");
        for (String ne : elementNames) {
            if (counter > 0) {
                sb.append(" OR ");
            }
            setNetworkElementID(ne);//networkElementID
            sb.append(makeNetworkElementWhereClause());
//            setMapKey(counter, "'" + ne + "'");
//            sb.append(networkElementColumnName);
//            sb.append("='");
//            sb.append(networkElementID);
//            sb.append("'");
            counter++;
        }
        sb.append(" )");
        whereClause = sb.toString();
    }

    private String makeNetworkElementWhereClause() {
        StringBuilder clause = new StringBuilder("(");
        String cols[] = networkElementColumnName.split(elementNameSingleton.getMultiIdDelimiter());
//        for (String ne : networkElementID) {
        String ids[] = networkElementID.split(elementNameSingleton.getMultiIdDelimiter());
        for (int i = 0; i < cols.length; i++) {
            clause.append(cols[i]);
            clause.append("='");
            clause.append(ids[i]);
            clause.append("'");
            if (i < cols.length - 1) {
                clause.append(" AND ");
            }
        }
//        }
        clause.append(")");
        return clause.toString();
    }

//    private void setMapKey(int c, String v) throws Exception {
//        if (c > 0) {
//            mapKey.append(",");
//        }
//        mapKey.append(v);
//    }
    private void setDateClause() throws Exception {
        String fromDate = htmlIp.getFromDate();
        String toDate = htmlIp.getToDate();
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
}
