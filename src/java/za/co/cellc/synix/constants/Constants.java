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

    public static final String MULTI_ID_DELIMITER = "!";
    public static final int MAX_CELLS_LINES = 17;
    public static final int MAX_CELLS_ITEMS = 250;
    public static final int HOURS = 60;
    public static final int ELEMENT_NAMES_EXPIRY_HOURS = 2 * HOURS;
    public static final int TEST_ELEMENT_NAMES_EXPIRY_MINUTES = 1;
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
    public static final int UNIONIZED_SINGLE_ENTRY_MAP_TYPE = 4;
    public static final int ZTE_SINGLE_ENTRY_MAP_TYPE = 5;
    public static final String ORACLE_DATE_FORMAT = "yyyy/MM/dd HH24:mi:ss";
    public static final String DB_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String JAVA_DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
    public static final String JSP_DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
    public static final String GRAPH_DATE_FORMAT = "yyyy/MM/dd HH:mm:ss";
    public static final String DB_CATALOG_NAME = "synix_p_resource";
    public static final String DATE_TIME_COL = "Period_Start_Time";
    public final static String CELL = "Cell";
    public final static String CONTROLLER = "Controller";
    public final static String HOURLY = "Hourly";
    public final static String DAILY = "Daily";
    public final static String WEEKLY = "Weekly";
    public final static String MONTHLY = "Monthly";
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
    public static final String N2_CELLS_SQL = "select BTS_NAME,OBJ_GID,BSC_NAME from N2_CELLS_2G where BTS_NAME != 'null' order by BTS_NAME";
    public static final String N2_CONTROLLERS_SQL = "select BSC_NAME,BSC_GID from N2_CONTROLLERS_2G order by BSC_NAME";
    public static final String N3_CELLS_SQL = "select WCEL_NAME,CO_GID,RNC_NAME from N2_CELLS_3G where WCEL_NAME != 'null' order by WCEL_NAME";
    public static final String N3_CONTROLLERS_SQL = "select RNC_NAME,RNC_GID from N2_CONTROLLERS_3G where RNC_GID != 'null' order by RNC_NAME";
    public static final String ZJHB2_CONTROLLERS_SQL = "select USERLABEL,BSSFUNCTIONID from ZJ_CONTROLLERS_2G order by USERLABEL";
    public static final String ZJHB3_CONTROLLERS_SQL = "select USERLABEL,EMSRDNID from ZJ_CONTROLLERS_3G order by USERLABEL";
    public static final String ZJHB2_CELLS_SQL = "SELECT DECODE(LOCATIONNAME,null,DISPLAYNAME,LOCATIONNAME) ln,ZJ_CELLS_2G.BSSFUNCTIONID,ZJ_CELLS_2G.BTSSITEMGRID,ZJ_CELLS_2G.GSMCELLID,ZJ_CONTROLLERS_2G.USERLABEL FROM ZJ_CELLS_2G\n"
            + "JOIN ZJ_CONTROLLERS_2G ON (ZJ_CONTROLLERS_2G.BSSFUNCTIONID=ZJ_CELLS_2G.BSSFUNCTIONID) \n"
            + "order by ln";
    public static final String ZJHB3_CELLS_SQL = "SELECT ZJ_CELLS_3G.USERLABEL,ZJ_CELLS_3G.OMMNEID,ZJ_CELLS_3G.NODEBNO,ZJ_CELLS_3G.CID,ZJ_CONTROLLERS_3G.USERLABEL FROM ZJ_CELLS_3G \n"
            + "join ZJ_CONTROLLERS_3G on (ZJ_CONTROLLERS_3G.EMSRDNID=ZJ_CELLS_3G.OMMNEID) ORDER BY ZJ_CELLS_3G.USERLABEL";
    public static final String ZBFN2_CONTROLLERS_SQL = "select USERLABEL,BSSFUNCTIONID from ZB_CONTROLLERS_2G order by USERLABEL";
    public static final String ZBFN3_CONTROLLERS_SQL = "select USERLABEL,EMSRDNID from ZB_CONTROLLERS_3G order by USERLABEL";
    public static final String ZBFN2_CELLS_SQL = "SELECT DECODE(LOCATIONNAME,null,DISPLAYNAME,LOCATIONNAME) ln,ZB_CELLS_2G.BSSFUNCTIONID,ZB_CELLS_2G.BTSSITEMGRID,ZB_CELLS_2G.GSMCELLID,ZB_CONTROLLERS_2G.USERLABEL FROM ZB_CELLS_2G\n"
            + "JOIN ZB_CONTROLLERS_2G ON (ZB_CONTROLLERS_2G.BSSFUNCTIONID=ZB_CELLS_2G.BSSFUNCTIONID) \n"
            + "order by ln";
    public static final String ZBFN3_CELLS_SQL = "SELECT ZB_CELLS_3G.USERLABEL,ZB_CELLS_3G.OMMNEID,ZB_CELLS_3G.NODEBNO,ZB_CELLS_3G.CID,ZB_CONTROLLERS_3G.USERLABEL FROM ZB_CELLS_3G \n"
            + "join ZB_CONTROLLERS_3G on (ZB_CONTROLLERS_3G.EMSRDNID=ZB_CELLS_3G.OMMNEID) ORDER BY ZB_CELLS_3G.USERLABEL";
    public static final String ZKZN2_CONTROLLERS_SQL = "select USERLABEL,BSSFUNCTIONID from ZK_CONTROLLERS_2G order by USERLABEL";
    public static final String ZKZN3_CONTROLLERS_SQL = "select USERLABEL,EMSRDNID from ZK_CONTROLLERS_3G order by USERLABEL";
    public static final String ZKZN2_CELLS_SQL = "SELECT DECODE(LOCATIONNAME,null,DISPLAYNAME,LOCATIONNAME) ln,ZK_CELLS_2G.BSSFUNCTIONID,ZK_CELLS_2G.BTSSITEMGRID,ZK_CELLS_2G.GSMCELLID,ZK_CONTROLLERS_2G.USERLABEL FROM ZK_CELLS_2G\n"
            + "JOIN ZK_CONTROLLERS_2G ON (ZK_CONTROLLERS_2G.BSSFUNCTIONID=ZK_CELLS_2G.BSSFUNCTIONID) \n"
            + "order by ln";
    public static final String ZKZN3_CELLS_SQL = "SELECT ZK_CELLS_3G.USERLABEL,ZK_CELLS_3G.OMMNEID,ZK_CELLS_3G.NODEBNO,ZK_CELLS_3G.CID,ZK_CONTROLLERS_3G.USERLABEL FROM ZK_CELLS_3G \n"
            + "join ZK_CONTROLLERS_3G on (ZK_CONTROLLERS_3G.EMSRDNID=ZK_CELLS_3G.OMMNEID) ORDER BY ZK_CELLS_3G.USERLABEL";
    public static final String ZCPT2_CONTROLLERS_SQL = "select USERLABEL,BSSFUNCTIONID from ZC_CONTROLLERS_2G order by USERLABEL";
    public static final String ZCPT3_CONTROLLERS_SQL = "select USERLABEL,EMSRDNID from ZC_CONTROLLERS_3G order by USERLABEL";
    public static final String ZCPT2_CELLS_SQL = "SELECT DECODE(LOCATIONNAME,null,DISPLAYNAME,LOCATIONNAME) ln,ZC_CELLS_2G.BSSFUNCTIONID,ZC_CELLS_2G.BTSSITEMGRID,ZC_CELLS_2G.GSMCELLID,ZC_CONTROLLERS_2G.USERLABEL FROM ZC_CELLS_2G\n"
            + "JOIN ZC_CONTROLLERS_2G ON (ZC_CONTROLLERS_2G.BSSFUNCTIONID=ZC_CELLS_2G.BSSFUNCTIONID) \n"
            + "order by ln";
    public static final String ZCPT3_CELLS_SQL = "SELECT ZC_CELLS_3G.USERLABEL,ZC_CELLS_3G.OMMNEID,ZC_CELLS_3G.NODEBNO,ZC_CELLS_3G.CID,ZC_CONTROLLERS_3G.USERLABEL FROM ZC_CELLS_3G \n"
            + "join ZC_CONTROLLERS_3G on (ZC_CONTROLLERS_3G.EMSRDNID=ZC_CELLS_3G.OMMNEID) ORDER BY ZC_CELLS_3G.USERLABEL";
    public static final String TECHNOLOGY_2G = "2G";
    public static final String TECHNOLOGY_3G = "3G";

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

    public enum Vendors {

        NSN("NSN"),
        ZJHB("ZJHB"),
        ZBFN("ZBFN"),
        ZKZN("ZKZN"),
        ZCPT("ZCPT");
        private final String value;

        private Vendors(String value) {
            this.value = value;
        }

        public String value() {
            return value;
        }
    }

}
