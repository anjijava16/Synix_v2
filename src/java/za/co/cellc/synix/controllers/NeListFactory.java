/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.CellListMaker;
import za.co.cellc.synix.model.ControllerListMaker;
import za.co.cellc.synix.model.NsnCells;
import za.co.cellc.synix.model.NsnControllers;
import za.co.cellc.synix.model.ZteCells;
import za.co.cellc.synix.model.ZteControllers;

/**
 *
 * @author Pierre.Venter
 */
public class NeListFactory {

    private static ControllerListMaker contrMaker;
    private static CellListMaker cellMaker;

    public static List<String> create(String vendor, String technology, String level) throws Exception {
        if (vendor.equalsIgnoreCase(Constants.Vendors.NSN.value()) && level.equalsIgnoreCase("CONTROLLER")) {
            contrMaker = new NsnControllers(technology);
            return contrMaker.getControllers();
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.ZJHB.value()) && level.equalsIgnoreCase("CONTROLLER")) {
            contrMaker = new ZteControllers(technology);
            return contrMaker.getControllers();
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.NSN.value()) && level.equalsIgnoreCase("CELL")) {
            cellMaker = new NsnCells(technology);
            return cellMaker.getCells();
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.ZJHB.value()) && level.equalsIgnoreCase("CELL")) {
            cellMaker = new ZteCells(technology);
            return cellMaker.getCells();
        }
        throw new IllegalArgumentException("Invalid factory parameters: " + vendor + "," + technology + "," + level);
    }
}
