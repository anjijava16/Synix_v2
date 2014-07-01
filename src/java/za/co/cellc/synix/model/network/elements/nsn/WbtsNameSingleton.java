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
public class WbtsNameSingleton extends ElementNameSingleton {

    private static WbtsNameSingleton instance;

    public static synchronized WbtsNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct WBTS_NAME,CO_GID from N2_CELLS_3G where WBTS_NAME != 'null'";
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
}
