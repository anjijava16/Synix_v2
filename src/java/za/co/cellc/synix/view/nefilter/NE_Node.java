/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view.nefilter;

/**
 *
 * @author Pierre.Venter
 */
public class NE_Node {

    protected StringBuilder html = new StringBuilder();

    protected void addRoot(String name, String id) {
        html.append("<div>");
//        html.append("<img class='expand' src='images/Minus.png'>");
        html.append("<img class='collapse' src='images/Plus.png'>");
        html.append("<input name='").append(id).append("' value='").append(name).append("' type='checkbox'>").append(name);
        html.append("</div>");
    }

    protected void addParent(String name, String id) {
        html.append("<div>");
        html.append("<img class='expand' src='images/icon-cell.png'>");
        html.append("<img class='collapse' src='images/icon-cell.png'>");
        html.append("<input name='").append(id).append("' class=\"liParent\" value='").append(name).append("' type='checkbox'>").append(name);
        html.append("</div>");
    }

    protected void addChild(String name, String id) {
        html.append("<div>");
//        html.append("<img class='bts' src='images/icon-cell.png' />");
        html.append("<input name='").append(id).append("' class=\"liChild\" value='").append(name).append("' type='checkbox'>").append(name);
        html.append("</div>");

    }

    protected void openUList() {
        html.append("<ul>");
    }

    protected void closeUList() {
        html.append("</ul>");
    }

    protected void openList() {
        html.append("<li>");
    }

    protected void closeList() {
        html.append("</li>");
    }
}
