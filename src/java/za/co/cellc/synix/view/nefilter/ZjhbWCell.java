/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view.nefilter;

/**
 *
 * @author Pierre.Venter
 */
public class ZjhbWCell extends NE_Node {

    public String getCellsHTML() {
        buildSelectHTML();
        return html.toString();
    }

    public String getCellSearchBox() {
        return "<br>"
                + "<label>BTS Name:&nbsp;</label><input id=\"ZjhbwcellSearchBox\" type=\"text\" onKeyUp=\"zjhbWcellSearchBoxKeyUp()\" style=\"width:90px;\">";
    }

    private void buildSelectHTML() {
        html.append("<select class=\"btsNamesListBox\" id=\"ZjhbwbtsNamesListBox\" size=\"17\" multiple=\"multiple\"></select>");
    }
}
