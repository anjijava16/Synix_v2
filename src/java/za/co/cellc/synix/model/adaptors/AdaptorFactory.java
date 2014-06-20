/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.adaptors;

import java.security.InvalidParameterException;
import java.sql.ResultSet;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class AdaptorFactory {

    public static Adaptor create(HtmlInputProcessor htmlIp, int choice, String groupName, ResultSet rs, boolean test) throws Exception {
        switch (choice) {
            case Constants.LABEL_ADAPTOR:
                return new LabelAdaptor(htmlIp, rs, test);
            case Constants.AGGREGATION_ADAPTOR:
                return new AggregationAdaptor(htmlIp, rs, groupName, test);
            case Constants.NON_AGGREGATION_ADAPTOR:
                return new NonAggregationAdaptor(htmlIp, rs, test);
            case Constants.DRILL_DOWN_ADAPTOR:
                return new DrillDownAdaptor(htmlIp, rs, test);
            default:
                System.out.println("Unknown parameter: " + choice);
                throw new InvalidParameterException("Unknown parameter: " + choice);
        }

    }
}
