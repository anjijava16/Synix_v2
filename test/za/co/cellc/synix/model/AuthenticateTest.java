/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.Connection;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Pierre.Venter
 */
public class AuthenticateTest {

    boolean testHasFailed = true;
    private Connection con = getConnection();
    TestConnector testConnector;
    ModelUtilities modelUtilities;
    private UserLogin userLogin;

    String USERID = "nickm";
    String PASSWORD = "P@55w0rd";

    public AuthenticateTest() {
//        setUp();
    }
//
//    private void setUp() {
//        try {
////            testConnector = TestConnector.getInstance();
////            con = testConnector.getConnection();
////            modelUtilities = new ModelUtilities(con);
//            System.out.println("Connection made");
//        } catch (Exception ex) {
//            Logger.getLogger(ModelUtilitiesJUnitTest.class.getName()).log(Level.SEVERE, null, ex);
//            System.out.println("Failed to connect " + ex.getMessage());
//        }
//    }

    private Connection getConnection() {
        Connection con = null;
        try {
            testConnector = TestConnector.getInstance();
            con = testConnector.getConnection();
            modelUtilities = new ModelUtilities(con);
            System.out.println("connection made");
        } catch (Exception e) {
            System.out.println("Could not make connection" + e.getMessage());
        }
        return con;
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    private void tearDown() {
        try {
            testConnector.closeConnection(con);
            System.out.println("Connection closed");
        } catch (Exception ex) {
            Logger.getLogger(AuthenticateTest.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error closing DB connection");
        }
    }

//    @Test
//    public void testAuthenticateConstructor() {
//        userLogin = modelUtilities.getUserLogin(USERID, PASSWORD);
//    }
    @Test
    public void testAuthenticate() {
        System.out.println("\nauthenticate");
        Authenticate instance = new Authenticate(con, USERID, PASSWORD);
        boolean result = instance.authenticate();
        System.out.println("result=" + result);
        assertTrue(result);
        tearDown();
    }

    @Test
    public void testAuthenticateNegative() {
        System.out.println("\nauthenticate");
        Authenticate instance = new Authenticate(con, USERID, "XXZXDFSF");
        boolean expResult = false;
        boolean result = instance.authenticate();
        System.out.println("result=" + result);
        assertEquals(expResult, result);
        tearDown();
    }

    /**
     * Test of isAdmin method, of class Authenticate.
     */
    @Test
    public void testGetLevel() {
        System.out.println("\ngetLevel");
        Authenticate instance = new Authenticate(con, USERID, PASSWORD);
        instance.authenticate();
        int expResult = 0;
        int result = instance.getLevel();
        System.out.println("result=" + result);
        assertEquals(expResult, result);
        tearDown();

    }

    @Test
    public void testGetLevelNegative() {
        boolean testFailed = true;
        System.out.println("\ngetLevel");
        Authenticate instance = new Authenticate(con, "testDir", "un1xUN!X");
        instance.authenticate();
        int expResult = 0;
        int result = instance.getLevel();
        if (expResult != result) {
            testFailed = false;
        }
        System.out.println("testFailed=" + testFailed);
        assertFalse(testFailed);
        tearDown();
    }

    /**
     * Test of isSynixAllowed method, of class Authenticate.
     */
    @Test
    public void testIsSynixAllowed() {
        System.out.println("\nisSynixAllowed");
        Authenticate instance = new Authenticate(con, "pierrev", "123456");
        instance.authenticate();
        boolean result = instance.isSynixAllowed();
        System.out.println("result=" + result);
        assertTrue(result);
        tearDown();
    }

    @Test
    public void testIsSynixAllowedNegative() {
        System.out.println("\nisSynixAllowed");
        Authenticate instance = new Authenticate(con, USERID, PASSWORD);
        instance.authenticate();
        boolean result = instance.isSynixAllowed();
        System.out.println("result=" + result);
        assertFalse(result);
        tearDown();
    }

    /**
     * Test of isNet_LogAllowed method, of class Authenticate.
     */
    @Test
    public void testIsNet_LogAllowed() {
        System.out.println("\nisNet_LogAllowed");
        Authenticate instance = new Authenticate(con, USERID, PASSWORD);
        instance.authenticate();
        boolean result = instance.isNet_LogAllowed();
        System.out.println("result=" + result);
        assertTrue(result);
        tearDown();
        // TODO review the generated test code and remove the default call to fail.

    }

}
