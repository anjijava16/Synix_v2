<%-- 
    Document   : datePicker
    Created on : 08 Apr 2013, 12:45:59 PM
    Author     : z0006cpz
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script>
            require(["dojo/parser", "dijit/form/ComboBox", "dojo/store/Memory"]);
        </script>
    </head>
    <body>
        <table border='0' cellpadding='0' cellspacing='0' width='100%' class='scrollTable'>
            <thead class='fixedHeader'>
                <tr>
                    <td style="text-align:left">                           
                        <div data-dojo-type="dojo/store/Memory"
                             data-dojo-id="stateStore"
                             data-dojo-props="data: [{id: 'day', name: 'Daily'}, {id: 'hour', name: 'Hourly'}]"></div>
                        <label>&nbsp &nbsp &nbsp Period:</label>
                        <input class="comboPeriodClass" data-dojo-type="dijit/form/ComboBox"
                               value="Daily"
                               style="width: 75px"
                               data-dojo-props="store:stateStore, searchAttr:'name'"
                               name="state"
                               id="comboPeriodID_NSN_3G" />
                        
                    </td>
                    <td style="text-align:center">
                        <label for="From Date:">From:</label>
                        <input type="text" name="fromDate" id="filterFromDate_NSN_3G" 
                               data-dojo-type="dijit/form/DateTextBox"
                               constraints={datePattern:'dd/MM/yyyy'}
                               required="true" />
                        <label for="To Date:">&nbsp &nbsp &nbsp To:</label>
                        <input type="text" name="toDate" id="filterToDate_NSN_3G" 
                               data-dojo-type="dijit/form/DateTextBox"
                               constraints={datePattern:'dd/MM/yyyy'}
                               required="true" value="now"/>
                        <!--<input id="exploreTableName" type="hidden" name="exploreTableName"/>-->
                        <!--<input id='fillChartsCheckBox' value="fillCharts" type='checkbox'>Fill Charts-->
                        <!--<br>-->
                        <!--<button onClick="alert(dijit.byId('comboPeriodID').get('value'))">Get value</button>-->
                    </td>
<!--                    <td style="text-align:right">
                        <button id="plot_nsn_3g_button" TYPE=submit>Plot Charts</button>
                        <INPUT TYPE=submit VALUE="Draw Charts!" class="chartSubmitbutton">
                    </td>-->
                    
                </tr>
            </thead>                            
        </table>
    <th style="text-align:center">
    <div id="chartResult2_NSN_3G" style="width: 100%;display: block;"></div>
    <div id="chartResult_NSN_3G" style="width: 100%"></div>
</th>      
</body>
</html>
