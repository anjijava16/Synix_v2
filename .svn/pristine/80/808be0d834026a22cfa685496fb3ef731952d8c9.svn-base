/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.sqlquery;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;

/**
 *
 * @author Pierre.Venter
 */
public class QueryDisector implements QueryDisectorInterface {

    private List<DatabaseQueryObject> databaseQueryObjects;
    private List<List> tableNames = new ArrayList<>();
    private List<List> columnNames = new ArrayList<>();

    public QueryDisector(List<DatabaseQueryObject> databaseQueryObjects) {
        this.databaseQueryObjects = databaseQueryObjects;
        setTableNames();
        setColumnNames();
    }
//
    @Override
    public List<String> getTableNames() {
        List<String> names = new ArrayList<>();
        for (List<String> lst : tableNames) {
            for (String t : lst) {
                if (!names.contains(t)) {
                    names.add(t);
                }
            }
        }
        return names;
    }

    @Override
    public List<String> getAllColumnNamesFromQuery() {
        List<String> names = new ArrayList<>();
        for (List<String> lst : columnNames) {
            for (String c : lst) {
                if (!names.contains(c)) {
                    names.add(c);
                }
            }
        }
        return names;
    }

    private void setTableNames() {
        for (DatabaseQueryObject dqo : databaseQueryObjects) {
            addTableNamesToObject(dqo);
        }
    }

    private void addTableNamesToObject(DatabaseQueryObject dqo) {
        String q = dqo.getQuery().toLowerCase();
        String[] arFrom = q.split("from ");
        for (String af : arFrom) {
            List<String> names = new ArrayList<>();
            if (af.contains("where ")) {
                String subSelection = af.substring(0, af.indexOf("where "));
                String[] arComma = subSelection.split(",");
                for (String aC : arComma) {
                    aC = aC.trim();
                    if (!isSubQueryTableName(aC)) {
                        names.add(aC);
                    }
                }
                tableNames.add(new ArrayList<>(names));
            }
        }
    }

    private boolean isSubQueryTableName(String name) {
        return name.length() < 4;
    }

    private void setColumnNames() {
        for (DatabaseQueryObject dqo : databaseQueryObjects) {
            addColumnNamesToObject(dqo);
        }
    }

    private void addColumnNamesToObject(DatabaseQueryObject dqo) {
        String q = dqo.getQuery().toLowerCase();
        String[] arSel = q.split("select ");
        for (String af : arSel) {
            List<String> names = new ArrayList<>();
            if (af.contains("from ")) {
                String subSelection = af.substring(0, af.indexOf("from "));
                subSelection = removeQueryTitleFromQuery(subSelection);
                subSelection = introduceCommas(subSelection);
                String[] arComma = subSelection.split(",");
                for (String aC : arComma) {
                    aC = getColumnName(aC);
                    if (isValidColumn(aC)) {
                        names.add(getColumnName(aC));
                    }
                }
                addGroupingToList(af, names);
                columnNames.add(new ArrayList<>(names));
            }
        }
    }

    private void addGroupingToList(String q, List<String> lst) {
        if (q.contains("group by ")) {
            String subSelection = q.substring(q.indexOf("group by ") + 8);
            subSelection = subSelection.replace("order by ", "");
            subSelection = subSelection.replace(" ", ",");
            String[] arComma = subSelection.split(",");
            for (String aC : arComma) {
                aC = getColumnName(aC);
                if (isValidColumn(aC)) {
                    lst.add(getColumnName(aC));
                }
            }
        }
    }

    private boolean isValidColumn(String column) {
        if (column.isEmpty()) {
            return false;
        }
        if (column.contains("(") && !column.contains(")")) {
            return false;
        }
        if (column.contains(")") && !column.contains("(")) {
            return false;
        }
        char c = column.charAt(0);
        if ((c > 0 && c < 65) || (c > 90 && c < 97) || (c > 122 && c <= 127)) {
            return false;
        }
        return true;
    }

    private String removeQueryTitleFromQuery(String q) {
        q = q.trim();
        int i = q.trim().lastIndexOf(" ");
        int m = q.lastIndexOf("\"");
        int p = q.length();
        if (i == -1) {
            if (m == -1) {
                return q.substring(0, p);
            } else {
                return q.substring(0, m);
            }
        } else {
            if (m == -1) {
                return q.substring(0, i);
            } else if (m < i) {
                return q.substring(0, m);
            } else if (i < m) {
                return q.substring(0, i);
            }
        }
        return q.substring(0, p);
    }

    private String getColumnName(String s) {
        if (s.contains("(") && s.contains(")")) {
            s = s.substring(s.lastIndexOf("(") + 1);
            s = s.substring(0, s.indexOf(")"));
        }
        if (s.contains(".")) {
            s = s.substring(s.indexOf(".") + 1);
        }
        return s.trim();
    }

    private String introduceCommas(String s) {
        s = s.replace("+", ",");
        s = s.replace("-", ",");
        s = s.replace("/", ",");
        return s.replace("*", ",");
    }
}
