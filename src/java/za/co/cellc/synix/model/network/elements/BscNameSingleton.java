/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

/**
 *
 * @author Pierre.Venter
 */
public class BscNameSingleton extends ElementNameSingleton {

    private static BscNameSingleton instance;
//    private final String QUERY = "select distinct BSC_NAME,BSC_GID from S_TWOG_CELLS";

    public static synchronized ElementNameSingleton getInstance(boolean test_) {
        QUERY = "select distinct BSC_NAME,BSC_GID from N2_CONTROLLERS_2G";
        test = test_;
        if (instance == null) {
            instance = new BscNameSingleton();
        } else {
//            System.out.println("getting instance");
        }
        return instance;
    }

    private BscNameSingleton() {
        loadLists();
    }

//    public String getGID(String bsc_name) {
//        return id.get(names.indexOf(bsc_name.toUpperCase()));
//    }

//    private void loadLists() {
//        try {
//            Connection con = Database.getInstance(test).getCon();
//            Statement stmnt = con.createStatement();
//            ResultSet rs = stmnt.executeQuery(QUERY);
//            while (rs.next()) {
//                names.add(rs.getString(1).toUpperCase());
//                id.add(rs.getString(2));
//            }
//            rs.close();
//            stmnt.close();
//        } catch (SQLException ex) {
//            Logger.getLogger(BscNameSingleton.class.getName()).log(Level.SEVERE, null, ex);
//        }
//    }
}
