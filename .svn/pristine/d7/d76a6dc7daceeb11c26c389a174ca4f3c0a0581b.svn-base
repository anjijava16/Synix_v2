/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.barChart;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.formbuilders.charts.JSON_Parser;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author Pierre.Venter
 */
public class DrillDown {

    private final String DRILL_DOWN_QUERY = "SELECT QUERY_,TARGET "
            + "FROM QUERIES_DRILL_D "
            + "WHERE VENDOR = '*VENDOR*' "
            + "AND TECHNOLOGY = '*TECHNOLOGY*' "
            + "AND QUERY_NAME = '*QUERY_NAME*'";
    private StringBuilder sb;
    private float target;
    boolean test = false;

    public String getQuery(StringBuilder sb,boolean test) {
        this.test=test;
        this.sb = sb;
        return getQuery();
    }

    public float getTarget() {
        return target;
    }

    private String getQuery() {
        String q = "";
        String ddQ = getDrillDownQuery();
        try {
            Statement stmnt = Database.getInstance(test).getCon().createStatement();
            ResultSet rs = stmnt.executeQuery(ddQ);
            while (rs.next()) {
                q = rs.getString(1);
                target = rs.getFloat(2);
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(DrillDown.class.getName()).log(Level.SEVERE, null, ex);
        }
        return q;
    }

    private String getDrillDownQuery() {
        String q = DRILL_DOWN_QUERY.replace("*VENDOR*", getFromJSON("VENDOR").get(0));
        q = q.replace("*TECHNOLOGY*", getFromJSON("TECHNOLOGY").get(0));
        return q.replace("*QUERY_NAME*", getFromJSON("kpiName").get(0));
    }

    private List<String> getFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, sb.toString());
    }
}
