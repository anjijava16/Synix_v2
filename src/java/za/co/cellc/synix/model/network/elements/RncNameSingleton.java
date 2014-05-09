/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author Pierre.Venter
 */
public class RncNameSingleton extends ElementNameSingleton {

    private static RncNameSingleton instance;

    public static synchronized RncNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct RNC_NAME,RNC_GID from S_THREEG_CELLS where RNC_GID != 'null'";
        test = test_;
        if (instance == null) {
            instance = new RncNameSingleton();
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
