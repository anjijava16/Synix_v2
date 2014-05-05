/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.Connection;
import za.co.cellc.synix.controllers.Encryption;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author Pierre.Venter
 */
public class Authenticate {

    private String login;
    private String password;
    private boolean isAdmin = false;
    private UserLogin userLogin;
    private Connection con;
    private boolean test=false;

    public Authenticate(String login, String password,boolean test) {
        this.login = login;
        this.password = password;
        this.test=test;
        setCon();
    }

    private void setCon() {
        if (con == null) {
            con = Database.getInstance(test).getCon();
        }
    }

    public Authenticate(Connection con, String login, String password) {
        this.con = con;
        this.login = login;
        this.password = password;
    }

    public boolean authenticate() {
        ModelUtilities modelUtil = new ModelUtilities(con);
        userLogin = modelUtil.getUserLogin(login, password);
        if (userLogin != null && login.equals(userLogin.getUserId()) && password.equals(userLogin.getPassword()) && !userLogin.isDisabled) {
            return true;
        }
        return false;
    }

    public boolean passwordAuthenticate() {
        Encryption crypto = new Encryption();
        String encryptedPassword = crypto.otpEncrypt(password);
        ModelUtilities modelUtil = new ModelUtilities(con);
        userLogin = modelUtil.getUserLogin(login, encryptedPassword);
        if (userLogin != null && login.equals(userLogin.getUserId()) && encryptedPassword.equals(userLogin.getPassword()) && !userLogin.isDisabled) {
            return true;
        }
        return false;
    }

    public void setPassword(String userID, String password) {
        Encryption crypto = new Encryption();
        String encryptedPassword = crypto.encrypt(password);
        ModelUtilities modelUtil = new ModelUtilities(con);
        modelUtil.setUserPassword(userID, encryptedPassword);
    }

    public boolean isAdmin() {
        if (userLogin == null) {
            return false;
        }
        return userLogin.isadmin();
    }

    public int getLevel() {
        if (userLogin == null) {
            return -1;
        }
        return userLogin.getUserLevel();
    }

    public boolean isSynixAllowed() {
        if (userLogin == null) {
            return false;
        }
        return decodeSystem(UserLogin.SYSTEM_SYNIX);
    }

    public boolean isNet_LogAllowed() {
        if (userLogin == null) {
            return false;
        }
        return decodeSystem(UserLogin.SYSTEM_NET_LOG);
    }

    private boolean decodeSystem(int key) {
        int system = userLogin.getSystems();
        String bs = Integer.toBinaryString(system);
        bs = padBinaryString(bs);
        if (bs.charAt(bs.length() - key) == '1') {
            return true;
        }
        return false;
    }

    private String padBinaryString(String bsv) {
        String bs = bsv;
        int bsLen = bs.length();
        for (int j = bsLen; j < 3; j++) {
            bs = "0" + bs;
        }
        return bs;
    }
}
