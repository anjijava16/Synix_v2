/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements.zjhb;

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
public class WcellNameSingleton extends ElementNameSingleton {

    private static WcellNameSingleton instance;

    public static synchronized WcellNameSingleton getInstance(boolean test_) {
        QUERY = Constants.ZJHB3_CELLS_SQL;//"select distinct USERLABEL,OMMNEID,NODEBNO,CID from ZJ_CELLS_3G order by USERLABEL";
        test = test_;
        if (instance == null || isExpired()) {
            instance = new WcellNameSingleton();
            dateTimeCreated = new Date();
        }
        return instance;
    }

    private WcellNameSingleton() {
        super("RNCID" + Constants.MULTI_ID_DELIMITER + "NODEBID" + Constants.MULTI_ID_DELIMITER + "CELLID");
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
