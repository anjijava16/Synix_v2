/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.util.List;

/**
 *
 * @author Pierre.Venter
 */
public class GraphDataPojo {

    String label;
    List<String> data;
    List<String> dateTime;

    public GraphDataPojo(List<String> data, List<String> dateTime, String label) {
        this.label = label;
        this.data = data;
        this.dateTime = dateTime;
    }

    public String getLabel() {
        return label;
    }

    public List<String> getData() {
        return data;
    }

    public List<String> getDateTime() {
        return dateTime;
    }

}
