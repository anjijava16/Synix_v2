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
import java.util.Arrays;
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
import za.co.cellc.synix.controllers.FormulaDefPojo;
import za.co.cellc.synix.controllers.MultiEntryQueryMapBuilder;
import za.co.cellc.synix.controllers.QueryMapBuilder;
import za.co.cellc.synix.model.adaptors.Adaptor;
import za.co.cellc.synix.model.adaptors.AdaptorFactory;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class AggregationAdaptorTest {

    private static String query;
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
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void createAggregatedConstructTest() {
        System.out.println("\n===========================\nAggregationAdaptorTest: createSeriesObjectsTest ");
        boolean testPassed = false;
        List<GraphData> gdp = new ArrayList<>();
        List<String> dateTimeExpected = Arrays.asList("2014/03/30 00:00:00",
                "2014/03/31 00:00:00",
                "2014/04/01 00:00:00");
        List<String> dataExpected = Arrays.asList("9.87829628565288602579430524374263085968E01",
                "9.86273280878353631277433492625333213695E01",
                "9.79804260639246257386948274713920222033E01");
        Statement stmnt = null;
        ResultSet rs = null;
        String resultDateTime = "";
        String resultData = "";
        String expectedDateTime = "";
        String expectedData = "";
        String sql = "SELECT to_char(PERIOD_START_TIME,'yyyy/MM/dd HH24:mi:ss'),100*(DECODE((NVL(SUM(BCCH_UPTIME),0) + NVL(SUM(BCCH_DOWNTIME),0)), 0, 0,SUM(BCCH_UPTIME)/(NVL(SUM(BCCH_UPTIME),0) +NVL(SUM(BCCH_DOWNTIME),0)))) FROM N2_CELL_AVAIL_CTRL_D_TEST WHERE PERIOD_START_TIME >= TO_DATE('30/03/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') AND PERIOD_START_TIME <= TO_DATE('01/04/2014 23:00:00','dd/mm/yyyy hh24:mi:ss') AND  UPPER(PERIOD) = 'DAILY' AND  UPPER(LEVEL_) = 'CONTROLLER' AND (BSC_GID='694806002' OR BSC_GID='676325002' ) GROUP BY PERIOD_START_TIME ORDER BY PERIOD_START_TIME";
        selectionStr = "&timeFrom=30/03/2014 00:00:00&timeTo=01/04/2014 23:00:00&divCounter=1&chartPageColumns=1&fillGraph=false&chartRollerPeriod=1&chartType=KPI&bsc=GTIBN1&bsc=GTIBN2&vendor=NSN&technology=2G&period=Daily";
        try {
            HtmlInputProcessor.getInstance().processInput(new StringBuilder(selectionStr));
            Connection con = Database.getInstance(ISTEST).getCon();
            stmnt = con.createStatement();
            rs = stmnt.executeQuery(sql);
            Adaptor adaptor = AdaptorFactory.create(Constants.AGGREGATION_ADAPTOR, rs, ISTEST);
            gdp.addAll(adaptor.getGdList());
            resultDateTime = gdp.get(0).getDateTime().get(0) + "," + gdp.get(0).getDateTime().get(1) + "," + gdp.get(0).getDateTime().get(2);
            resultData = gdp.get(0).getData().get(0) + "," + gdp.get(0).getData().get(1) + "," + gdp.get(0).getData().get(2);
            expectedDateTime = dateTimeExpected.get(0) + "," + dateTimeExpected.get(1) + "," + dateTimeExpected.get(2);
            expectedData = dataExpected.get(0) + "," + dataExpected.get(1) + "," + dataExpected.get(2);

            testPassed = resultDateTime.equals(expectedDateTime)
                    && resultData.equals(expectedData);
        } catch (Exception ex) {
            Logger.getLogger(AggregationAdaptorTest.class.getName()).log(Level.SEVERE, null, ex);
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
        System.out.println("expectedDateTime=" + expectedDateTime + "\n resultDateTime  =        " + resultDateTime);
        System.out.println("expectedData=" + expectedData + "\n resultData      =" + resultData);
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }

}
