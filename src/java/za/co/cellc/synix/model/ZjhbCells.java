/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author Pierre.Venter
 */
public class ZjhbCells extends CellListMaker {

    public ZjhbCells(String technology) throws SQLException {
        super(technology);
        setControllers();
    }

    private void setControllers() throws SQLException {
        if (technology.equalsIgnoreCase(Constants.TECHNOLOGY_2G)) {
            set2GControllers();
        } else if (technology.equalsIgnoreCase(Constants.TECHNOLOGY_3G)) {
            set3GControllers();
        }
    }

    private void set2GControllers() throws SQLException {
        if (cells2G.isEmpty()) {
            Statement stmnt = Database.getInstance(false).getCon().createStatement();
            ResultSet rs = stmnt.executeQuery(Constants.ZJHB2_CELLS_SQL);
            while (rs.next()) {
                cells2G.add(rs.getString(1));
            }
            stmnt.close();
            rs.close();
        }
    }

    private void set3GControllers() throws SQLException {
        if (cells3G.isEmpty()) {
            Statement stmnt = Database.getInstance(false).getCon().createStatement();
            ResultSet rs = stmnt.executeQuery(Constants.ZJHB3_CELLS_SQL);
            while (rs.next()) {
                cells3G.add(rs.getString(1));
            }
            stmnt.close();
            rs.close();
        }
    }
}
