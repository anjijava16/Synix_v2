/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

//import za.co.cellc.synix.controllers.graphconstruct.GraphConstructsSingleton;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import za.co.cellc.synix.controllers.QueryMapBuilderFactory;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.QueryMapBuilder;
import za.co.cellc.synix.model.adaptors.Adaptor;
import za.co.cellc.synix.model.adaptors.AdaptorFactory;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructFactory;
import za.co.cellc.synix.controllers.graphconstruct.GraphContructPojoMaker;
import za.co.cellc.synix.controllers.graphconstruct.highchart.HighChartGraphConstructPojo;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.utilities.HoursUtility;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class QueryManagerThread implements Runnable {

//    private int MAP_TYPE = Constants.SINGLE_ENTRY_MAP_TYPE;//or MULTI_ENTRY_MAP_TYPE
    private boolean test = false;
    private List<String> hours = new ArrayList<>();
    private FormuladefPojo devPojo;
    private Map<String, String> queriesMap;
    private List<GraphData> gdObjects = new ArrayList<>();
    private List<String> labelNames = new ArrayList<>();
//   private List<GraphLabelObject> glObjects = new ArrayList<>();
    private Statement stmnt;
    private ResultSet rs;
    private String plotter;
    private HtmlInputProcessor htmlIp;
//    private HoursUtility hUtil = new HoursUtility();
    private Connection con;
    private List<GraphConstructPojo> graphConstPojos = new ArrayList<>();
    private List<List<HighChartGraphConstructPojo>> hCgraphConstPojos = new ArrayList<>();

    public QueryManagerThread(HtmlInputProcessor htmlIp, FormuladefPojo devPojo, String plotter, boolean test) throws Exception {
        this.htmlIp = htmlIp;
        this.devPojo = devPojo;
        this.test = test;
        this.plotter = plotter;
    }

    public List<GraphConstructPojo> getGraphConstPojos() {
        return graphConstPojos;
    }

    public List<List<HighChartGraphConstructPojo>> gethCgraphConstPojos() {
        return hCgraphConstPojos;
    }

    @Override
    public void run() {
        try {
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-dd-MM HH:mm:ss:SS");
            Date d1 = new Date();
//            System.out.println("Thread " + devPojo.getChartTitle() + " starting. " + (d1));

            setHours();
            setQueriesMap();
            buildGraphDataPojos();
            saveGraphConstructs(devPojo.getChartTitle());

            Date d2 = new Date();
            long diff = d2.getTime() - d1.getTime();
            long duration = diff / 1000;
            System.out.println("Thread " + devPojo.getChartTitle() + " done. " + duration + "secs");
        } catch (Exception ex) {
            Logger.getLogger(QueryManagerThread.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error running thread for pojo with ChartTitle: " + devPojo.getChartTitle() + ex.getMessage());
        }
    }

    private void setHours() {
        HoursUtility hrs = new HoursUtility(htmlIp);
        hours.addAll(hrs.getHours());
    }

    private void setQueriesMap() throws Exception {
        int mapType = getMapType();
        QueryMapBuilder qmb = QueryMapBuilderFactory.create(htmlIp, devPojo, mapType, test);
        queriesMap = qmb.getQueriesMap();
    }

    private int getMapType() {
        if (htmlIp.isAggregated()) {
            if (htmlIp.isAggregationMultiGroup()) {
                return Constants.AGGREGATED_GROUPING_MAP_TYPE;
            } else if (isZte()) {
                return Constants.ZTE_SINGLE_ENTRY_MAP_TYPE;
            } else {
                return Constants.SINGLE_ENTRY_MAP_TYPE;
            }
//        } else if (isZte()) {
//            return Constants.ZTE_SINGLE_ENTRY_MAP_TYPE;
        } else {
            return Constants.SINGLE_ENTRY_MAP_TYPE;
        }
    }

    private boolean isZte() {
        return htmlIp.getVendor().startsWith("Z");
    }

    private void buildGraphDataPojos() throws Exception {
        HoursUtility hUtil = new HoursUtility(htmlIp);
        int count = 0;
        for (Map.Entry<String, String> entry : queriesMap.entrySet()) {
            String query = entry.getValue();
//            System.out.println(hUtil.timeStamp() + " start loop: " + count + " " + query + "\n");
            setRsFromQuery(query);
            int fc = getFactoryChoice();
            String gn = extractGroupNameFromMapKey(entry.getKey());
            Adaptor adaptor = AdaptorFactory.create(htmlIp, fc, gn, rs, test);
            labelNames.add(entry.getKey());
            if (!adaptor.isDataEmpty()) {
                gdObjects.addAll(adaptor.getGdList());
            }
            closeConnection();
            System.out.println(hUtil.timeStamp() + " end loop: " + count + " " + query + "\n");
            count++;
        }
        //add factory here

//        String dataStr = concatenateGraphData();
//        String labels = concatenateGraphLabels();
//        String title = devPojo.getChartTitle();
//        saveGraphConstructs(dataStr, labels, title);
    }

    private void saveGraphConstructs(String chartTitle) throws Exception {
        GraphContructPojoMaker gcpm;
        String chartType = htmlIp.getChartType();
        switch (chartType) {
            case "DYGRAPH":
                gcpm = getGraphContructPojoMaker(Constants.ChartTypes.DYGRAPH.value());
                GraphConstructPojo gcp = gcpm.getGraphConstructPojo();
                gcp.setChartTitle(chartTitle);
                graphConstPojos.add(gcp);
//                GraphConstructsSingleton.getInstance().addGraphDataPojo(gcp);
                break;
            case "HIGH_CHART":
                gcpm = getGraphContructPojoMaker(Constants.ChartTypes.HIGH_CHART.value());
                List<HighChartGraphConstructPojo> gcPojos = gcpm.getGraphConstructPojos();
                hCgraphConstPojos.add(gcPojos);
//                GraphConstructsSingleton.getInstance().addHcGraphDataPojos(gcPojos);
                break;
            default:
                throw new AssertionError();
        }

//        String dataStr = gcpm.getGraphConstructPojo().getData();
//        String labels = gcpm.getGraphConstructPojo().getLabel();
//        GraphConstructPojo gcp = new GraphConstructPojo(dataStr, labels, chartTitle);
//        GraphConstructsSingleton.getInstance().addGraphDataPojo(gcp);
    }

    private GraphContructPojoMaker getGraphContructPojoMaker(String selection) throws Exception {
        return GraphConstructFactory.create(htmlIp, selection, gdObjects, labelNames, devPojo);
    }

    private String extractGroupNameFromMapKey(String key) {
        if (htmlIp.isAggregated()) {
            String ar[] = key.split(",");
            return stripQuotes(ar[ar.length - 1]);
        }
        return "";
    }

    private int getFactoryChoice() {
        if (htmlIp.isAggregated()) {
            return Constants.AGGREGATION_ADAPTOR;
        }
        return Constants.NON_AGGREGATION_ADAPTOR;
    }

    private String concatenateGraphData() {
        StringBuilder concatSb = new StringBuilder();
        List<String> uLabelNames = makeUniqueListOfElementNames();
        for (String hr : hours) {
            concatSb.append(hr);
            for (int i = 0; i < uLabelNames.size(); i++) {
                String labelName = uLabelNames.get(i);
                boolean found = false;
                for (GraphData gd : gdObjects) {
                    if (gd.equals(labelName)) {
                        concatSb.append(",");
                        concatSb.append(gd.getValueForDateTime(hr));
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    concatSb.append(",");
                }
            }
            concatSb.append("\\n");
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

    private List<String> makeUniqueListOfElementNames() {
        List<String> uElementNames = new ArrayList<>();
        List<String> uLabelNames = makeUniqueListFromLabelNames();
        for (String ul : uLabelNames) {
            if (!ul.equalsIgnoreCase("'" + Constants.DATE_TIME_COL + "'")) {
                uElementNames.add(stripQuotes(ul));
            }
        }
        return uElementNames;
    }

    private String stripQuotes(String s) {
        return s.replace("'", "");
    }

    private String[] splitLabels(String l) {
        return l.split(",");
    }

    private void setRsFromQuery(String q) throws Exception {
        try {
//            System.out.println(hUtil.timeStamp() + " start rsq: " + q + "\n");
            con = Database.getInstance(test).openNewConnection();
            stmnt = con.createStatement();
            rs = stmnt.executeQuery(q);
//            System.out.println(hUtil.timeStamp() + " end rsq: " + q + "\n");

        } catch (SQLException ex) {
            Logger.getLogger(QueryManagerThread.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error creating statement: " + ex.getMessage());
            throw new Exception("Error creating statement: ", ex);
        }
    }

    private void closeConnection() throws Exception {
        try {
            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(QueryManagerThread.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error closing statement: " + ex.getMessage());
            throw new Exception("Error closing statement: " + ex.getMessage());
        }
        try {
            rs.close();
        } catch (SQLException ex) {
            Logger.getLogger(QueryManagerThread.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error closing resultset: " + ex.getMessage());
            throw new Exception("Error closing resultset: " + ex.getMessage());
        }

        try {
            con.close();
        } catch (SQLException ex) {
            Logger.getLogger(QueryManagerThread.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error closing connection: " + ex.getMessage());
            throw new Exception("Error closing connection: " + ex.getMessage());
        }
    }
}
