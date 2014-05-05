/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.dygraph;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;

/**
 *
 * @author Pierre.Venter
 */
public class DygraphGroupFormatting implements DygraphFormattingInterface {

    private GraphObject gObject;
    private DatabaseQueryObject dObject;
    private boolean test=false;

    public DygraphGroupFormatting(GraphObject gObject, DatabaseQueryObject dObject) {
        this.gObject = gObject;
        this.dObject = dObject;
    }

    @Override
    public String parseSQL(StringBuilder sb, boolean test) {
        this.test = test;
        return createSQL_With_Clause() + createSelectClause() + createFromClause();
    }

    private String createFromClause() {
        String select = " FROM t0";
        for (int i = 1; i < gObject.getUniqueCellGroupID().size(); i++) {
            select += " left join t" + i + " on (t0." + dObject.getDate_column_name() + " = t" + i + "." + dObject.getDate_column_name() + ") ";
        }
        return select;
    }

    private String createSelectClause() {
        String select = "SELECT T0." + dObject.getDate_column_name();
        for (int i = 0; i < gObject.getUniqueCellGroupID().size(); i++) {
            select += ",t" + i + "." + dObject.getKpiName() + " \"group_" + gObject.getUniqueCellGroupID().get(i) + "\"";
        }
        return select;
    }

    private String createSQL_With_Clause() {
        String from = getFromTableName(dObject.getQuery());
        String withString = "WITH ";
        for (int i = 0; i < gObject.getUniqueCellGroupID().size(); i++) {
            String with = "";
            with += "t" + i + " AS (" + dObject.getQuery();
            String ands = "";
            for (int k = 0; k < gObject.getSelectedObjectValues(i).size(); k++) {
                String operator = (k == 0) ? WHERE_OPERANDS[0] : WHERE_OPERANDS[1];
                ands += operator + from + "." + dObject.getGIDname(gObject.getSelectedObjectNames().get(k)) + "='" + dObject.getGIDvalue(gObject.getSelectedObjectValues(i).get(k),test) + "' ";
            }
            ands += ")";
            with = insertAndString(with, ands);
            with = addOrderBy(with);
            with += "),";
            withString += with;
            Grouping grouping = new Grouping(withString);
            if (dObject.getLevel().equalsIgnoreCase("CELL")) { //needed for daily/hourly agg cells
                withString = grouping.removeObjectGrouping("BTS_GID");
            }
            if (dObject.getLevel().equalsIgnoreCase("BSC")) {
                withString = grouping.removeObjectGrouping("BSC_GID");
            }
            if (dObject.getLevel().equalsIgnoreCase("RNC")) {
                withString = grouping.removeObjectGrouping("RNC_ID");
            }
        }
        return withString.substring(0, withString.length() - 1);
    }

    private String insertAndString(String query, String andString) {
        List<Integer> indexes = getInsertANDindex(query);
        for (int i = indexes.size() - 1; i >= 0; i--) {
            query = query.substring(0, indexes.get(i)) + andString + " " + query.substring(indexes.get(i));
        }
        return query;
    }

    private List<Integer> getInsertANDindex(String s) {
        List<Integer> indexes = getGroupByIndexes(s);
        if (indexes.isEmpty()) {
            int i = s.toUpperCase().indexOf("GROUP BY");
            int j = s.toUpperCase().indexOf("ORDER BY");
            if (i < j) {
                indexes.add(i);
            } else if (i > j) {
                indexes.add(j);
            }
            indexes.add(s.length());
        }
        return indexes;
    }

    private List<Integer> getGroupByIndexes(String s) {
        List<Integer> indexes = new ArrayList<>();
        int len = "GROUP BY".length();
        for (int i = 0; i < s.toCharArray().length - len; i++) {
            String val = s.substring(i, i + len);
            if (val.equalsIgnoreCase("GROUP BY")) {
                indexes.add(i);
            }
        }
        return indexes;
    }

    private String getFromTableName(String q) {
        int f = q.toUpperCase().lastIndexOf("FROM ");
        String s = q.substring(f);
        int c = s.indexOf(",");
        int w = s.toUpperCase().indexOf("WHERE ");
        int e = (c < w) ? c : w;
        int space = s.indexOf(" ");
        return (s.substring(space, e)).trim();
    }

//    private String getGIDvalue(String value) {
//        if (dObject.getLevel().equalsIgnoreCase("BSC")) {
//            if (dObject.getQuery().toUpperCase().contains("BSC_GID")) {
//                return BSC_Name.getInstance().getGID(value);
//            } else {
//                return value;
//            }
//        } else if (dObject.getLevel().equalsIgnoreCase("RNC")) {
//            return RNC_Name.getInstance().getGID(value);
//        } else if (dObject.getLevel().equalsIgnoreCase("CELL") && dObject.getTech().equalsIgnoreCase("2G")) {
//            return BTS_Name.getInstance().getGID(value);
//        } else if (dObject.getLevel().equalsIgnoreCase("CELL") && dObject.getTech().equalsIgnoreCase("3G")) {
//            return WBTS_Name.getInstance().getGID(value);
//        }
//        return "";
//    }

//    private String getGIDname(String name) {
//        if (dObject.getLevel().equalsIgnoreCase("BSC") && dObject.getQuery().toUpperCase().contains("BSC_GID")) {
//            return "BSC_GID";
//        } else if (dObject.getLevel().equalsIgnoreCase("RNC")) {
//            return "RNC_ID";
//        }
//        return name;
//    }

    private String addOrderBy(String s) {
        if (s.toUpperCase().contains(" ORDER BY ")) {
            return s;
        } else {
            return s + gObject.getOrderBy();
        }
    }
}
