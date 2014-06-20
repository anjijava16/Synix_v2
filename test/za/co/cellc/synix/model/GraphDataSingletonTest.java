/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

//import za.co.cellc.synix.controllers.graphconstruct.GraphConstructsSingleton;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import java.util.Arrays;
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
        List<String> data = Arrays.asList("9.61214618098188572185091651180929690154E0", "19.76996988869880071359844248097793529744E01", "9.67663015061967900014784311321537135666E01");
        List<String> dateTime = Arrays.asList("2014/03/28 00:00:00.0", "2014/03/29 00:00:00.0", "2014/03/30 00:00:00.0");
        GraphDataPojo gdp = new GraphDataPojo(data, dateTime);
        testPassed = gdp.getData() == (data) && gdp.getDateTime() == dateTime ;
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }

//    @Test
//    public void addGraphDataPojoTest() {
//        System.out.println("\n===========================\nGraphDataSingletonTest: addGraphDataPojoTest ");
//        boolean testPassed = false;
//        String label = "GTIR1,GTIR2";
//        String data = "2014/04/20 00:00:00,99.0,80.1\n";
//        GraphConstructPojo gcp = new GraphConstructPojo(data, label,"DUMMY_CHART_TITLE");
//        testPassed = gcp.getData().equalsIgnoreCase(data) && gcp.getLabel().equalsIgnoreCase(label);
//        GraphConstructsSingleton gdps = GraphConstructsSingleton.getInstance();
//        gdps.addGraphDataPojo(gcp);
//        gdps.addGraphDataPojo(gcp);
//        List<GraphConstructPojo> gdpList = gdps.getGraphDataPojos();
//        testPassed = gdpList.size() == 2;
//        pUtils.printStatus(testPassed);
//        System.out.println("Expected=2\nResult  =" + gdpList.size());
//        assertTrue(testPassed);
//    }

//    @Test
//    public void clearTest() {
//        System.out.println("\n===========================\nGraphDataSingletonTest: clearTest ");
//        boolean testPassed = false;
//        String label = "GTIR1,GTIR2";
//        String data = "2014/04/20 00:00:00,99.0,80.1\n";
//        GraphConstructPojo gcp = new GraphConstructPojo(data, label,"DUMMY_CHART_TITLE");
//        testPassed = gcp.getData().equalsIgnoreCase(data) && gcp.getLabel().equalsIgnoreCase(label);
//        GraphConstructsSingleton gdps = GraphConstructsSingleton.getInstance();
//        gdps.addGraphDataPojo(gcp);
//        gdps.addGraphDataPojo(gcp);
//        gdps.clear();
//        List<GraphConstructPojo> gdpList = gdps.getGraphDataPojos();
//        testPassed = gdpList.isEmpty();
//        pUtils.printStatus(testPassed);
//        System.out.println("Expected=0\nResult  =" + gdpList.size());
//        assertTrue(testPassed);
//    }
}
