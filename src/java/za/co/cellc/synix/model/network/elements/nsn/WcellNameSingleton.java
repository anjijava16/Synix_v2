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
public class WcellNameSingleton extends ElementNameSingleton {

    private static WcellNameSingleton instance;

    public static synchronized WcellNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct WCEL_NAME,CO_GID from N2_CELLS_3G where WCEL_NAME != 'null'";
        test = test_;
        if (instance == null || isExpired()) {
            instance = new WcellNameSingleton();
            dateTimeCreated = new Date();
        }
        return instance;
    }

    private WcellNameSingleton() {
        super("WCEL_ID");
        loadLists();
    }
}
