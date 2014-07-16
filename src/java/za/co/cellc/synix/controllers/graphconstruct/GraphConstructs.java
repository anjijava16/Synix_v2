/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package za.co.cellc.synix.controllers.graphconstruct;

/**
 *
 * @author Pierre.Venter
 */
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.controllers.graphconstruct.highchart.HighChartGraphConstructPojo;

/**
 *
 * @author Pierre.Venter
 */
public class GraphConstructs {

    private static List<GraphConstructPojo> graphConstPojos = new ArrayList<>();
    private static List<List<HighChartGraphConstructPojo>> hCgraphConstPojos = new ArrayList<>();

    public GraphConstructs() {
    }

    public void addGraphDataPojo(GraphConstructPojo gdp) {
        graphConstPojos.add(gdp);
    }

    public List<List<HighChartGraphConstructPojo>> getHCgraphConstPojos() {
        return hCgraphConstPojos;
    }

    public void addHcGraphDataPojos(List<HighChartGraphConstructPojo> gdPojos) {
        hCgraphConstPojos.add(gdPojos);
    }

    public List<GraphConstructPojo> getGraphDataPojos() {
        return graphConstPojos;
    }

    public void clear() {
        graphConstPojos = new ArrayList<>();
        hCgraphConstPojos = new ArrayList<>();
    }

}