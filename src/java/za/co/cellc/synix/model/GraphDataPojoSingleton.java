/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Pierre.Venter
 */
public class GraphDataPojoSingleton {

    private static GraphDataPojoSingleton instance = null;
    private static List<GraphDataPojo> graphDataPojos = new ArrayList<>();

    private GraphDataPojoSingleton() {
    }

    public static GraphDataPojoSingleton getInstance() {
        if (instance == null) {
            instance = new GraphDataPojoSingleton();
        }
        return instance;
    }

    public void addGraphDataPojo(GraphDataPojo gdp) {
        graphDataPojos.add(gdp);
    }

    public List<GraphDataPojo> getGraphDataPojos() {
        return graphDataPojos;
    }

    public void clear() {
        graphDataPojos = new ArrayList<>();
    }

}
