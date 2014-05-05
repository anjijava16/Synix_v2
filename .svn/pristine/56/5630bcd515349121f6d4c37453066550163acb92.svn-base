/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.barChart;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author Pierre.Venter
 */
public class QueryParser {

    private String DELIMITER = "<>";
    private List<String> values = new ArrayList<>();
    private List<String> names = new ArrayList<>();
    private List<String> locations = new ArrayList<>();
    boolean test = false;

    public void parseQuery(String q,boolean test) {
        this.test=test;
        parse(q);
    }

    public List<String> getNames() {
        return names;
    }

    public List<String> getValues() {
        return values;
    }

    public List<String> getLocations() {
        return locations;
    }

    private void parse(String q) {
        try {
            try (Statement stmnt = Database.getInstance(test).getCon().createStatement();
                    ResultSet rs = stmnt.executeQuery(q)) {
                while (rs.next()) {
                    String v = "";
                    String l = "";
                    if (names.isEmpty()) {
                        getNames(rs);
                    }
                    for (int i = 0; i < rs.getMetaData().getColumnCount(); i++) {
                        if (isDataIndex(i)) {
                            v += DELIMITER + rs.getString(i + 1);
                        } else {
                            l += DELIMITER + rs.getString(i + 1);
                        }
                    }
                    values.add(v);
                    locations.add(l);
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(QueryParser.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void getNames(ResultSet rs) throws SQLException {
        for (int i = 0; i < rs.getMetaData().getColumnCount(); i++) {
            if (isDataIndex(i)) {
                names.add(rs.getMetaData().getColumnName(i + 1));
            }
        }
    }

    private boolean isDataIndex(int i) {
        return i % 2 == 0;
    }
}
