/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.adaptors;

import java.sql.ResultSet;
import java.util.List;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.model.GraphDataPojo;

/**
 *
 * @author Pierre.Venter
 */
public class AggregationAdaptor extends Adaptor implements AdaptorInterface {

    private String graphLabels;

    public AggregationAdaptor(ResultSet rs, boolean test) throws Exception {
        super(rs, test);
    }

    @Override
    public List<GraphData> getGdList() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getGraphLabels() {
        if (graphLabels == null) {
            convertSelectionToGraphLabels();
        }
        return graphLabels;
    }

    @Override
    public void convertDataListToGraphDataObjects() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void convertSelectionToGraphLabels() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
