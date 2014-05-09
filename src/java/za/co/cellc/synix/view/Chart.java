/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view;

import java.util.List;
import za.co.cellc.synix.controllers.FormulaDefController;
import za.co.cellc.synix.controllers.FormulaDefPojo;
import za.co.cellc.synix.controllers.Orchestrator;
import za.co.cellc.synix.model.GraphConstructPojo;
import za.co.cellc.synix.model.GraphConstructsSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class Chart {

//    private StringBuilder selectionStr;
    boolean test = false;
    int divIndex;
    private List<GraphConstructPojo> graphConstructPojos;
    private List<FormulaDefPojo> formulaDefPojos;

    public Chart(StringBuilder selectionSb, int divIndex, boolean test) throws Exception {
//        this.selectionStr = selectionSb;
        this.test = test;
        this.divIndex = divIndex;
        GraphConstructsSingleton.getInstance().clear();
        HtmlInputProcessor hip = HtmlInputProcessor.getInstance();
        hip.processInput(selectionSb);
        setFormulaDefPojos();
    }

    public String getHtml() throws Exception {
        StringBuilder sb = new StringBuilder();
        Orchestrator orc = new Orchestrator();
        graphConstructPojos = orc.getGraphConstructPojos(test);
        sb.append(getKpiDiv());
        sb.append(getKpiContent());
        return sb.toString();
    }

    private void setFormulaDefPojos() {
        FormulaDefController fdc = new FormulaDefController();
        formulaDefPojos = fdc.getFormulaDefPojos(test);
    }

    private String getKpiDiv() {
        StringBuilder sb = new StringBuilder();
        KpiDivMaker kpiD = new KpiDivMaker(divIndex);
        sb.append(kpiD.getHeader());
        for (int i = 0; i < graphConstructPojos.size(); i++) {
            sb.append(kpiD.getChartDivs(formulaDefPojos.get(i), graphConstructPojos.get(i), i));
        }
        return sb.toString();
    }

    private String getKpiContent() {
        StringBuilder sb = new StringBuilder();
        KpiContentMaker kpiC = new KpiContentMaker(divIndex);
        sb.append(kpiC.getHeader());
        for (int i = 0; i < graphConstructPojos.size(); i++) {
            sb.append(kpiC.getCharts(formulaDefPojos.get(i), graphConstructPojos.get(i), i));
        }
        sb.append(kpiC.getFooter());
        return sb.toString();
    }

}