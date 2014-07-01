/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

import java.security.InvalidParameterException;
import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class ElementNameSingeltonFactory {

    public static ElementNameSingleton create(String vendor, String technology, String level, boolean test) throws InvalidParameterException {
        if (vendor.equalsIgnoreCase(Constants.Vendors.NSN.value()) && level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("2G")) {
            return za.co.cellc.synix.model.network.elements.nsn.BscNameSingleton.getInstance(test);
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.NSN.value()) && level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("3G")) {
            return za.co.cellc.synix.model.network.elements.nsn.RncNameSingleton.getInstance(test);
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.NSN.value()) && level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("2G")) {
            return za.co.cellc.synix.model.network.elements.nsn.BtsNameSingleton.getInstance(test);
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.NSN.value()) && level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("3G")) {
            return za.co.cellc.synix.model.network.elements.nsn.WcellNameSingleton.getInstance(test);
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.ZJHB.value()) && level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("2G")) {
            return za.co.cellc.synix.model.network.elements.zjhb.BscNameSingleton.getInstance(test);
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.ZJHB.value()) && level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("3G")) {
            return za.co.cellc.synix.model.network.elements.zjhb.RncNameSingleton.getInstance(test);
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.ZJHB.value()) && level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("2G")) {
            return za.co.cellc.synix.model.network.elements.zjhb.BtsNameSingleton.getInstance(test);
        } else if (vendor.equalsIgnoreCase(Constants.Vendors.ZJHB.value()) && level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("3G")) {
            return za.co.cellc.synix.model.network.elements.zjhb.WcellNameSingleton.getInstance(test);
        } else {
            throw new InvalidParameterException("Invalid parameters: " + technology + "," + level);
        }
    }

    public static ElementNameSingleton getInstance(String vendor, String technology, String level, boolean test) throws InvalidParameterException {
        return create(vendor, technology, level, test);
    }
}
