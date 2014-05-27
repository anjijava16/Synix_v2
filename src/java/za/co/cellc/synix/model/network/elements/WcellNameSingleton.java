/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

/**
 *
 * @author Pierre.Venter
 */
public class WcellNameSingleton extends ElementNameSingleton {

    private static WcellNameSingleton instance;

    public static synchronized WcellNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct WCEL_NAME,CO_GID from N2_CELLS_3G where WCEL_NAME != 'null'";
        test = test_;
        if (instance == null) {
            instance = new WcellNameSingleton();
        }
        return instance;
    }

    private WcellNameSingleton() {
        loadLists();
    }
}
