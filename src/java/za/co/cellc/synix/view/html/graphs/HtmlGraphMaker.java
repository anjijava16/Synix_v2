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
public class HtmlGraphMaker {

    protected List<List<HighChartGraphConstructPojo>> hCgraphConstPojos = new ArrayList<>();
    protected List<GraphConstructPojo> graphConstPojos = new ArrayList<>();
    protected List<FormuladefPojo> formulaDefPojos;
    protected int divIndex;
    protected HtmlInputProcessor htmlIp;

    public HtmlGraphMaker(HtmlInputProcessor htmlIp, List<FormuladefPojo> formulaDefPojos, int divIndex) {
        this.htmlIp = htmlIp;
        this.formulaDefPojos = formulaDefPojos;
        this.divIndex = divIndex;
    }

    public void setGraphConstPojos(List<GraphConstructPojo> graphConstPojos) {
        this.graphConstPojos = graphConstPojos;
    }

    public void setHCgraphConstPojos(List<List<HighChartGraphConstructPojo>> hCgraphConstPojos) {
        this.hCgraphConstPojos = hCgraphConstPojos;
    }

    public String getKpiDiv() {
        return null;
    }

    public String getKpiContent() throws Exception {
        return null;
    }
}
