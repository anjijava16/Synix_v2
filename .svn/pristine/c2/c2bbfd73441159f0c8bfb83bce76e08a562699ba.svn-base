/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.linechart;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.formbuilders.charts.HTML_Inputs;
import za.co.cellc.synix.formbuilders.charts.JSON_Parser;
import za.co.cellc.synix.formbuilders.charts.dygraph.GraphObject;
import za.co.cellc.synix.formbuilders.charts.linechart.html.Div;
import za.co.cellc.synix.formbuilders.charts.linechart.html.HTML;
import za.co.cellc.synix.formbuilders.charts.linechart.query.DisectedQuery;
import za.co.cellc.synix.formbuilders.charts.query.Query;
import za.co.cellc.synix.persistance.TempTable;

/**
 *
 * @author z0006cpz
 */
public class Chart implements ChartInterface {

    private String ORDER_BY = "ORDER BY PERIOD_START_TIME";
//    private String AGG_DATE_COLUMN_NAME = "DATE_TIME";
    private StringBuilder sb;
//    private List<String> tech;
//    private List<String> vendor;
    private DailyData dailyData = new DailyData();
    private HourlyData hourlyData;
//    private String PLOTTER_TYPE = "lineChartPlotter";
    private List<DatabaseQueryObject> dataObjects;
    private List<DisectedQuery> queryDisections = new ArrayList<>();
    private List<GraphObject> gObjects = new ArrayList<>();
    private HTML_Inputs inputs;
    boolean test = false;

    public Chart() {
    }

    @Override
    public String getChartHTML(StringBuilder sb, int divIndex, boolean test) {
        this.test = test;
        this.sb = sb;
        inputs = new HTML_Inputs(sb);
        boolean aggregated = inputs.isAggregated();
        hourlyData = new HourlyData(aggregated);
        setDataObjects();
        setGraphObjects();
//        createTempTables();
        setQueryDisections();
        StringBuilder out = new StringBuilder();
        out.append(getDivs(divIndex));
        out.append(getCharts(divIndex));
        return out.toString();
    }

    private void createTempTables() {
        TempTable temp = new TempTable(sb, gObjects, dataObjects);
        temp.createTempTables();
        dataObjects = temp.getUpdated_dObjects();
    }

    private String getCharts(int divIndex) {
        HTML html = new HTML(divIndex, sb);
        String out = html.getHeader();
        for (int i = 0; i < dataObjects.size(); i++) {
            out += html.getCharts(dataObjects.get(i), queryDisections.get(i), i);
        }
        out += html.getFooter();
        return out;
    }

    private String getDivs(int divIndex) {
        Div div = new Div(divIndex);
        String out = div.getHeader();
        for (int i = 0; i < dataObjects.size(); i++) {
            out += div.getChartDivs(dataObjects.get(i), queryDisections.get(i));
        }
        return out;
    }

    private void setQueryDisections() {
        for (int i = 0; i < dataObjects.size(); i++) {
            queryDisections.add(disectQuery(i));
        }
        closeDataObjectsStatement();
    }

    private DisectedQuery disectQuery(int id) {
        DisectedQuery disect = new DisectedQuery(Constants.PlotterTypes.LINE.value());
        parseDataObject(id);
        disect.disectQuery(dataObjects.get(id), test);
        return disect;
    }

    private void closeDataObjectsStatement() {
        try {
            for (int i = 0; i < dataObjects.size(); i++) {
                if (dataObjects.get(i).getStatement() != null) {
                    dataObjects.get(i).getStatement().close();
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(Chart.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void setDataObjects() {
        if (isDaily()) {
            dataObjects = dailyData.getDataObjects(inputs.getTech(), inputs.getVendor(), inputs.getLevel(), test);
        } else {
            dataObjects = hourlyData.getDataObjects(inputs.getTech(), inputs.getVendor(), inputs.getLevel(), test);
        }
    }

    private void setGraphObjects() {
        for (DatabaseQueryObject databaseQueryObject : dataObjects) {
            gObjects.add(new GraphObject(sb, ORDER_BY, databaseQueryObject));
        }
    }

    private void parseDataObject(int id) {
        Query q = new Query(sb);
        q.parse(dataObjects.get(id), gObjects.get(id),test);
    }

    private boolean isDaily() {
        return getDataFromJSON("period").get(0).toString().equalsIgnoreCase("daily");
    }

//    private void initVariables() {
////        tech = getDataFromJSON("TECHNOLOGY");
////        vendor = getDataFromJSON("VENDOR");
//        boolean aggregated = inputs.isAggregated();
//        hourlyData = new HourlyData(aggregated);
//    }
//    private boolean isAggregated() {
//        List<String> lst;
//        if (tech.get(0).equalsIgnoreCase("2G")) {
//            lst = getDataFromJSON("bsc");
//        } else {
//            lst = getDataFromJSON("rnc");
//        }
//        if (lst.contains("Aggregate")) {
//            return true;
//        } else if (!lst.isEmpty()) {
//            return lst.get(0).contains("~");
//        }
//        return false;
//    }
    private List<String> getDataFromJSON(String object) {
        List<String> data = new ArrayList<>();
        data.addAll(extractFromJSON(object));
        return data;
    }

    private List<String> extractFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, sb.toString());
    }
}
