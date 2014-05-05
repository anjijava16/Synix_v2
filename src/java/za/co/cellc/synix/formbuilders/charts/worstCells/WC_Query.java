/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.worstCells;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import za.co.cellc.synix.formbuilders.charts.dygraph.DygraphFormatting;
import za.co.cellc.synix.formbuilders.charts.query.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.formbuilders.charts.JSON_Parser;
import za.co.cellc.synix.formbuilders.charts.dygraph.GraphObject;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.persistance.SQL_Query;

/**
 *
 * @author z0006cpz
 */
public class WC_Query extends QueryObject {

    private String WORST_CELL_COLUMN_NAME = "BTS_GID";
    private String DATE_COLUMN_NAME = "DATE_TIME";
    private String ORDER_BY = "ORDER BY PERIOD_START_TIME,PERCENTAGE_OF_TOTAL_FAILURES DESC";
    private int CELLS_COUNT = 10;
    private String WORST_CELLS_QUERY = "SELECT 'bcf:'||BCF_INSTANCE||'-'||'bts:'||BTS_INSTANCE,BTS_GID "
            + "FROM S_2G_CELL_AT_H,T_TWOG_CELLS "
            + "WHERE BTS_GID = OBJ_GID "
            + "AND PERIOD_START_TIME = TO_DATE('*drillTime*','dd/mm/yyyy hh24:mi:ss') "
            //            + "AND PERIOD_START_TIME <= TO_DATE('*timeTo*','dd/mm/yyyy hh24:mi:ss') "
            + "AND *ELEMENT*_NAME = '*ELEMENT_VALUE*' "
            + "ORDER BY PERCENTAGE_OF_TOTAL_FAILURES DESC";
    private List<String> rnc = new ArrayList<>();
    private List<String> bsc = new ArrayList<>();
    private List<String> drillTimes = new ArrayList<>();
    private GraphObject gObject;
    boolean test = false;

    public WC_Query(StringBuilder JSON_sb,boolean test) {
        super(JSON_sb);
        this.test=test;
        initVars();
        parseJSON();
    }

    public String parse(String kpiName, String query) {
        String sql = null;
//        gObject = new GraphObject(ORDER_BY, DATE_COLUMN_NAME, query, kpiName);
//        WORST_CELLS_QUERY = upDateDrillTime(WORST_CELLS_QUERY);
//        initGraphObject();
//        DygraphFormatting formatting = new DygraphFormatting(gObject);
//        sql = formatting.parseSQL();
//        sql = upDateQuery_Date(sql);
        return sql;
    }

    private String upDateDrillTime(String query) {
        return query.replace("*drillTime*", drillTimes.get(0));
    }

    private void initGraphObject() {
        List<String> selectedValues = getSelectedValues();
        List<String> selectedNames = getObjectNames();
        gObject.setSelectedObjectValues(selectedValues);
        gObject.setSelectedObjectNames(selectedNames);
    }

    private List<String> getSelectedValues() {
        List<String> selectedValues = new ArrayList<>();
        if (!bsc.isEmpty()) {
            updateWorstCellsQueryWithElementName("BSC");
            selectedValues = getSelectedCellValues(bsc);
        } else if (!rnc.isEmpty()) {
            updateWorstCellsQueryWithElementName("RNC");
            selectedValues = getSelectedCellValues(rnc);
        }
        return selectedValues;
    }

    private void updateWorstCellsQueryWithElementName(String element) {
        WORST_CELLS_QUERY = WORST_CELLS_QUERY.replace("*ELEMENT*", element);
    }

    private List<String> getSelectedCellValues(List<String> ne) {
        List<String> combined = new ArrayList<>();
        for (int i = 0; i < ne.size(); i++) {
            String element = ne.get(i);
            List<String> cells = getWorstCells(element);
            for (String cell : cells) {
                combined.add(element + OBJECT_SPLITTER + cell);
            }
        }
        return combined;
    }

    private List<String> getWorstCells(String element) {
        List<String> cells = new ArrayList<>();
        SQL_Query sql_ = new SQL_Query();
        updateWorstCellsQueryWithElementValue(element);
        try {
            Statement stmnt = Database.getInstance(test).getCon().createStatement();
            String sql = sql_.limitQuery(WORST_CELLS_QUERY, CELLS_COUNT);
            ResultSet rs = stmnt.executeQuery(sql);
            while (rs.next()) {
                cells.add(rs.getString(2));
                gObject.insertIntoSelectedObjectDisplayNames(rs.getString(1));
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(WC_Query.class.getName()).log(Level.SEVERE, null, ex);
        }
        return cells;
    }

    private void updateWorstCellsQueryWithElementValue(String value) {
        WORST_CELLS_QUERY = WORST_CELLS_QUERY.replace("*ELEMENT_VALUE*", value);
    }

    private List<String> getObjectNames() {
        List<String> names = new ArrayList<>();
        String name = "";
        int count = 0;
        if (!bsc.isEmpty()) {
            name = "BSC_NAME" + OBJECT_SPLITTER + WORST_CELL_COLUMN_NAME;
            count = bsc.size();
        } else if (!rnc.isEmpty()) {
            name = "RNC_NAME" + OBJECT_SPLITTER + WORST_CELL_COLUMN_NAME;
            count = rnc.size();
        }
        for (int i = 0; i < count; i++) {
            names.add(name);
        }
        return names;
    }

    private void parseJSON() {
        bsc.addAll(extractFromJSON("bsc"));
        rnc.addAll(extractFromJSON("rnc"));
        drillTimes.addAll(extractFromJSON("drillTime"));
    }

    private List<String> extractFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, JSON_sb.toString());
    }

    private void initVars() {
        rnc.clear();
        bsc.clear();
    }
}
