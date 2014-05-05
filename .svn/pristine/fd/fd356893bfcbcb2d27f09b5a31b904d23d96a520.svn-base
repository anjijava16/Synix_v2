/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.util.HashMap;
import java.util.Map;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author nickm
 */
public class UserLoginJUnitTest {

    UserLogin login;
    UserLevel level;

    public UserLoginJUnitTest() {
    }

    @Test
    public void testUserLoginConstructor() {
        boolean testHasFailed = true;
        Map<String, String> userData = new HashMap();

        String userId = "nickm";
        String password = "password";
        String name = "Nick";
        String surname = "Michael";
        boolean isDisabled = false;
        boolean isAdmin = true;
        int userLevel = UserLevel.LINE_MANAGER;
        int system = 7;

        userData.put(UserLogin.USER_ID, userId);
        userData.put(UserLogin.PASSWORD, password);
        userData.put(UserLogin.NAME, name);
        userData.put(UserLogin.SURNAME, surname);

        login = new UserLogin(userData, isDisabled, isAdmin, userLevel, system);
        System.out.println(login.toString());

        String theUserId = login.getUserId();
        String thePassword = login.getPassword();
        String theName = login.getName();
        String theSurname = login.getSurname();
        boolean theDisabled = login.isDisabled();
        boolean theAdmin = login.isadmin();
        int theUserLevel = login.getUserLevel();
        int theSystem = login.getSystems();

        if (theUserId.equals(userId)
                && thePassword.equals(password)
                && theName.equals(name)
                && theSurname.equals(surname)
                && theUserLevel == userLevel
                && theAdmin == isAdmin
                && theDisabled == isDisabled
                && theSystem == system) {
            testHasFailed = false;
        }

        assertFalse(testHasFailed);

    }
}
