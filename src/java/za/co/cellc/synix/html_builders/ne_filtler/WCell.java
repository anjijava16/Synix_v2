/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.html_builders.ne_filtler;

/**
 *
 * @author Pierre.Venter
 */
public class WCell extends NE_Node {

    public String getCellsHTML() {
        buildSelectHTML();
        return html.toString();
    }

    public String getCellSearchBox() {
        return "<br>"
                + "<label>BTS Name:&nbsp;</label><input id=\"wcellSearchBox\" type=\"text\" onKeyUp=\"wcellSearchBoxKeyUp()\" style=\"width:90px;\">";
    }

    private void buildSelectHTML() {
        html.append("<select class=\"btsNamesListBox\" id=\"wbtsNamesListBox\" size=\"17\" multiple=\"multiple\"></select>");
    }
}
