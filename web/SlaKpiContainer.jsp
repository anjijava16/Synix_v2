<%-- 
    Document   : datePicker
    Created on : 08 Apr 2013, 12:45:59 PM
    Author     : z0006cpz
--%>
<%
    String divid = request.getParameter("divid");
%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <a name="top<%=divid%>"></a>

        <table class="blingTable" border='0' cellpadding='0' cellspacing='0' width='700px'>
            <thead class='fixedHeader'>
                <tr>
                    <td class='gray1' style="text-align:center">Level</td>
                    <td class='gray1' style="text-align:center">Period</td>
                    <td class='gray1' style="text-align:center">From</td>
                    <td class='gray1' style="text-align:center">To</td>
                    <td class='gray1' style="text-align:center">Show me!</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class='blue1Head' style="text-align:center" >
                        <div data-dojo-type="dojo/store/Memory"
                             data-dojo-id="levelStore"
                             data-dojo-props="data: [{id: 'ctrl', name: 'Controller'}, {id: 'cell', name: 'Cell'}]"></div>
                        <input class="comboPeriodClass" data-dojo-type="dijit/form/ComboBox"
                               value="Controller"
                               style="width: 85px"
                               data-dojo-props="store:levelStore, searchAttr:'name'"
                               name="level"
                               id="comboLevel<%=divid%>"/>
                    </td>
                    <td class='blue1Head' style="text-align:center" >   
                        <div data-dojo-type="dojo/store/Memory"
                             data-dojo-id="stateStore"
                             data-dojo-props="data: [{id: 'day', name: 'Daily'}, {id: 'hour', name: 'Hourly'}]"></div>
                        <input class="comboPeriodClass" data-dojo-type="dijit/form/ComboBox"
                               value="Daily"
                               style="width: 79px"
                               data-dojo-props="store:stateStore, searchAttr:'name'"
                               name="state"
                               id="comboPeriodID<%=divid%>"/>
                    </td>
                    <td class='blue1Head' style="text-align:center" >
                        <input type="text" name="fromDate" id="filterFromDate<%=divid%>" 
                               data-dojo-type="dijit/form/DateTextBox"
                               constraints={datePattern:'dd/MM/yyyy'}
                               required="true"/>
                    </td>
                    <td class='blue1Head' style="text-align:center" >
                        <input type="text" name="toDate" id="filterToDate<%=divid%>" 
                               data-dojo-type="dijit/form/DateTextBox"
                               constraints={datePattern:'dd/MM/yyyy'}
                               required="true" value="now"/>
                    </td>
                    <td class='blue1Head' style="text-align:center" >
                        <button id="plotCharts<%=divid%>" data-dojo-type="dijit/form/Button" type="button">Plot Charts
                            <script type="dojo/on" data-dojo-event="click" data-dojo-args="evt">
                                require(["dojo/dom"], function(dom){
                                toggleFilterTableVisibility(false);
                                plotCharts();
                                });
                            </script>
                        </button>
                    </td>
                </tr>
            </tbody>                         
        </table>
        <TABLE class="blingBackGroundTable" cellspacing="0" width='730px'> <!--  width="60%">-->
            <thead>
                <tr>
                    <td class='blue1Head'>Filter Table</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <button id="showHideFilterTable<%=divid%>" type="button" onclick="toggleFilterTableVisibility('toggle')">-</button>
                        &nbsp;&nbsp;<label id="showHideLabel<%=divid%>">Hide filters&nbsp;&nbsp;</label>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <button id="showCells<%=divid%>" type="button" onclick="showCellDiv()">Show Cells</button>      
<!--                        <input id="showCells<%=divid%>" type="button" onclick="showCellDiv()" value="Show Cells"/>      -->
                    </td>
                <tr>
                    <td>
                        <div id="cellsLoader<%=divid%>" style="display: none;">
                            <div class="loadingImg"></div>
                        </div>                        
                    </td>
                </tr>
                </tr>
                <tr>
                    <td>
                        <div id="neFilterTable<%=divid%>" style="width: 100%;display: block;"></div>
                    </td>
                </tr>
            </tbody>
        </TABLE>

        <div id="aggCtrl<%=divid%>" style="width: 100%;display: block;">
            <TABLE class="blingBackGroundTable" cellspacing="0" width='730px'> 
                <thead class='fixedHeader'>
                    <tr>
                        <td class='gray1Head' style="text-align:center;width: 50%">Controller Level Aggregations</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: center">
                            <div id="hiddenButton1<%=divid%>" style="display: block;">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top">
                            <div id="selectedControllersTable<%=divid%>"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="aggCell<%=divid%>" style="width: 100%;display: block;">
            <TABLE class="blingBackGroundTable" cellspacing="0" width='730px'> 
                <thead class='fixedHeader'>
                    <tr>
                        <td class='gray1Head' style="text-align:center;width: 50%">Cell Level Aggregations</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="vertical-align: top">
                            <div id="selectedCellsTable<%=divid%>"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>

        <div id="resultTable<%=divid%>" style="display: none;">
            <TABLE class="blingBackGroundTable" cellspacing="0" width='100%'> <!--  width="60%">-->
                <thead>
                    <tr>
                        <td class='blue1Head'>SLA KPI's</td>
                    </tr>
                </thead>
                <tr>
                    <td>
                        <div id="loaderDiv<%=divid%>" style="display: none;">
                            <div class="loadingImg"></div>
                        </div>
                        <div id="chartResult<%=divid%>" style="width: 100%;display: none;"></div>
                    </td>
                </tr>        
            </TABLE>
        </div>
        <br>
        <!--<a href="#top<%=divid%>">Back to top</a>-->
    </body>

</html>
