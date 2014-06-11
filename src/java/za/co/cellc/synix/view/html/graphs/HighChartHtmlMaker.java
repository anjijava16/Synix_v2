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

/**
 *
 * @author Pierre.Venter
 */
public class HighChartHtmlMaker extends HtmlGraphMaker {

    public HighChartHtmlMaker(List<FormuladefPojo> formulaDefPojos, int divIndex) {
        super(formulaDefPojos, divIndex);
    }

    @Override
    public String getKpiDiv() {
        StringBuilder sb = new StringBuilder();
        HighChartDivMaker kpiD = new HighChartDivMaker(divIndex);
        sb.append(kpiD.getHeader());
        for (int i = 0; i < hCgraphConstPojos.size(); i++) {
            sb.append(kpiD.getChartDivs(formulaDefPojos.get(i), hCgraphConstPojos.get(0).get(0), i));
        }
        return sb.toString();
    }

    @Override
    public String getKpiContent() throws Exception {
        StringBuilder sb = new StringBuilder();
        HighChartContentMaker kpiC = new HighChartContentMaker(divIndex);
        sb.append(kpiC.getHeader());
        for (int i = 0; i < hCgraphConstPojos.size(); i++) {
            List<HighChartGraphConstructPojo> gcPojos = getMatchingGraphConstructPojos(formulaDefPojos.get(i));
            sb.append(kpiC.getCharts(formulaDefPojos.get(i), gcPojos, i));
        }
        sb.append(kpiC.getFooter());
        return sb.toString();
    }

    private List<HighChartGraphConstructPojo> getMatchingGraphConstructPojos(FormuladefPojo fdp) throws Exception {
        List<HighChartGraphConstructPojo> pojoList = new ArrayList<>();
        String chartTitle = fdp.getChartTitle();
        for (List<HighChartGraphConstructPojo> gcpList : hCgraphConstPojos) {
            for (HighChartGraphConstructPojo gcp : gcpList) {
                if (gcp.equals(chartTitle)) {
                    pojoList.add(gcp);
                }
            }
        }
        return pojoList;
    }
}
