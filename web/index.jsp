<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<%@ page autoFlush="true" buffer="1094kb"%>
<%@page import="za.co.cellc.synix.model.Authenticate"%>
<jsp:useBean id="NE_Filter" scope="request" class="za.co.cellc.synix.html_builders.ne_filtler.Filter" />


<!DOCTYPE HTML>
<html lang="en">
    <%
        String theLogin = (String) session.getAttribute("theLogin");
        String thePassword = (String) session.getAttribute("loginpassword");
        String theLevel = (String) session.getAttribute("level");
        String theIsAdmin = (String) session.getAttribute("isAdmin");

        String login = (String) request.getParameter("loginname");
        String password = (String) request.getParameter("loginpassword");
        boolean authenticated = false;

        if (theLogin != null && !theLogin.equals("") && theLevel != null && theIsAdmin != null) {
            login = theLogin;
            authenticated = true;

        } else if (login != null && password != null) {
            Authenticate auth = new Authenticate(login, password);
            authenticated = auth.passwordAuthenticate();
            if (authenticated) {
                session.setAttribute("theLogin", login);
                if (auth.isAdmin()) {
                    session.setAttribute("isAdmin", "true");
                } else {
                    session.setAttribute("isAdmin", "false");
                }
                session.setAttribute("level", "" + auth.getLevel());
                session.setAttribute("loginname", login);
                session.setAttribute("password", password);
            }
        }
