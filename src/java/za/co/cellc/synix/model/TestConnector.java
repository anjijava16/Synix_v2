/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Pierre.Venter
 */
public class TestConnector {

    private static TestConnector instance;
    private static final String dbDriver = "oracle.jdbc.OracleDriver";
    private static final String dbURL = "jdbc:oracle:thin:@uxtpdb20.cellc.net:";
    private static final String dbName = "synix";
    private static final int port = 1526;
    private static Connection con;

    private TestConnector() throws Exception {
        connect();
    }

    public static TestConnector getInstance() throws Exception {
        if (instance == null || con.isClosed()) {
            instance = new TestConnector();
        }
        return instance;
    }

    public Connection getConnection() {
        return con;
    }

    public void closeConnection(Connection con) throws Exception {
        try {
            con.close();
        } catch (SQLException ex) {
            System.out.println(" Error closing the connectoion " + ex);
            throw new Exception("Failed to close the connectoion", ex);
        }
    }

    private void connect() throws Exception {
        try {
            Class.forName(dbDriver);
            con = DriverManager.getConnection(dbURL + port + ":" + dbName, "synix_p", "synix_p");
            System.out.println(" Connection to DB established");
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(" Error connecting to DB! " + ex);
            throw new Exception("Failed to connect to DB", ex);
        }
    }

}
