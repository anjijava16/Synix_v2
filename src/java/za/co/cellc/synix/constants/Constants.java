/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.constants;

/**
 *
 * @author Pierre.Venter and nm
 */
public class Constants {

    public static final String CHART_DECIMALFORMAT = "####################.##";
    public static final String DEFAULT_CHART_TYPE = "HIGH_CHART";
    public static final String TARGET_COLOR = "rgba(255, 0, 0, .7)";
    public static final String TARGET_LINE_STYLE = "longdash";
    public static final String HIGH_CHART_TARGET_COLOR = "rgba(255, 0, 0, .7)";
    public static final int LABEL_ADAPTOR = 1;
    public static final int AGGREGATION_ADAPTOR = 2;
    public static final int NON_AGGREGATION_ADAPTOR = 3;
    public static final int DRILL_DOWN_ADAPTOR = 4;
    public static final int AGGREGATION_MULTI_GROUP_ADAPTOR = 5;
    public static final int SINGLE_ENTRY_MAP_TYPE = 1;
    public static final int MULTI_ENTRY_MAP_TYPE = 2;
    public static final int AGGREGATED_GROUPING_MAP_TYPE = 3;
    public static final String ORACLE_DATE_FORMAT = "yyyy/MM/dd HH24:mi:ss";
    public static final String DB_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String JAVA_DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
    public static final String JSP_DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
    public static final String GRAPH_DATE_FORMAT = "yyyy/MM/dd HH:mm:ss";
    public static final String DB_CATALOG_NAME = "synix_p_resource";
    public static final String DATE_TIME_COL = "Period_Start_Time";
    public static final int CHART_TITLE = 0;
    public static final int FORMULA = 1;
    public static final int ALGORYTHM = 2;
    public static final int PRIORITY = 3;
    public static final int TARGET = 4;
    public static final int FLAT_TABLE_NAME = 5;
    public static final int IS_ENABLED = 6;
    public static final int VIEW_CELL_HOURLY = 7;
    public static final int VIEW_CELL_DAILY = 8;
    public static final int VIEW_CONTROLLER_HOURLY = 9;
    public static final int VIEW_CONTROLLER_DAILY = 10;
    public static final int VIEW_CELL_WEEKLY = 11;
    public static final int VIEW_CELL_MONTHLY = 12;
    public static final int VIEW_CONTROLLER_WEEKLY = 13;
    public static final int VIEW_CONTROLLER_MONTHLY = 14;
    public static final int VIEW_SITE_HOURLY = 15;
    public static final int VIEW_SITE_DAILY = 16;
    public static final int VIEW_SITE_WEEKLY = 17;
    public static final int VIEW_SITE_MONTHLY = 18;
    public static final int UNIT = 19;
    public static final String GROUP_DELIMITER = "~";

    public static String[] FORMULA_DEFS_FIELDS = {
        "CHART_TITLE",
        "FORMULA",
        "ALGORYTHM",
        "PRIORITY",
        "TARGET",
        "FLAT_TABLE_NAME",
        "IS_ENABLED",
        "VIEW_CELL_HOURLY",
        "VIEW_CELL_DAILY",
        "VIEW_CONTROLLER_HOURLY",
        "VIEW_CONTROLLER_DAILY",
        "VIEW_CELL_WEEKLY",
        "VIEW_CELL_MONTHLY",
        "VIEW_CONTROLLER_WEEKLY",
        "VIEW_CONTROLLER_MONTHLY", "VIEW_SITE_HOURLY", "VIEW_SITE_DAILY", "VIEW_SITE_WEEKLY", "VIEW_SITE_MONTHLY", "UNIT"};

    public enum ChartTypes {

        DYGRAPH("DYGRAPH"),
        HIGH_CHART("HIGH_CHART");
        private final String value;

        private ChartTypes(String value) {
            this.value = value;
        }

        public String value() {
            return value;
        }
    }

    public enum PlotterTypes {

        LINE("lineChartPlotter"),
        BAR_LINE("BarlineChartPlotter");
        private final String value;

        private PlotterTypes(String value) {
            this.value = value;
        }

        public String value() {
            return value;
        }
    }

    public enum Periods {

        HOURLY("Hourly"),
        DAILY("Daily");
        private final String value;

        private Periods(String value) {
            this.value = value;
        }

        public String value() {
            return value;
        }
    }

    public enum HighChartTypes {

        LINE("line"),
        AREA("area");
        private final String value;

        private HighChartTypes(String value) {
            this.value = value;
        }

        public String value() {
            return value;
        }
    }
}
