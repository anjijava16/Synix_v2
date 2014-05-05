<%-- 
    Document   : test
    Created on : 27 Feb 2014, 3:42:06 PM
    Author     : Pierre.Venter
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>


        <div class="dijitTabPaneWrapper dijitTabContainerTop-container dijitAlignClient" data-dojo-attach-point="containerNode" aria-labelledby="editorWindow_tablist_chartTab_2G" style="left: 0px; top: 33px; position: absolute; width: 1198px; height: 200px;">
            <div class="dijitContentPane wwClass dijitTabPane dijitTabContainerTop-child dijitTabContainerTop-dijitContentPane dijitHidden" id="welcomeWindow" data-dojo-type="dojox/layout/ContentPane" data-dojo-props="title:&quot;Welcome&quot;,iconClass:&quot;dijitCommonsIcon dijitUserIcon&quot;" title="" role="group" lang="en" widgetid="welcomeWindow" style="left: 0px; top: 0px; width: 1182px; height: 666px; visibility: visible;">
                <form id="testFRM" action="ChartFilterServlet" method="post">
                    <h1>Welcome to Synix</h1><table border="1" cellpadding="0" cellspacing="0" width="100%" class="scrollTable">
                        <tbody><tr>

                            </tr>
                        </tbody></table>
                    <br>
                    <p>
                    </p><div id="welcome_Div" preload="true" extractcontent="true" dojotype="dijit.layout.ContentPane" href="welcome.jsp" title="" selected="true" class="dijitContentPane" role="group" lang="en" widgetid="welcome_Div"><div>
                            <label>Technology Road Map:</label>
                            <table class="blingTable" cellspacing="0">
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
                                        <td>BSC &amp; Cell</td>
                                        <td align="center" bgcolor="#99FF99">90%</td>
                                        <td>Aggregated data on cell level: 80% completed</td>
                                    </tr>  
                                    <tr>
                                        <td>NSN</td>
                                        <td>3G</td>
                                        <td>Daily/Hourly</td>
                                        <td>RNC &amp; Cell</td>
                                        <td align="center" bgcolor="#99FF99">80%</td>
                                        <td>Aggregated data on cell level: 0% completed</td>
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

                        </div>


                        <!--        <div class="welcome_backGround">
                                    <img src="images/synix_welcome2.jpg" />
                                </div>-->
                    </div> 
                    <!--<div id="WC"><label> Show target </label></div>-->
                    <!--<INPUT TYPE=submit VALUE="test" >-->
                </form>
            </div><div class="dijitContentPane kpiChartsLayout dijitTabPane dijitTabContainerTop-child dijitTabContainerTop-dijitContentPane dijitVisible" id="chartTab_2G" data-dojo-type="dojox/layout/ContentPane" data-dojo-props="region: &quot;center&quot;,title:&quot;2G SLA KPI&quot;,iconClass:&quot;dijitCommonsIcon dijitChartIcon&quot;" style="display: none; left: 0px; top: 0px; width: 1182px; height: 184px;" title="" role="group" lang="en" widgetid="chartTab_2G">
                <!--<div id="tab1" data-dojo-type="dijit.layout.ContentPane" title="Chart Filter" >-->

                <form id="filterFRM" action="ChartFilterServlet" method="post">
                    <div id="Chart_DatePicker" preload="true" extractcontent="true" dojotype="dijit.layout.ContentPane" href="ChartDatePicker.jsp" title="" selected="true" class="dijitContentPane" role="group" lang="en" widgetid="Chart_DatePicker"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="scrollTable">
                            <thead class="fixedHeader">
                                <tr>
                                    <td style="text-align:left">                           
                                        <div data-dojo-type="dojo/store/Memory" data-dojo-id="stateStore" data-dojo-props="data: [{id: 'day', name: 'Daily'}, {id: 'hour', name: 'Hourly'}]"></div>
                                        <label>&nbsp; &nbsp; &nbsp; Period:</label>
                                        <div class="dijit dijitReset dijitInline dijitLeft comboPeriodClass dijitTextBox dijitComboBox dijitValidationTextBox" id="widget_comboPeriodID" role="combobox" lang="en" widgetid="comboPeriodID" style="width: 75px;"><div class="dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer" data-dojo-attach-point="_buttonNode, _popupStateNode" role="presentation"><input class="dijitReset dijitInputField dijitArrowButtonInner" value="▼ " type="text" tabindex="-1" readonly="readonly" role="presentation"></div><div class="dijitReset dijitValidationContainer"><input class="dijitReset dijitInputField dijitValidationIcon dijitValidationInner" value="Χ " type="text" tabindex="-1" readonly="readonly" role="presentation"></div><div class="dijitReset dijitInputField dijitInputContainer"><input class="dijitReset dijitInputInner" name="state" type="text" autocomplete="off" data-dojo-attach-point="textbox,focusNode" role="textbox" aria-haspopup="true" tabindex="0" aria-invalid="false" id="comboPeriodID" value="Daily"></div></div>

                                    </td>
                                    <td style="text-align:center">
                                        <label for="From Date:">From:</label>
                                        <div class="dijit dijitReset dijitInline dijitLeft dijitTextBox dijitComboBox dijitDateTextBox dijitValidationTextBox dijitTextBoxIncomplete dijitComboBoxIncomplete dijitDateTextBoxIncomplete dijitValidationTextBoxIncomplete dijitIncomplete" id="widget_filterFromDate" role="combobox" lang="en" widgetid="filterFromDate"><div class="dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer" data-dojo-attach-point="_buttonNode, _popupStateNode" role="presentation"><input class="dijitReset dijitInputField dijitArrowButtonInner" value="▼ " type="text" tabindex="-1" readonly="readonly" role="presentation"></div><div class="dijitReset dijitValidationContainer"><input class="dijitReset dijitInputField dijitValidationIcon dijitValidationInner" value="Χ " type="text" tabindex="-1" readonly="readonly" role="presentation"></div><div class="dijitReset dijitInputField dijitInputContainer"><input class="dijitReset dijitInputInner" type="text" autocomplete="off" data-dojo-attach-point="textbox,focusNode" role="textbox" aria-haspopup="true" aria-valuenow="null" aria-invalid="true" tabindex="0" id="filterFromDate" aria-required="true" value=""><input type="hidden" name="fromDate" value=""></div></div>
                                        <label for="To Date:">&nbsp; &nbsp; &nbsp; To:</label>
                                        <div class="dijit dijitReset dijitInline dijitLeft dijitTextBox dijitComboBox dijitDateTextBox dijitValidationTextBox" id="widget_filterToDate" role="combobox" lang="en" widgetid="filterToDate"><div class="dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer" data-dojo-attach-point="_buttonNode, _popupStateNode" role="presentation"><input class="dijitReset dijitInputField dijitArrowButtonInner" value="▼ " type="text" tabindex="-1" readonly="readonly" role="presentation"></div><div class="dijitReset dijitValidationContainer"><input class="dijitReset dijitInputField dijitValidationIcon dijitValidationInner" value="Χ " type="text" tabindex="-1" readonly="readonly" role="presentation"></div><div class="dijitReset dijitInputField dijitInputContainer"><input class="dijitReset dijitInputInner" type="text" autocomplete="off" data-dojo-attach-point="textbox,focusNode" role="textbox" aria-haspopup="true" tabindex="0" id="filterToDate" aria-required="true" aria-valuenow="Thu Feb 27 2014 15:39:17 GMT+0200 (South Africa Standard Time)" aria-invalid="false" value="27/02/2014"><input type="hidden" name="toDate" value="2014-02-27"></div></div>
                                        <!--<input id="exploreTableName" type="hidden" name="exploreTableName"/>-->
                                        <!--<input id='fillChartsCheckBox' value="fillCharts" type='checkbox'>Fill Charts-->
                                        <!--<br>-->
                                        <!--<button onClick="alert(dijit.byId('comboPeriodID').get('value'))">Get value</button>-->
                                    </td>
                                    <td style="text-align:right">
                                        <button id="plot_nsn_2g_button" type="submit">Plot Charts</button>
                                        <!--<INPUT TYPE=submit VALUE="Draw Charts!" class="chartSubmitbutton">-->
                                    </td>

                                </tr>
                            </thead>                            
                        </table>

                        <div id="chartResult2" style="width: 100%;display: block;"></div>
                        <div id="chartResult" style="width: 100%"></div>

                        <script type="text/javascript" language="javascript">
                            console.log("set date");
                            dijit.byId("filterFromDate").attr("value", new Date(2014, 02, 10));
                        </script>
                    </div>
                    <br>
                    <br>
                    <br>
                    <!--                            <div id="chartResult" style="width: 100%"></div>-->
                    <br>
                </form>
                <!--</div>-->
                <!--                    <div data-dojo-type="dojox.layout.ContentPane">
                                        <div id="KPI_Charts_Div" preload="true" extractContent="true"
                                             dojoType="dojox.layout.ContentPane" href="KPI_Charts.jsp"
                                             title="kpiCharts" selected="true" style="display: block;">
                                        </div> 
                                    </div>-->
                <div id="loaderDiv" style="display: none;">
                    <div class="loadingImg"></div>
                </div>

            </div>



        </div>



    </body>
</html>
