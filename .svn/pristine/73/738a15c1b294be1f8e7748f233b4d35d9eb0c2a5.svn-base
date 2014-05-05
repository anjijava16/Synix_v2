/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.persistance;

import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.sqlquery.QueryDisector;
import za.co.cellc.synix.formbuilders.charts.HTML_Inputs;
import za.co.cellc.synix.formbuilders.charts.dygraph.GraphObject;
import static za.co.cellc.synix.formbuilders.charts.dygraph.DygraphFormattingInterface.WHERE_OPERANDS;
import za.co.cellc.synix.formbuilders.charts.linechart.DatabaseQueryObject;
import za.co.cellc.synix.persistance.statements.Temp_StatementInterface;
import static za.co.cellc.synix.persistance.statements.Temp_StatementInterface.stmnt;

/**
 *
 * @author Pierre.Venter
 */
public class TempTable implements Temp_StatementInterface {

    private String TABLE_NAME_PREFIX = "TT_";
    private int WITH_GROUP_TITLE_LEN = 3;
    private List<DatabaseQueryObject> dObjects;
    private List<GraphObject> gObjects;
    private Statement statement;
    private List<String> tableNames = new ArrayList<>();
    private List<String> tableNamesCaseSensitive = new ArrayList<>();
    private List<String> tableNamesLimitedLen = new ArrayList<>();
    private List<String> whereClauses = new ArrayList<>();
    private List<String> dateClauses = new ArrayList<>();
    private List<String> columnStrings = new ArrayList<>();
    private HTML_Inputs inputs;
    private List<String> uniqueTableNames = new ArrayList<>();
    private QueryDisector qDisect;

    public TempTable(StringBuilder JSON_sb, List<GraphObject> gObjects, List<DatabaseQueryObject> dObject) {
        this.gObjects = gObjects;
        this.dObjects = dObject;
        this.statement = stmnt.createStatement();
        inputs = new HTML_Inputs(JSON_sb);
        qDisect = new QueryDisector(dObjects);
    }

    public void createTempTables() {
        for (int i = 0; i < dObjects.size(); i++) {
            setTableNames(i);
        }
        createTables();
//        createIndexes();
        for (int i = 0; i < dObjects.size(); i++) {
            dObjects.get(i).setStatement(statement);
            updateGraphObject(i);
        }
    }

