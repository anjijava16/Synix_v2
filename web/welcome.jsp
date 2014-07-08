<%-- 
    Document   : welcome
    Created on : 08 Nov 2013, 11:50:20 AM
    Author     : Pierre.Venter
--%>

<%@page import="za.co.cellc.synix.view.ChartServlet"%>
<%

    String theIsAdmin = (String) session.getAttribute("isAdmin");
    ChartServlet cs = new ChartServlet();

%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>

    </head>
    <body>
        <div>
            <label>Technology Road Map:</label>
            <TABLE class="blingTable" cellspacing="0">
                <thead>
                    <tr>
                        <th width="20%" style="text-align:center" bgcolor="#FFFF99">Vendor</th>
                        <th width="20%" style="text-align:center" bgcolor="#FFFF99">Technology</th>
                        <th width="20%" style="text-align:center" bgcolor="#FFFF99">Granularity</th>
                        <th width="20%" style="text-align:center" bgcolor="#FFFF99">NE Level</th>
                        <th width="8%" style="text-align:center" bgcolor="#FFFF99">Progress</th>
                        <th width="12%" style="text-align:center" bgcolor="#FFFF99">Comments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:center">NSN</td>
                        <td style="text-align:center">2G</td>
                        <td style="text-align:center">Daily/Hourly</td>
                        <td style="text-align:center">BSC & Cell</td>
                        <td style="text-align:center" bgcolor="#99FF99">100%</td>
                        <td style="text-align:center"></td>
                    </tr>  
                    <tr>
                        <td style="text-align:center">NSN</td>
                        <td style="text-align:center">3G</td>
                        <td style="text-align:center">Daily/Hourly</td>
                        <td style="text-align:center">RNC & Cell</td>
                        <td style="text-align:center" bgcolor="#99FF99">100%</td>
                        <td style="text-align:center"></td>
                    </tr>
                    <tr>
                        <td style="text-align:center">Huawei</td>
                        <td style="text-align:center">2G</td>
                        <td style="text-align:center">Daily/Hourly</td>
                        <td style="text-align:center"></td>
                        <td style="text-align:center">0%</td>
                    </tr>
                    <tr>
                        <td style="text-align:center">Huawei</td>
                        <td style="text-align:center">3G</td>
                        <td style="text-align:center">Daily/Hourly</td>
                        <td style="text-align:center"></td>
                        <td style="text-align:center">0%</td>
                    </tr>
                    <tr>
                        <td style="text-align:center">ZTE</td>
                        <td style="text-align:center">2G</td>
                        <td style="text-align:center">Daily/Hourly</td>
                        <td style="text-align:center">BSC & Cell</td>
                        <td style="text-align:center">95%</td>
                        <td style="text-align:center">Undergoing unit testing</td>
                    </tr>
                    <tr>
                        <td style="text-align:center">ZTE</td>
                        <td style="text-align:center">3G</td>
                        <td style="text-align:center">Daily/Hourly</td>
                        <td style="text-align:center">RNC & Cell</td>
                        <td style="text-align:center">95%</td>
                        <td style="text-align:center">Undergoing unit testing</td>
                    </tr>
                </tbody>
            </table>
            <!--            <div id="content" style="height:200px;width:400px;float:left;margin-bottom: 200px">
                            </div>-->

            <!--            <div id="footer" style="background-color:black;clear:both;text-align:center;">
                            Copyright © Cell C</div>-->
            <%    if (theIsAdmin != null && theIsAdmin.equalsIgnoreCase("TRUE")) {
            %>   
            <a href="formuladefs.jsp" >Insert/Update another record to FORMULA_DEFS table</a>
            <br><br>
            <a href="SlaKpiContainer.jsp" >SlaKpiContainer</a>
            <%
                }
            %>  

        </div>


        <!--        <div class="welcome_backGround">
                    <img src="images/synix_welcome2.jpg" />
                </div>-->

    </body>
</html>
