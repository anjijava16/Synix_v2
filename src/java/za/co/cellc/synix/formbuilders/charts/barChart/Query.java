/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.barChart;

import java.util.List;
import za.co.cellc.synix.formbuilders.charts.JSON_Parser;
import za.co.cellc.synix.formbuilders.charts.query.QueryObject;

/**
 *
 * @author Pierre.Venter
 */
public class Query extends QueryObject {

    public Query(StringBuilder sb) {
        super(sb);
    }

    public String updateQuery(String query) {
        query = addControllerName(query);
        query = addBTS(query);
        query = addBCF(query);
        return upDateQuery_Date(query);
    }

    private String addBCF(String q) {
        int i = getOrderByIndex(q);
        String bts = getFromJSON("bcf").get(0);
        String columnName = "BCF_INSTANCE";
        if (is2G()) {
        } else {
            columnName = "WCELL_INSTANCE";
        }
        return q.substring(0, i) + " AND " + columnName + "='" + bts + "' " + q.substring(i);
    }

    private String addBTS(String q) {
        int i = getOrderByIndex(q);
        String bts = getFromJSON("bts").get(0);
        String columnName = "BTS_INSTANCE";
        if (is2G()) {
        } else {
            columnName = "WBTS_INSTANCE";
        }
        return q.substring(0, i) + " AND " + columnName + "='" + bts + "' " + q.substring(i);
    }

    private String addControllerName(String q) {
        int i = getOrderByIndex(q);
        String controller = getFromJSON("bsc").get(0);
        String columnName = "BSC_NAME";
        if (is2G()) {
        } else {
            controller = getFromJSON("rnc").get(0);
            columnName = "RNC_NAME";
        }
        return q.substring(0, i) + " AND " + columnName + "='" + controller + "' " + q.substring(i);
    }

    private int getOrderByIndex(String q) {
        int i = q.toUpperCase().indexOf("ORDER BY");
        if (i > -1) {
            return i;
        }
        return q.length();
    }

    private boolean is2G() {
        String t = getFromJSON("technology").get(0);
        return t.equalsIgnoreCase("2G");
    }

    private List<String> getFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, JSON_sb.toString());
    }
}
