/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.FormulaDefManager;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class SingleEntryQueryMapBuilderTest {

    private static boolean ISTEST = true;
    private final PrintUtils pUtils = new PrintUtils();
    private static String selectionStr;

    @BeforeClass
    public static void setUpClass() {
    }

    @Before
    public void setUp() throws Exception {
        Database.getInstance(ISTEST);
        selectionStr = "&timeFrom=30/03/2014 00:00:00&timeTo=29/04/2014 23:00:00&divCounter=1&chartPageColumns=1&fillGraph=false&chartRollerPeriod=1&chartType=KPI&bsc=GTIBN1&bsc=GTIBN2&vendor=NSN&technology=2G&period=Daily";
        HtmlInputProcessor.getInstance().processInput(new StringBuilder(selectionStr));

    }

    @Test
    public void getQueriesMapTest() {
        Map<String, String> queriesMap = null;
        String expectedKey = "'Period_Start_Time','GTIBN1','GTIBN2'";
        String expectedValue = "SELECT BSC_GID,to_char(Period_Start_Time,'yyyy/MM/dd HH24:mi:ss'),100*(decode((NVL(sum(BCCH_UPTIME),0) + NVL(sum(BCCH_DOWNTIME),0)), 0, 0,sum(BCCH_UPTIME)/(NVL(sum(BCCH_UPTIME),0) +NVL(sum(BCCH_DOWNTIME),0)))) FROM N2_CELL_AVAIL_CTRL_D_TEST WHERE Period_Start_Time >= to_date('30/03/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') AND Period_Start_Time <= to_date('29/04/2014 23:00:00','dd/mm/yyyy hh24:mi:ss') AND  Period = 'DAILY' AND  LEVEL_ = 'CONTROLLER' AND (BSC_GID='694806002' OR BSC_GID='676325002' ) GROUP BY BSC_GID,Period_Start_Time ORDER BY BSC_GID,Period_Start_Time";
        int mapType = Constants.SINGLE_ENTRY_MAP_TYPE;
        boolean testPassed = false;
        System.out.println("\n===========================\nSingleEntryQueryMapBuilderTest: getQueriesMapTest ");
        FormulaDefManager defMan = new FormulaDefManager(ISTEST);
        List<FormuladefPojo> defPojos = defMan.getFromulaDefPojos();
        QueryMapBuilder qmb;
        try {
            qmb = QueryMapBuilderFactory.create(defPojos.get(0), mapType, true);
            queriesMap = qmb.getQueriesMap();
            testPassed = queriesMap.containsKey(expectedKey);
            if (testPassed) {
                testPassed = queriesMap.get(expectedKey).equals(expectedValue);
            }

        } catch (Exception ex) {
            Logger.getLogger(SingleEntryQueryMapBuilderTest.class.getName()).log(Level.SEVERE, null, ex);
        }
        pUtils.printStatus(testPassed);
        System.out.println("Result: " + queriesMap.get(expectedKey));
        System.out.println("expectedValue: " +expectedValue);
        assertTrue(testPassed);
    }

}
