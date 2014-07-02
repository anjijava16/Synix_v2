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
public class BtsNameSingleton  extends ElementNameSingleton {

    private static BtsNameSingleton instance;

    public static synchronized BtsNameSingleton getInstance(boolean test_) {
        QUERY = Constants.N2_CELLS_SQL;
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
