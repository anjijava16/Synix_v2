/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.html_builders.ne_filtler;

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
public class Region extends NE_Node {

    private int REGION_NAME = 1;
    private int RNC_NAME = 2;
    private String QUERY_REGION_NAMES = "select distinct CLUSTER_NAME,T_THREEG_CELLS.RNC_NAME "
            + " from S_CLUSTERS,T_THREEG_CELLS"
            + " where length(RNC_ID)>0"
            + " and T_THREEG_CELLS.U_RNC_INSTANCE = S_CLUSTERS.RNC_ID"
            + " order by S_CLUSTERS.CLUSTER_NAME";
    private List<String> region = new ArrayList<>();
    private List<String> rnc = new ArrayList<>();
//    Database db = new Database();

    public String getHTML() {
        try {
            getStructure();
            buildHTML();
        } catch (SQLException ex) {
            Logger.getLogger(Region.class.getName()).log(Level.SEVERE, null, ex);
        }
        return html.toString();
    }

    private void buildHTML() {
        html.append("<div id=\"Regionfilter\" class=\"Region\">");
        html.append("<ul class=\"collapsibleList\">");
        addRoot("Region", "regions");
        openUList();
        String r = "";
        for (int i = 0; i < region.size(); i++) {
            if (r.isEmpty()) {
                r = region.get(i);
                openList();
                addParent(r, "region");
                openUList();
            }
            if (region.get(i).equalsIgnoreCase(r)) {
                openList();
                addChild(rnc.get(i), "regionRNC");
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
        ResultSet rs = stmnt.executeQuery(QUERY_REGION_NAMES);
        while (rs.next()) {
            region.add(rs.getString(REGION_NAME));
            rnc.add(rs.getString(RNC_NAME));
        }
        rs.close();
        stmnt.close();
        rs.close();
        return out;
    }
}
