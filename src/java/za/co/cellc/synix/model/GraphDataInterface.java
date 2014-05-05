/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.ResultSet;

/**
 *
 * @author Pierre.Venter
 */
public interface GraphDataInterface {

    public GraphData getGraphData();

    public void dataFromRS(ResultSet rs);

    public String toString();
}
