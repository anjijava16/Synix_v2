/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts;

import java.util.List;

/**
 *
 * @author z0006cpz
 */
public class WhereClause {

    private String RNC_COLUMN_NAME = "RNC_NAME";
    private String BSC_COLUMN_NAME = "BSC_NAME";
//    private String CELL_COLUMN_NAME = "CellName";
    private String whereClause = "";

    public String getWhereClause() {
        return whereClause;
    }

    public void addRNC(List<String> rnc) {
        if (!rnc.isEmpty()) {
            whereClause += " AND (";
            for (String r : rnc) {
                whereClause += RNC_COLUMN_NAME + " = '" + r + "' OR ";
            }
            removeLastOperandFromQuery();
            whereClause += ")";
        }
    }

    public void addBSC(List<String> bsc) {
        if (!bsc.isEmpty()) {
            whereClause += " AND (";
            for (String b : bsc) {
                whereClause += BSC_COLUMN_NAME + " = '" + b + "' OR ";
            }
            removeLastOperandFromQuery();
            whereClause += ")";
        }
    }

    public void excludeCells(List<String> excludeCells, String cellColumnName) {
        if (!excludeCells.isEmpty()) {
            whereClause += " AND (";
            for (String cell : excludeCells) {
                whereClause += cellColumnName + " != '" + cell + "' AND ";
            }
            removeLastOperandFromQuery();
            whereClause += ")";
        }
    }

    public void includeBTS(List<String> includeCells, String cellColumnName) {
        if (!includeCells.isEmpty()) {
            if (!includeCells.get(0).isEmpty()) {
                whereClause += " AND (";
                for (String cell : includeCells) {
                    if (!cell.isEmpty()) {
                        whereClause += cellColumnName + " = '" + cell + "' OR ";
                    }
                }
                removeLastOperandFromQuery();
                whereClause += ")";
            }
        }
    }

    private void removeLastOperandFromQuery() {
        int andIndex = whereClause.lastIndexOf(" AND");
        int orIndex = whereClause.lastIndexOf(" OR");
        int index = andIndex > orIndex ? andIndex : orIndex;
        whereClause = whereClause.substring(0, index).trim();
    }
}
