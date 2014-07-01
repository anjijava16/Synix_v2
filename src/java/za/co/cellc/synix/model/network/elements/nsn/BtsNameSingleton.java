/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements.nsn;

import java.util.Date;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class BtsNameSingleton  extends ElementNameSingleton {

    private static BtsNameSingleton instance;

    public static synchronized BtsNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct BTS_NAME,OBJ_GID from N2_CELLS_2G where BTS_NAME != 'null'";
        test = test_;
        if (instance == null || isExpired()) {
            instance = new BtsNameSingleton();
            dateTimeCreated = new Date();
        }
        return instance;
    }

    private BtsNameSingleton() {
        super("BTS_GID");
        loadLists();
    }
}