//        String isAdmin = (String) session.getAttribute("isAdmin");
//        String level = (String) session.getAttribute("level");

    %>
    <head>
        <meta charset="utf-8">
        <title>Synix</title>
        <link rel="stylesheet" href="css/graphs.css" media="screen">
        <link rel="stylesheet" href="css/basic.css" media="screen">
        <link rel="stylesheet" href="css/table.css" media="screen">
        <link rel="stylesheet" href="css/claro/claro_1_8_5.css" media="screen">
        <link rel="stylesheet" href="css/dataTable.css" media="screen">
        <!--<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/dojo/1.8.5/dijit/themes/claro/claro.css" media="screen">-->
        <link rel="stylesheet" href="css/style.css" media="screen">
        <script src="dojo/dojo.js"
                data-dojo-config="async: true, parseOnLoad: true">
        </script>
        <script language="JavaScript" type="text/javascript" src="scripts/jquery-1.8.1.min.js"></script>
        <script src="scripts/DojoRequirements.js"></script>
        <script src="scripts/CollapsibleLists.js"></script>
        <script type="text/javascript" src="scripts/dygraph/dygraph-combined.js"></script>
        <script type="text/javascript" src="scripts/dygraph/dygraph-dev.js"></script>
        <script type="text/javascript" src="scripts/dygraph/dygraph-extra.js.pagespeed.jm.XEAakGGeT_.js"></script>
        <script src="scripts/dygraph/custom/highlightWeekends.js"></script>
        <script src="scripts/dygraph/custom/highlightTarget.js"></script>
        <script src="scripts/dygraph/custom/annotations.js"></script>
        <script src="scripts/TopTree.js"></script>
        <script src="scripts/Dates.js"></script>
        <script src="scripts/Index_Functions.js"></script>
        <script src="scripts/tabManager.js"></script>
        <script src="scripts/NE_Filter.js"></script>
        <script src="scripts/dygraph/custom/drillDownButton.js"></script>
        <script src="scripts/DateFormat.js"></script>
        <script src="scripts/dygraph/custom/highlightPeriod.js"></script>
        <script src="scripts/dygraph/custom/barChartPlotter.js"></script>
        <script src="scripts/dygraph/custom/drillDownBarChart.js"></script>

        <script>
                    require(["dijit/form/Button", "dojo/ready"], function(Button, ready) {
                        ready(function() {
                            var browser = getBrowser();
                            if (browser !== "Chrome") {
                                alert("Although " + browser + " will \"work\" it will fall over when displaying large amounts of data. It is advised to use Google Chrome!");
                            }
                            document.getElementById("appLayout").style.visibility = "visible";
                            document.getElementById("loader").style.display = "none";
                            document.getElementById("loaderDiv").style.display = "none";
                            document.getElementById("loaderDiv_NSN_3G").style.display = "none";
                            document.getElementById("welcomeWindow").style.visibility = "visible";
                            hideEditorTab(1, 'chartTab_2G');
                            hideEditorTab(2, 'chartTab_3G');
                            hideEditorTab(3, 'rev_avail_nsn_2G');
                            hideEditorTab(4, 'rev_avail_nsn_3G');
                        });
                        dojo.subscribe("editorWindow-selectChild", function(selected) {
                            showFilters(selected.title);
                        });
                        dojo.addOnLoad(doOnLoad); 
                    });
        </script>
        <script>
            $(function() {
                $('#testFRM').live('submit', function(e) {
                    e.preventDefault(); // stops form from submitting naturally
                    testWorstCell(0);
                });
            });
            $(function() {
                $('#filterFRM').live('submit', function(e) {
                    e.preventDefault(); // stops form from submitting naturally
                    vendor.pop();
                    vendor.push("NSN");
                    technology.pop();
                    technology.push("2G");
                    document.getElementById("plot_nsn_2g_button").disabled = true;
                    document.getElementById("loaderDiv").style.display = "block";
                    document.getElementById("chartResult").style.display = "none";
                    document.getElementById("chartResult").innerHTML = "";
                    setCheckedNEs();
                    var neFilter = new Object();
                    neFilter = getNeFilter('filterFromDate', 'filterToDate', 'comboPeriodID');
//                    console.log(neFilter);
                    $.ajax({
                        type: 'POST',
                        url: 'ChartServlet',
                        data: JSON.stringify(neFilter),
                        dataType: "text",
                        success: function(response) {
                            document.getElementById("loaderDiv").style.display = "none";
                            document.getElementById("chartResult").style.display = "block";
                            document.getElementById("plot_nsn_2g_button").disabled = false;
                            $('#chartResult').html(response);
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            console.log("error");
                            alert(errorThrown);
                            document.getElementById("loaderDiv").style.display = "none";
                            document.getElementById("plot_nsn_2g_button").disabled = false;
                        }
                    });
                });
            });
            $(function() {
                $('#filterFRM_NSN_3G').live('submit', function(e) {
                    e.preventDefault(); // stops form from submitting naturally
                    vendor.pop();
                    vendor.push("NSN");
                    technology.pop();
                    technology.push("3G");
                    document.getElementById("plot_nsn_3g_button").disabled = true;
                    document.getElementById("loaderDiv_NSN_3G").style.display = "block";
                    document.getElementById("chartResult_NSN_3G").style.display = "none";
                    document.getElementById("chartResult_NSN_3G").innerHTML = "";
                    setCheckedNEs();
                    var neFilter = new Object();
                    neFilter = getNeFilter('filterFromDate_NSN_3G', 'filterToDate_NSN_3G', 'comboPeriodID_NSN_3G');
                    $.ajax({
                        type: 'POST',
                        url: 'ChartServlet',
                        data: JSON.stringify(neFilter),
                        dataType: "text",
                        success: function(response) {
                            document.getElementById("loaderDiv_NSN_3G").style.display = "none";
                            document.getElementById("chartResult_NSN_3G").style.display = "block";
                            document.getElementById("plot_nsn_3g_button").disabled = false;
                            $('#chartResult_NSN_3G').html(response);
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            console.log("error");
                            alert(errorThrown);
                            document.getElementById("loaderDiv_NSN_3G").style.display = "none";
                            document.getElementById("plot_nsn_3g_button").disabled = false;
                        }
                    });
                });
            });
            $(function() {
                $('#NSN_2G_RevAvailForm').live('submit', function(e) {
                    e.preventDefault(); // stops form from submitting naturally
                    vendor.pop();
                    vendor.push("NSN");
                    technology.pop();
                    technology.push("2G");
                    document.getElementById("rev_avail_nsn_2GloaderDiv").style.display = "block";
                    document.getElementById("PeriodPicker_NSN_2G_REV_AVAIL_Result").style.display = "none";
                    document.getElementById("PeriodPicker_NSN_2G_REV_AVAIL_Result").innerHTML = "";
                    setCheckedNEs();
                    var neFilter = getNeFilter('PeriodPicker_NSN_2G_REV_AVAIL_FromDate', 'PeriodPicker_NSN_2G_REV_AVAIL_ToDate', 'PeriodPicker_NSN_2G_REV_AVAIL_Period');
                    $.ajax({
                        type: 'POST',
                        url: 'ChartServlet',
                        data: JSON.stringify(neFilter),
                        dataType: "text",
                        success: function(response) {
                            document.getElementById("rev_avail_nsn_2GloaderDiv").style.display = "none";
                            document.getElementById("PeriodPicker_NSN_2G_REV_AVAIL_Result").style.display = "block";
                            $('#PeriodPicker_NSN_2G_REV_AVAIL_Result').html(response);
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            console.log("error");
                            alert(errorThrown);
                            document.getElementById("rev_avail_nsn_2GloaderDiv").style.display = "none";
                        }
                    });
                });
            });
            $(function() {
                $('#NSN_3G_RevAvailForm').live('submit', function(e) {
                    e.preventDefault(); // stops form from submitting naturally
                    vendor.pop();
                    vendor.push("NSN");
                    technology.pop();
                    technology.push("3G");
                    document.getElementById("rev_avail_nsn_3GloaderDiv").style.display = "block";
                    document.getElementById("PeriodPicker_NSN_3G_REV_AVAIL_Result").style.display = "none";
                    document.getElementById("PeriodPicker_NSN_3G_REV_AVAIL_Result").innerHTML = "";
                    setCheckedNEs();
                    var neFilter = getNeFilter('PeriodPicker_NSN_3G_REV_AVAIL_FromDate', 'PeriodPicker_NSN_3G_REV_AVAIL_ToDate', 'PeriodPicker_NSN_3G_REV_AVAIL_Period');
                    $.ajax({
                        type: 'POST',
                        url: 'ChartServlet',
                        data: JSON.stringify(neFilter),
                        dataType: "text",
                        success: function(response) {
                            document.getElementById("rev_avail_nsn_3GloaderDiv").style.display = "none";
                            document.getElementById("PeriodPicker_NSN_3G_REV_AVAIL_Result").style.display = "block";
                            $('#PeriodPicker_NSN_3G_REV_AVAIL_Result').html(response);
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            console.log("error");
                            alert(errorThrown);
                            document.getElementById("rev_avail_nsn_3GloaderDiv").style.display = "none";
                        }
                    });
                });
            });
        </script>  

    </head>
    <body class="claro">
        <%            if (theLogin == null || !authenticated) {
        %>
        <jsp:forward page="login.jsp" />
        <%
            }
        %>
        <!-- basic preloader: -->
        <div id="loader" style="display:block;"><div id="loaderInner" style="direction:ltr;white-space:nowrap;overflow:visible;">Loading ... </div></div>
        <div id="appLayout" class="demoLayout" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design: 'headline'" style="visibility:hidden;">
            <div class="demoLayout" id="editorWindow" data-dojo-type="dijit.layout.TabContainer" data-dojo-props="region: 'center', tabPosition: 'top'">
                <div class="wwClass" id="welcomeWindow" data-dojo-type="dojox/layout/ContentPane" 
                     data-dojo-props='title:"Welcome",iconClass:"dijitCommonsIcon dijitUserIcon"'>
                    <form id="testFRM" action="ChartFilterServlet" method="post">
                        <table border='1' cellpadding='0' cellspacing='0' width='100%' class='scrollTable'>
                            <tr>
                            <h1>Welcome to Synix</h1>
                            </tr>
                        </table>
                        <br>
                        <p>
                        <div id="welcome_Div" preload="true" extractContent="true"
                             dojoType="dijit.layout.ContentPane" href="welcome.jsp"
                             title="welcome" selected="true" >
                        </div> 
                    </form>
                </div>

                <div class="kpiChartsLayout" id="chartTab_2G" data-dojo-type="dojox/layout/ContentPane" 
                     data-dojo-props='region: "center",title:"2G SLA KPI"' style="display:none;">
                    <!--data-dojo-props='region: "center",title:"2G SLA KPI",iconClass:"dijitCommonsIcon dijitChartIcon"' style="display:none;">-->
                    <%-- date selection  --%>                        
                    <form id="filterFRM" action="ChartFilterServlet" method="post">
                        <div id="Chart_DatePicker" preload="true" extractContent="true"
                             dojoType="dijit.layout.ContentPane" href="ChartDatePicker.jsp"
                             title="filter" selected="true" >
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                    </form>
                    <div id="loaderDiv" style="display: block;">
                        <div class="loadingImg"></div>
                    </div>

                </div>
                <div class="kpiChartsLayout" id="chartTab_3G" data-dojo-type="dojox/layout/ContentPane" 
                     data-dojo-props='region: "center",title:"3G SLA KPI"' style="display:none;">
                    <!--data-dojo-props='region: "center",title:"3G SLA KPI",iconClass:"dijitCommonsIcon dijitChartIcon"' style="display:none;">-->
                    <%-- date selection  --%>                        
                    <form id="filterFRM_NSN_3G">
                        <div id="Chart_DatePicker_NSN_3G" preload="true" extractContent="true"
                             dojoType="dijit.layout.ContentPane" href="ChartDatePicker_NSN_3G.jsp"
                             title="filter" selected="true" >
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                    </form>
                    <div id="loaderDiv_NSN_3G" style="display: block;">
                        <div class="loadingImg"></div>
                    </div>

                </div>

                <div class="kpiChartsLayout" id="rev_avail_nsn_2G" data-dojo-type="dojox/layout/ContentPane" 
                     data-dojo-props='region: "center",title:"2G Revenue/Site"' style="display:none;">
                    <!--data-dojo-props='region: "center",title:"2G Revenue/Site",iconClass:"dijitCommonsIcon dijitChartIcon"' style="display:none;">-->
                    <form id="NSN_2G_RevAvailForm">
                        <div preload="true" extractContent="true"
                             dojoType="dijit.layout.ContentPane" href="PeriodPicker_NSN_2G_REV_AVAIL.jsp"
                             title="filter" selected="true" >
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                    </form>
                    <div id="rev_avail_nsn_2GloaderDiv" style="display: none;">
                        <div class="loadingImg"></div>
                    </div>
                </div>

                <div class="kpiChartsLayout" id="rev_avail_nsn_3G" data-dojo-type="dojox/layout/ContentPane" 
                     data-dojo-props='region: "center",title:"3G Revenue/Site"' style="display:none;">
                    <!--data-dojo-props='region: "center",title:"3G Revenue/Site",iconClass:"dijitChartIcon"' style="display:none;">-->
                    <form id="NSN_3G_RevAvailForm">
                        <div preload="true" extractContent="true"
                             dojoType="dijit.layout.ContentPane" href="PeriodPicker_NSN_3G_REV_AVAIL.jsp"
                             title="filter" selected="true" >
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                    </form>
                    <div id="rev_avail_nsn_3GloaderDiv" style="display: none;">
                        <div class="loadingImg"></div>
                    </div>
                </div>
            </div>

            <div class="header" data-dojo-type="dojox/layout/ContentPane" data-dojo-props="region: 'top'">
                <img class="imgcenter" src="images/logo2.png" />
            </div>
            <div id="leftCol" class="edgePanel" data-dojo-type="dojox/layout/ContentPane" data-dojo-props="region: 'left'">
                <div data-dojo-type="dijit.layout.AccordionContainer" data-dojo-props="region:'leading', splitter:true"
                     id="leftAccordion">
                    <form action="logout.jsp" method="post">
                        <input type="hidden" name="loginname" value="">
                        <input type="hidden" name="loginpassword" value="">
                        <input type="submit" value="logout" name="B1" style="width:80px;text-align: center;">
                    </form>
                    <div data-dojo-type="dojox.layout.ContentPane" data-dojo-props='selected:true, title:"KPI Charts"'>
                        <img class="imgleft" id="oracleImage" src="images/oraclesmall.png" alt="" />
                        <div id="tree"></div>
                        <div id="configTree" class="span-9 border" style="overflow:auto; height:69%;"> 
                        </div> 
                    </div>
                    <div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Google Earth"'>

                    </div>
                    <div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Raw Data"'>
                        <p>
                            Selecting a color will change the background color of the page.
                            Use this to test how tooltips and drop downs appear with different backgrounds.
                        </p>
                        <h2 class="testHeader">3x4</h2>


                    </div>
                </div><!-- end AccordionContainer -->
            </div>
            <!--            <form id="NE_BrowserFRM" action="none" method="post">-->
            <div class="filterPanel" id="NE_Browser" data-dojo-type="dojox/layout/ContentPane" data-dojo-props="region: 'right', splitter: true" style="width: 15%">
                <div id="filterPanel" preload="true" executeScripts="true" parseOnLoad="true" extractContent="true"
                     dojoType="dojox.layout.ContentPane" href="FilterFrame.jsp"
                     title="filterFrame" selected="true" style="display: block;">
                </div> 
            </div>
            <!--</form>-->
            <!--            <div id="footer" style="background-color:#FFA500;clear:both;text-align:center;">
                            Copyright © Cell C</div>
                    </div>-->
        </div>
        <script>
            document.getElementById("loaderDiv_NSN_3G").style.display = "none";
            document.getElementById("loaderDiv_NSN_3G").style.display = "none";
        </script>
