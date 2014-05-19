<%-- 
    Document   : welcome
    Created on : 08 Nov 2013, 11:50:20 AM
    Author     : Pierre.Venter
--%>

<% 

        String theIsAdmin = (String) session.getAttribute("isAdmin");
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
                        <th width="20%" align="center" bgcolor="#FFFF99">Vendor</th>
                        <th width="20%" align="center" bgcolor="#FFFF99">Technology</th>
                        <th width="20%" align="center" bgcolor="#FFFF99">Granularity</th>
                        <th width="20%" align="center" bgcolor="#FFFF99">NE Level</th>
                        <th width="8%" align="center" bgcolor="#FFFF99">Progress</th>
                        <th width="12%" align="center" bgcolor="#FFFF99">Comments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>NSN</td>
                        <td>2G</td>
                        <td>Daily/Hourly</td>
                        <td>BSC & Cell</td>
                        <td align="center" bgcolor="#99FF99">100%</td>
                        <td></td>
                    </tr>  
                    <tr>
                        <td>NSN</td>
                        <td>3G</td>
                        <td>Daily/Hourly</td>
                        <td>RNC & Cell</td>
                        <td align="center" bgcolor="#99FF99">100%</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Huawei</td>
                        <td>2G</td>
                        <td>Daily/Hourly</td>
                        <td></td>
                        <td>0%</td>
                    </tr>
                    <tr>
                        <td>Huawei</td>
                        <td>3G</td>
                        <td>Daily/Hourly</td>
                        <td></td>
                        <td>0%</td>
                    </tr>
                    <tr>
                        <td>ZTE</td>
                        <td>2G</td>
                        <td>Daily/Hourly</td>
                        <td></td>
                        <td>0%</td>
                    </tr>
                    <tr>
                        <td>ZTE</td>
                        <td>3G</td>
                        <td>Daily/Hourly</td>
                        <td></td>
                        <td>0%</td>
                    </tr>
                </tbody>
            </table>
            <!--            <div id="content" style="height:200px;width:400px;float:left;margin-bottom: 200px">
                            </div>-->

            <!--            <div id="footer" style="background-color:black;clear:both;text-align:center;">
                            Copyright © Cell C</div>-->
<% 
        if(theIsAdmin!=null && theIsAdmin.equalsIgnoreCase("TRUE")){
%>   
  <a href="formuladefs.jsp" >Insert/Update another record to FORMULA_DEFS Table</a>
  <br><br>
<% 
        }
%>  

        </div>


        <!--        <div class="welcome_backGround">
                    <img src="images/synix_welcome2.jpg" />
                </div>-->
      
    </body>
</html>
