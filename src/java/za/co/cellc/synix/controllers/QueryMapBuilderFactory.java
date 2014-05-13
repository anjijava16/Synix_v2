/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

/**
 *
 * @author Pierre.Venter
 */
public class QueryMapBuilderFactory {

    public static QueryMapBuilder create(FormuladefPojo defPojo, int mapType, boolean test) throws Exception {
        if (mapType == 1) {
            return new SingleEntryQueryMapBuilder(defPojo, test);
        } else if (mapType == 2) {
            return new MultiEntryQueryMapBuilder(defPojo, test);
        } else if (mapType == 3) {
            return new AggregatedGroupingQueryMapBuilder(defPojo, test);
        } else {
            throw new Exception("Invalid map type: " + mapType);
        }
    }
}
