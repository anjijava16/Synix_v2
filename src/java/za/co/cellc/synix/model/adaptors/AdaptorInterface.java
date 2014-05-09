/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.adaptors;

import java.util.List;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.model.GraphDataPojo;

/**
 *
 * @author Pierre.Venter
 */
public interface AdaptorInterface {

    public List<GraphData> getGdList() throws Exception;

    public String getGraphLabels() throws Exception;

    public void convertDataListToGraphDataObjects() throws Exception;

    public void convertSelectionToGraphLabels() throws Exception;

}
