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
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class DygraphHtmlMaker extends HtmlGraphMaker {

    public DygraphHtmlMaker(HtmlInputProcessor htmlIp, List<FormuladefPojo> formulaDefPojos, int divIndex) {
        super(htmlIp, formulaDefPojos, divIndex);
    }

    @Override
    public String getKpiDiv() {
        StringBuilder sb = new StringBuilder();
        DygraphDivMaker kpiD = new DygraphDivMaker(divIndex);
        sb.append(kpiD.getHeader());
        for (int i = 0; i < graphConstPojos.size(); i++) {
            sb.append(kpiD.getChartDivs(formulaDefPojos.get(i), graphConstPojos.get(i), i));
        }
        return sb.toString();
    }

    @Override
    public String getKpiContent() throws Exception {
        StringBuilder sb = new StringBuilder();
        DygraphContentMaker kpiC = new DygraphContentMaker(htmlIp, divIndex);
        sb.append(kpiC.getHeader());
        for (int i = 0; i < graphConstPojos.size(); i++) {
            GraphConstructPojo gcp = getMatchingGraphConstructPojo(formulaDefPojos.get(i));
            sb.append(kpiC.getCharts(formulaDefPojos.get(i), gcp, i));
        }
        sb.append(kpiC.getFooter());
        return sb.toString();
    }

    private GraphConstructPojo getMatchingGraphConstructPojo(FormuladefPojo fdp) throws Exception {
        String chartTitle = fdp.getChartTitle();
        for (GraphConstructPojo gcp : graphConstPojos) {
            if (gcp.equals(chartTitle)) {
                return gcp;
            }
        }
        throw new Exception("Matching GraphConstructPojo not found: " + chartTitle);
    }
}
