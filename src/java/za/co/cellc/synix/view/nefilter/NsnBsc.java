/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view.nefilter;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.persistance.Database;
//import za.co.cellc.synix.persistance.statements.Production_StatementInterface;

/**
 *
 * @author Pierre.Venter
 */
public class NsnBsc extends NE_Node {

    private int BSC_NAME = 1;
//    private int BTS_INSTANCE = 2;
//    private String QUERY_BSC_NAMES = "select distinct BSC_NAME,BTS_INSTANCE from T_TWOG_CELLS order by BSC_NAME,BTS_INSTANCE";
    private String QUERY_BSC_NAMES = "select distinct BSC_NAME from N2_CONTROLLERS_2G order by BSC_NAME";
    private List<String> bsc = new ArrayList<>();
//    private List<String> bts = new ArrayList<>();
//    Database db = new Database();

    public String getHTML() {
        try {
            getStructure();
            buildHTML();
        } catch (SQLException ex) {
            Logger.getLogger(NsnBsc.class.getName()).log(Level.SEVERE, null, ex);
        }
        return html.toString();
    }

    private void buildHTML() {
        html.append("<div id=\"BSCfilter\" class=\"BSC\">");
        html.append("<ul class=\"collapsibleList\">");
        addRoot("All BSC's", "bscs");
        openUList();
        String r = "";
        for (int i = 0; i < bsc.size(); i++) {
            if (r.isEmpty()) {
                r = bsc.get(i);
                openList();
                addParent(r, "bsc");
                openUList();
            }
            if (bsc.get(i).equalsIgnoreCase(r)) {
                openList();
//                addChild(bts.get(i), "bts");
                closeList();
            } else {
                closeList();
                closeUList();
                r = "";
                i--;
            }
        }
        closeUList();
        closeUList();
        html.append("</div>");
    }

    private String getStructure() throws SQLException {
        String out = "";
        Statement stmnt = Database.getInstance(false).getCon().createStatement();
        ResultSet rs = stmnt.executeQuery(QUERY_BSC_NAMES);
        while (rs.next()) {
            bsc.add(rs.getString(BSC_NAME));
//            bts.add(rs.getString(BTS_INSTANCE));
//            wcell.add(rs.getString(WCEL_INSTANCE));
        }
        rs.close();
        stmnt.close();
        rs.close();
        addAggregationOption(bsc);
        return out;
    }
    private void addAggregationOption(List<String> lst){
        lst.add("Aggregate");
    }
}
