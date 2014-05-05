/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.dygraph;

import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;
import za.co.cellc.synix.model.BscNameSingleton;
import za.co.cellc.synix.model.BtsNameSingleton;
import za.co.cellc.synix.model.RncNameSingleton;
import za.co.cellc.synix.model.WcellNameSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class DygraphFormatting implements DygraphFormattingInterface {

    private GraphObject gObject;
    private DatabaseQueryObject dObject;
    private boolean test=false;

    public DygraphFormatting(GraphObject gObject, DatabaseQueryObject dObject) {
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
        for (int i = 1; i < gObject.getSelectedObjectValues().size(); i++) {
            select += " left join t" + i + " on (t0." + dObject.getDate_column_name() + " = t" + i + "." + dObject.getDate_column_name() + ") ";
        }
        return select;
    }

    private String createSelectClause() {
        String select = "SELECT T0." + dObject.getDate_column_name();
        for (int i = 0; i < gObject.getSelectedObjectValues().size(); i++) {
            select += ",t" + i + "." + dObject.getKpiName() + " \"" + shortenObjectName(getSubObject(gObject.getSelectedObjectDisplayNames().get(i))) + "\"";
        }
        return select;
    }

    private String shortenObjectName(String name) {
        if (name.length() > MAX_OBJECT_NAME_LEN) {
            return name.substring(0, MAX_OBJECT_NAME_LEN);
        }
        return name;
    }

    private String getSubObject(String object) {
        if (object.contains(OBJECT_SPLITTER)) {
            return object.substring(object.indexOf(OBJECT_SPLITTER) + OBJECT_SPLITTER.length());
        }
        return object;
    }

    private String createSQL_With_Clause() {
        String from = getFromTableName(dObject.getQuery());
        String withString = "WITH ";
        for (int i = 0; i < gObject.getSelectedObjectValues().size(); i++) {
            String with = "";
            String[] values = gObject.getSelectedObjectValues().get(i).split(OBJECT_SPLITTER);
            String[] names = gObject.getSelectedObjectNames().get(0).split(OBJECT_SPLITTER);
            with += "t" + i + " AS (" + dObject.getQuery();
            String ands = "";
            for (int j = 0; j < values.length; j++) {
                ands += " AND " + from + "." + getGIDname(names[j]) + "='" + getGIDvalue(values[j]) + "' ";
            }
            int index = getInsertANDindex(with);
            with = with.substring(0, index) + ands + with.substring(index);
            with = addOrderBy(with);
            with += "),";
            withString += with;
        }
        return withString.substring(0, withString.length() - 1);
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

    private String getGIDvalue(String value) {
        if (dObject.getLevel().equalsIgnoreCase("BSC")) {
            if (dObject.getQuery().toUpperCase().contains("BSC_GID")) {
                return BscNameSingleton.getInstance(test).getGID(value);
            } else {
                return value;
            }
        } else if (dObject.getLevel().equalsIgnoreCase("RNC")) {
            return RncNameSingleton.getInstance(test).getGID(value);
        } else if (dObject.getLevel().equalsIgnoreCase("CELL") && dObject.getTech().equalsIgnoreCase("2G")) {
            return BtsNameSingleton.getInstance(test).getGID(value);
        } else if (dObject.getLevel().equalsIgnoreCase("CELL") && dObject.getTech().equalsIgnoreCase("3G")) {
            return WcellNameSingleton.getInstance(test).getGID(value);
        }
        return "";
    }

    private String getGIDname(String name) {
        if (dObject.getLevel().equalsIgnoreCase("BSC") && dObject.getQuery().toUpperCase().contains("BSC_GID")) {
            return "BSC_GID";
        } else if (dObject.getLevel().equalsIgnoreCase("RNC")) {
//            if(dObject.getQuery().toUpperCase().contains("RNC_ID")){
            return "RNC_ID";
//            }
        }
        return name;
    }

    private int getInsertANDindex(String s) {
        int i = s.toUpperCase().indexOf("GROUP BY");
        int j = s.toUpperCase().indexOf("ORDER BY");
        if (i < j) {
            return i;
        } else if (i > j) {
            return j;
        }
        return s.length();
    }

    private String addOrderBy(String s) {
        if (s.toUpperCase().contains(" ORDER BY ")) {
            return s;
        } else {
            return s + gObject.getOrderBy();
        }
    }
}
