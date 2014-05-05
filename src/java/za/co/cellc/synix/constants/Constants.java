/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.constants;

/**
 *
 * @author Pierre.Venter
 */
public class Constants {

      public static final String DB_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
     public static final String JAVA_DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
   public static final String JSP_DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
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
        "VIEW_CONTROLLER_MONTHLY"};

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
}
