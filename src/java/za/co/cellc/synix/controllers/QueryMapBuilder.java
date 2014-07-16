/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.network.elements.ElementNameSingeltonFactory;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;
import za.co.cellc.synix.utilities.HoursUtility;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class QueryMapBuilder {

    protected StringBuilder groupingParamter = new StringBuilder();
    protected StringBuilder selectionPrefix = new StringBuilder();
    protected boolean test;
    protected ElementNameSingleton elementNameSingleton;
    protected String dateClause;
    protected String selectClause;
    protected String fromClause;
    protected String whereClause;
    protected String groupByClause;
    protected String orderByClause;
    protected String level;
    protected String period;
    protected String networkElementColumnName;
    protected String networkElementID;
    protected String technology;
    protected FormuladefPojo defPojo;
    protected HtmlInputProcessor htmlIp;
    protected HoursUtility hUtil;

    public QueryMapBuilder(HtmlInputProcessor htmlIp, FormuladefPojo defPojo, boolean test) throws Exception {
        this.htmlIp = htmlIp;
        this.defPojo = defPojo;
        this.test = test;
        hUtil = new HoursUtility(htmlIp);
        System.out.println(hUtil.timeStamp() + " QueryBuilder singletons start");
        setTechnology();
        setLevel();
        setPeriod();
        setElementNameSingleton();
        setNetworkElementColumnName();
        setSelectionPrefix();
        setGroupingParameter();
        System.out.println(hUtil.timeStamp() + " QueryBuilder singletons end");
    }

    public Map<String, String> getQueriesMap() throws Exception {
        return null;
    }

    private void setElementNameSingleton() throws Exception {
        elementNameSingleton = ElementNameSingeltonFactory.create(htmlIp.getVendor(), technology, level, test);
    }

    protected void setNetworkElementID(String neId) throws Exception {
        networkElementID = neId;
    }

    private void setTechnology() {
        technology = htmlIp.getTechnology();
    }

    protected List<String> getNeElements() throws Exception {
        List<String> elementNames = htmlIp.getNetworkElements();
        if (htmlIp.isAggregated()) {
            for (int i = 0; i < elementNames.size(); i++) {
                String updatedEn = removeGroupingFromAggregatedNe(elementNames.get(i));
                elementNames.set(i, updatedEn);
            }
        }
        return elementNames;
    }

    protected List<String> getNeElementIds() throws Exception {
        List<String> elementNames = htmlIp.getNetworkElements();
        List<String> elementIds = new ArrayList<>();
        if (htmlIp.isAggregated()) {
            for (int i = 0; i < elementNames.size(); i++) {
                String updatedEn = removeGroupingFromAggregatedNe(elementNames.get(i));
                elementNames.set(i, updatedEn);
            }
        }
        for (String ne : elementNames) {
            elementIds.addAll(elementNameSingleton.getGids(ne));
        }
        return elementIds;
    }

    private String removeGroupingFromAggregatedNe(String neId) {
        if (neId.contains("~")) {
            return neId.substring(0, neId.indexOf("~"));
        }
        return neId;
    }

    private void setLevel() throws Exception {
        level = htmlIp.getLevel();
    }

    private void setNetworkElementColumnName() throws Exception {
        networkElementColumnName = elementNameSingleton.getElementColumnNames();
    }

    private void setPeriod() throws Exception {
        period = htmlIp.getPeriod();
    }

    protected String makeQuery() {
        StringBuilder query = new StringBuilder();
        query.append(selectClause);
        query.append(fromClause);
        query.append(whereClause);
        query.append(groupByClause);
        query.append(orderByClause);
        return query.toString();
    }

//    private void setSelectionPrefix() {
//        if (!htmlIp.isAggregated()) {
//            selectionPrefix.append(concatMultiIdDelimiter(networkElementColumnName));
//            selectionPrefix.append(",");
//        }
//        selectionPrefix.append("to_char(");
//        selectionPrefix.append(Constants.DATE_TIME_COL);
//        selectionPrefix.append(",'");
//        selectionPrefix.append(Constants.ORACLE_DATE_FORMAT);
//        selectionPrefix.append("')");
//    }
//    private void setUnionizedSelectionPrefix() {
    private void setSelectionPrefix() {
        if (!htmlIp.isAggregated()) {
            selectionPrefix.append(concatMultiIdDelimiter(networkElementColumnName));
            selectionPrefix.append(" AS ObjectID");
            selectionPrefix.append(",");
        }
        selectionPrefix.append("to_char(");
        selectionPrefix.append(Constants.DATE_TIME_COL);
        selectionPrefix.append(",'");
        selectionPrefix.append(Constants.ORACLE_DATE_FORMAT);
        selectionPrefix.append("')");
        selectionPrefix.append(" AS DateTime");
    }

    private String concatMultiIdDelimiter(String s) {
        String del = elementNameSingleton.getMultiIdDelimiter();
        return s.replace(del, "||'" + elementNameSingleton.getMultiIdDelimiter() + "'||");
    }

    private String replaceMultiIdDelimiter(String s) {
        String del = elementNameSingleton.getMultiIdDelimiter();
        return s.replace(del, ",");
    }

    private void setGroupingParameter() {
        if (!htmlIp.isAggregated()) {
            groupingParamter.append(replaceMultiIdDelimiter(networkElementColumnName));
            groupingParamter.append(",");
            groupingParamter.append(Constants.DATE_TIME_COL);
        } else if (htmlIp.isAggregated()) {
            groupingParamter.append(Constants.DATE_TIME_COL);
        }
    }
}
