/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.utilities;

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
import za.co.cellc.synix.controllers.PrintUtils;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.utilities.DateConvert;

/**
 *
 * @author Pierre.Venter
 */
public class DateConvertTest {

    private final PrintUtils pUtils = new PrintUtils();

    @BeforeClass
    public static void setUpClass() throws Exception {
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
    public void dateStringToUTCdateTest() {
        boolean testPassed = true;
        String format = Constants.GRAPH_DATE_FORMAT;
        List<String> expected = getExpectedUTCdateStrings();
        String resStr = "";
        System.out.println("\n===========================\nDateConvert: dateStringToUTCdateTest ");
        List<GraphData> gdObjects = getGdObjects();
        DateConvert dConv = new DateConvert();
        String convertedDateStr;
        int i = 0;
        for (GraphData gd : gdObjects) {
            if (testPassed) {
                for (String dateStr : gd.getDateTime()) {
                    try {
                        convertedDateStr = dConv.dateStringToUTCdate(dateStr, format);
                        System.out.println(dateStr + "=" + convertedDateStr);
                        if (!convertedDateStr.equals(expected.get(i))) {
                            testPassed = false;
                            break;
                        }
                    } catch (Exception ex) {
                        Logger.getLogger(DateConvertTest.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    i++;
                }
            }
        }
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }

    private List<String> getExpectedUTCdateStrings() {
        return Arrays.asList(
                "Date.UTC(2014, 2, 30, 0, 0, 0)",
                "Date.UTC(2014, 2, 31, 0, 0, 0)",
                "Date.UTC(2014, 3, 1, 0, 0, 0)",
                "Date.UTC(2014, 3, 2, 0, 0, 0)",
                "Date.UTC(2014, 3, 3, 0, 0, 0)",
                "Date.UTC(2014, 2, 30, 0, 0, 0)",
                "Date.UTC(2014, 2, 31, 0, 0, 0)",
                "Date.UTC(2014, 3, 1, 0, 0, 0)",
                "Date.UTC(2014, 3, 2, 0, 0, 0)",
                "Date.UTC(2014, 3, 3, 0, 0, 0)");
    }

    private List<GraphData> getGdObjects() {
        List<GraphData> gdObjects = new ArrayList<>();
        String neId = "GTIBN1";
        List<String> data = Arrays.asList("96.76630150619679000147843113215371356659", "97.53032995392985238931694602009353796061", "98.49695647149075111316975599901354913918", "98.74647215521468748216421848118929282364", "96.81383104129169352228770542843844374978");
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