<!--        <script type="dojo/method" data-dojo-event="getIconClass" data-dojo-args="item, opened">
            if(item == this.model.root){
            return item;
            }else{
            return item;
            }
        </script>-->
        <!--<script type="text/javascript" charset="utf-8" src="//ajax.googleapis.com/ajax/libs/dojo/1.9.1/dojo/fx/easing.js"></script>-->
        <!--<script type="text/javascript" charset="utf-8" src="//ajax.googleapis.com/ajax/libs/dojo/1.9.1/dojo/window.js"></script>-->
        <!--        <script>
                    require(["dojo/_base/fx", "dojo/fx/easing", "dojo/window", "dojo/on", "dojo/dom", "dojo/domReady!"], function(baseFx, easing, win, on, dom) {
                        var oracleImage = dom.byId("oracleImage"),
                                //                        ariseSirButton = dom.byId("ariseSirButton"),
                                anim8target = dom.byId("NE_Browser");
                        on(oracleImage, "click", function(evt) {
                            var viewport = win.getBox(win.doc);
                            baseFx.animateProperty({
                                // use the bounceOut easing routine to have the box accelerate
                                // and then bounce back a little before stopping
                                easing: easing.bounceOut,
                                duration: 300,
                                node: anim8target,
                                properties: {
                                    // calculate the 'floor'
                                    // and subtract the height of the node to get the distance from top we need
                                    top: {start: 0, end: viewport.h - anim8target.offsetHeight - 5}
                                }
                            }).play();
                        });
                    });
        
                </script>-->
    </body>
</html>
