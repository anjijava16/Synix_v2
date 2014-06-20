/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import java.util.Arrays;
import java.util.List;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import za.co.cellc.synix.controllers.PrintUtils;
import za.co.cellc.synix.model.network.elements.BscNameSingleton;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class BscNameSingletonTest {

    private boolean ISTEST = true;

    @Test
    public void graphDataPojoTest() {
        System.out.println("\n===========================\nBscNameSingleton: getInstance ");
        boolean testPassed = false;
        ElementNameSingleton s = BscNameSingleton.getInstance(ISTEST);
        s = BscNameSingleton.getInstance(ISTEST);
//        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }
}
