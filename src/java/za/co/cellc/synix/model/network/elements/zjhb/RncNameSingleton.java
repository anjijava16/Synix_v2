/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements.zjhb;

import java.util.Date;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class RncNameSingleton extends ElementNameSingleton {

    private static RncNameSingleton instance;

    public static synchronized RncNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct USERLABEL,EMSRDNID from ZJ_CONTROLLERS_3G order by USERLABEL";
        test = test_;
        if (instance == null || isExpired()) {
            instance = new RncNameSingleton();
            dateTimeCreated = new Date();
        }
        return instance;
    }

    private RncNameSingleton() {
        super("RNCID");
        loadLists();
    }

    public String getRNC_Name(String rncID) {
        return names.get(id.indexOf(rncID));
    }
}
