/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Pierre.Venter
 */
public class PermissionMap {

    public Map getNewMilestoneMap(String userLevel) throws Exception { //this method must be modified according to business rules we don't have yet
        if (userLevel == null || userLevel.equals("")) {
            throw new IllegalArgumentException("No user level was passed");
        }
        int theUserLevel = Integer.parseInt(userLevel);
        Map<String, String> permissions = new HashMap();
        permissions.put("milestone", "enabled");
        permissions.put("milestonename", "enabled");
        permissions.put("basedate", "enabled");
        permissions.put("forecastdate", "disabled");
        permissions.put("actualdate", "disabled");
        permissions.put("status", "disabled");
        return permissions;
    }
}
