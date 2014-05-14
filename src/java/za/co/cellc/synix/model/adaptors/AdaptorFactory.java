/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.adaptors;

import java.security.InvalidParameterException;
import java.sql.ResultSet;
import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class AdaptorFactory {

    public static Adaptor create(int choice, String groupName, ResultSet rs, boolean test) throws Exception {
        switch (choice) {
            case Constants.LABEL_ADAPTOR:
                return new LabelAdaptor(rs, test);
            case Constants.AGGREGATION_ADAPTOR:
                return new AggregationAdaptor(rs, groupName, test);
            case Constants.NON_AGGREGATION_ADAPTOR:
                return new NonAggregationAdaptor(rs, test);
            case Constants.DRILL_DOWN_ADAPTOR:
                return new DrillDownAdaptor(rs, test);
            default:
                System.out.println("Unknown parameter: " + choice);
                throw new InvalidParameterException("Unknown parameter: " + choice);
        }

    }
}
