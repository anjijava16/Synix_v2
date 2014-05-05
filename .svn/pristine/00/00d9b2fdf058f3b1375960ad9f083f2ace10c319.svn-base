/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package za.co.cellc.synix.model;

import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author nickm
 */
public class UserLevelJUnitTest {
    UserLevel level;
    
    public UserLevelJUnitTest() {
    }
    
    @Test
    public void testUserLevelConstructor() {
        boolean testHasFailed = true;
        
    int userLevel=UserLevel.LINE_MANAGER;
    String description="Line Manager";
    
        level=new UserLevel(userLevel, description);
        
        System.out.println(level.toString());

        int theUserLevel= level.getUserLevel();
        String theDescription= level.getDescription();
        
        if (theUserLevel==userLevel
                && theDescription.equals(description)
                ) {
            testHasFailed = false;
        }
        
        assertFalse(testHasFailed);
    }
    
}
