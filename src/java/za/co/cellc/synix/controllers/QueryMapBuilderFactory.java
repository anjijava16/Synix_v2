/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class QueryMapBuilderFactory {

    public static QueryMapBuilder create(HtmlInputProcessor htmlIp, FormuladefPojo defPojo, int mapType, boolean test) throws Exception {
        if (mapType == Constants.SINGLE_ENTRY_MAP_TYPE) {
            return new SingleEntryQueryMapBuilder(htmlIp, defPojo, test);
        } else if (mapType == Constants.MULTI_ENTRY_MAP_TYPE) {
            return new MultiEntryQueryMapBuilder(htmlIp, defPojo, test);
        } else if (mapType == Constants.AGGREGATED_GROUPING_MAP_TYPE) {
            return new AggregatedGroupingQueryMapBuilder(htmlIp, defPojo, test);
        } else if (mapType == Constants.UNIONIZED_SINGLE_ENTRY_MAP_TYPE) {
            return new UnionizedSingleEntryQueryMapBuilder(htmlIp, defPojo, test);
        }else if (mapType == Constants.ZTE_SINGLE_ENTRY_MAP_TYPE) {
            return new ZteSingleEntryQueryMapBuilder(htmlIp, defPojo, test);
        } else {
            throw new Exception("Invalid map type: " + mapType);
        }
    }
}
