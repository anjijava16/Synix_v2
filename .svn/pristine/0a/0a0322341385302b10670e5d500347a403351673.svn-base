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
public class DygraphWithFormatting implements DygraphFormattingInterface {

//    private String[] BTS_IDS = {"BTS_GID"};
    private GraphObject gObject;
    private DatabaseQueryObject dObject;
    private String query;
    private boolean test=false;

    public DygraphWithFormatting(GraphObject gObject, DatabaseQueryObject dObject) {
        this.gObject = gObject;
        this.dObject = dObject;
    }

    @Override
    public String parseSQL(StringBuilder sb, boolean test) {
        this.test = test;
//        TempTable temp = new TempTable(sb,gObject, dObject);
//        temp.createTempTable();
//        query=temp.getUpdatedQuery();
        query = dObject.getQuery();
        return createSQL_With_Clause();
    }

//    private String createFromClause() {
//        String select = " FROM t0";
//        for (int i = 1; i < gObject.getUniqueCellGroupID().size(); i++) {
//            select += " left join t" + i + " on (t0." + gObject.getDateColumnName() + " = t" + i + "." + gObject.getDateColumnName() + ") ";
//        }
//        return select;
//    }
//    
//    private String createSelectClause() {
//        String select = "SELECT T0." + gObject.getDateColumnName();
//        for (int i = 0; i < gObject.getUniqueCellGroupID().size(); i++) {
//            select += ",t" + i + "." + gObject.getKpiName() + " \"group_" + i + "\"";
//        }
//        return select;
//    }
    private String createSQL_With_Clause() {
        String from = getFromTableName(query);
        int groupIndex = 0;
        String with = "";
        String ands = "";
        for (int k = 0; k < gObject.getSelectedObjectValues(groupIndex).size(); k++) {
            String operator = (k == 0) ? WHERE_OPERANDS[0] : WHERE_OPERANDS[1];
            ands += operator + from + "." + dObject.getGIDname(gObject.getSelectedObjectNames().get(k)) + "='" + dObject.getGIDvalue(gObject.getSelectedObjectValues(groupIndex).get(k),test) + "' ";
        }
        ands += ")";
        with = insertAndString(query, ands);
        if (!dObject.getLevel().equalsIgnoreCase("CELL")) {
            with = removeBTS_grouping(with);
        }
        return with;
    }

    private String insertAndString(String query, String andString) {
        List<Integer> indexes = getInsertANDindex(query);
        for (int i = indexes.size() - 1; i >= 0; i--) {
            query = query.substring(0, indexes.get(i)) + andString + " " + query.substring(indexes.get(i));
        }
        return query;
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

    private String removeBTS_grouping(String q) {
        int i = q.toUpperCase().indexOf("GROUP BY");
        int j = q.toUpperCase().indexOf("ORDER BY");
        if (i > -1 && j > -1) {
            String order_by = q.substring(j);
            q = q.substring(0, i) + "GROUP BY " + getFromTableName(q) + "." + dObject.getDate_column_name() + " " + order_by;
        }
        return q;
    }

//    private String getGIDvalue(String value) {
//        if (dObject.getLevel().equalsIgnoreCase("BSC")) {
//            if (query.toUpperCase().contains("BSC_GID")) {
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
//    
//    private String getGIDname(String name) {
//        if (dObject.getLevel().equalsIgnoreCase("BSC") && query.toUpperCase().contains("BSC_GID")) {
//            return "BSC_GID";
//        } else if (dObject.getLevel().equalsIgnoreCase("RNC")) {
////            if(query.toUpperCase().contains("RNC_ID")){
//            return "RNC_ID";
////            }
//        }
//        return name;
//    }
    private List<Integer> getInsertANDindex(String s) {
        List<Integer> indexes = new ArrayList<>();
        int len = "GROUP BY".length();
        for (int i = 0; i < s.toCharArray().length - len; i++) {
            String val = s.substring(i, i + len);
            if (val.equalsIgnoreCase("GROUP BY")) {
                indexes.add(i);
            }
        }
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
//    private String addOrderBy(String s) {
//        if (s.toUpperCase().contains(" ORDER BY ")) {
//            return s;
//        } else {
//            return s + gObject.getOrderBy();
//        }
//    }
}
