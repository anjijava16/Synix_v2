/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
public class QueryBuilderTest {

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
    public void createQueriesTest() {
        boolean testPassed = false;
        String result = "";
        int mapType = Constants.SINGLE_ENTRY_MAP_TYPE;
        System.out.println("\n===========================\nQueryBuilderTest: createQueriesTest ");
        List<String> expectedQs = getCellAvailabilityQueries();
        FormulaDefManager defMan = new FormulaDefManager(ISTEST);
        List<FormuladefPojo> defPojos = defMan.getFromulaDefPojos();
        try {
            QueryMapBuilder qb = QueryMapBuilderFactory.create(defPojos.get(0), mapType, ISTEST);
            Map<String, String> queriesMap = qb.getQueriesMap();
            for (Map.Entry<String, String> entry : queriesMap.entrySet()) {
                result = entry.getValue();
                testPassed = result.equalsIgnoreCase(expectedQs.get(0));
                break;
            }

        } catch (Exception ex) {
            Logger.getLogger(QueryBuilderTest.class.getName()).log(Level.SEVERE, null, ex);
        }
        pUtils.printStatus(testPassed);

        System.out.println("Result: " + result);
        System.out.println("Expected: " + expectedQs.get(0));
        assertTrue(testPassed);
    }

    private List<String> getCellAvailabilityQueries() {
        List<String> queries = new ArrayList<>();
        queries.add("SELECT BSC_GID,to_char(Period_Start_Time,'yyyy/MM/dd HH24:mi:ss'),100*(decode((NVL(sum(BCCH_UPTIME),0) + NVL(sum(BCCH_DOWNTIME),0)), 0, 0,sum(BCCH_UPTIME)/(NVL(sum(BCCH_UPTIME),0) +NVL(sum(BCCH_DOWNTIME),0)))) FROM N2_CELL_AVAIL_CTRL_D_TEST WHERE Period_Start_Time >= to_date('30/03/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') AND Period_Start_Time <= to_date('29/04/2014 23:00:00','dd/mm/yyyy hh24:mi:ss') AND  Upper(Period) = 'DAILY' AND  Upper(LEVEL_) = 'CONTROLLER' AND (BSC_GID='694806002' OR BSC_GID='676325002' ) GROUP BY BSC_GID,Period_Start_Time ORDER BY BSC_GID,Period_Start_Time");
        return queries;
    }
}
