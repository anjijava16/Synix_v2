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
public class UnionizedSingleEntryQueryMapBuilder extends QueryMapBuilder {

    private StringBuilder mapKey = new StringBuilder();

    public UnionizedSingleEntryQueryMapBuilder(HtmlInputProcessor htmlIp, FormuladefPojo defPojo,int mapType, boolean test) throws Exception {
        super(htmlIp, defPojo,mapType, test);
        this.defPojo = defPojo;
    }

    @Override
    public Map<String, String> getQueriesMap() throws Exception {
        List<String> queries = new ArrayList<>();
        System.out.println(hUtil.timeStamp() + " getQueriesMap start");
        Map<String, String> queriesMap = new HashMap<>();
        try {
            List<String> neIds = getNeElementIds();
            for (String neId : neIds) {
                setSelectClause();
                setFromClause();
                setDateClause();
                setWhereClause(neId);
                setGroupByClause();
//                setOrderByClause();
                queries.add(makeQuery());
            }
            setMapKey();
            String q = makeUnionizedQuery(queries);
            queriesMap.put(mapKey.toString(), q);
            System.out.println("Query=> " + q);
        } catch (Exception ex) {
            System.out.println("Error building queries: " + ex.getMessage());
            Logger.getLogger(UnionizedSingleEntryQueryMapBuilder.class.getName()).log(Level.SEVERE, null, ex);
            throw new Exception("Error building queries: ", ex);
        }
//        System.out.println(hUtil.timeStamp() + " map built");
        return queriesMap;
    }

    @Override
    protected String makeQuery() {
        StringBuilder query = new StringBuilder();
        query.append(selectClause);
        query.append(fromClause);
        query.append(whereClause);
        query.append(groupByClause);
        return query.toString();
    }

    private String makeUnionizedQuery(List<String> queries) {
        int count = 0;
        StringBuilder sb = new StringBuilder("SELECT ObjectID,DateTime,VALUE FROM (");
        for (String q : queries) {
            if (count > 0) {
                sb.append(" UNION ALL ");
            }
            sb.append(q);
            count++;
        }
        sb.append(") ORDER BY ObjectID,DateTime");
        return sb.toString();
    }

    private void setSelectClause() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT ");
        sb.append(selectionPrefix);
        sb.append(",");
        sb.append(defPojo.getAlgorythm());
        sb.append(" AS VALUE");
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

    private void setWhereClause(String neId) throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append(" WHERE ");
        sb.append(dateClause);
        sb.append(" AND ");
        sb.append(" Period = '").append(period.toUpperCase()).append("'");
        sb.append(" AND ");
        sb.append(" LEVEL_ = '").append(level.toUpperCase()).append("'");
        sb.append(" AND ");
        setNetworkElementID(neId);
        sb.append(makeNetworkElementWhereClause());
        whereClause = sb.toString();
    }

    private String makeNetworkElementWhereClause() {
        StringBuilder clause = new StringBuilder("(");
        String cols[] = networkElementColumnName.split(elementNameSingleton.getMultiIdDelimiter());
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
        clause.append(")");
        return clause.toString();
    }

    private void setMapKey() throws Exception {
        List<String> networkElements = getNeElements();
        mapKey.append("'");
        mapKey.append(Constants.DATE_TIME_COL);
        mapKey.append("'");
        if (htmlIp.isAggregated()) {
            mapKey.append(",'Grouping'");
        } else {
            for (String ne : networkElements) {
                mapKey.append(",'");
                mapKey.append(ne);
                mapKey.append("'");
            }
        }
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
