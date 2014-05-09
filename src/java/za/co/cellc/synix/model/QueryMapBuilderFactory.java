/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import za.co.cellc.synix.controllers.FormulaDefPojo;
import za.co.cellc.synix.controllers.MultiEntryQueryMapBuilder;
import za.co.cellc.synix.controllers.QueryMapBuilder;
import za.co.cellc.synix.controllers.SingleEntryQueryMapBuilder;

/**
 *
 * @author Pierre.Venter
 */
public class QueryMapBuilderFactory {

    public static QueryMapBuilder create(FormulaDefPojo defPojo, int mapType, boolean test) throws Exception {
        if (mapType == 1) {
            return new SingleEntryQueryMapBuilder(defPojo, test);
        } else if (mapType == 2) {
            return new MultiEntryQueryMapBuilder(defPojo, test);
        } else {
            throw new Exception("Invalid map type: " + mapType);
        }
    }
}
