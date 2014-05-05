/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.linechart.query;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.formbuilders.charts.dygraph.GraphObject;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.model.GraphLabel;
import za.co.cellc.synix.model.GraphLabelObject;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author Pierre.Venter
 */
public class DisectedQuery implements DisectionInterface {

    private String plotter;    
    private GraphData dataSet;
    private GraphLabel series;
    private ResultSet rs = null;
    private Statement stmnt;
    boolean test = false;

    public DisectedQuery(String plotter) {
        this.plotter = plotter;
    }

    @Override
    public void disectQuery(DatabaseQueryObject dObject,boolean test) {
        stmnt = dObject.getStatement();
        if (stmnt == null) {
            try {
                Connection con = Database.getInstance(test).getCon();
                stmnt = con.createStatement();
                dObject.setStatement(stmnt);
            } catch (SQLException ex) {
                Logger.getLogger(DisectedQuery.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        setRs(dObject.getQuery());
        setDataSet();
        setSeries();
        try {
            rs.close();
//            stmnt.close();
        } catch (SQLException ex) {
            Logger.getLogger(DisectedQuery.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public String getChartData() {
        return dataSet.toString();
    }

    @Override
    public String getChartLabels() {
        return series.toString();
    }

    @Override
    public List<GraphLabelObject> getSeriesObjects() {
        return series.getSeriesObjects();
    }

    private void setDataSet() {
        dataSet = new GraphData();
        dataSet.dataFromRS(rs);
    }

    private void setSeries() {
        series = new GraphLabel();
        series.createSeriesObjects(rs, dataSet, plotter);
    }

    private void setRs(String query) {
        try {
            rs = stmnt.executeQuery(query);
        } catch (SQLException ex) {
            System.out.println("Error in query: " + query + " ->>" + ex);
        }
    }
}
