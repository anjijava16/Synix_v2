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
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class MultiEntryQueryMapBuilder extends QueryMapBuilder {

    public MultiEntryQueryMapBuilder(HtmlInputProcessor htmlIp,FormuladefPojo defPojo, boolean test) throws Exception {
        super(htmlIp,defPojo, test);
        this.defPojo = defPojo;
    }

    @Override
    public Map<String, String> getQueriesMap() throws Exception {
        System.out.println(hUtil.timeStamp() + " getQueriesMap start");
        Map<String, String> queriesMap = new HashMap<>();
        try {
//            setTechnology();
//            setLevel();
//            setPeriod();
//            setNetworkElementColumnName();
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
            Logger.getLogger(MultiEntryQueryMapBuilder.class.getName()).log(Level.SEVERE, null, ex);
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
        sb.append(" Period = '").append(period.toUpperCase()).append("'");
        sb.append(" AND ");
        sb.append(" LEVEL_ = '").append(level.toUpperCase()).append("'");
        sb.append(" AND ");
        sb.append(networkElementColumnName);
        sb.append(" = '").append(networkElementID).append("'");
        whereClause = sb.toString();
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
