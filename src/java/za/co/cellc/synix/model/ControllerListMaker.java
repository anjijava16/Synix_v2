/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class ControllerListMaker {

    protected List<String> controllers2G = new ArrayList<>();
    protected List<String> controllers3G = new ArrayList<>();
    protected String technology;

    public ControllerListMaker(String technology) {
        this.technology = technology;
    }

    public List<String> getControllers() throws Exception {
        if (technology.equalsIgnoreCase(Constants.TECHNOLOGY_2G)) {
            return controllers2G;
        } else if (technology.equalsIgnoreCase(Constants.TECHNOLOGY_3G)) {
            return controllers3G;
        } else {
            throw new Exception("Unknown technology " + technology);
        }
    }

    private void setControllers() throws SQLException {
    }

}
