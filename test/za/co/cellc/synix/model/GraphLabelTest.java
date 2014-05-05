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

/**
 *
 * @author Pierre.Venter
 */
public class GraphLabelTest {

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
    public void createSeriesObjectsTest() {
        boolean testPassed = false;
        Statement stmnt = null;
        ResultSet rs = null;
        System.out.println("\n===========================\nGraphLabelTest: createSeriesObjectsTest ");
        Connection con = Database.getInstance(ISTEST).getCon();
        String sql = "SELECT Period_Start_Time,100*(decode((NVL(SUM(BCCH_UPTIME),0) + NVL(SUM(BCCH_DOWNTIME),0)), 0, 0,\n"
                + "SUM(BCCH_UPTIME)/(NVL(SUM(BCCH_UPTIME),0) +\n"
                + "NVL(SUM(BCCH_DOWNTIME),0)))) FROM N2_CELL_AVAIL WHERE Period_Start_Time >= to_date('" + dtFrom + "','dd/mm/yyyy hh24:mi:ss') AND Period_Start_Time <= to_date('" + dtTo + "','dd/mm/yyyy hh24:mi:ss') AND  Upper(Period) = 'DAILY' AND  Upper(LEVEL_) = 'CONTROLLER' AND BSC_GID = '694806002' GROUP BY Period_Start_Time ORDER BY Period_Start_Time";
        String expected = "'Period_Start_Time','GTIBN1'";
        String result = "";
        try {
            stmnt = con.createStatement();
            rs = stmnt.executeQuery(sql);
            GraphData gd = new GraphData();
            gd.dataFromRS(rs);

            FormulaDefManager defMan = new FormulaDefManager(selectionStr, ISTEST);
            List<FormuladefPojo> defPojos = defMan.getFromulaDefPojos();
            QueryBuilder qb = new QueryBuilder(defPojos.get(0), selectionStr, ISTEST);
            Map<String, String> queriesMap = qb.getQueriesMap();
            for (Map.Entry<String, String> entry : queriesMap.entrySet()) {
                List<String> labels = new ArrayList<>();
                labels.add(entry.getKey());
                GraphLabel gl = new GraphLabel();
                gl.createSeriesObjects(gd, Constants.PlotterTypes.LINE.value(), labels);
                result = gl.toString();
                testPassed = result.equals(expected);
                break;
            }

        } catch (Exception ex) {
            Logger.getLogger(GraphDataTest.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (stmnt != null && rs != null) {
                    stmnt.close();
                    rs.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(GraphDataTest.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        System.out.println("Expected=" + expected + "\nResult  =" + result);
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }

   
}
