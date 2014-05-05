/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.linechart;

import java.sql.Statement;
import za.co.cellc.synix.model.BscNameSingleton;
import za.co.cellc.synix.model.BtsNameSingleton;
import za.co.cellc.synix.model.RncNameSingleton;
import za.co.cellc.synix.model.WcellNameSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class DatabaseQueryObject {

    private String level;
    private String date_column_name;
    private String kpiName;
    private String chartTitle;
    private float target;
    private String query;
    private String tech;
    private String vendor;
    private Statement statement;

    public DatabaseQueryObject(String kpiName, String chartTitle, float target, String query, String date_column_name, String level, String tech, String vendor) {
        this.kpiName = kpiName;
        this.chartTitle = chartTitle;
        this.target = target;
        this.query = query;
        this.date_column_name = date_column_name;
        this.level = level;
        this.tech = tech;
        this.vendor = vendor;
    }

    public String getLevel() {
        return level;
    }

    public String getVendor() {
        return vendor;
    }

    public String getTech() {
        return tech;
    }

    public void setStatement(Statement statement) {
        this.statement = statement;
    }

    public Statement getStatement() {
        return statement;
    }

    public String getDate_column_name() {
        return date_column_name;
    }

    public String getKpiName() {
        return kpiName;
    }

    public String getQuery() {
        return query;
    }

    public float getTarget() {
        return target;
    }

    public String getChartTitle() {
        return chartTitle;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getGIDvalue(String value,boolean test) {
        if (level.equalsIgnoreCase("BSC")) {
            if (query.toUpperCase().contains("BSC_GID")) {
                return BscNameSingleton.getInstance(test).getGID(value);
            } else {
                return value;
            }
        } else if (level.equalsIgnoreCase("RNC")) {
            return RncNameSingleton.getInstance(test).getGID(value);
        } else if (level.equalsIgnoreCase("CELL") && tech.equalsIgnoreCase("2G")) {
            return BtsNameSingleton.getInstance(test).getGID(value);
        } else if (level.equalsIgnoreCase("CELL") && tech.equalsIgnoreCase("3G")) {
            return WcellNameSingleton.getInstance(test).getGID(value);
        }
        return "";
    }

    public String getGIDname(String name) {
        if (level.equalsIgnoreCase("BSC") && query.toUpperCase().contains("BSC_GID")) {
            return "BSC_GID";
        } else if (level.equalsIgnoreCase("RNC")) {
            return "RNC_ID";
        }
        return name;
    }
}
