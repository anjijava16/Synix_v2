/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.html_builders.ne_filtler;

/**
 *
 * @author Pierre.Venter
 */
public class Cell extends NE_Node {

    public String getCellsHTML() {
        buildSelectHTML();
        return html.toString();
    }

    public String getCellSearchBox() {
        return "<br>"
                + "<label>BTS Name:&nbsp;</label><input id=\"cellSearchBox\" type=\"text\" onKeyUp=\"cellSearchBoxKeyUp()\" style=\"width:90px;\">";
    }

    private void buildSelectHTML() {
        html.append("<select class=\"btsNamesListBox\" id=\"btsNamesListBox\" size=\"17\" multiple=\"multiple\"></select>");
    }
}
