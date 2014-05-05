/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.util.Map;

/**
 *
 * @author nickm
 */
public class UserLogin {

    public static final String USER_ID = "USER_ID";
    public static final String PASSWORD = "PASSWORD";
    public static final String NAME = "NAME";
    public static final String SURNAME = "SURNAME";
    public static final String USER_LEVEL = "USER_LEVEL";
    public static final int SYSTEM_SYNIX = 1;
    public static final int SYSTEM_NET_LOG = 2; //As we have new systems we will add them

    String userId;
    String password;
    String name;
    String surname;
    boolean isDisabled;
    boolean isAdmin;
    int userLevel;
    int systems;

    public UserLogin() {
    }

    public UserLogin(Map<String, String> values, boolean isDisabled, boolean isadmin, int userLevel, int systems) {
        userId = getvalueInMap(values, USER_ID);
        password = getvalueInMap(values, PASSWORD);
        name = getvalueInMap(values, NAME);
        surname = getvalueInMap(values, SURNAME);
        this.userLevel = userLevel;
        this.isDisabled = isDisabled;
        this.isAdmin = isadmin;
        this.systems = systems;
    }

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public int getUserLevel() {
        return userLevel;
    }

    public boolean isDisabled() {
        return isDisabled;
    }

    public boolean isadmin() {
        return isAdmin;
    }

    public int getSystems() {
        return systems;
    }

    public String toString() {
        StringBuilder str = new StringBuilder();
        str.append("\nuserId : ");
        str.append(userId);
        str.append("\npassword : *******");// never disclose passwords in logs
        str.append("\nname : ");
        str.append(name);
        str.append("\nsurname : ");
        str.append(surname);
        str.append("\nisDisabled : ");
        str.append(isDisabled);
        str.append("\nisadmin : ");
        str.append(isAdmin);
        str.append("\nuserLevel : ");
        str.append(userLevel);

        return str.toString();
    }

    private String getvalueInMap(Map<String, String> map, String key) {
        String value = map.get(key);
        if (value == null) {
            value = "";
        }

        return value;
    }

}
