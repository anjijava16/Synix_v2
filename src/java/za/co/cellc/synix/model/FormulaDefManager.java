/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.FormuladefPojo;
import za.co.cellc.synix.persistance.Database;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class FormulaDefManager {

//    private String selectionStr;
    private String vendor;
    private String technology;
    private static boolean test = false;
    private String insertUpdateQuery;
    private HtmlInputProcessor htmlIp;
    private int logicalGroup;

    public FormulaDefManager(HtmlInputProcessor htmlIp, boolean test) {
//        this.selectionStr = selectionStr;
        this.test = test;
        this.htmlIp = htmlIp;
        try {
            decodeSelectionStr();
        } catch (Exception ex) {
            Logger.getLogger(FormulaDefManager.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error decoding selection string: " + ex.getMessage());
        }
    }

    public FormulaDefManager(HtmlInputProcessor htmlIp, boolean test, String insertUpdateQuery) {
        this.htmlIp = htmlIp;
        this.test = test;
        this.insertUpdateQuery = insertUpdateQuery;
    }

    public List<FormuladefPojo> getFromulaDefPojos() {
        List<FormuladefPojo> formulaDefPojos = createFormulaDefPojos();
        return formulaDefPojos;
    }

    private List<FormuladefPojo> createFormulaDefPojos() {
        Statement stmnt = null;
        ResultSet rs = null;
        List<FormuladefPojo> formulaDefPojos = new ArrayList<>();
        try {
            String sql = makeQuery();
            stmnt = Database.getInstance(test).getCon().createStatement();
            rs = stmnt.executeQuery(sql);
            int colCount = rs.getMetaData().getColumnCount();
            while (rs.next()) {
                Map<String, String> map = new HashMap<>();
                for (int i = 0; i < colCount; i++) {
                    map.put(Constants.FORMULA_DEFS_FIELDS[i], rs.getString(i + 1));
                }
                FormuladefPojo defPojo = new FormuladefPojo(map);
                formulaDefPojos.add(defPojo);
            }
        } catch (Exception ex) {
            Logger.getLogger(FormulaDefManager.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (stmnt != null) {
                try {
                    stmnt.close();
                } catch (SQLException ex) {
//ignore catch
                }
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
//ignore catch
                }
            }
        }
        return formulaDefPojos;
    }

    private void decodeSelectionStr() throws Exception {
        vendor = htmlIp.getVendor();
        technology = htmlIp.getTechnology();
        logicalGroup = htmlIp.getLogicalGroup();
    }

    private String makeQuery() {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT ");
        for (String f : Constants.FORMULA_DEFS_FIELDS) {
            sql.append(f);
            sql.append(",");
        }
        sql.deleteCharAt(sql.length() - 1);
        sql.append(" FROM FORMULA_DEFS WHERE VENDOR = '");
        sql.append(getVendor());
        sql.append("' AND TECHNOLOGY = '");
        sql.append(technology).append("'");

        sql.append(" AND LOGICAL_GROUP = ");
        sql.append(logicalGroup);

        sql.append(" AND IS_ENABLED = '");
        sql.append(getEnabledState()).append("'");
        sql.append(" order by cast(PRIORITY AS INT)");
        return sql.toString();
    }

    private String getEnabledState() {
        return test ? "9" : "1";
    }

    private String getVendor() {
        return test ? "Test" : vendor;
    }

    public void runInsertUpdateQuery() throws Exception {

        Statement stmnt = null;
        try {
            stmnt = Database.getInstance(test).getCon().createStatement();
            stmnt.executeUpdate(insertUpdateQuery);
        } catch (Exception ex) {
            String message = "failed to run InsertUpdateQuery:" + ex.getMessage() + " " + ex.getStackTrace();
            Logger.getLogger(FormulaDefManager.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println(message);
            throw new Exception(message);
        }
        stmnt.close();

    }
}
