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
public class BtsNameSingleton  extends ElementNameSingleton {

    private static BtsNameSingleton instance;

    public static synchronized BtsNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct BTS_NAME,OBJ_GID from S_TWOG_CELLS where BTS_NAME != 'null'";
        test = test_;
        if (instance == null) {
            instance = new BtsNameSingleton();
        }
        return instance;
    }

    private BtsNameSingleton() {
        loadLists();
    }
}