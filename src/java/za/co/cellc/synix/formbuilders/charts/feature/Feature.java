/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.feature;

import java.util.List;
import za.co.cellc.synix.controllers.JSON_Parser;

/**
 *
 * @author Pierre.Venter
 */
public class Feature {

    private String[] NOT_SUPPORTED_OBJECT_NAME = {"VENDOR", "TECHNOLOGY", "PERIOD", "RNC"};
//    private String[] NOT_SUPPORTED_OPTION = {"NSN", "3G", "Hourly", "Aggregate"};
    private String[] NOT_SUPPORTED_OPTION = {"", "", "", ""};
    private StringBuilder sb;
    private JSON_Parser json_parser = new JSON_Parser();

    public Feature(StringBuilder sb) {
        this.sb = sb;
    }

    public boolean inputSelectionSupported() {
        int fails = 0;
        for (int i = 0; i < NOT_SUPPORTED_OBJECT_NAME.length; i++) {
            String name = NOT_SUPPORTED_OBJECT_NAME[i];
            if (extractFromJSON(name).contains(NOT_SUPPORTED_OPTION[i])) {
                fails++;
            }
        }
        boolean ret = fails == NOT_SUPPORTED_OPTION.length ? false : true;
        return ret;
    }

    private List<String> extractFromJSON(String objectName) {
        return json_parser.getValuesForObject(objectName, sb.toString());
    }
}
