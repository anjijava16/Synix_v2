/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements.nsn;

import java.util.Date;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;

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
}
