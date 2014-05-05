/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.persistance.statements;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.persistance.Database_Temp;

/**
 *
 * @author Pierre.Venter
 */
public class Temp_Statement {

    private String GET_QUERY = "SELECT Query_ FROM Queries WHERE Query_Name = '*queryName*' and level_ = '*level*'";
    private Connection con;
    private Statement executeQueryStmnt;

    public Temp_Statement() {
        con = Database_Temp.getInstance().getCon();
    }

    public Connection getCon() {
        return con;
    }

    public ResultSet executeStatement(String name) {
        try {
            CallableStatement cs = con.prepareCall(name + ";");
            ResultSet rs = cs.executeQuery();
            return rs;
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public String getQuery(String name, String level) {
        String query = "";
        try {
            try (Statement stmnt = con.createStatement()) {
                ResultSet rs = stmnt.executeQuery(initQuery(name, level));
                while (rs.next()) {
                    query = rs.getString(1);
                }
                rs.close();
            }
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        return query;
    }

    public Statement createStatement() {
        try {
            Statement stmnt = con.createStatement();
            return stmnt;
        } catch (SQLException ex) {
            Logger.getLogger(Temp_Statement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    private String initQuery(String name, String level) {
        String q = GET_QUERY.replace("*queryName*", name);
        q = q.replace("*level*", level);
        return q;
    }

    public ResultSet executeQuery(String query) {
        try {
            executeQueryStmnt = con.createStatement();
            ResultSet rs = executeQueryStmnt.executeQuery(query);
            return rs;
        } catch (SQLException ex) {
            System.err.println(ex);
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public void closeExecuteQueryStmnt() {
        if (executeQueryStmnt != null) {
            try {
                executeQueryStmnt.close();
            } catch (SQLException ex) {
                Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
