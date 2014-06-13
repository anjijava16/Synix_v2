/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.Map;
import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class FormuladefPojo {

    private Map<String, String> map;
    private String chartTitle;
    private String formula;
    private String algorythm;
    private int priority;
    private double target;
    private String flatTableName;
    private boolean isEnabled;
    private String viewCellHourly;
    private String viewCellDaily;
    private String viewControllerHourly;
    private String viewControllerDaily;
    private String viewCellWeekly;
    private String viewCellMonthly;
    private String viewControllerWeekly;
    private String viewControllerMonthly;

    public FormuladefPojo(Map<String, String> map) {
        this.map = map;
    }

    public Map<String, String> getMap() {
        return map;
    }

    public String getChartTitle() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.CHART_TITLE]);
    }

    public String getFormula() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.FORMULA]);
    }

    public String getAlgorythm() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.ALGORYTHM]);
    }

    public int getPriority() throws Exception {
        String p = map.get(Constants.FORMULA_DEFS_FIELDS[Constants.PRIORITY]);
        return Integer.parseInt(p);
    }

    public double getTarget() {
        String t = map.get(Constants.FORMULA_DEFS_FIELDS[Constants.TARGET]);
        return Double.parseDouble(t);
    }

    public String getFlatTableName() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.FLAT_TABLE_NAME]);
    }

    public boolean isIsEnabled() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.IS_ENABLED]).equalsIgnoreCase("1");
    }

    public String getViewCellHourly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_CELL_HOURLY]);
    }

    public String getViewCellDaily() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_CELL_DAILY]);
    }

    public String getViewControllerHourly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_CONTROLLER_HOURLY]);
    }

    public String getViewControllerDaily() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_CONTROLLER_DAILY]);
    }

    public String getViewCellWeekly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_CELL_WEEKLY]);
    }

    public String getViewCellMonthly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_CELL_MONTHLY]);
    }

    public String getViewControllerWeekly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_CONTROLLER_WEEKLY]);
    }

    public String getViewControllerMonthly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_CONTROLLER_MONTHLY]);
    }

    public String getViewSiteMonthly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_SITE_MONTHLY]);
    }

    public String getViewSiteWeekly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_SITE_WEEKLY]);
    }

    public String getViewSiteDaily() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_SITE_DAILY]);
    }

    public String getViewSiteHourly() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.VIEW_SITE_HOURLY]);
    }

    public String getUnit() {
        return map.get(Constants.FORMULA_DEFS_FIELDS[Constants.UNIT]);
    }

    public String getValue(String key) {
        return map.get(key);
    }
}
