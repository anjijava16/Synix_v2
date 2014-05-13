/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class SingleEntryQueryMapBuilder extends QueryMapBuilder {

    private StringBuilder mapKey = new StringBuilder();

    public SingleEntryQueryMapBuilder(FormuladefPojo defPojo, boolean test) throws Exception {
        super(defPojo, test);
        this.defPojo = defPojo;
    }

    @Override
    public Map<String, String> getQueriesMap() throws Exception {
        System.out.println(hUtil.timeStamp() + " getQueriesMap start");
        Map<String, String> queriesMap = new HashMap<>();
        try {
            setSelectClause();
            setFromClause();
            setDateClause();
            setWhereClause();
            setGroupByClause();
            setOrderByClause();
            queriesMap.put(mapKey.toString(), makeQuery());
        } catch (Exception ex) {
            System.out.println("Error building queries: " + ex.getMessage());
            Logger.getLogger(SingleEntryQueryMapBuilder.class.getName()).log(Level.SEVERE, null, ex);
            throw new Exception("Error building queries: ", ex);
        }
        System.out.println(hUtil.timeStamp() + " map built");
        return queriesMap;
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

    private void setWhereClause() throws Exception {
        int counter = 0;
        List<String> networkElements = getNeElements();
        StringBuilder sb = new StringBuilder();
        sb.append(" WHERE ");
        sb.append(dateClause);
        sb.append(" AND ");
        sb.append(" Upper(Period) = '").append(period.toUpperCase()).append("'");
        sb.append(" AND ");
        sb.append(" Upper(LEVEL_) = '").append(level.toUpperCase()).append("'");
        sb.append(" AND (");
        mapKey.append("'");
        mapKey.append(Constants.DATE_TIME_COL);
        mapKey.append("'");
        for (String ne : networkElements) {
            if (counter > 0) {
                sb.append(" OR ");
            }
            setNetworkElementID(ne);//networkElementID
            setMapKey("'" + ne + "'");
            sb.append(networkElementColumnName);
            sb.append("='");
            sb.append(networkElementID);
            sb.append("'");
            counter++;
        }
        sb.append(" )");
        whereClause = sb.toString();
    }

    private void setMapKey(String v) throws Exception {
        mapKey.append(",");
        mapKey.append(v);
    }

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
