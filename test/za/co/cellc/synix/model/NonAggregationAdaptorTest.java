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
public class NonAggregationAdaptorTest {

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
    public void createNonAggregatedConstructTest() {
        System.out.println("\n===========================\nNonAggregationAdaptorTest: createSeriesObjectsTest ");
        boolean testPassed = false;
            List<GraphData> gdp = new ArrayList<>();
        List<String> dateTimeExpected = Arrays.asList("2014/03/30 00:00:00",
                "2014/03/30 00:00:00");
       List<String> dataExpected = Arrays.asList("9.98187359096121639644662154705223933187E01",
                "9.67663015061967900014784311321537135666E01");
        Statement stmnt = null;
        ResultSet rs = null;
        String sql = "SELECT BSC_GID,to_char(PERIOD_START_TIME,'yyyy/MM/dd HH24:mi:ss'),100*(DECODE((NVL(SUM(BCCH_UPTIME),0) + NVL(SUM(BCCH_DOWNTIME),0)), 0, 0,SUM(BCCH_UPTIME)/(NVL(SUM(BCCH_UPTIME),0) +NVL(SUM(BCCH_DOWNTIME),0)))) FROM N2_CELL_AVAIL_CTRL_D_TEST WHERE PERIOD_START_TIME >= TO_DATE('30/03/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') AND PERIOD_START_TIME <= TO_DATE('01/04/2014 23:00:00','dd/mm/yyyy hh24:mi:ss') AND  UPPER(PERIOD) = 'DAILY' AND  UPPER(LEVEL_) = 'CONTROLLER' AND (BSC_GID='694806002' OR BSC_GID='676325002' ) GROUP BY BSC_GID,PERIOD_START_TIME ORDER BY BSC_GID,PERIOD_START_TIME";
        selectionStr = "&timeFrom=30/03/2014 00:00:00&timeTo=01/04/2014 23:00:00&divCounter=1&chartPageColumns=1&fillGraph=false&chartRollerPeriod=1&chartType=KPI&bsc=GTIBN1&bsc=GTIBN2&vendor=NSN&technology=2G&period=Daily";
        try {
            HtmlInputProcessor.getInstance().processInput(new StringBuilder(selectionStr));
            Connection con = Database.getInstance(ISTEST).getCon();
            stmnt = con.createStatement();
            rs = stmnt.executeQuery(sql);
            Adaptor adaptor = AdaptorFactory.create(Constants.NON_AGGREGATION_ADAPTOR, rs, ISTEST);
            gdp.addAll(adaptor.getGdList());
            testPassed = gdp.get(0).getDateTime().get(0).equals(dateTimeExpected.get(0))
                    && gdp.get(1).getDateTime().get(0).equals(dateTimeExpected.get(1))
                    && gdp.get(0).getData().get(0).equals(dataExpected.get(0))
                    && gdp.get(1).getData().get(0).equals(dataExpected.get(1));
        } catch (Exception ex) {
            Logger.getLogger(NonAggregationAdaptorTest.class.getName()).log(Level.SEVERE, null, ex);
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

        System.out.println("0 dateTimeExpected=" + dateTimeExpected.get(0) + "\n0 Result  =        " + gdp.get(0).getDateTime().get(0));
        System.out.println("0 dataExpected=" + dataExpected.get(0) + "\n0 Result      =" + gdp.get(0).getData().get(0));
        System.out.println("1 dateTimeExpected=" + dateTimeExpected.get(1) + "\n1 Result  =        " + gdp.get(1).getDateTime().get(0));
        System.out.println("1 dataExpected=" + dataExpected.get(1) + "\n1 Result      =" + gdp.get(1).getData().get(0));
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }

}
