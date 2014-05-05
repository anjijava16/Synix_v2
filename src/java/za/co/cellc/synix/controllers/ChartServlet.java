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
import javax.servlet.http.HttpSession;
import za.co.cellc.synix.formbuilders.charts.feature.Feature;
import za.co.cellc.synix.formbuilders.charts.linechart.Chart;
import za.co.cellc.synix.formbuilders.formatting.AjaxInputFormatter;
import za.co.cellc.synix.model.Authenticate;
import za.co.cellc.synix.model.ModelUtilities;
import za.co.cellc.synix.model.UserLogin;
import za.co.cellc.synix.persistance.Database;

/**
 *
 * @author z0006cpz
 */
@WebServlet(name = "ChartServlet", urlPatterns = {"/ChartServlet"})
public class ChartServlet extends HttpServlet {

    private String KPI = "KPI";
    private String REV_AVAIL = "REV_AVAIL";
    private int REVENUE_PER_SITE_USER_MIN_LEVEL = 3;
    private StringBuilder sb;
    private HttpServletRequest httpRequest;
//    private String JSON_DELIMITER = "&";
//    private String SPACE_CHARS = "%20";
//    private String SQ_CHARS = "%22";

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
        httpRequest = request;
        PrintWriter out = response.getWriter();
        if (userIsAuthenticated()) {
            try {
                setStringBuffer(request);
                Feature feature = new Feature(sb);
                if (feature.inputSelectionSupported()) {
                    if (isRequestForKPIcharts()) {
                        String outText = getChartsHTML();
//                        long outLen = outText.length();
//                        System.out.println(outLen);
                        response.getWriter().write(outText);
                    } else if (isRequestForRevenuePerSiteCharts()) {
                        response.getWriter().write(getRevenuePerSiteCharts());
                    }
                } else {
                    response.getWriter().write("<p>Input selection not currently supported.");
                }
            } finally {
                out.close();
            }
        } else {
            response.getWriter().write("<p>User not authenticated!");
        }
    }

    private String getRevenuePerSiteCharts() {
        String res = "";
        int uLevel = getUserLevel();
        if (uLevel >= REVENUE_PER_SITE_USER_MIN_LEVEL) {

        } else {
            res = "<p><table class='blingTable' cellspacing='0'>"
                    + "<tbody>"
                    + "<tr><td class='red1Head'>You do not have the required privileges to view this page.<BR>Please contact the Synix administrator.</td></tr>"
                    + "</tbody>"
                    + "</table>";
        }
        return res;
    }

    private int getUserLevel() {
        UserLogin uLogin = getUserLogin();
        return uLogin.getUserLevel();
    }

    private boolean isRequestForKPIcharts() {
        String chartType = extractFromJSON("chartType").get(0);
        return chartType.equalsIgnoreCase(KPI);
    }

    private boolean isRequestForRevenuePerSiteCharts() {
        String chartType = extractFromJSON("chartType").get(0);
        return chartType.equalsIgnoreCase(REV_AVAIL);
    }

    private boolean userIsAuthenticated() {
        HttpSession session = httpRequest.getSession();
        String userId = (String) session.getAttribute("loginname");
        String password = (String) session.getAttribute("password");
        Encryption crypt = new Encryption();
        Authenticate auth = new Authenticate(userId, crypt.otpEncrypt(password),false);
        return auth.authenticate();
    }

    private UserLogin getUserLogin() {
        HttpSession session = httpRequest.getSession();
        String userId = (String) session.getAttribute("loginname");
        String password = (String) session.getAttribute("password");
        ModelUtilities mUtils = new ModelUtilities(Database.getInstance(false).getCon());
        Encryption crypt = new Encryption();
        return mUtils.getUserLogin(userId, crypt.otpEncrypt(password));
    }

    private void setStringBuffer(HttpServletRequest request) throws IOException {
        AjaxInputFormatter formatter = new AjaxInputFormatter();
        sb = formatter.parseRequest(request);
    }

    private String getChartsHTML() {
        List<String> divCounters = extractFromJSON("divCounter");
        int i = Integer.parseInt(divCounters.get(0));
        Chart chart = new Chart();
        return chart.getChartHTML(sb, i,false);
    }

//    private String getLevel() {
//        if (extractFromJSON("CELLS").size() > 0) {
//            return "CELL";
//        } else if (extractFromJSON("TECHNOLOGY").get(0).equalsIgnoreCase("2G")) {
//            return "BSC";
//        }
//        return "RNC";
//    }
    private List<String> extractFromJSON(String objectName) {
        JSON_Parser json_parser = new JSON_Parser();
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
