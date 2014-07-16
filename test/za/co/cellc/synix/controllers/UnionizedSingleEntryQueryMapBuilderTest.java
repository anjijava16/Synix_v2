/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.sql.Connection;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.After;
import static org.junit.Assert.assertTrue;
import org.junit.BeforeClass;
import org.junit.Test;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class UnionizedSingleEntryQueryMapBuilderTest {

    private final PrintUtils pUtils = new PrintUtils();
    private static boolean ISTEST = true;
    private static Connection con;
    private static HtmlInputProcessor htmlIp;
    private static List<FormuladefPojo> formulaDefPojos;

    @BeforeClass
    public static void setUpClass() throws Exception {
        String selectionStr = "&timeFrom=26/06/2014 00:00:00&timeTo=10/07/2014 23:00:00&divCounter=29&chartPageColumns=2&fillGraph=false&chartRollerPeriod=1&chartType=KPI&divId=_29&level=Controller&controllers=GTIBN1&controllers=GTIBN2&cells=29&vendor=NSN&technology=2G&period=Daily&logicalGroup=0";
        htmlIp = new HtmlInputProcessor();
        htmlIp.processInput(new StringBuilder(selectionStr));
        FormulaDefController fdc = new FormulaDefController();
        formulaDefPojos = fdc.getFormulaDefPojos(htmlIp, ISTEST);
        try {
            con = Database.getInstance(ISTEST).getCon();
        } catch (Exception ex) {
            Logger.getLogger(za.co.cellc.synix.model.GraphConstructFactoryTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    public void getQueriesMapTest() {
        boolean testPassed = false;
        System.out.println("\n===========================\n UnionizedSingleEntryQueryMapBuilderTest: getQueriesMapTest ");
        String expected = "SELECT ObjectID,DateTime,VALUE FROM (SELECT BSC_GID AS ObjectID,to_char(Period_Start_Time,'yyyy/MM/dd HH24:mi:ss') AS DateTime,100*(decode((NVL(sum(BCCH_UPTIME),0) + NVL(sum(BCCH_DOWNTIME),0)), 0, 0,sum(BCCH_UPTIME)/(NVL(sum(BCCH_UPTIME),0) +NVL(sum(BCCH_DOWNTIME),0)))) AS VALUE FROM N2_CELL_AVAIL_CTRL_D_TEST WHERE Period_Start_Time >= to_date('26/06/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') AND Period_Start_Time <= to_date('10/07/2014 23:00:00','dd/mm/yyyy hh24:mi:ss') AND  Period = 'DAILY' AND  LEVEL_ = 'CONTROLLER' AND (BSC_GID='694806002') GROUP BY BSC_GID,Period_Start_Time UNION ALL SELECT BSC_GID AS ObjectID,to_char(Period_Start_Time,'yyyy/MM/dd HH24:mi:ss') AS DateTime,100*(decode((NVL(sum(BCCH_UPTIME),0) + NVL(sum(BCCH_DOWNTIME),0)), 0, 0,sum(BCCH_UPTIME)/(NVL(sum(BCCH_UPTIME),0) +NVL(sum(BCCH_DOWNTIME),0)))) AS VALUE FROM N2_CELL_AVAIL_CTRL_D_TEST WHERE Period_Start_Time >= to_date('26/06/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') AND Period_Start_Time <= to_date('10/07/2014 23:00:00','dd/mm/yyyy hh24:mi:ss') AND  Period = 'DAILY' AND  LEVEL_ = 'CONTROLLER' AND (BSC_GID='676325002') GROUP BY BSC_GID,Period_Start_Time) ORDER BY ObjectID,DateTime";
        String result = "";
        try {
            UnionizedSingleEntryQueryMapBuilder usqmb = new UnionizedSingleEntryQueryMapBuilder(htmlIp, formulaDefPojos.get(0), ISTEST);
            Map<String, String> map = usqmb.getQueriesMap();
            result = map.get("'Period_Start_Time','GTIBN1','GTIBN2'");
            testPassed = result.equalsIgnoreCase(expected);
        } catch (Exception ex) {
            Logger.getLogger(UnionizedSingleEntryQueryMapBuilderTest.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("expected = " + expected + "\n  result = " + result);
        pUtils.printStatus(testPassed);
        assertTrue(testPassed);

    }

    @After
    public void tearDown() throws Exception {
        con.close(); //might make other tests fail.
    }
}
