/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.view;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import za.co.cellc.synix.model.network.elements.ElementNameSingeltonFactory;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;

/**
 *
 * @author Pierre.Venter
 */
public class CellNamesServlet extends HttpServlet {

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
        StringBuilder sb = new StringBuilder();
        try {
            String vendor = request.getParameter("Vendor");
            String technology = request.getParameter("Technology");
            String searchStr = request.getParameter("searchStr");
            List<String> selectedCtrls = getControllers(request.getParameter("controllers"));

            ElementNameSingleton ens = ElementNameSingeltonFactory.create(vendor, technology, "CELL", false);
            List<String> neList = getCellsByCTRLS(ens, selectedCtrls);
            for (String ne : neList) {
                if (ne.toLowerCase().contains(searchStr.toLowerCase())) {
                    sb.append(ne);
                    if (!isLastItemInList(neList, ne)) {
                        sb.append("<~>");
                    }
                }
            }
        } catch (Exception ex) {
            Logger.getLogger(CellNamesServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        response.getWriter().write(sb.toString());
    }

    private List<String> getCellsByCTRLS(ElementNameSingleton ens, List<String> selectedCtrls) {
        List<String> filtered = new ArrayList<>();
        List<String> cells = ens.getNames();
        List<String> ctrls = ens.getCtrls();
        for (int i = 0; i < ctrls.size(); i++) {
            String c = ctrls.get(i);
            if (selectedCtrls.contains(c)) {
                filtered.add(cells.get(i));
            }
        }
        return filtered;
    }

    private List<String> getControllers(String str) {
        String[] ar = str.split(":");
        List<String> ctrls = new ArrayList<>();
        if (ar.length == 2) {
            String s = ar[1].replace("[", "");
            s = s.replace("]", "");
            s = s.replace("}", "");
            s = s.replace("\"", "");
            ar = s.split(",");
            for (String c : ar) {
                ctrls.add(c.trim());
            }
        }
        return ctrls;
    }

    private boolean isLastItemInList(List<String> neList, String ne) {
        int ix = neList.lastIndexOf(ne);
        return ix == neList.size() - 1;
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
