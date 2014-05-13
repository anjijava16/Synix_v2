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
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.assertTrue;
import org.junit.Before;
import org.junit.BeforeClass;
import za.co.cellc.synix.controllers.PrintUtils;
import za.co.cellc.synix.persistance.Database;
import org.junit.Test;

/**
 *
 * @author Pierre.Venter
 */
public class GraphDataTest {

    private static boolean ISTEST = true;
    private final PrintUtils pUtils = new PrintUtils();
    private static String selectionStr;
    private String dtFrom = "28/03/2014 00:00:00";
    private String dtTo = "30/03/2014 00:00:00";

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }

    @Before
    public void setUp() throws Exception {
        selectionStr = "&timeFrom=30/03/2014 00:00:00&timeTo=29/04/2014 23:00:00&divCounter=1&chartPageColumns=1&fillGraph=false&chartRollerPeriod=1&chartType=KPI&bsc=GTIBN1&bsc=GTIBN2&vendor=NSN&technology=2G&period=Daily";
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void toStringTest() {
        System.out.println("\n===========================\nGraphDataTest: toStringTest ");
        boolean testPassed = false;
        List<String> dateTimeExpected = Arrays.asList("2014/03/30 00:00:00",
                "2014/03/30 00:00:00");
        List<String> dataExpected = Arrays.asList("9.98187359096121639644662154705223933187E01",
                "9.67663015061967900014784311321537135666E01");
        GraphData gd = new GraphData();
        gd.setData(dataExpected);
        gd.setDateTime(dateTimeExpected);

        String expected = "9.98187359096121639644662154705223933187E01\\n9.67663015061967900014784311321537135666E01\\n";
        String result = "";
        result = gd.toString();
        testPassed = result.equalsIgnoreCase(expected);
        System.out.println("Expected=" + expected + "\nResult  =" + result);
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);

    }

    @Test
    public void getValueForDateTimeTest() {
        System.out.println("\n===========================\nGraphDataTest: getValueForDateTimeTest ");
        boolean testPassed = false;
        List<String> dateTimeExpected = Arrays.asList("2014/03/30 00:00:00",
                "2014/03/30 23:00:00");
        List<String> dataExpected = Arrays.asList("9.98187359096121639644662154705223933187E01",
                "9.67663015061967900014784311321537135666E01");
        GraphData gd = new GraphData();
        gd.setData(dataExpected);
        gd.setDateTime(dateTimeExpected);

        String expected = "9.98187359096121639644662154705223933187E01\\n9.67663015061967900014784311321537135666E01";
        String result = gd.getValueForDateTime(dateTimeExpected.get(0)) + "\\n" + gd.getValueForDateTime(dateTimeExpected.get(1));
        testPassed = gd.getValueForDateTime(dateTimeExpected.get(0)).equals(dataExpected.get(0))
                && gd.getValueForDateTime(dateTimeExpected.get(1)).equals(dataExpected.get(1));
        System.out.println("Expected=" + expected + "\nResult  =" + result);
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);

    }
}
