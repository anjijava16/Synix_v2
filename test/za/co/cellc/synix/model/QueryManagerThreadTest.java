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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.QueryBuilder;
import za.co.cellc.synix.controllers.QueryBuilderTest;

/**
 *
 * @author Pierre.Venter
 */
public class QueryManagerThreadTest {

    private static boolean ISTEST = true;
    private final PrintUtils pUtils = new PrintUtils();
    private static String selectionStr;
    private String dtFrom = "28/03/2014 00:00:00";
    private String dtTo = "30/03/2014 00:00:00";
    private FormuladefPojo devPojo;

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }

    @Before
    public void setUp() throws Exception {
        FormulaDefManager defMan = new FormulaDefManager(selectionStr, ISTEST);
        List<FormuladefPojo> defPojos = defMan.getFromulaDefPojos();
        devPojo = defPojos.get(0);
        selectionStr = ("&timeFrom=30/03/2014 00:00:00&timeTo=29/04/2014 23:00:00&divCounter=1&chartPageColumns=1&fillGraph=false&chartRollerPeriod=1&chartType=KPI&bsc=GTIBN1&bsc=GTIBN2&vendor=NSN&technology=2G&period=Daily");
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void doKpiQueryTest() {
        QueryManagerThread thread = new QueryManagerThread(selectionStr, devPojo);

        QueryBuilder qb = new QueryBuilder(devPojo, selectionStr, ISTEST);
        try {
            Map<String, String> queriesMap = qb.getQueriesMap();
            for (Map.Entry<String, String> entry : queriesMap.entrySet()) {
                testPassed = entry.getValue().equalsIgnoreCase(expectedQs.get(0));
                break;
            }

        } catch (Exception ex) {
            Logger.getLogger(QueryBuilderTest.class.getName()).log(Level.SEVERE, null, ex);
        }

    }
}
