/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.persistance.Database;
//import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class ElementNameSingleton {

    protected static Date dateTimeCreated;
    private static ElementNameSingleton instance;
    protected static String QUERY = null;
    protected List<String> names = new ArrayList<>();
    protected List<String> id = new ArrayList<>();
    public static boolean test = false;
//    private static HtmlInputProcessor htmlIp;

    public static ElementNameSingleton getInstance(boolean test_) {
        return null;
    }

    public String getGID(String bsc_name) {
        return id.get(names.indexOf(bsc_name.toUpperCase()));
    }

    public String getName(String id_) {
        return names.get(id.indexOf(id_));
    }

    protected void loadLists() {
        try {
            Connection con = Database.getInstance(test).getCon();
            Statement stmnt = con.createStatement();
            ResultSet rs = stmnt.executeQuery(QUERY);
            while (rs.next()) {
                names.add(rs.getString(1).toUpperCase());
                id.add(rs.getString(2));
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(BscNameSingleton.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    protected static boolean isExpired() {
        Calendar calendar = Calendar.getInstance();
        if (test) {
            calendar.add(Calendar.MINUTE, -Constants.TEST_ELEMENT_NAMES_EXPIRY_MINUTES);
        } else {
            calendar.add(Calendar.MINUTE, -Constants.ELEMENT_NAMES_EXPIRY_HOURS);
        }
        Date date = calendar.getTime();
        return date.after(dateTimeCreated);
    }
}
