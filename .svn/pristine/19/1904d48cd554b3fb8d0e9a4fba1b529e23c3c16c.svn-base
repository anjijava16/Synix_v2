/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.persistance;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Pierre.Venter
 */
public class DB_Structure {

    private String DB_STRUCT_Q = "select COLUMN_NAME from ALL_TAB_COLS where lower(TABLE_NAME)=lower('*tableName*')";
    private List<String> columnNames;
    private boolean test = false;

    public DB_Structure(List<String> columnNames,boolean test) {
        this.columnNames = columnNames;
        this.test=test;
        lcaseList(this.columnNames);
    }

    private void lcaseList(List<String> lst) {
        for (int i = 0; i < lst.size(); i++) {
            lst.set(i, lst.get(i).toLowerCase());
        }
    }

    public String getStringOfColumnNames(String tableName) {
        try {
            List<String> allColNames = getColumnNamesFromDB(tableName);
            List<String> filteredColNames = filterColumnNames(allColNames);
            return listToString(filteredColNames);
        } catch (SQLException ex) {
            Logger.getLogger(DB_Structure.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "*";
    }

    private List<String> filterColumnNames(List<String> allCols) {
        List<String> filteredC = new ArrayList<>();
        for (String c : columnNames) {
            if (allCols.contains(c)) {
                filteredC.add(c);
            }
        }
        return filteredC;
    }

    private String listToString(List<String> lst) {
        String str = "";
        for (String l : lst) {
            str += "," + l;
        }
        if (str.isEmpty()) {
            return str;
        }
        return str.substring(1);
    }

    private List<String> getColumnNamesFromDB(String t) throws SQLException {
        List<String> c = new ArrayList<>();
        Statement stmnt = Database.getInstance(test).getCon().createStatement();
        ResultSet rs = stmnt.executeQuery(DB_STRUCT_Q.replace("*tableName*", t));
        while (rs.next()) {
            c.add(rs.getString(1).toLowerCase());
        }
        rs.close();
        stmnt.close();
        return c;
    }
}
