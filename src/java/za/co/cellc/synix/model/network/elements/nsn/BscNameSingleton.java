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
public class BscNameSingleton extends ElementNameSingleton {

    private static BscNameSingleton instance;

    public static synchronized ElementNameSingleton getInstance(boolean test_) {
        QUERY = Constants.N2_CONTROLLERS_SQL;
        test = test_;
        if (instance == null || isExpired()) {
            instance = new BscNameSingleton();
            dateTimeCreated = new Date();
        } else {
//            System.out.println("getting instance");
        }
        return instance;
    }

    private BscNameSingleton() {
        super("BSC_GID");
        loadLists();
    }
}
