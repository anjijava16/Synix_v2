/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.GraphData;

/**
 *
 * @author Pierre.Venter
 */
public class GraphLabel implements GraphLabelInterface {

    List<String> labels = new ArrayList<>();
    List<GraphLabelObject> seriesObjects = new ArrayList<>();

    @Override
    public void createSeriesObjects(GraphData gd, String plotter, List<String> labelNames) {
        try {
            setLabels(labelNames);
            for (int i = 0; i < labels.size(); i++) {
                seriesObjects.add(new GraphLabelObject(labels.get(i), plotter, gd.getDataForColumn(i)));
            }
            setSeriesY_Axis();
        } catch (SQLException ex) {
            Logger.getLogger(GraphData.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public List<GraphLabelObject> getSeriesObjects() {
        return seriesObjects;
    }

    @Override
    public String toString() {
        String l = "";
        for (int i = 0; i < seriesObjects.size(); i++) {
            l += ",'" + seriesObjects.get(i).getLabel() + "'";
        }
        return l.substring(1);
    }

    private void setSeriesY_Axis() {
        float min = getMinvalueFromAllSeries();
        float max = getMaxvalueFromAllSeries();
        for (GraphLabelObject sOb : seriesObjects) {
            if (max - sOb.getMax() < sOb.getMin() - min) {
                sOb.setAxis("y2");
            } else {
                sOb.setAxis("y1");
            }
        }
    }

    private float getMinvalueFromAllSeries() {
        float min = seriesObjects.get(0).getMin();
        for (int i = 1; i < seriesObjects.size(); i++) {
            if (seriesObjects.get(i).getMin() < min) {
                min = seriesObjects.get(i).getMin();
            }
        }
        return min;
    }

    private float getMaxvalueFromAllSeries() {
        float max = seriesObjects.get(0).getMin();
        for (int i = 1; i < seriesObjects.size(); i++) {
            if (seriesObjects.get(i).getMin() > max) {
                max = seriesObjects.get(i).getMax();
            }
        }
        return max;
    }

    private void setLabels(List<String> labelNames) throws SQLException {
        labels.add(Constants.DATE_TIME_COL);
        for (String l : labelNames) {
            labels.add(l);
        }
    }
}
