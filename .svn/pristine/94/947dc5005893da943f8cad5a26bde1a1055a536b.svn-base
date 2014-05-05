/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.html_builders.ne_filtler;

/**
 *
 * @author Pierre.Venter
 */
public class Filter implements FilterInterface {

    BSC bsc = new BSC();
    RNC rnc = new RNC();
    Cell cell = new Cell();
    WCell wcell = new WCell();
    Region region = new Region();

    @Override
    public String getBSC_RNC() {
        StringBuilder html = new StringBuilder();
//        html.append(region.getHTML());
        html.append(rnc.getHTML());
        html.append(bsc.getHTML());
        return html.toString();
    }

    @Override
    public String get2GCells() {
        StringBuilder html = new StringBuilder();
//        html.append(region.getHTML());
        html.append(cell.getCellsHTML());
        return html.toString();
    }

    @Override
    public String get3GCells() {
        StringBuilder html = new StringBuilder();
//        html.append(region.getHTML());
        html.append(wcell.getCellsHTML());
        return html.toString();
    }

    @Override
    public String get2GCellSearchBox() {
        return cell.getCellSearchBox();
    }

    @Override
    public String get3GCellSearchBox() {
        return wcell.getCellSearchBox();
    }
}
