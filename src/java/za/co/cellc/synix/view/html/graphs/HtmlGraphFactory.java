/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view.html.graphs;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import za.co.cellc.synix.controllers.graphconstruct.highchart.HighChartGraphConstructPojo;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class HtmlGraphFactory {

    List<List<HighChartGraphConstructPojo>> hCgraphConstPojos = new ArrayList<>();
    List<GraphConstructPojo> graphConstPojos = new ArrayList<>();

    public void setGraphConstPojos(List<GraphConstructPojo> graphConstPojos) {
        this.graphConstPojos = graphConstPojos;
    }

    public void setHCgraphConstPojos(List<List<HighChartGraphConstructPojo>> hCgraphConstPojos) {
        this.hCgraphConstPojos = hCgraphConstPojos;
    }

    public HtmlGraphMaker create(HtmlInputProcessor htmlIp, String selection, List<FormuladefPojo> formulaDefPojos, int divIndex) {
        HtmlGraphMaker hgm;
        switch (selection) {
            case "DYGRAPH":
                hgm = new DygraphHtmlMaker(htmlIp, formulaDefPojos, divIndex);
                hgm.setGraphConstPojos(graphConstPojos);
                break;

            case "HIGH_CHART":
                hgm = new HighChartHtmlMaker(htmlIp, formulaDefPojos, divIndex);
                hgm.setHCgraphConstPojos(hCgraphConstPojos);
                break;
            default:
                throw new AssertionError();
        }
        return hgm;
    }
}
