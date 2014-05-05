/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.query;

import za.co.cellc.synix.formbuilders.charts.dygraph.DygraphFormatting;
import za.co.cellc.synix.formbuilders.charts.dygraph.DygraphFormattingInterface;
import za.co.cellc.synix.formbuilders.charts.dygraph.DygraphGroupFormatting;
import za.co.cellc.synix.formbuilders.charts.dygraph.DygraphWithFormatting;
import za.co.cellc.synix.formbuilders.charts.dygraph.GraphObject;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;

/**
 *
 * @author z0006cpz
 */
public class Query extends QueryObject {

//    private String ORDER_BY = "ORDER BY PERIOD_START_TIME";
//    private String level;
//    private DatabaseQueryObject dObject;
//    private HTML_Inputs inputs;

    public Query(StringBuilder JSON_sb) {
        super(JSON_sb);
    }

    public void parse(DatabaseQueryObject dObject,GraphObject gObject,boolean test) {
//        this.level = dObject.getLevel();
//        this.dObject = dObject;
//        inputs = new HTML_Inputs(JSON_sb);
        String sql = "";

        try {
            DygraphFormattingInterface formattingInterface;
            if (dObject.getQuery().toUpperCase().startsWith("WITH")) {
                formattingInterface = new DygraphWithFormatting(gObject, dObject);
            } else {
                if (gObject.getUniqueCellGroupID().isEmpty()) {
                    formattingInterface = new DygraphFormatting(gObject, dObject);
                } else {
                    formattingInterface = new DygraphGroupFormatting(gObject, dObject);
                }
            }
            sql = formattingInterface.parseSQL(JSON_sb,test);
        } catch (Exception e) {
            System.out.println("Error formatting query. Object: " + gObject);
        }
        dObject.setQuery(upDateQuery_Date(sql));
    }

//    private void initGraphObject() {
//        List<String> selectedValues = inputs.getNe();
//        gObject.setSelectedObjectValues(selectedValues);
//        gObject.setSelectedObjectNames(getObjectNames());
//    }

    
//    private void addBasicGroupingToAggregatedElements() {
//        String basicGrouping = "~0";
//        if (aggregate) {
//            for (int i = 0; i < ne.size(); i++) {
//                if (!elementAlreadyGrouped(ne.get(i))) {
//                    ne.set(i, ne.get(i) + basicGrouping);
//                }
//            }
//        }
//    }
//    private boolean elementAlreadyGrouped(String e) {
//        return e.contains("~");
//    }
//
//    private void parseJSON() {
//        switch (level) {
//            case "BSC":
//                ne.addAll(extractFromJSON("bsc"));
//                break;
//            case "RNC":
//                ne.addAll(extractFromJSON("rnc"));
//                break;
//            case "CELL":
//                if (dObject.getTech().equalsIgnoreCase("2G")) {
//                    ne.addAll(extractFromJSON("twoGNSNCellgroups"));
//                }
//                if (dObject.getTech().equalsIgnoreCase("3G")) {
//                    ne.addAll(extractFromJSON("threeGNSNCellgroups"));
//                }
//                if (ne.isEmpty()) {
//                    ne.addAll(extractFromJSON("cells"));
//                }
//                break;
//            default:
//        }
//        setAggregated(ne);
//        addBasicGroupingToAggregatedElements();
//    }
//
//    private void setAggregated(List<String> lst) {
//        if (lst.contains("Aggregate")) {
//            lst.remove("Aggregate");
//            aggregate = true;
//        } else if (!lst.isEmpty()) {
//            aggregate = lst.get(0).contains("~");
//        }
//    }
//    private List<String> extractFromJSON(String objectName) {
//        JSON_Parser json_parser = new JSON_Parser();
//        return json_parser.getValuesForObject(objectName, JSON_sb.toString());
//    }
}