    public List<DatabaseQueryObject> getUpdated_dObjects() {
        return dObjects;
    }

//    public String getUpdatedQuery(int id) {
//        String q = dObjects.get(id).getQuery();
//        for (String t : tableNamesCaseSensitive) {
//            q = q.replace(t, TABLE_NAME_PREFIX + t);
//        }
//        return q;
//    }
    public void clearTempTables() {
        try {
            statement.executeUpdate("commit");
            statement.close();
        } catch (SQLException ex) {
            Logger.getLogger(TempTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void updateGraphObject(int id) {
        for (int i = 0; i < tableNamesLimitedLen.size(); i++) {
            String q = dObjects.get(id).getQuery();
            q = q.replace(tableNamesCaseSensitive.get(i), TABLE_NAME_PREFIX + tableNamesLimitedLen.get(i));
            dObjects.get(id).setQuery(q);
        }
    }

    private void createTables() {
        int added;
        for (int i = 0; i < tableNamesCaseSensitive.size(); i++) {
            try {
                statement.execute("create global temporary table " + TABLE_NAME_PREFIX + tableNamesLimitedLen.get(i) + " on commit preserve rows as "
                        + "select " + columnStrings.get(i) + " from " + tableNamesCaseSensitive.get(i) + " " + dateClauses.get(i) + " " + whereClauses.get(i));
            } catch (SQLException ex) {
                try {
                    int del = statement.executeUpdate("delete from " + TABLE_NAME_PREFIX + tableNamesLimitedLen.get(i) + " " + dateClauses.get(i) + " " + whereClauses.get(i));
                    added = statement.executeUpdate("insert into " + TABLE_NAME_PREFIX + tableNamesLimitedLen.get(i)
                            + " select " + columnStrings.get(i) + " from " + tableNamesCaseSensitive.get(i) + " " + dateClauses.get(i) + " " + whereClauses.get(i));
                } catch (SQLException ex1) {
                    Logger.getLogger(TempTable.class.getName()).log(Level.SEVERE, null, ex1);
                }
            }
        }
    }

    private String limitTableName(String name) {
        if (name.length() >= 20) {
            return name.substring(name.length() - 20, name.length());
        }
        return name;
    }

    private void createIndexes() {
        Index index = new Index(stmnt.getCon());
        for (String t : tableNamesCaseSensitive) {
            index.createIndexesBasedOnSourceTable(t, TABLE_NAME_PREFIX + t);
        }
    }

    private void setDateClause(int id) {
        String dateStr = "WHERE " + dObjects.get(id).getDate_column_name() + " >= TO_DATE('*timeFrom*','dd/mm/yyyy hh24:mi:ss') AND "
                + dObjects.get(id).getDate_column_name() + " <= TO_DATE('*timeTo*','dd/mm/yyyy hh24:mi:ss')";
        dateStr = dateStr.replace("*timeFrom*", inputs.getFromDate());
        dateStr = dateStr.replace("*timeTo*", inputs.getToDate());
        dateClauses.add(dateStr);
    }

    private void setWhereClause(int id) {
        String where = "";
        if (!gObjects.get(id).getUniqueCellGroupID().isEmpty()) {
//            String from = getFromTableName(dObject.getQuery());
            for (int i = 0; i < gObjects.get(id).getUniqueCellGroupID().size(); i++) {
                for (int k = 0; k < gObjects.get(id).getSelectedObjectValues(i).size(); k++) {
                    String operator = ((i == 0 && k == 0)) ? WHERE_OPERANDS[0] : WHERE_OPERANDS[1];
                    where += operator + dObjects.get(id).getGIDname(gObjects.get(id).getSelectedObjectNames().get(k)) + "='" + dObjects.get(id).getGIDvalue(gObjects.get(id).getSelectedObjectValues(i).get(k),false) + "' ";
                }
            }
            where += ")";
        } else {
            for (int k = 0; k < gObjects.get(id).getSelectedObjectValues().size(); k++) {
                String operator = (k == 0) ? WHERE_OPERANDS[0] : WHERE_OPERANDS[1];
                where += operator + dObjects.get(id).getGIDname(gObjects.get(id).getSelectedObjectNames().get(k)) + "='" + dObjects.get(id).getGIDvalue(gObjects.get(id).getSelectedObjectValues().get(k),false) + "' ";
            }
            where += ")";
        }
        whereClauses.add(where);
    }

//    private String getFromTableName(String q) {
//        int f = q.toUpperCase().lastIndexOf("FROM ");
//        String s = q.substring(f);
//        int c = s.indexOf(",");
//        int w = s.toUpperCase().indexOf("WHERE ");
//        int e = (c < w) ? c : w;
//        int space = s.indexOf(" ");
//        return (s.substring(space, e)).trim();
//    }
    private void setTableNames(int id) {
        String q = dObjects.get(id).getQuery();
        List<Integer> indexes = getFromIndexes(id);
        for (int i = 0; i < indexes.size(); i++) {
            int end = getEndOfFromStatement(indexes.get(i), id);
            String[] ar = q.substring(indexes.get(i), end).split(",");
            for (String t : ar) {
                t = t.replace("\n", "").trim();
                if (!tableNames.contains(t.toUpperCase()) && t.length() > WITH_GROUP_TITLE_LEN) {
                    if (!uniqueTableNames.contains(t.toUpperCase().trim())) {
                        List<String> cols = qDisect.getAllColumnNamesFromQuery();
                        DB_Structure dbs = new DB_Structure(cols,false);
                        columnStrings.add(dbs.getStringOfColumnNames(t));
                        tableNames.add(t.toUpperCase());
                        tableNamesCaseSensitive.add(t);
                        uniqueTableNames.add(t.toUpperCase().trim());
                        tableNamesLimitedLen.add(limitTableName(t));
                        setDateClause(i);
                        setWhereClause(i);
                    }
                }
            }
        }
    }

    private int getEndOfFromStatement(int index, int id) {
        String q = dObjects.get(id).getQuery();
        for (int i = index; i < q.length() - 6; i++) {
            if (q.substring(i, i + 6).equalsIgnoreCase("WHERE ")) {
                return i;
            }
        }
        return q.length();
    }

//    private int getGroupBy_OrderBy_index(String s) {
//        for (int i = 0; i < s.toCharArray().length - len; i++) {
//            String val = s.substring(i, i + len);
//            if (val.equalsIgnoreCase("FROM ")) {
//                indexes.add(i);
//            }
//        }
//        int i = s.toUpperCase().indexOf("GROUP BY");
//        int j = s.toUpperCase().indexOf("ORDER BY");
//        if (i < j) {
//            return i;
//        } else if (i > j) {
//            return j;
//        }
//        return s.length();
//    }
    private List<Integer> getFromIndexes(int id) {
        List<Integer> indexes = new ArrayList<>();
        int len = "FROM ".length();
        for (int i = 0; i < dObjects.get(id).getQuery().toCharArray().length - len; i++) {
            String val = dObjects.get(id).getQuery().substring(i, i + len);
            if (val.equalsIgnoreCase("FROM ")) {
                indexes.add(i + 5);
            }
        }
        return indexes;
    }
}
