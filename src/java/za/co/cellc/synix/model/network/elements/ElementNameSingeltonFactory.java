/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.network.elements;

import java.security.InvalidParameterException;

/**
 *
 * @author Pierre.Venter
 */
public class ElementNameSingeltonFactory {

    public static ElementNameSingleton create(String technology, String level, boolean test) throws InvalidParameterException {
        if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("2G")) {
            return BscNameSingleton.getInstance(test);
        } else if (level.equalsIgnoreCase("CONTROLLER") && technology.equalsIgnoreCase("3G")) {
            return RncNameSingleton.getInstance(test);
        } else if (level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("2G")) {
            return BtsNameSingleton.getInstance(test);
        } else if (level.equalsIgnoreCase("CELL") && technology.equalsIgnoreCase("3G")) {
            return WcellNameSingleton.getInstance(test);
        } else {
            throw new InvalidParameterException("Invalid parameters: " + technology + "," + level);
        }
    }

    public static ElementNameSingleton getInstance(String technology, String level, boolean test) throws InvalidParameterException {
        return create(technology, level, test);
    }
}
