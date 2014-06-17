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
        int chartIndex=0;
        StringBuilder sb = new StringBuilder();
        HighChartDivMaker kpiD = new HighChartDivMaker(divIndex);
        sb.append(kpiD.getHeader());
        for (int i = 0; i < hCgraphConstPojos.size(); i++) {
            if (!hCgraphConstPojos.get(i).isEmpty()) {
                kpiD = new HighChartDivMaker(divIndex);
                sb.append(kpiD.getChartDivs(formulaDefPojos.get(i), hCgraphConstPojos.get(i).get(0), chartIndex));
                chartIndex++;
            }
        }
         sb.append(kpiD.getFooter());
        return sb.toString();
    }

    @Override
    public String getKpiContent() throws Exception {
        int chartIndex=0;
        StringBuilder sb = new StringBuilder();
        HighChartContentMaker kpiC = new HighChartContentMaker(divIndex);
        sb.append(kpiC.getHeader());
        for (int i = 0; i < hCgraphConstPojos.size(); i++) {
            List<HighChartGraphConstructPojo> gcPojos = getMatchingGraphConstructPojos(formulaDefPojos.get(i));
            if (!gcPojos.isEmpty()) {
                FormuladefPojo fdp = getMatchingFormuladefPojo(gcPojos);
                kpiC = new HighChartContentMaker(divIndex);
                sb.append(kpiC.getCharts(fdp, gcPojos, chartIndex));
                chartIndex++;
            }
        }
        sb.append(kpiC.getFooter());
        return sb.toString();
    }

    private FormuladefPojo getMatchingFormuladefPojo(List<HighChartGraphConstructPojo> gcPojos) throws Exception {
        if (!gcPojos.isEmpty()) {
            String chartTitle = gcPojos.get(0).getChartTitle();
            for (FormuladefPojo fdp : formulaDefPojos) {
                if (fdp.getChartTitle().equals(chartTitle)) {
                    return fdp;
                }
            }
        }
        throw new Exception("No matching FormuladefPojo found for HighChartGraphConstructPojo: " + gcPojos.get(0).getChartTitle());
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
