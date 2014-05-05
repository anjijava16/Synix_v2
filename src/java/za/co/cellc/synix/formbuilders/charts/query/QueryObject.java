/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.query;

import za.co.cellc.synix.formbuilders.charts.Dates;

/**
 *
 * @author Pierre.Venter
 */
public class QueryObject {

    protected String OBJECT_SPLITTER = "<=>";
    protected StringBuilder JSON_sb;
    private Dates dates;

    public QueryObject(StringBuilder JSON_sb) {
        this.JSON_sb = JSON_sb;
        this.dates = new Dates(JSON_sb);
    }

    protected String upDateQuery_Date(String query) {
        query = query.replace("*timeFrom*", dates.getFromDate());
        return query.replace("*timeTo*", dates.getToDate());
    }
}
