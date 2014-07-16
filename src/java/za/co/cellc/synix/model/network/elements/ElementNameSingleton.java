/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

import za.co.cellc.synix.model.network.elements.nsn.BscNameSingleton;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
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

    private String elementColumnNames;
    protected String multiIdDelimiter = "!";
    protected static Date dateTimeCreated;
    private static ElementNameSingleton instance;
    protected static String QUERY = null;
    protected List<String> names = new ArrayList<>();
    protected List<String> ctrls = new ArrayList<>();
    protected List<String> distinctNames = new LinkedList<>();
    protected List<String> id = new ArrayList<>();
    public static boolean test = false;

    public List<String> getDistinctNames() {
        return distinctNames;
    }

    public List<String> getCtrls() {
        return ctrls;
    }

    public List<String> getNames() {
        return names;
    }

    public ElementNameSingleton(String elementColumnNames) {
        this.elementColumnNames = elementColumnNames;
    }

    public String getElementColumnNames() {
        return elementColumnNames;
    }

    public String getMultiIdDelimiter() {
        return multiIdDelimiter;
    }

    public static ElementNameSingleton getInstance(boolean test_) {
        return null;
    }

    public List<String> getGids(String name) {
        List<String> ids = new ArrayList<>();
        for (int i = 0; i < names.size(); i++) {
            if (names.get(i).equalsIgnoreCase(name)) {
                ids.add(id.get(i));
            }
        }
        return ids;
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
                addDistinctName(rs.getString(1).toUpperCase());
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(BscNameSingleton.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    protected void addDistinctName(String name) {
        if (!distinctNames.contains(name)) {
            distinctNames.add(name);
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
