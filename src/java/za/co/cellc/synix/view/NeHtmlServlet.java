/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.NeListFactory;
import za.co.cellc.synix.formbuilders.formatting.AjaxInputFormatter;

/**
 *
 * @author Pierre.Venter
 */
public class NeHtmlServlet extends HttpServlet {

    private StringBuilder sb;
    private HtmlInputProcessor hip = new HtmlInputProcessor();
    private StringBuilder html;
    private int ctrlCount = 17;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try {
            setStringBuffer(request);
            html = new StringBuilder();
            String vendor = hip.getVendor();
            String technology = hip.getTechnology();
            openTable();
            makeHead();
            openBody();
            openRow();
            openData();
            List<String> neList = NeListFactory.create(vendor, technology, "CONTROLLER");
            makeCheckListTable(neList);
            makeControllerAggregationButton();
            ctrlCount = neList.size();
            closeData();
            openData();

//            html.append("<br>");
            neList = new ArrayList<>();//NeListFactory.create(vendor, technology, "CELL");
            makeOptionListTable(neList);
            makeCellAggregationButton();
            closeData();
            closeRow();
            closeBody();
            closeTable();
            response.getWriter().write(html.toString());
        } catch (Exception ex) {
            Logger.getLogger(NeHtmlServlet.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    private void openData() {
        html.append("<td valign=\"top\">");
    }

    private void closeData() {
        html.append("</td>");
    }

    private void openRow() {
        html.append("<tr>");
    }

    private void closeRow() {
        html.append("</tr>");
    }

    private void openBody() {
        html.append("<tbody>");
    }

    private void closeBody() {
        html.append("</tbody>");
    }

    private void makeHead() {
        html.append("<thead>\n"
                + "                <tr>\n"
                + "                    <th width=\"20%\" align=\"left\" >");
//        makeLoaderGif();
        html.append("<input name='Select All' id=\"selectAllCkBox").append(hip.getDivId());
        html.append("\" value='Select All' type='checkbox'");
        html.append("onClick=\"checkUnCheckAll()\"");
        html.append(">Select All</input></th>\n"
                + "                    <th id=\"cellDiv" + hip.getDivId() + "\" style=\"display: none;\" width=\"100%\" align=\"left\" >" + getCellSearchBox() + "&nbsp;&nbsp;&nbsp;&nbsp;</th>"
                //                + "                    <th width=\"40%\" align=\"center\" ></th>\n"
                + "                </tr>\n"
                + "            </thead>");
    }

    private void makeLoaderGif() {
        html.append("<div id=\"loaderDiv" + hip.getDivId() + "\" style=\"display: block;\">\n"
                + "                        <div class=\"loadingImg\"></div>\n"
                + "                    </div>");
    }

    private void openTable() {
        html.append("<TABLE class=\"blingBackGroundTable\" cellspacing=\"0\">");
    }

    private void closeTable() {
        html.append("</TABLE>");
    }

    private void makeCheckListTable(List<String> neList) {
        html.append("<TABLE class=\"blingTable2\" cellspacing=\"0\" border=\"0\">");
        for (String ne : neList) {
            html.append("<tr>");
            html.append("<td>");
            html.append("<input name='");
            html.append(ne);
            html.append("' class=\"ctrlChBox").append(hip.getDivId()).append("\" value='");
            html.append(ne);
            html.append("' type='checkbox'");
            html.append("onClick=\"storeController(this)\"");
            html.append(">");
            html.append(ne);
            html.append("</input>");
            html.append("</td>");
            html.append("</tr>");
        }
        html.append("</TABLE>");
    }

    private void makeControllerAggregationButton() {
        html.append("<button id=\"aggregateControllersButton1").append(hip.getDivId()).append("\" type=\"button\" onclick=\"addSelectedControllersToGroup(true)\">Aggregate controllers</button>");
    }

    private void makeCellAggregationButton() {
        html.append("<button id=\"aggregateCellsButton1").append(hip.getDivId()).append("\" type=\"button\" onclick=\"addSelectedCellsToGroup(true)\">Aggregate cells</button>");
    }

    private String getCellSearchBox() {
        return "<label>Cell Search:&nbsp;&nbsp;</label><input id=\"cellSearchBox" + hip.getDivId() + "\" type=\"text\" onKeyUp=\"cellSearchBoxKeyUp()\" style=\"width:80%;\">";
    }

    private void makeOptionListTable(List<String> neList) {
        double padding = 1.5;
        int rows = Constants.MAX_CELLS_LINES < (ctrlCount * padding) ? (int) (ctrlCount * padding) : Constants.MAX_CELLS_LINES;
        html.append("<select id=\"cellNames").append(hip.getDivId()).append("\" class=\"cellsListBox\" size=\"");
        html.append(rows).append("\" multiple=\"multiple\" ");
        html.append(" onmouseup=\"storeCells('cellNames");
        html.append(hip.getDivId());
        html.append("')\"");
        html.append(" onkeyup=\"storeCells('cellNames");
        html.append(hip.getDivId());
        html.append("')\"");
        html.append(">");
        for (int i = 0; i < (neList.size() > Constants.MAX_CELLS_ITEMS ? Constants.MAX_CELLS_ITEMS : neList.size()); i++) {
            String ne = neList.get(i);
            html.append("<option value=\"").append(ne).append("\"");
            html.append(" onClick=\"storeCells('cellNames");
            html.append(hip.getDivId());
            html.append("')\"");
            html.append(" ");
            html.append(">").append(ne).append("</option>");
        }
        html.append("</select>");
    }

    private void setStringBuffer(HttpServletRequest request) throws IOException, Exception {
        AjaxInputFormatter formatter = new AjaxInputFormatter();
        sb = formatter.parseRequest(request);
        hip.processInput(sb);
    }

    private List<String> extractFromJSON(String objectName) {
        za.co.cellc.synix.controllers.JSON_Parser json_parser = new za.co.cellc.synix.controllers.JSON_Parser();
        return json_parser.getValuesForObject(objectName, sb.toString());
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
