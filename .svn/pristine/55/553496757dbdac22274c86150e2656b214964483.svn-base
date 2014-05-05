/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import za.co.cellc.synix.controllers.Encryption;

/**
 *
 * @author nickm
 */
public class ModelUtilitiesJUnitTest {

    ModelUtilities modelUtilities;
    TestConnector testConnector;
    Connection con;

    public ModelUtilitiesJUnitTest() {
        try {
            setUp();
        } catch (Exception ex) {
            Logger.getLogger(ModelUtilitiesJUnitTest.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Failed to connect " + ex.getMessage());
        }
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    public void setUp() throws Exception {
        testConnector = TestConnector.getInstance();
        con = testConnector.getConnection();
        modelUtilities = new ModelUtilities(con);
    }

    public void tearDown() throws Exception {
        testConnector.closeConnection(con);
    }

    @Test
    public void testUserLevel() {
        boolean testHasFailed = true;

        int userLevel = UserLevel.LINE_MANAGER;
        String description = "LINE_MANAGER";

        UserLevel level = modelUtilities.getUserLevel(UserLevel.LINE_MANAGER);

        System.out.println("\n\nTest 1 testUserLevel");
        System.out.println("====================");
        System.out.println(level.toString());

        int theUserLevel = level.getUserLevel();
        String theDescription = level.getDescription();

        if (theUserLevel == userLevel
                && theDescription.equals(description)) {
            testHasFailed = false;
            System.out.println("\n\nTest 1 Completed successfully");
        }
        assertFalse(testHasFailed);
    }

    @Test
    public void testUserLogin() {
        boolean testHasFailed = true;

        String userId = "nickm";
        String password = "P@55w0rd";
        String name = "Nick";
        String surname = "Michael";
        boolean isDisabled = false;
        boolean isAdmin = true;
        int userLevel = UserLevel.NORMAL_USER;

        UserLogin login = modelUtilities.getUserLogin(userId, password);
        System.out.println("\n\nTest 2 testUserLogin");
        System.out.println("====================");
        System.out.println(login.toString());

        String theUserId = login.getUserId();
        String thePassword = login.getPassword();
        String theName = login.getName();
        String theSurname = login.getSurname();
        boolean theDisabled = login.isDisabled();
        boolean theAdmin = login.isadmin();
        int theUserLevel = login.getUserLevel();

        if (theUserId.equals(userId)
                && thePassword.equals(password)
                && theName.equals(name)
                && theSurname.equals(surname)
                && theUserLevel == userLevel
                && theAdmin == isAdmin
                && theDisabled == isDisabled) {
            testHasFailed = false;
        }

        assertFalse(testHasFailed);

    }

    @Test
    public void testSetUserPassword() {
        boolean testHasPassed = false;
        String userId = "unit test user";
        String password = "B1rD@Tr33";
        String encryptedPassword = null;
        String decryptedPassword = null;
        Encryption crypto = new Encryption();
        encryptedPassword = crypto.otpEncrypt(password);
        modelUtilities.setUserPassword(userId, encryptedPassword);
        UserLogin userLogin = modelUtilities.getUserLogin(userId, encryptedPassword);
        try {
            decryptedPassword = crypto.otpDecrypt(userLogin.getPassword());
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            assertTrue(false);
        }

        if (userLogin.getUserId().equals(userId)
                && userLogin.getPassword().equals(encryptedPassword)
                && password.equals(decryptedPassword)) {
            testHasPassed = true;
        }

        assertTrue(testHasPassed);
    }
}
