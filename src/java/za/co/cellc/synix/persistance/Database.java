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
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.dbconnection.ProductionTestSingleton;

/**
 *
 * @author z0006cpz
 */
public final class Database {

    private static boolean test = false;
    private static Database instance;
//    private String DB_CATALOG_NAME = "synix_p_resource";
//    private String GET_QUERY = "SELECT Query_ FROM Queries WHERE Query_Name = '*queryName*' and level_ = '*level*'";
    private Connection con;

//    private String DELIMITER = "~";
//    private Statement executeQueryStmnt;
    public static synchronized Database getInstance(boolean test_) {
        test = test_;
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }

    private Database() {

        if (test) {
            try {
                con = ProductionTestSingleton.getInstance(0).getCon();
            } catch (Exception ex) {
                Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            DataSource catalogDS = getCatalogDS();
            try {
                con = catalogDS.getConnection();
            } catch (SQLException ex) {
                throw new ExceptionInInitializerError(ex);
            }
        }
    }

    public synchronized Connection getCon() {
        return con;
    }

    public synchronized Connection openNewConnection() {
        Connection connnection;
        DataSource catalogDS = getCatalogDS();
        try {
            connnection = catalogDS.getConnection();
        } catch (SQLException ex) {
            System.out.println("Error opening new connection: " + ex.getMessage());
            throw new ExceptionInInitializerError(ex);
        }
        return connnection;
    }

    public javax.sql.DataSource getCatalogDS() {
        DataSource catalogDS = null;
        try {
            // Obtain the initial Java Naming and Directory Interface 
            // (JNDI) context.
            InitialContext initCtx = new InitialContext();
            // Perform JNDI lookup to obtain the resource.
            catalogDS = (DataSource) initCtx.lookup(Constants.DB_CATALOG_NAME);
        } catch (NamingException ex) {
            System.out.println("Error getting catalog: " + ex.getMessage());
            ex.printStackTrace();
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, ex.getMessage());
        }
        if (catalogDS == null) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, "Catalog " + Constants.DB_CATALOG_NAME + " not found!", "Catalog " + Constants.DB_CATALOG_NAME + " not found!");
            System.out.println("Catalog " + Constants.DB_CATALOG_NAME + " not found!");
        }
        return catalogDS;
    }

