/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

/**
 *
 * @author Pierre.Venter
 */
public class WbtsNameSingleton   extends ElementNameSingleton {

    private static WbtsNameSingleton instance;

    public static synchronized WbtsNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct WBTS_NAME,CO_GID from N2_CELLS_3G where WBTS_NAME != 'null'";
        test = test_;
        if (instance == null) {
            instance = new WbtsNameSingleton();
        }
        return instance;
    }

    private WbtsNameSingleton() {
        loadLists();
    }
}
