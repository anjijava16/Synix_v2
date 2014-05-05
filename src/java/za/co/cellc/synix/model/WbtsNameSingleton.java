/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.Connection;
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
public class WbtsNameSingleton {

    private static WbtsNameSingleton instance;
    private String QUERY = "select distinct WBTS_NAME,CO_GID from S_THREEG_CELLS where WBTS_NAME != 'null'";
//    private Connection con = Database.getInstance().getCon();
    private List<String> names = new ArrayList<>();
    private List<String> id = new ArrayList<>();
    private static boolean test = false;

    public static synchronized WbtsNameSingleton getInstance(boolean test_) {
        test = test_;
        if (instance == null) {
            instance = new WbtsNameSingleton();
        }
        return instance;
    }

    private WbtsNameSingleton() {
        loadLists();
    }

    public String getGID(String name) {
        return id.get(names.indexOf(name.toUpperCase()));
    }

    private void loadLists() {
        try {
            Connection con = Database.getInstance(test).getCon();
            Statement stmnt = con.createStatement();
            ResultSet rs = stmnt.executeQuery(QUERY);
            while (rs.next()) {
                names.add(rs.getString(1).toUpperCase());
                id.add(rs.getString(2));
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(WbtsNameSingleton.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
