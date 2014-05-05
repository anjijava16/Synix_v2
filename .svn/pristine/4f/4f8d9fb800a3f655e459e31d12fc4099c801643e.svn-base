/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author z0006cpz
 */
public class Dates {

    private String DATE_COLUMN_NAME = "PERIOD_START_TIME";
    private List<String> fromDate;
    private StringBuilder JSON_sb;
    private List<String> toDate;

    public Dates(StringBuilder JSON_sb) {
        this.JSON_sb = JSON_sb;
        setFromDate();
        setToDate();
    }

    private void setFromDate() {
        fromDate = extractFromJSON("timeFrom");
    }

    private void setToDate() {
        toDate = extractFromJSON("timeTo");
    }

    public String getFromDate() {
        return fromDate.get(0);
    }

    public String getToDate() {
        return toDate.get(0);
    }

    public String getDateClause() {
        String result;
        String from = "'" + fromDate.get(0) + "'";
        String to = "'" + toDate.get(0) + "'";
        if (from.isEmpty() && to.isEmpty()) {
            result = "";
        } else if (from.isEmpty() && !to.isEmpty()) {
            result = DATE_COLUMN_NAME + "<=" + to;
        } else if (!from.isEmpty() && to.isEmpty()) {
            result = DATE_COLUMN_NAME + ">=" + from;
        } else {
            result = DATE_COLUMN_NAME + ">=" + from + " AND " + DATE_COLUMN_NAME + "<=" + to;
        }
        return result;
    }

    private List<String> extractFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, JSON_sb.toString());
    }
}
