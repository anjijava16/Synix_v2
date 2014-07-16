/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements.nsn;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;
import static za.co.cellc.synix.model.network.elements.ElementNameSingleton.test;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author Pierre.Venter
 */
public class WbtsNameSingleton extends ElementNameSingleton {

    private static WbtsNameSingleton instance;

    public static synchronized WbtsNameSingleton getInstance(boolean test_) {
        QUERY = Constants.N3_CELLS_SQL;
        test = test_;
        if (instance == null || isExpired()) {
            instance = new WbtsNameSingleton();
            dateTimeCreated = new Date();
        }
        return instance;
    }

    private WbtsNameSingleton() {
        super("WCEL_ID");
        loadLists();
    }
    
    @Override
    protected void loadLists() {
        try {
            Connection con = Database.getInstance(test).getCon();
            Statement stmnt = con.createStatement();
            ResultSet rs = stmnt.executeQuery(QUERY);
            while (rs.next()) {
                names.add(rs.getString(1).toUpperCase());
                id.add(rs.getString(2));
                ctrls.add(rs.getString(3));
                addDistinctName(rs.getString(1).toUpperCase());
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(BscNameSingleton.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
