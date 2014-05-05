/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.dygraph;

/**
 *
 * @author Pierre.Venter
 */
public interface DygraphFormattingInterface {

    final String[] WHERE_OPERANDS = {" AND (", " OR "};
    final int MAX_OBJECT_NAME_LEN = 30;
    final String OBJECT_SPLITTER = "<=>";

    public String parseSQL(StringBuilder sb,boolean test);
}
