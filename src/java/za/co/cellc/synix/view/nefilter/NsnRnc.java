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
public class NsnRnc extends NE_Node {

    private int RNC_NAME = 1;
    private String QUERY_RNC_NAMES = "select distinct RNC_NAME from N2_CONTROLLERS_3G order by RNC_NAME";
//   private String QUERY_RNC_NAMES = "select distinct RNC_NAME,WBTS_INSTANCE from T_THREEG_CELLS order by RNC_NAME,WBTS_INSTANCE";
    private List<String> rnc = new ArrayList<>();

    public NsnRnc() {
        super();
    }

    public String getHTML() {
        try {
            getStructure();
            buildHTML();
        } catch (SQLException ex) {
            Logger.getLogger(NsnRnc.class.getName()).log(Level.SEVERE, null, ex);
        }
        return html.toString();
    }

    private void buildHTML() {
        html.append("<div id=\"RNCfilter\" class=\"RNC\">");
        html.append("<ul class=\"collapsibleList\">");
        addRoot("All RNC's", "rncs");
        openUList();
        String r = "";
        for (int i = 0; i < rnc.size(); i++) {
            if (r.isEmpty()) {
                r = rnc.get(i);
                openList();
                addParent(r, "rnc");
                openUList();
            }
            if (rnc.get(i).equalsIgnoreCase(r)) {
                openList();
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
        ResultSet rs = stmnt.executeQuery(QUERY_RNC_NAMES);
        while (rs.next()) {
            rnc.add(rs.getString(RNC_NAME));
        }
        rs.close();
        stmnt.close();
        rs.close();
        addAggregationOption(rnc);
        return out;
    }

    private void addAggregationOption(List<String> lst) {
        lst.add("Aggregate");
    }
}
