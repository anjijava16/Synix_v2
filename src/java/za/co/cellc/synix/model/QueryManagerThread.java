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
    private List<String> labelNames = new ArrayList<>();
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
            labelNames.add(gl.toString());
            stmnt.close();
            rs.close();
        }
        String dataStr = concatenateGraphData();
        String labels = concatenateGraphLabels();
        saveGraphConstructs(dataStr, labels);
    }

    private String concatenateGraphData() {
        StringBuilder concatSb = new StringBuilder();
        for (String hr : hours) {
            concatSb.append(hr);
            for (GraphData gd : gdObjects) {
                concatSb.append(",");
                concatSb.append(gd.getValueForDateTime(hr));
            }
            concatSb.append("\n");
        }
        return concatSb.toString();
    }

    private String concatenateGraphLabels() {
        StringBuilder concatSb = new StringBuilder();
        List<String> uLabelNames = makeUniqueListFromLabelNames();
        for (String uLblb : uLabelNames) {
            concatSb.append(",");
            concatSb.append(uLblb);
        }
        return concatSb.toString().substring(1);
    }

    private List<String> makeUniqueListFromLabelNames() {
        List<String> uniqueLabels = new ArrayList<>();
        for (String l : labelNames) {
            String[] labels = splitLabels(l);
            for (String lbl : labels) {
                if (!uniqueLabels.contains(lbl)) {
                    uniqueLabels.add(lbl);
                }
            }
        }
        return uniqueLabels;
    }

    private String[] splitLabels(String l) {
        return l.split(",");
    }

    private void saveGraphConstructs(String dataStr, String labels) {
        GraphConstructPojo gcp = new GraphConstructPojo(dataStr, labels);
        GraphConstructsSingleton.getInstance().addGraphDataPojo(gcp);
    }

    private void setRsFromQuery(String q) throws Exception {
        try {
            System.out.println("\nq=" + q);
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
