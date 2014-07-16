/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package za.co.cellc.synix.model;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import za.co.cellc.synix.controllers.WBtsNamesServlet;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author Pierre.Venter
 */
public class ZjhbBtsNamesServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    private String QUERY_BTS_NAMES = "select distinct LOCATIONNAME from ZJ_CELLS_2G where LOCATIONNAME != 'null' order by LOCATIONNAME";
    private List<String> btsName = new ArrayList<>();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            initBtsName();
            response.getWriter().write(listToOptionString());
        } catch (SQLException ex) {
            Logger.getLogger(WBtsNamesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }
    }

    private String listToOptionString() {
        StringBuilder s = new StringBuilder();
        {
            for (String name : btsName) {
                s.append("<~>").append(name);
            }
            if (s.length() == 0) {
                return s.toString();
            }
            return s.substring(3);
        }
    }

    private String initBtsName() throws SQLException {
        String out = "";
        btsName.clear();
        Statement s = Database.getInstance(false).getCon().createStatement();
//        Statement stmnt = Database.getInstance().getCon().createStatement();
        ResultSet rs = s.executeQuery(QUERY_BTS_NAMES);
        while (rs.next()) {
            btsName.add(rs.getString(1));
        }
        rs.close();
        s.close();
//        Database.getInstance().closeExecuteQueryStmnt();
        return out;
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