/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view.nefilter;

/**
 *
 * @author Pierre.Venter
 */
public class ZjhbFilter implements FilterInterface {

    ZjhbBsc bsc = new ZjhbBsc();
    ZjhbRnc rnc = new ZjhbRnc();
    ZjhbCell cell = new ZjhbCell();
    ZjhbWCell wcell = new ZjhbWCell();
    ZjhbRegion region = new ZjhbRegion();

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
