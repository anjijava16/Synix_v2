/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.dbconnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Pierre.Venter
 */
public class ProductionTestSingleton {

    private static ProductionTestSingleton instance;
    private static final String dbDriver = "oracle.jdbc.OracleDriver";
    private static final String dbURL = "jdbc:oracle:thin:@uxtpdb20.cellc.net:";
    private static final String dbName = "synix";
    private static final int port = 1526;
    private static Connection con;
    private static List<Connection> connections = new ArrayList<>();

    private ProductionTestSingleton() throws Exception {
        connect();
    }

    public synchronized Connection getCon() {
        return connections.get(0);
    }

   

    public static synchronized ProductionTestSingleton getInstance(int threadID) throws Exception {
        if (instance == null || connections.isEmpty()) {
            instance = new ProductionTestSingleton();
        }
        return instance;
    }

    private static void connect() {
        try {
            Class.forName(dbDriver);
            con = DriverManager.getConnection(dbURL + port + ":" + dbName, "synix_p", "synix_p");
            con.setAutoCommit(true);
            if (connections.isEmpty()) {
                System.out.println("Connection to Production DB established");
            }
            connections.add(con);
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println("Error connecting to Oracle! " + ex);
        }
    }

    public synchronized void closeConnection() {
        try {
            for (int i = 0; i < connections.size(); i++) {
                connections.get(i).close();
            }
            instance = null;
            connections.clear();
            System.out.println("Connection to Production DB closed");
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
        }
    }
}
