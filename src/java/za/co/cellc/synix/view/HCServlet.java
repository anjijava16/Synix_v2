/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package za.co.cellc.synix.view;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Pierre.Venter
 */
public class HCServlet extends HttpServlet {

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
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<script language=\"JavaScript\" type=\"text/javascript\" src=\"scripts/jquery-1.8.1.min.js\"></script>");
            out.println("<head>");
            out.println("<title>Servlet HCServlet</title>");            
            out.println(makeScript("1"));
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet HCServlet at " + request.getContextPath() + "</h1>");
            out.println(makeBody());
            out.println("</body>");
            out.println("</html>");
        }
    }

    public String makeScript() {
        String retStr=makeScript("1")+" "+makeScript("2");
        return retStr;
    }
    
    public String makeScript(String nr) {

        StringBuilder sb = new StringBuilder();
        sb.append("<script type=\"text/javascript\">//<![CDATA[\n");
        sb.append("$(function () {\n"
                + "    $('#div1_"+nr+"').highcharts({\n"
                + "        chart: {\n"
                + "            //    type: 'spline',\n"
                + "            zoomType: 'xy'\n"
                + "        },\n"
                + "        legend: {\n"
                + "            layout: 'vertical',\n"
                + "            align: 'right',\n"
                + "            verticalAlign: 'middle',\n"
                + "            borderWidth: 1\n"
                + "        },\n"
                + "        title: {\n"
                + "            text: 'Cell Availability'\n"
                + "        },\n"
                + "        subtitle: {\n"
                + "            text: 'Click-Drag mouse to zoom'\n"
                + "        },\n"
                + "        xAxis: {\n"
                + "            type: 'datetime',\n"
                + "            dateTimeLabelFormats: { \n"
                + "                month: '%e. %b',\n"
                + "                year: '%b'\n"
                + "            },\n"
                + "            title: {\n"
                + "                text: 'Date'\n"
                + "            }\n"
                + "        },\n"
                + "        yAxis: {\n"
                + "            title: {\n"
                + "                text: 'percentage (%)'\n"
                + "            },\n"
                + "            min: 75,\n"
                + "            max: 100\n"
                + "        },\n"
                + "        tooltip: {\n"
                + "            shared: true,\n"
                + "            crosshairs: true\n"
                + "        },\n"
                + "        plotOptions: {"
                + "            line: {"
                + "                 animation:false,"
                + "                 lineWidth:2,"
                + "            },\n"
                + "            series: {\n"
                + "                cursor: 'pointer',\n"
                + "                events: {\n"
                + "                    click: function () {\n"
                + "                        alert('Category: ' + this.category + ', value: ' + this.y);\n"
                + "                    }\n"
                + "                }\n"
                + "            },\n"
                + "            area: {\n"
                + " \n"
                + "                marker: {\n"
                + "                    radius: 1\n"
                + "                },\n"
                + "                lineWidth: 1,\n"
                + "                states: {\n"
                + "                    hover: {\n"
                + "                        lineWidth: 1\n"
                + "                    }\n"
                + "                },\n"
                + "                threshold: null\n"
                + "            }\n"
                + "        },\n"
                + " \n"
                + "        series: [ {\n"
                + "            //type: 'area',\n"
                + "            type: 'line',            \n"
                + "            color: 'rgba(255, 0, 0, .7)',\n"
                + "            name: 'Target',"
                + "lineWidth: 1,\n"
                + "marker:{"
                + "     enabled: false"
                + "},"
                + "            data: [\n"
                + "                [Date.UTC(2014, 2, 30, 0, 0, 0),94.2],\n"
                + "[Date.UTC(2014, 2, 31, 0, 0, 0),94.2],\n"
                + "[Date.UTC(2014, 3, 1, 0, 0, 0),94.2],\n"
                + "[Date.UTC(2014, 3, 2, 0, 0, 0),94.2],\n"
                + "[Date.UTC(2014, 3, 3, 0, 0, 0),94.2]\n"
                + "            ]\n"
                + "        },{\n"
                + "            name: 'NE 1',\n"
                + "            data: [\n"
                + "                [Date.UTC(2014, 2, 30, 0, 0, 0),96.76630150619679000147843113215371356659],\n"
                + "[Date.UTC(2014, 2, 31, 0, 0, 0),97.53032995392985238931694602009353796061],\n"
                + "[Date.UTC(2014, 3, 1, 0, 0, 0),98.49695647149075111316975599901354913918],\n"
                + "[Date.UTC(2014, 3, 2, 0, 0, 0),98.74647215521468748216421848118929282364],\n"
                + "[Date.UTC(2014, 3, 3, 0, 0, 0),96.81383104129169352228770542843844374978]\n"
                + "            ],\n"
                + "            connectEnds: false\n"
                + "        }, {\n"
                + "            name: 'NE 2',\n"
                + "            data: [\n"
                + "                [Date.UTC(2014, 2, 30, 0, 0, 0),99.81873590961216396446621547052239331865],\n"
                + "[Date.UTC(2014, 2, 31, 0, 0, 0),99.18900835291282398182597299592945688357],\n"
                + "[Date.UTC(2014, 3, 1, 0, 0, 0),97.71761099767100517194278914493941372301],\n"
                + "[Date.UTC(2014, 3, 2, 0, 0, 0),96.4894799701183237702029829632402968128],\n"
                + "[Date.UTC(2014, 3, 3, 0, 0, 0),97.45431949020200985125263653066727972622]\n"
                + "            ]\n"
                + "        }]\n"
                + "    });\n"
                + "});");
        sb.append("</script>");

        return sb.toString();
    }

    public String makeBody() {
        String retStr=makeBody1()+"<br><br><br>"+makeBody2();
        return retStr;
    }
    public String makeBody1() {
        StringBuilder sb = new StringBuilder();

        sb.append("<script src=\"http://code.highcharts.com/highcharts.js\"></script>\n               ");
        sb.append("<script src=\"http://code.highcharts.com/modules/exporting.js\"></script>\n        ");
        sb.append("<div id=\"div1_1\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div>"
                + "<link rel=\"stylesheet\" href=\"css/basic.css\" media=\"screen\">"
                + "<link rel=\"stylesheet\" href=\"css/claro/claro_1_8_5.css\" media=\"screen\">\n" +
"        <link rel=\"stylesheet\" href=\"css/dataTable.css\" media=\"screen\">"
                + "<link rel=\"stylesheet\" href=\"css/style.css\" media=\"screen\">");

        return sb.toString();
    }
    public String makeBody2() {
        StringBuilder sb = new StringBuilder();

        sb.append("<script src=\"http://code.highcharts.com/highcharts.js\"></script>\n               ");
        sb.append("<script src=\"http://code.highcharts.com/modules/exporting.js\"></script>\n        ");
        sb.append("<div id=\"div1_2\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div>");

        return sb.toString();
    }
    
    public String makeJquery(){
        String jq="<script language=\\\"JavaScript\\\" type=\\\"text/javascript\\\" src=\\\"scripts/jquery-1.8.1.min.js\\\"></script>";
        return jq;
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
