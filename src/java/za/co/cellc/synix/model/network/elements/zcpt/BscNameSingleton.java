/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements.zcpt;

import za.co.cellc.synix.model.network.elements.zjhb.*;
import java.util.Date;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class BscNameSingleton extends ElementNameSingleton {

    private static BscNameSingleton instance;
//    private final String QUERY = "select distinct BSC_NAME,BSC_GID from S_TWOG_CELLS";

    public static synchronized ElementNameSingleton getInstance(boolean test_) {
        QUERY = Constants.ZCPT2_CONTROLLERS_SQL;//"select distinct USERLABEL,BSSFUNCTIONID from ZJ_CONTROLLERS_2G order by USERLABEL";
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
        super("SUBNETWORKID");
        loadLists();
    }
}
