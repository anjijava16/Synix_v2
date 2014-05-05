/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.QueryBuilder;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.utilities.HoursUtility;

/**
 *
 * @author Pierre.Venter
 */
public class QueryManagerThread implements Runnable {

    private boolean test = false;
    private List<String> hours = new ArrayList<>();
    private String selectionStr;
    private FormuladefPojo devPojo;
    private Map<String, String> queriesMap;
    private List<GraphData> gdObjects = new ArrayList<>();
//   private List<GraphLabelObject> glObjects = new ArrayList<>();
    private Statement stmnt;
    private ResultSet rs;
    private String plotter;

    QueryManagerThread(String selectionStr, FormuladefPojo devPojo, String plotter, boolean test) throws Exception {
        this.selectionStr = selectionStr;
        this.devPojo = devPojo;
        this.test = test;
        this.plotter = plotter;
    }

    private void setHours() {
        HoursUtility hrs = new HoursUtility(selectionStr);
        hours.addAll(hrs.getHours());
    }

    private void setQueriesMap() throws Exception {
        QueryBuilder qb = new QueryBuilder(devPojo, selectionStr, test);
        queriesMap = qb.getQueriesMap();
    }

    private void buildGraphDataPojos() throws Exception {
        for (Map.Entry<String, String> entry : queriesMap.entrySet()) {
            String query = entry.getValue();
            List<String> elementNames = new ArrayList<>();
            elementNames.add(entry.getKey());
            setRsFromQuery(query);
            GraphData gd = new GraphData();
            gd.dataFromRS(rs);
            gdObjects.add(gd);
            GraphLabel gl = new GraphLabel();
            gl.createSeriesObjects(gd, plotter, elementNames);
            saveGraphDataPojo(gd.toString(), gl.toString()); // <== wrong
            stmnt.close();
            rs.close();
        }
    }
    private void concatenateGraphDataPojos(){
        for (String hr : hours) {
            // create new data list from hr and data from pojo 1...pojo n
            //if pojo has no data for specific dateTime, insert/use null.
            //example: 30/03/2014 00:00:00,99.0,98.0\n30/03/2014 01:00:00,99.7,78.0\n
            
            //concatenated result is saved to GraphDataPojoSingleton
        }
    }

    private void saveGraphDataPojo(String dataStr, String labels) {
        GraphDataPojo gdp = new GraphDataPojo(dataStr, labels);
        GraphDataPojoSingleton.getInstance().addGraphDataPojo(gdp);
    }

    private void setRsFromQuery(String q) throws Exception {
        try {
            stmnt = Database.getInstance(test).getCon().createStatement();
            rs = stmnt.executeQuery(q);
        } catch (SQLException ex) {
            Logger.getLogger(QueryManagerThread.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error creating statement: " + ex.getMessage());
            throw new Exception("Error creating statement: ", ex);
        }
    }

    @Override
    public void run() {
        try {
            setHours();
            setQueriesMap();
            buildGraphDataPojos();
        } catch (Exception ex) {
            Logger.getLogger(QueryManagerThread.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error running thread for pojo with ChartTitle: " + devPojo.getChartTitle() + ex.getMessage());
        }
    }
}
