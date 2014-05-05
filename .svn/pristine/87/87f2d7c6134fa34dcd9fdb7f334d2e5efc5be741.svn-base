/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.persistance;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

/**
 *
 * @author z0006cpz
 */
public final class Database_Temp {

    private static Database_Temp instance;
    private String DB_CATALOG_NAME = "synix_resource";
//    private String DB_CATALOG_NAME = "synix_temp";
    private Connection con;

    public static synchronized Database_Temp getInstance() {
        if (instance == null) {
            instance = new Database_Temp();
        }
        return instance;
    }

    private Database_Temp() {

        DataSource catalogDS = getCatalogDS();
        try {
            con = catalogDS.getConnection();
            con.setAutoCommit (false); 
        } catch (SQLException ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public synchronized Connection getCon() {
        return con;
    }

    public javax.sql.DataSource getCatalogDS() {
        DataSource catalogDS = null;
        try {
            // Obtain the initial Java Naming and Directory Interface 
            // (JNDI) context.
            InitialContext initCtx = new InitialContext();
            // Perform JNDI lookup to obtain the resource.
            catalogDS = (DataSource) initCtx.lookup(DB_CATALOG_NAME);
        } catch (NamingException ex) {
            Logger.getLogger(Database_Temp.class.getName()).log(Level.SEVERE, ex.getMessage());
        }
        if (catalogDS == null) {
            Logger.getLogger(Database_Temp.class.getName()).log(Level.SEVERE, "Catalog " + DB_CATALOG_NAME + " not found!", "Catalog " + DB_CATALOG_NAME + " not found!");
            System.out.println("Catalog " + DB_CATALOG_NAME + " not found!");
        }
        return catalogDS;
    }
}
