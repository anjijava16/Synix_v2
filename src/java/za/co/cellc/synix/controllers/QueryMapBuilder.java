/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

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
    protected StringBuilder selectionPrefix= new StringBuilder();
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
    protected FormulaDefPojo defPojo;
    protected HtmlInputProcessor htmlIp = HtmlInputProcessor.getInstance();
    protected HoursUtility hUtil = new HoursUtility();

    public QueryMapBuilder(FormulaDefPojo defPojo, boolean test) throws Exception {
        this.defPojo = defPojo;
        this.test = test;
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
        elementNameSingleton = ElementNameSingeltonFactory.create(technology, level, test);
    }

    protected void setNetworkElementID(String neId) throws Exception {
        if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("2G")) {
            networkElementID = elementNameSingleton.getGID(neId);
        } else if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("3G")) {
            networkElementID = elementNameSingleton.getGID(neId);
        } else if (level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("2G")) {
            networkElementID = elementNameSingleton.getGID(neId);
        } else if (level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("3G")) {
            networkElementID = elementNameSingleton.getGID(neId);
        } else {
            throw new Exception("Invalid network element ID: " + neId);
        }
    }

    private void setTechnology() {
        technology = htmlIp.getTechnology();
    }

    protected List<String> getNeElements() throws Exception {
        List<String> elementNames = htmlIp.getNetworkElements();
        return elementNames;
    }

    private void setLevel() throws Exception {
        level = htmlIp.getLevel();
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
            throw new Exception("Error setting network element. Level=" + level + " technology=" + technology);
        }
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
 private void setSelectionPrefix() {
        if (!htmlIp.isAggregated()) {
            selectionPrefix.append(networkElementColumnName);
            selectionPrefix.append(",");
            selectionPrefix.append("to_char(");
            selectionPrefix.append(Constants.DATE_TIME_COL);
            selectionPrefix.append(",'");
            selectionPrefix.append(Constants.ORACLE_DATE_FORMAT);
            selectionPrefix.append("')");
        } else if (htmlIp.isAggregated()) {
            selectionPrefix.append(Constants.DATE_TIME_COL);
        }
    }
    private void setGroupingParameter() {
        if (!htmlIp.isAggregated()) {
            groupingParamter.append(networkElementColumnName);
            groupingParamter.append(",");
            groupingParamter.append(Constants.DATE_TIME_COL);
        } else if (htmlIp.isAggregated()) {
            groupingParamter.append(Constants.DATE_TIME_COL);
        }
    }
}
