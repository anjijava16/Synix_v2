/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author nickm
 */
public class ModelUtilities {

    private final int USER_ID = 1;
    private final int PASSWORD = 2;
    private final int NAME = 3;
    private final int SURNAME = 4;
    private final int IS_DISABLED = 5;
    private final int IS_ADMIN = 6;
    private final int USER_LEVEL = 7;
    private final int SYSTEMS = 8;
    private final int USER_LEVEL_ID = 1;
    private final int DESCRIPTION = 2;
    private Connection con;

    public ModelUtilities(Connection con) {
        this.con = con;
    }

//    public UserLogin getUserLogin(String userId) {
//        UserLogin userLogin;
//
//        //To do remove next line add code to call database
//        userLogin = new UserLogin(); //
//
//        return userLogin;
//    }
    public UserLogin getUserLogin(String userId, String password) {
        UserLogin userLogin = null;
        Map<String, String> userData = new HashMap();

        try {
            Statement stmnt = con.createStatement();
            ResultSet rs = stmnt.executeQuery("SELECT USER_ID,PASSWORD,NAME,SURNAME,IS_DISABLED,IS_ADMIN,USER_LEVEL,SYSTEMS"
                    + " from user_login WHERE USER_ID = '"
                    + userId + "' AND PASSWORD = '" + password + "'");
            while (rs.next()) {
                boolean isDisabled = rs.getInt(IS_DISABLED) == 1;
                boolean isAdmin = rs.getInt(IS_ADMIN) == 1;
                int userLevel = rs.getInt(USER_LEVEL);
                int systems = rs.getInt(SYSTEMS);
                userData.put(UserLogin.USER_ID, rs.getString(USER_ID));
                userData.put(UserLogin.PASSWORD, rs.getString(PASSWORD));
                userData.put(UserLogin.NAME, rs.getString(NAME));
                userData.put(UserLogin.SURNAME, rs.getString(SURNAME));
                userLogin = new UserLogin(userData, isDisabled, isAdmin, userLevel, systems);
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(Authenticate.class.getName()).log(Level.SEVERE, null, ex);
        }
        return userLogin;
    }

    public List<UserLogin> getUserLogins() {
        List<UserLogin> logins = new ArrayList();
        // to do add code to to call database and get a list of UserLogin objects

        return logins;
    }

    public List<UserLevel> getUserLevels() {
        List<UserLevel> levels = new ArrayList();
        // to do add code to to call database and get a list of UserLevel objects

        return levels;
    }

    public UserLevel getUserLevel(int userLevelID) {
        UserLevel userLevel = null;

        try {
            Statement stmnt = con.createStatement();
            ResultSet rs = stmnt.executeQuery("SELECT USER_LEVEL_ID,DESCRIPTION"
                    + " from user_level WHERE USER_LEVEL_ID = '"
                    + userLevelID + "'");
            while (rs.next()) {
                int theUserLevelID = rs.getInt(USER_LEVEL_ID);
                String theDescription = rs.getString(DESCRIPTION);
                userLevel = new UserLevel(theUserLevelID, theDescription);
            }
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(Authenticate.class.getName()).log(Level.SEVERE, null, ex);
        }

        return userLevel;
    }

    public void setUserPassword(String userId, String password) {
        try {
            Statement stmnt = con.createStatement();
            ResultSet rs = stmnt.executeQuery("UPDATE USER_LOGIN SET PASSWORD = '"
                    + password + "' "
                    + "WHERE USER_ID = '" + userId + "'");
            rs.close();
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(Authenticate.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
