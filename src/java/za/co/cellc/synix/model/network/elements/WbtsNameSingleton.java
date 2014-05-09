/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

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
public class WbtsNameSingleton   extends ElementNameSingleton {

    private static WbtsNameSingleton instance;

    public static synchronized WbtsNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct WBTS_NAME,CO_GID from S_THREEG_CELLS where WBTS_NAME != 'null'";
        test = test_;
        if (instance == null) {
            instance = new WbtsNameSingleton();
        }
        return instance;
    }

    private WbtsNameSingleton() {
        loadLists();
    }
}
