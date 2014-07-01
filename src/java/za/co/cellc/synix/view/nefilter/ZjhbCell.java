/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view.nefilter;

import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class ZjhbCell extends NE_Node {

    public String getCellsHTML() {
        buildSelectHTML();
        return html.toString();
    }

    public String getCellSearchBox() {
        return "<br>"
                + "<label>BTS Name:&nbsp;</label><input id=\"ZjhbcellSearchBox\" type=\"text\" onKeyUp=\"zjhbCellSearchBoxKeyUp()\" style=\"width:90px;\">";
    }

    private void buildSelectHTML() {
        html.append("<select class=\"btsNamesListBox\" id=\"ZjhbbtsNamesListBox\" size=\"");
        html.append(Constants.MAX_CELLS).append("\" multiple=\"multiple\"></select>");
    }
}