//    public ResultSet executeStatement(String name, String[] args) {
//        try {
//            CallableStatement cs = con.prepareCall(name + ";");
//            for (int i = 0; i < args.length; i++) {
//                cs.setString(i + 1, args[i]);
//            }
//            ResultSet rs = cs.executeQuery();
//            return rs;
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return null;
//    }
//    public ResultSet executeStatement(String name) {
//        try {
//            CallableStatement cs = con.prepareCall(name + ";");
//            ResultSet rs = cs.executeQuery();
//            return rs;
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return null;
//    }
//    public String getQuery(String name, String level) {
//        String query = "";
//        try {
//            Statement stmnt = con.createStatement();
//            ResultSet rs = stmnt.executeQuery(initQuery(name, level));
//            while (rs.next()) {
//                query = rs.getString(1);
//            }
//            rs.close();
//            stmnt.close();
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return query;
//    }
//    private String initQuery(String name, String level) {
//        String q = GET_QUERY.replace("*queryName*", name);
//        q = q.replace("*level*", level);
//        return q;
//    }
//    public List<String> getAllTableNames() {
//        List<String> tableNamesAndDates = new ArrayList<String>();
//        try {
//            Statement stmnt = con.createStatement();
//            ResultSet rs = stmnt.executeQuery("SELECT table_name FROM user_tables");
//            while (rs.next()) {
//                tableNamesAndDates.add(rs.getString(1));
//            }
//            rs.close();
//            stmnt.close();
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return tableNamesAndDates;
//    }
//    public List<String> getColumnNames(String tableName) {
//        List<String> columnNames = new ArrayList<String>();
//        try {
//            Statement stmnt = con.createStatement();
//            ResultSet rs = stmnt.executeQuery("select TABLE_NAME from DBA_TAB_COLUMNS where COLUMN_NAME=upper('" + tableName + "')");
//            while (rs.next()) {
//                columnNames.add(rs.getString(1));
//            }
//            rs.close();
//            stmnt.close();
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return columnNames;
//    }
//
//    public List<String> getTablesAndIndexes() {
//        List<String> table_nameIndexName = new ArrayList<String>();
//        try {
//            Statement stmnt = con.createStatement();
//            ResultSet rs = stmnt.executeQuery("SELECT 	t.name,col.name "
//                    + "FROM sys.indexes ind "
//                    + "INNER JOIN sys.index_columns ic "
//                    + "ON  ind.object_id = ic.object_id and ind.index_id = ic.index_id "
//                    + "INNER JOIN sys.columns col "
//                    + "ON ic.object_id = col.object_id and ic.column_id = col.column_id "
//                    + "INNER JOIN sys.tables t "
//                    + "ON ind.object_id = t.object_id "
//                    + "WHERE (1=1) AND ind.is_primary_key = 0 AND ind.is_unique = 0 "
//                    + "AND ind.is_unique_constraint = 0 AND t.is_ms_shipped = 0 "
//                    + "ORDER BY t.name, ind.name, ind.index_id, ic.index_column_id ");
//            while (rs.next()) {
//                table_nameIndexName.add(rs.getString(1) + DELIMITER + rs.getString(2));
//            }
//            rs.close();
//            stmnt.close();
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return table_nameIndexName;
//    }
//    public List<String> getFilesProcessed() {
//        return filesProcessed;
////        List<String> fileNames = new ArrayList<String>();
////        try {
////            ResultSet rs = conn.createStatement().executeQuery("SELECT fileName FROM tblFilesProcessed order by ID");
////            while (rs.next()) {
////                fileNames.add(rs.getString(1));
////            }
////            rs.close();
////        } catch (SQLException ex) {
////            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
////        }
////        return fileNames;
//    }
//    public List<Date> getDatesProcessed() {
//        List<Date> dates = new ArrayList<Date>();
//        try {
//            Statement stmnt = con.createStatement();
//            ResultSet rs = stmnt.executeQuery("SELECT [modified_Date] FROM tblFilesProcessed order by [modified_Date] desc");
//            while (rs.next()) {
//                dates.add(longToDate(rs.getString(1)));
//            }
//            rs.close();
//            stmnt.close();
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return dates;
//    }
//    public List<Date> getDatesProcessed_Filtered() {
//        List<Date> dates = new ArrayList<Date>();
//        try {
//            Statement stmnt = con.createStatement();
//            ResultSet rs = stmnt.executeQuery("select [fileName],[modified_Date] FROM tblFilesProcessed order by [fileName],[modified_Date] desc");
//            while (rs.next()) {
//                if (getItemCount(filesProcessed, rs.getString(1)) < DATES_PROCESSED) {
//                    filesProcessed.add(rs.getString(1));
//                    dates.add(longToDate(rs.getString(2)));
//                }
//            }
//            rs.close();
//            stmnt.close();
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return dates;
//    }
//    private int getItemCount(List lst, String item) {
//        int c = 0;
//        for (Object l : lst) {
//            if (l.toString().trim().equalsIgnoreCase(item.trim())) {
//                c++;
//            }
//        }
//        return c;
//    }
//    public List<String> getImportMapping() {
//        List<String> mapping = new ArrayList<String>();
//        try {
//            Statement stmnt = con.createStatement();
//            ResultSet rs = stmnt.executeQuery("SELECT [Database_Table],[File_Name],[Search_Pattern] FROM tblImportMapping");
//            while (rs.next()) {
//                mapping.add(rs.getString(1) + DELIMITER + rs.getString(2) + DELIMITER + rs.getString(3));
//            }
//            rs.close();
//            stmnt.close();
//        } catch (SQLException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return mapping;
//    }
//    public ResultSet executeQuery(String query) {
//        try {
//            executeQueryStmnt = con.createStatement();
//            ResultSet rs = executeQueryStmnt.executeQuery(query);
////            stmnt.close();
////            cs.close();
////            ResultSet rs = stmnt.executeQuery("SELECT CONVERT(VARCHAR(10), [Date], 111) AS Date,avg([CSSR_7D]) as CSSR FROM [Cell_KPI].[dbo].[tbl2GNSNCounters] group by [Date] order by [Date]");
//            return rs;
//        } catch (SQLException ex) {
////            closeConnection();
//            System.err.println(ex);
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return null;
//    }
//
//    public void closeExecuteQueryStmnt() {
//        if (executeQueryStmnt != null) {
//            try {
//                executeQueryStmnt.close();
//            } catch (SQLException ex) {
//                Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//            }
//        }
//    }
//    public void execute(String query) {
//        try {
//            con.createStatement().execute(query);
//        } catch (SQLException ex) {
//            System.err.println(ex);
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//    }
//
//    private Date longToDate(String str) {
//        Long l = Long.valueOf(str);
//        return new Date(l);
//    }
//
//    private Date extractDateFromPath(String path) {
//        Date date = null;
//        String[] ar = path.split(" ");
//        String dateStr = ar[ar.length - 1].trim();
//        try {
//            return new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH).parse(dateStr);
//        } catch (ParseException ex) {
//            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return date;
//    }
}
