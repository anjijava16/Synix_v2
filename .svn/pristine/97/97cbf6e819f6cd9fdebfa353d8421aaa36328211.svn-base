/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.PrintUtils;
import za.co.cellc.synix.controllers.QueryBuilder;
import za.co.cellc.synix.dbconnection.ProductionTestSingleton;
import za.co.cellc.synix.model.FormulaDefManager;
import za.co.cellc.synix.model.GraphDataPojo;
import za.co.cellc.synix.persistance.Database;

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
    }

    @Test
    public void createQueriesTest() {
        boolean testPassed = false;
        System.out.println("\n===========================\nQueryBuilderTest: createQueriesTest ");
        List<String> expectedQs = getCellAvailabilityQueries();
        FormulaDefManager defMan = new FormulaDefManager(selectionStr, ISTEST);
        List<FormuladefPojo> defPojos = defMan.getFromulaDefPojos();
        QueryBuilder qb = new QueryBuilder(defPojos.get(0), selectionStr, ISTEST);
        try {
            Map<String, String> queriesMap = qb.getQueriesMap();
            for (Map.Entry<String, String> entry : queriesMap.entrySet()) {
                testPassed = entry.getValue().equalsIgnoreCase(expectedQs.get(0));
                break;
            }

        } catch (Exception ex) {
            Logger.getLogger(QueryBuilderTest.class.getName()).log(Level.SEVERE, null, ex);
        }
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
//        ProductionTestSingleton

    }

    private List<String> getCellAvailabilityQueries() {
        List<String> queries = new ArrayList<>();
        queries.add("SELECT Period_Start_Time,100*(decode((NVL(SUM(BCCH_UPTIME),0) + NVL(SUM(BCCH_DOWNTIME),0)), 0, 0,\n"
                + "SUM(BCCH_UPTIME)/(NVL(SUM(BCCH_UPTIME),0) +\n"
                + "NVL(SUM(BCCH_DOWNTIME),0)))) FROM N2_CELL_AVAIL WHERE Period_Start_Time >= to_date('30/03/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') AND Period_Start_Time <= to_date('29/04/2014 23:00:00','dd/mm/yyyy hh24:mi:ss') AND  Upper(Period) = 'DAILY' AND  Upper(LEVEL_) = 'CONTROLLER' AND BSC_GID = '694806002' GROUP BY Period_Start_Time ORDER BY Period_Start_Time");
        queries.add("SELECT Period_Start_Time,100*(decode((NVL(SUM(BCCH_UPTIME),0) + NVL(SUM(BCCH_DOWNTIME),0)), 0, 0,\n"
                + "SUM(BCCH_UPTIME)/(NVL(SUM(BCCH_UPTIME),0) +\n"
                + "NVL(SUM(BCCH_DOWNTIME),0)))) FROM N2_CELL_AVAIL WHERE Period_Start_Time >= to_date('30/03/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') AND Period_Start_Time <= to_date('29/04/2014 23:00:00','dd/mm/yyyy hh24:mi:ss') AND  Upper(Period) = 'DAILY' AND  Upper(LEVEL_) = 'CONTROLLER' AND BSC_GID = '676325002' GROUP BY Period_Start_Time ORDER BY Period_Start_Time");
        return queries;
    }
}
