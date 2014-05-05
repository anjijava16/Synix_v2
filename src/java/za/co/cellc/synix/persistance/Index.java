/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.persistance;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Pierre.Venter
 */
public class Index {

    private String CREATE_INDEX_QUERY = "CREATE INDEX *indexName* ON *tableName* (*columnName*)";
    private String GET_INDEXES_QUERY = "select "
            + "a.column_name, a.index_name"
            + " from all_ind_columns a, all_indexes b"
            + " where a.index_name=b.index_name "
            + " AND lower(A.TABLE_NAME) = lower('*tableName*')"
            + " order by a.column_name";
    private Connection con;
    private String sourceTableName;
    private String destTableName;
    private List<String> indexNames = new ArrayList<>();
    private List<String> indexColumns = new ArrayList<>();

    public Index(Connection con) {
        this.con = con;
    }

    public void createIndexesBasedOnSourceTable(String sourceTableName, String destTableName) {
        this.sourceTableName = sourceTableName;
        this.destTableName = destTableName;
        getIndexes();
        createIndexes();
    }

    private void getIndexes() {
        int i = 1;
        try {
            Statement statement = con.createStatement();
            ResultSet rs = statement.executeQuery(GET_INDEXES_QUERY.replace("*tableName*", sourceTableName));
            while (rs.next()) {
                if (!indexColumns.contains(rs.getString(1))) {
                    indexNames.add("" + sourceTableName + "_" + i);
                    indexColumns.add(rs.getString(1));
                    i++;
                }
            }
            rs.close();
            statement.close();
        } catch (SQLException ex) {
            System.out.println("Error getting indexes: " + ex);
        }
    }

    private void createIndexes() {
        try {
            Statement statement = con.createStatement();
            for (int i = 0; i < indexNames.size(); i++) {
                String q = CREATE_INDEX_QUERY.replace("*indexName*", "tq_" + indexNames.get(i));
                q = q.replace("*columnName*", indexColumns.get(i));
                statement.execute(q.replace("*tableName*", destTableName));
            }
            statement.close();
        } catch (SQLException ex) {
            System.out.println(ex);
        }
    }
}
