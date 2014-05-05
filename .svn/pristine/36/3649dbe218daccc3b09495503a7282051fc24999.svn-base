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
public class BtsNameSingleton {

    private static BtsNameSingleton instance;
    private String QUERY = "select distinct BTS_NAME,OBJ_GID from S_TWOG_CELLS where BTS_NAME != 'null'";
//    private Connection con = Database.getInstance().getCon();
    private List<String> names = new ArrayList<>();
    private List<String> id = new ArrayList<>();
    private static boolean test = false;

    public static synchronized BtsNameSingleton getInstance(boolean test_) {
        test = test_;
        if (instance == null) {
            instance = new BtsNameSingleton();
        }
        return instance;
    }

    private BtsNameSingleton() {
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
            Logger.getLogger(BtsNameSingleton.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
