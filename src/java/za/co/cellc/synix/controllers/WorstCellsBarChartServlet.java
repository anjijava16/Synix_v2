/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

//import com.nsn.synix.controllers.ChartData;
//import com.nsn.synix.formHandlers.Chart;
//import com.nsn.synix.controllers.JSON_Parser;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import za.co.cellc.synix.formbuilders.charts.barChart.BC_Chart;
import za.co.cellc.synix.formbuilders.formatting.AjaxInputFormatter;

/**
 *
 * @author z0006cpz
 */
@WebServlet(name = "WorstCellsBarChartServlet", urlPatterns = {"/WorstCellsBarChartServlet"})
public class WorstCellsBarChartServlet extends HttpServlet {

    private StringBuilder sb;

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            setStringBuffer(request);
            response.getWriter().write(getChartsHTML());

        } finally {
            out.close();
        }
    }

    private void setStringBuffer(HttpServletRequest request) throws IOException {
        AjaxInputFormatter formatter = new AjaxInputFormatter();
        sb = formatter.parseRequest(request);
    }

    private String getChartsHTML() {
//        List<String> divCounters = extractFromJSON("divCounter");
//        int i = Integer.parseInt(divCounters.get(0));
//        BC_Chart chart = new BC_Chart();
        return "";// chart.drawCharts(sb, i,false);
    }

    private List<String> extractFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
        return json_parser.getValuesForObject(objectName, sb.toString());
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
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
     * Handles the HTTP
     * <code>POST</code> method.
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
