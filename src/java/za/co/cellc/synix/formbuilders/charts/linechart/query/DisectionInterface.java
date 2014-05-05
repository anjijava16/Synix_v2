/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.linechart.query;

import java.util.List;
import za.co.cellc.synix.model.GraphLabelObject;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;

/**
 *
 * @author Pierre.Venter
 */
public interface DisectionInterface {

    public void disectQuery(DatabaseQueryObject dObject,boolean test);

    public String getChartData();

    public String getChartLabels();

    public List<GraphLabelObject> getSeriesObjects();
}
