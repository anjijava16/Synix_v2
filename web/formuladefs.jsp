<%-- 
    Document   : formulaDefs
    Created on : 15 May 2014, 9:32:43 AM
    Author     : NMichael
--%>
<%

    String theIsAdmin = (String) session.getAttribute("isAdmin");
%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Insert/Update to FORMULA_DEFS table</title>
    </head>
    <body>
        <%
            if (theIsAdmin != null && theIsAdmin.equalsIgnoreCase("TRUE")) {
        %>   

        <h3>Insert/Update to FORMULA_DEFS table</h3>


        <form action="formulaDefsResults.jsp" method="post">
            <table>
                <tr><td>TABLE NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>VALUE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
                <tr>
                    <td>OPERATION              </td>
                    <td>
                        <select name="operationRequired"  >
                            <option value="SELECT" >SELECT</option>
                            <option value="INSERT" >Insert into FORMULA_DEFS table</option>
                            <option value="UPDATE" >Update FORMULA_DEFS table</option>
                        </select>
                    </td>
                </tr>
                <tr><td>VENDOR                 </td>
                    <td>
                        <select name="vendor">
                            <option value="SELECT" >SELECT</option>
                            <option value="NSN" >NSN</option>
                            <option value="HUAWEI" >HUAWEI</option>
                            <option value="ZTE" >ZTE</option>                            
                        </select>
                    </td>
                </tr>
                <tr><td>TECHNOLOGY             </td>
                    <td>
                        <select name="technology">
                            <option value="SELECT" >SELECT</option>
                            <option value="2G" >2G</option>
                            <option value="3G" >3G</option>
                        </select>
                    </td>
                </tr>                    
                <tr><td>CHART_TITLE            </td><td><input size="100" type="text" name="chartTitle"            /></td></tr>
                <tr><td>FORMULA                </td>
                    <td>
                        <textarea rows="4" cols="110" name="formula"></textarea>
                    </td>
                </tr>
                <tr>
                    <td>ALGORYTHM              </td>
                    <td>
                        <textarea rows="4" cols="110" name="algorythm"/></textarea>
                    </td>
                </tr>
                <tr><td>FLAT_TABLE_NAME        </td><td><input size="100" type="text" name="flatTableName"         /></td></tr>
                <tr><td>PRIORITY (Numeric)     </td><td><input type="text" name="priority"              /></td></tr>
                <tr><td>TARGET                 </td><td><input type="text" name="target"                /></td></tr>
                <tr><td>IS_ENABLED (Numeric)   </td><td><input type="text" name="isEnabled"             /></td></tr>
                <tr><td>VIEW_CELL_HOURLY       </td><td><input size="40" type="text" name="viewCellHourly"        /></td></tr>
                <tr><td>VIEW_CELL_DAILY        </td><td><input size="40" type="text" name="viewCellDaily"         /></td></tr>
                <tr><td>VIEW_CONTROLLER_HOURLY </td><td><input size="40" type="text" name="viewControlle_Hourly"  /></td></tr>
                <tr><td>VIEW_CONTROLLER_DAILY  </td><td><input size="40" type="text" name="viewControllerDaily"   /></td></tr>
                <tr><td>VIEW_CELL_WEEKLY       </td><td><input size="40" type="text" name="viewCellWeekly"        /></td></tr>
                <tr><td>VIEW_CELL_MONTHLY      </td><td><input size="40" type="text" name="viewCellMonthly"       /></td></tr>
                <tr><td>VIEW_CONTROLLER_WEEKLY </td><td><input size="40" type="text" name="viewControllerWeekly"  /></td></tr>
                <tr><td>VIEW_CONTROLLER_MONTHLY</td><td><input size="40" type="text" name="viewControllerMonthly" /></td></tr>
                <tr>
                    <td>
                        <button type="reset" value="Reset">Reset</button>                        
                    </td>
                    <td>
                        <input type="submit" name="submit" value="Run Query">
                    </td>
                </tr>
            </table>
        </form>
        <%
            }
        %>  
        <br>
        <br> 
        <a href="index.jsp" >Home Page</a>        
    </body>
</html>
