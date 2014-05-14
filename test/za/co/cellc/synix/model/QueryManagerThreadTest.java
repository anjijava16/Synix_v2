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
import za.co.cellc.synix.controllers.MultiEntryQueryMapBuilder;
import za.co.cellc.synix.controllers.QueryBuilderTest;
import za.co.cellc.synix.view.HtmlInputProcessor;

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
    private FormuladefPojo formulaDefPojo;
//    FormuladefPojo formulaDefPojo2;
    boolean testPassed = false;
    private FormuladefPojo devPojo;

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }

    @Before
    public void setUp() throws Exception {
        selectionStr = ("&timeFrom=30/03/2014 00:00:00&timeTo=29/04/2014 23:00:00&divCounter=1&chartPageColumns=1&fillGraph=false&chartRollerPeriod=1&chartType=KPI&bsc=GTIBN1&bsc=GTIBN2&vendor=NSN&technology=2G&period=Daily");
        HtmlInputProcessor.getInstance().processInput(new StringBuilder(selectionStr));
        FormulaDefManager defMan = new FormulaDefManager(ISTEST);
        List<FormuladefPojo> defPojos = defMan.getFromulaDefPojos();
        formulaDefPojo = defPojos.get(0);
//        formulaDefPojo2 = defPojos.get(1);
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void doKpiQueryTest() {
        try {
            List<Thread> threads = new ArrayList<>();
            testPassed = true;
            QueryManagerThread runnable = new QueryManagerThread(formulaDefPojo, Constants.PlotterTypes.LINE.value(), ISTEST);
//            QueryManagerThread runnable2 = new QueryManagerThread(formulaDefPojo2, Constants.PlotterTypes.LINE.value(), ISTEST);
            threads.add(new Thread(runnable));
//            threads.add(new Thread(runnable2));

            for (Thread t : threads) {
                t.start();
            }
            while (!allThreadsDead(threads)) {
                Thread.sleep(2000);
            }
            assertTrue(testPassed);
        } catch (Exception ex) {
            Logger.getLogger(QueryManagerThreadTest.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    private boolean allThreadsDead(List<Thread> threads) {
        boolean dead = true;
        for (Thread t : threads) {
            if (t.isAlive()) {
                return false;
            }
        }
        return dead;
    }
}
