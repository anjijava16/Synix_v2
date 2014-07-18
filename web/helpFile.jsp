<%-- 
    Document   : helpFile
    Created on : 17 Jul 2014, 10:26:03 AM
    Author     : Pierre.Venter
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="css/table.css" media="screen">
        <link rel="stylesheet" href="css/help.css" media="screen">
    </head>
    <body>
        <div class="header" >
            <img class="imgcenter" src="images/logo6.png" />
        </div>
        <!--<h1>Synix online help</h1>-->
        <!--<br><br><br>-->
        <a href="glossaryOfTerms.jsp" target="blank_">Glossary Of Terms</a>
        
        <h1>Gaining Access:</h1>
        <table class="blingTable" border='0' cellpadding='0' cellspacing='0' width='70%'>
            <thead class='fixedHeader'>
                <tr>
                    <th width="30%" class='blue1Head' style="text-align:center">Task</th>
                    <th width="70%" class='blue1Head' style="text-align:center">Details</th>
                    <!--                    <td class='gray1' style="text-align:center">From</td>
                                        <td class='gray1' style="text-align:center">To</td>
                                        <td class='gray1' style="text-align:center">Show me!</td>-->
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td valign="top" class='blue1' style="text-align:top" >
                        <h3>1. Requesting access to Synix</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>1.1 Click the "request access" link.</label><br><br>
                        <label>1.2 Specify your preferred user name and password in the mail message.</label><br>
                        <img src="images/synixHelp/login.png" />
                    </td>
                </tr>
            </tbody>
        </table>
        <br><br><br>
        <h1>Plotting KPI Charts:</h1>
        <table class="blingTable" border='0' cellpadding='0' cellspacing='0' width='100%'>
            <thead class='fixedHeader'>
                <tr>
                    <th width="20%" class='blue1Head' style="text-align:center">Task</th>
                    <th width="80%" class='blue1Head' style="text-align:center">Details</th>
                    <!--                    <td class='gray1' style="text-align:center">From</td>
                                        <td class='gray1' style="text-align:center">To</td>
                                        <td class='gray1' style="text-align:center">Show me!</td>-->
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>1. Selecting the desired KPI category</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>1.1 Navigate to the desired vendor.</label><br><br>
                        <label>1.2 Navigate to the desired technology.</label><br><br>
                        <label>1.3 Select any of the sub categories: "Accessibility", "Retainability", "Traffic"</label><br><br>
                        <img src="images/synixHelp/logicalGrouping.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>2. Selecting the desired Controllers</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>2.1 In the filter box, select the controllers for which you would like KPI charts.</label><br>
                        <img src="images/synixHelp/controllers.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>3. Define the main filters</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>3.1 Seeing as we would like KPI charts on a controller level, make the subsequent selection.</label><br><br>
                        <label>3.2 For the Period, you have the choice of either "Daily" or "Hourly".</label><br><br>
                        <label>3.3 Select the "From" and "To" dates.</label><br><br>
                        <label>3.4 Select the "Plot Charts" button.</label><br><br>
                        <img src="images/synixHelp/periodLevelFilter.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>4. Result</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>4.1 A combination chart is produced.</label><br><br>
                        <label>4.2 Chart contains a line for each selected controller.</label><br><br>
                        <img src="images/synixHelp/comboChart.png" />
                    </td>
                </tr>
            </tbody>
        </table>
        <br><br><br>
        <h1>Interacting with the Charts:</h1>
        <table class="blingTable" border='0' cellpadding='0' cellspacing='0' width='100%'>
            <thead class='fixedHeader'>
                <tr>
                    <th width="20%" class='blue1Head' style="text-align:center">Task</th>
                    <th width="80%" class='blue1Head' style="text-align:center">Details</th>
                    <!--                    <td class='gray1' style="text-align:center">From</td>
                                        <td class='gray1' style="text-align:center">To</td>
                                        <td class='gray1' style="text-align:center">Show me!</td>-->
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>5. Zooming</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>5.1 By clicking-and-dragging the left mouse button, it is possible to highlight a certain section of the chart.</label><br><br>
                        <img src="images/synixHelp/zoom.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >

                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>5.1 Result.</label><br><br>
                        <img src="images/synixHelp/zoomChart1.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >

                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>5.2 Isolating a series by selecting the line on the chart. This will hide the other lines</label><br><br>
                        <img src="images/synixHelp/zoomChart2.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>6. Resetting the zoom</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>6.1 By selecting the "Reset zoom" button, you can zoom out for the currently active series</label><br>
                        <img src="images/synixHelp/resetZoom.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>6.1 Result.</label><br><br>
                        <img src="images/synixHelp/singleChart.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>7. Showing additional series'</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>7.1 Clicking the series name in the legend window will show or hide it.</label><br><br>
                        <img src="images/synixHelp/semiComboChart.png" />
                    </td>
                </tr>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>8. Saving the chart</h3>
                    </td>
                    <td class='blue1' style="text-align:left" >
                        <label>8.1 User has the option of saving the chart in any of the following formats.</label><br><br>
                        <b><label>8.2 The next release will have the option of saving the raw data in CSV format.</label></b><br><br>
                        <img src="images/synixHelp/saveChart.png" />
                    </td>
                </tr>
            </tbody>
        </table>

        <br><br><br>
        <h1>Aggregating Objects:</h1>
        <table class="blingTable" border='0' cellpadding='0' cellspacing='0' width='100%'>
            <thead class='fixedHeader'>
                <tr>
                    <th width="20%" class='blue1Head' style="text-align:center">Task</th>
                    <th width="80%" class='blue1Head' style="text-align:center">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>9. Controllers can be aggregated into multiple groups</h3>
                    </td>        
                    <td valign="top" class='blue1' style="text-align:left" >
                        <label>9.1 Select the controllers.</label><br><br>
                        <label>9.2 Aggregate the selected objects into a group by selecting the "Aggregate controllers" button.</label><br><br>
                        <img src="images/synixHelp/controllersAgg.png" />
                    </td>
                <tr><td></td>
                    <td class='blue1' style="text-align:left" >
                        <label>Each aggregated group will be plotted as a single series.</label><br><br>
                        <img src="images/synixHelp/aggChart.png" />
                    </td>
                </tr>
                </tr>       
                <tr>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <h3>10. Cells can be aggregated into multiple groups</h3>
                    </td>
                    <td valign="top" class='blue1' style="text-align:left" >
                        <label>9.1 Select the controllers.</label><br><br>
                        <label>9.2 Select the "Show cells" button. This will show the 1st <b>250</b> cells located on the selected controllers.</label><br><br>
                        <label>9.3 Select the desired cells.</label><br><br>
                        <label>9.4 Select the "Plot charts" button.</label><br><br>
                        <label>9.5 Cells can also be aggregate into groups by selecting the "Aggregate cells" button.</label><br><br>
                        <img src="images/synixHelp/cellFilter.png" />
                    </td>
                </tr>       
            </tbody>
        </table>

    </body>
</html>
