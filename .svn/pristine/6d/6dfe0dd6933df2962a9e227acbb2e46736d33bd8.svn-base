/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.linechart;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.persistance.Database;
//import za.co.cellc.synix.persistance.statements.Production_StatementInterface;

/**
 *
 * @author Pierre.Venter
 */
public class DailyData {

    private final String DAILY_DATE_COLUMN_NAME = "PERIOD_START_TIME";
    private final String QUERY_TABLE_NAME = "QUERIES_D";

    public List<DatabaseQueryObject> getDataObjects(List<String> tech, List<String> vendor, String level,boolean test) {
        List<DatabaseQueryObject> dataObjects = new ArrayList<>();
        try {
            Statement stmnt = Database.getInstance(test).getCon().createStatement();
            ResultSet rs = stmnt.executeQuery("SELECT KPI_NAME,Chart_Title,Target,Query_ FROM " + QUERY_TABLE_NAME
                    + " WHERE (" + listToWhereString("TECHNOLOGY", tech)
                    + ") AND (" + listToWhereString("VENDOR", vendor) + ")"
                    + " AND LEVEL_ = '" + level + "' ORDER BY PRIORITY");
            while (rs.next()) {
                dataObjects.add(new DatabaseQueryObject(rs.getString(1), rs.getString(2).replace("_", " "),
                        rs.getFloat(3), rs.getString(4), DAILY_DATE_COLUMN_NAME, level, tech.get(0), vendor.get(0)));
            }
            rs.close();
            stmnt.close();
            rs.close();
        } catch (SQLException ex) {
            Logger.getLogger(Chart.class.getName()).log(Level.SEVERE, null, ex);
        }
        return dataObjects;
    }

    private String listToWhereString(String columnName, List<String> lst) {
        String str = "";
        for (int i = 0; i < lst.size(); i++) {
            str += columnName + " = '" + lst.get(i) + "'";
            if (i < (lst.size() - 1)) {
                str += " OR ";
            }
        }
        return str;
    }
}
