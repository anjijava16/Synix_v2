/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

/**
 *
 * @author Pierre.Venter
 */
public class GraphConstructPojo {

    String data;
    String label;

    public GraphConstructPojo(String data, String label) {
        this.data = data;
        this.label = label;
    }

    public String getData() {
        return data;
    }

    public String getLabel() {
        return label;
    }
}
