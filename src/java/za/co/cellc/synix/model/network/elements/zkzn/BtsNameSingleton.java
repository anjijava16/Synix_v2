/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements.zkzn;

import za.co.cellc.synix.model.network.elements.zjhb.*;
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
public class BtsNameSingleton extends ElementNameSingleton {

    private static BtsNameSingleton instance;

    public static synchronized BtsNameSingleton getInstance(boolean test_) {
        QUERY = Constants.ZKZN2_CELLS_SQL;//"select distinct LOCATIONNAME,BSSFUNCTIONID,BTSSITEMGRID,GSMCELLID from ZJ_CELLS_2G order by LOCATIONNAME";
        test = test_;
        if (instance == null || isExpired()) {
            instance = new BtsNameSingleton();
            dateTimeCreated = new Date();
        }
        return instance;
    }

    private BtsNameSingleton() {
        super("SUBNETWORKID" + Constants.MULTI_ID_DELIMITER + "SITEID" + Constants.MULTI_ID_DELIMITER + "BTSID");
        loadLists();
    }

    @Override
    protected final void loadLists() {
        try {
            Connection con = Database.getInstance(test).getCon();
            Statement stmnt = con.createStatement();
            ResultSet rs = stmnt.executeQuery(QUERY);
            while (rs.next()) {
                names.add(rs.getString(1).toUpperCase());
                id.add(rs.getString(2) + multiIdDelimiter + rs.getString(3) + multiIdDelimiter + rs.getString(4));
                addDistinctName(rs.getString(1).toUpperCase());
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(za.co.cellc.synix.model.network.elements.nsn.BscNameSingleton.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
