/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.util.List;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import za.co.cellc.synix.controllers.PrintUtils;

/**
 *
 * @author Pierre.Venter
 */
public class GraphDataSingletonTest {

    private final PrintUtils pUtils = new PrintUtils();

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Test
    public void graphDataPojoTest() {
        System.out.println("\n===========================\nGraphDataSingletonTest: graphDataPojoTest ");
        boolean testPassed = false;
        String label = "GTIR1,GTIR2";
        String data = "2014/04/20 00:00:00,99.0,80.1\n";
        GraphDataPojo gdp = new GraphDataPojo(data, label);
        testPassed = gdp.getData().equalsIgnoreCase(data) && gdp.getLabel().equalsIgnoreCase(label);
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }

    @Test
    public void addGraphDataPojoTest() {
        System.out.println("\n===========================\nGraphDataSingletonTest: addGraphDataPojoTest ");
        boolean testPassed = false;
        String label = "GTIR1,GTIR2";
        String data = "2014/04/20 00:00:00,99.0,80.1\n";
        GraphDataPojo gdp = new GraphDataPojo(data, label);
        testPassed = gdp.getData().equalsIgnoreCase(data) && gdp.getLabel().equalsIgnoreCase(label);
        GraphDataPojoSingleton gdps = GraphDataPojoSingleton.getInstance();
        gdps.addGraphDataPojo(gdp);
        gdps.addGraphDataPojo(gdp);
        List<GraphDataPojo> gdpList = gdps.getGraphDataPojos();
        testPassed = gdpList.size() == 2;
        pUtils.printStatus(testPassed);
        System.out.println("Expected=2\nResult  =" + gdpList.size());
        assertTrue(testPassed);
    }
    
    @Test
    public void clearTest() {
        System.out.println("\n===========================\nGraphDataSingletonTest: clearTest ");
        boolean testPassed = false;
        String label = "GTIR1,GTIR2";
        String data = "2014/04/20 00:00:00,99.0,80.1\n";
        GraphDataPojo gdp = new GraphDataPojo(data, label);
        testPassed = gdp.getData().equalsIgnoreCase(data) && gdp.getLabel().equalsIgnoreCase(label);
        GraphDataPojoSingleton gdps = GraphDataPojoSingleton.getInstance();
        gdps.addGraphDataPojo(gdp);
        gdps.addGraphDataPojo(gdp);
        gdps.clear();
        List<GraphDataPojo> gdpList = gdps.getGraphDataPojos();
        testPassed = gdpList.isEmpty();
        pUtils.printStatus(testPassed);
        System.out.println("Expected=0\nResult  =" + gdpList.size());
        assertTrue(testPassed);
    }
}
