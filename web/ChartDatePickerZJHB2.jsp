<%-- 
    Document   : datePicker
    Created on : 08 Apr 2013, 12:45:59 PM
    Author     : z0006cpz
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <table border='0' cellpadding='0' cellspacing='0' width='100%'>
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
                               id="comboPeriodIDZJHB2" />

                    </td>
                    <td style="text-align:center">
                        <label for="From Date:">From:</label>
                        <input type="text" name="fromDate" id="filterFromDateZJHB2" 
                               data-dojo-type="dijit/form/DateTextBox"
                               constraints={datePattern:'dd/MM/yyyy'}
                               required="true"/>
                        <label for="To Date:">&nbsp &nbsp &nbsp To:</label>
                        <input type="text" name="toDate" id="filterToDateZJHB2" 
                               data-dojo-type="dijit/form/DateTextBox"
                               constraints={datePattern:'dd/MM/yyyy'}
                               required="true" value="now"/>
                    </td>
                </tr>
            </thead>                            
        </table>
        <div id="chartResult2ZJHB2" style="width: 100%;display: block;"></div>
        <div id="chartResultZJHB2" style="width: 100%"></div>
    </body>
</html>
