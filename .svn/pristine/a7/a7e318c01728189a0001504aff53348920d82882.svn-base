/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts;

import java.sql.ResultSet;
import java.util.List;
import za.co.cellc.synix.persistance.statements.Temp_StatementInterface;

/**
 *
 * @author z0006cpz
 */
public class ChartData implements Temp_StatementInterface{

    private int HEIGHT = 300;
    private int WIDTH = 500;
    private int chartCount = 1;
    private String css = "";
    private char[] sQ = Character.toChars(34);
    int[][] d = new int[3][3];
//    private Database database = new Database();
    private ResultsetParser parser;
//    private final Query query;
    private String queryString;
    private boolean rsEmpty;

    public ChartData() {
//        query = new Query(sb);
    }

    public boolean isRsEmpty() {
        return rsEmpty;
    }

    public String getQueryString() {
        return queryString;
    }

    public void readStatement(String statementName, int target) {
        ResultSet rs = stmnt.executeStatement(statementName);
        parser = new ResultsetParser();
        parser.parseRS(rs, target);
    }

    public ResultsetParser parseQuery(String query,float target) {
//        queryString = Database.getInstance().getQuery(queryName, level);
//        queryString = query.parse(queryName, queryString, level);
        ResultSet rs = stmnt.executeQuery(query);
        parser = new ResultsetParser();
        rsEmpty = (parser.parseRS(rs, target) == false);
        return parser;
    }

    public String getData() {
        return parser.getData();
    }

    public String getDiv() {
        String out = "";
        for (int i = 1; i <= chartCount; i++) {
            out += "<div id=" + sQ[0] + "div" + i + sQ[0] + " style=" + sQ[0]
                    + "width:" + WIDTH + "px; height:" + HEIGHT + "px;" + sQ[0] + "></div>";
        }
        return out;
    }

    public String getCss() {
        return css;
    }

    public String getHEADINGS() {
        return parser.getLabels();
    }

    public List<String> getAxis() {
        return parser.getAxis();
    }

    public boolean isMultiRSchart() {
        return parser.isMultiRSchart();
    }
}
