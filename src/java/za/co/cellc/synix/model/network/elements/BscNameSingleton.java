/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

import java.util.Date;

/**
 *
 * @author Pierre.Venter
 */
public class BscNameSingleton extends ElementNameSingleton {

    private static BscNameSingleton instance;
//    private final String QUERY = "select distinct BSC_NAME,BSC_GID from S_TWOG_CELLS";

    public static synchronized ElementNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct BSC_NAME,BSC_GID from N2_CONTROLLERS_2G";
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
        loadLists();
    }
}
