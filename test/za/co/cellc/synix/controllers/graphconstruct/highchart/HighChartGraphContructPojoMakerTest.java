/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers.graphconstruct.highchart;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.assertTrue;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.PrintUtils;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructFactory;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphContructPojoMaker;
import za.co.cellc.synix.model.FormulaDefManager;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class HighChartGraphContructPojoMakerTest {

    private final PrintUtils pUtils = new PrintUtils();
    private static boolean ISTEST = true;
    private String dtFrom = "28/03/2014 00:00:00";
    private String dtTo = "30/03/2014 00:00:00";
    private static Connection con;

    @BeforeClass
    public static void setUpClass() throws Exception {
        String selectionStr = "&timeFrom=30/03/2014 00:00:00&timeTo=03/04/2014 23:00:00&divCounter=1&chartPageColumns=1&fillGraph=false&chartRollerPeriod=1&chartType=KPI&bsc=GTIBN1&bsc=GTIBN2&vendor=NSN&technology=2G&period=Daily&logicalGroup=0";
        try {
            HtmlInputProcessor.getInstance().processInput(new StringBuilder(selectionStr));
            con = Database.getInstance(ISTEST).getCon();
        } catch (Exception ex) {
            Logger.getLogger(za.co.cellc.synix.model.GraphConstructFactoryTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getGraphConstructPojoTest() {
        boolean testPassed = true;
        System.out.println("\n===========================\nHighChartGraphContructPojoMakerTest: dateStringToUTCdateTest ");
        String labels = "'Period_Start_Time','GTIBN1','GTIBN2'";
        List<String> labelNames = new ArrayList<>();
        String expectedDataPojo1 = "[Date.UTC(2014, 2, 30, 0, 0, 0),96.76630150619679000147843113215371356659],\n"
                + "[Date.UTC(2014, 2, 31, 0, 0, 0),97.53032995392985238931694602009353796061],\n"
                + "[Date.UTC(2014, 3, 1, 0, 0, 0),98.49695647149075111316975599901354913918],\n"
                + "[Date.UTC(2014, 3, 2, 0, 0, 0),98.74647215521468748216421848118929282364],\n"
                + "[Date.UTC(2014, 3, 3, 0, 0, 0),null]";
        String expectedDataPojo2 = "[Date.UTC(2014, 2, 30, 0, 0, 0),99.81873590961216396446621547052239331865],\n"
                + "[Date.UTC(2014, 2, 31, 0, 0, 0),99.18900835291282398182597299592945688357],\n"
                + "[Date.UTC(2014, 3, 1, 0, 0, 0),97.71761099767100517194278914493941372301],\n"
                + "[Date.UTC(2014, 3, 2, 0, 0, 0),96.4894799701183237702029829632402968128],\n"
                + "[Date.UTC(2014, 3, 3, 0, 0, 0),97.45431949020200985125263653066727972622]";
        String expectedDataPojo3 = "[Date.UTC(2014, 2, 30, 0, 0, 0),94.2],\n"
                + "[Date.UTC(2014, 2, 31, 0, 0, 0),94.2],\n"
                + "[Date.UTC(2014, 3, 1, 0, 0, 0),94.2],\n"
                + "[Date.UTC(2014, 3, 2, 0, 0, 0),94.2],\n"
                + "[Date.UTC(2014, 3, 3, 0, 0, 0),94.2]";
        String resultDataPojo1 = "";
        String resultDataPojo2 = "";
        String resultDataPojo3 = "";
        labelNames.add(labels);
        List<GraphData> gdObjects = getGdObjects();
        FormulaDefManager defMan = new FormulaDefManager(ISTEST);
        List<FormuladefPojo> defPojos = defMan.getFromulaDefPojos();
        try {
            GraphContructPojoMaker gpm = GraphConstructFactory.create(Constants.ChartTypes.HIGH_CHART.value(), gdObjects, labelNames, defPojos.get(0));
            List<HighChartGraphConstructPojo> gcPojos = gpm.getGraphConstructPojos();
            testPassed = gcPojos.size() == 3;
            if (testPassed) {
                resultDataPojo1 = gcPojos.get(0).getData();
                resultDataPojo2 = gcPojos.get(1).getData();
                resultDataPojo3 = gcPojos.get(2).getData();
                testPassed = resultDataPojo1.equals(expectedDataPojo1) && resultDataPojo2.equals(expectedDataPojo2) && resultDataPojo3.equals(expectedDataPojo3);
            }
        } catch (Exception ex) {
            Logger.getLogger(HighChartGraphContructPojoMakerTest.class.getName()).log(Level.SEVERE, null, ex);
        }

        System.out.println("expectedDataPojo1 = " + expectedDataPojo1 + "\n           result = " + resultDataPojo1);
        System.out.println("expectedDataPojo2 = " + expectedDataPojo2 + "\n           result = " + resultDataPojo2);
        System.out.println("expectedDataPojo3 = " + expectedDataPojo3 + "\n           result = " + resultDataPojo3);
        pUtils.printStatus(testPassed);

        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }

    private List<GraphData> getGdObjects() {
        List<GraphData> gdObjects = new ArrayList<>();
        String neId = "GTIBN1";
        List<String> data = Arrays.asList("96.76630150619679000147843113215371356659", "97.53032995392985238931694602009353796061", "98.49695647149075111316975599901354913918", "98.74647215521468748216421848118929282364", "");
        List<String> dateTime = Arrays.asList("2014/03/30 00:00:00", "2014/03/31 00:00:00", "2014/04/01 00:00:00", "2014/04/02 00:00:00", "2014/04/03 00:00:00");
        GraphData gd = new GraphData();
        gd.setData(data);
        gd.setDateTime(dateTime);
        gd.setNetworkElementId(neId);
        gdObjects.add(gd);

        GraphData gd2 = new GraphData();
        neId = "GTIBN2";
        data = Arrays.asList("99.81873590961216396446621547052239331865", "99.18900835291282398182597299592945688357", "97.71761099767100517194278914493941372301", "96.4894799701183237702029829632402968128", "97.45431949020200985125263653066727972622");
        dateTime = Arrays.asList("2014/03/30 00:00:00", "2014/03/31 00:00:00", "2014/04/01 00:00:00", "2014/04/02 00:00:00", "2014/04/03 00:00:00");
        gd2.setData(data);
        gd2.setDateTime(dateTime);
        gd2.setNetworkElementId(neId);
        gdObjects.add(gd2);
        return gdObjects;
    }
}
