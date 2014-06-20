/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

import java.util.Date;
import static za.co.cellc.synix.model.network.elements.ElementNameSingleton.dateTimeCreated;

/**
 *
 * @author Pierre.Venter
 */
public class RncNameSingleton extends ElementNameSingleton {

    private static RncNameSingleton instance;

    public static synchronized RncNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct RNC_NAME,RNC_GID from N2_CONTROLLERS_3G where RNC_GID != 'null'";
        test = test_;
        if (instance == null || isExpired()) {
            instance = new RncNameSingleton();
            dateTimeCreated = new Date();
        }
        return instance;
    }

    private RncNameSingleton() {
        loadLists();
    }

    public String getRNC_Name(String rncID) {
        return names.get(id.indexOf(rncID));
    }
}
