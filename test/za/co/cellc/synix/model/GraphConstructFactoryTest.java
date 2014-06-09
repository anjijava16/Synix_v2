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
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.PrintUtils;
import za.co.cellc.synix.model.adaptors.Adaptor;
import za.co.cellc.synix.model.adaptors.AdaptorFactory;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructFactory;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphContructPojoMaker;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author pierre.venter
 */
public class GraphConstructFactoryTest {

    private final PrintUtils pUtils = new PrintUtils();
    private static Connection con;
    private static boolean ISTEST = true;

    @BeforeClass
    public static void setUpClass() {
        String selectionStr = "&timeFrom=30/03/2014 00:00:00&timeTo=01/04/2014 23:00:00&divCounter=1&chartPageColumns=1&fillGraph=false&chartRollerPeriod=1&chartType=KPI&bsc=GTIBN1&bsc=GTIBN2&vendor=NSN&technology=2G&period=Daily&logicalGroup=0";
        try {
            HtmlInputProcessor.getInstance().processInput(new StringBuilder(selectionStr));
            con = Database.getInstance(ISTEST).getCon();
        } catch (Exception ex) {
            Logger.getLogger(GraphConstructFactoryTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @AfterClass
    public static void tearDownClass() {
        try {
            con.close();
        } catch (SQLException ex) {
            Logger.getLogger(GraphConstructFactoryTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    public void createDygraphTest() {
        System.out.println("\n===========================\nGraphConstructFactoryTest: createDygraphTest ");
        boolean testPassed = false;
        String sql = getTestQuery();
        try {
            Statement stmnt = con.createStatement();
            ResultSet rs = stmnt.executeQuery(sql);
            Adaptor adaptor = AdaptorFactory.create(Constants.NON_AGGREGATION_ADAPTOR, "", rs, ISTEST);
            List<GraphData> gdList = adaptor.getGdList();
//            GraphContructPojoMaker gCon = GraphConstructFactory.create(Constants.ChartTypes.DYGRAPH.value(), gdList);
//            GraphConstructPojo gcp = gCon.getGraphConstructPojo();
            rs.close();
            stmnt.close();
        } catch (Exception ex) {
            Logger.getLogger(GraphConstructFactoryTest.class.getName()).log(Level.SEVERE, null, ex);
        }

        pUtils.printStatus(testPassed);
        assertTrue(testPassed);
    }

    private String getTestQuery() {
        return "select BTS_GID,to_char(Period_Start_Time,'yyyy/MM/dd HH24:mi:ss'),100*DECODE((SUM(SDCCH_ASSIGN)+SUM(SDCCH_HO_SEIZ)),0,0, \n"
                + "(SUM(SDCCH_ASSIGN)/NULLIF((SUM(SDCCH_REQ) - SUM(T3101_EXPIRED)),0))* \n"
                + "(SUM(TCH_NEW_CALL_ASSIGN)/NULLIF(SUM(SERVED_DR_REQ) + \n"
                + "SUM(SERVED_FACCH_REQ) + SUM(SERVED_TCH_CALL_REQ),0))* (1 - \n"
                + "(SUM(SDCCH_RADIO_FAIL)+SUM(SDCCH_RF_OLD_HO)+ SUM(SDCCH_USER_ACT) + \n"
                + "SUM(SDCCH_BCSU_RESET) + SUM(SDCCH_NETW_ACT) + SUM(SDCCH_BTS_FAIL)) \n"
                + "/(SUM(SDCCH_ASSIGN)+SUM(SDCCH_HO_SEIZ)))) * (1-((SUM(DROP_AFTER_TCH_ASSIGN)- \n"
                + "SUM(TCH_RE_EST_ASSIGN))/NULLIF(SUM(TCH_NEW_CALL_ASSIGN) + SUM(TCH_HO_ASSIGN) -SUM(CELL_TCH_TCH),0))) \n"
                + "from ST_N_CELL_HOURLY_2G0_TEST\n"
                + "WHERE PERIOD_START_TIME = TO_DATE('8/05/2014 00:00:00','dd/mm/yyyy hh24:mi:ss') \n"
                + "AND  PERIOD = 'HOURLY' AND  LEVEL_ = 'CELL' \n"
                + "GROUP BY BTS_GID,PERIOD_START_TIME ORDER BY BTS_GID,PERIOD_START_TIME";
    }
}
