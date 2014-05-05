<%-- 
    Document   : KPI_Charts
    Created on : 08 Nov 2013, 2:17:53 PM
    Author     : Pierre.Venter
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script language="JavaScript" type="text/javascript" src="scripts/jquery-1.8.1.min.js"></script>
    </head>
    <body>
        <table border='1' cellpadding='0' cellspacing='0' width='100%' class='scrollTable'>
            <tr>
            <h1><center>KPI Charts</center></h1>
        </tr>
    </table>
    <div id="tab4" data-dojo-type="dijit.layout.ContentPane" title="Chart Filter" style="display: block;">
        <%-- date selection  --%>                        
        <form id="filterFRM" action="ChartFilterServlet" method="post">
            <div id="Chart_DatePicker" preload="true" extractContent="true"
                 dojoType="dijit.layout.ContentPane" href="ChartDatePicker.jsp"
                 title="filter" selected="true" style="display: block;">
            </div>
            <INPUT TYPE=submit VALUE="Draw&#13;&#10;Charts!" class="chartSubmitbutton">
            <br>
            <br>
            <br>
            <div id="chartResult" style="width: 100%"></div>
            <!--<div id="chartResult2" style="width: 100%"></div>-->
            <br>
        </form>
    </div>
    <!--<button id="createChartsButton">Create Charts</button>-->
</body>
</html>
