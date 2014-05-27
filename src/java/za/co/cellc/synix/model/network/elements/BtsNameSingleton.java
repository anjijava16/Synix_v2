/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

/**
 *
 * @author Pierre.Venter
 */
public class BtsNameSingleton  extends ElementNameSingleton {

    private static BtsNameSingleton instance;

    public static synchronized BtsNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct BTS_NAME,OBJ_GID from N2_CELLS_2G where BTS_NAME != 'null'";
        test = test_;
        if (instance == null) {
            instance = new BtsNameSingleton();
        }
        return instance;
    }

    private BtsNameSingleton() {
        loadLists();
    }
}
