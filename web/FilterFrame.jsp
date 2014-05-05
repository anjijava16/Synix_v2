<%-- 
    Document   : FilterFrame
    Created on : 08 Nov 2013, 2:19:39 PM
    Author     : Pierre.Venter
--%>
<jsp:useBean id="NE_Filter" scope="request" class="za.co.cellc.synix.html_builders.ne_filtler.Filter" />
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script language="JavaScript" type="text/javascript" src="scripts/jquery-1.8.1.min.js"></script>
        <script src="scripts/CollapsibleLists.js"></script>
        <script src="scripts/TopTree.js"></script>
        <!--<script src="scripts/frameFilter.js"></script>-->
    </head>
    <body>
        <table id="filterTable" width="100%" BORDER=0 cellpadding='0' cellspacing='0' style="display: none">
            <tr>
                <td>
                    <strong><left>-----NE Filter-----</left></strong>
                    <hr/>
                </td>
            </tr>   
            <tr>
                <td>
                    <button data-dojo-type="dijit/form/Button" type="button">BSC/RNC Level
                        <script type="dojo/on" data-dojo-event="click" data-dojo-args="evt">
                            require(["dojo/dom"], function(dom){
                            filterLevel = "BSC/RNC";
                            showFilters(selectedTabTitle);
                            });
                        </script>
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    <button data-dojo-type="dijit/form/Button" type="button">Cell Level
                        <script type="dojo/on" data-dojo-event="click" data-dojo-args="evt">
                            require(["dojo/dom"], function(dom){
                            filterLevel = "Cell";
                            showFilters(selectedTabTitle);
                            });
                        </script>
                    </button>
                    <hr>
                </td>
            </tr>
            <tr>
                <td style="text-align:left" ><div id="bsc_rnc_Filters_panel" class="bsc_rnc_Filters_panel"><font size="1"><%=NE_Filter.getBSC_RNC()%></font></div></td>
            </tr>

            <tr><td style="text-align:left" width ='50%'><div style="display:none" id="2Gcell_Filters_search"><font size="1"><%=NE_Filter.get2GCellSearchBox()%></font></div></td> </tr>
            <tr><td style="text-align:left" width ='50%'><div style="display:none" id="3Gcell_Filters_search"><font size="1"><%=NE_Filter.get3GCellSearchBox()%></font></div></td> </tr>
            <tr><td style="text-align:left" width ='50%'><div style="display:none" id="cell_Filters2G_listbox_div" class="cell_Filters_listbox_div"><%=NE_Filter.get2GCells()%></div></td></tr>        
            <tr><td>
                    <button id="aggregate2GCellsButton" data-dojo-type="dijit/form/Button" type="button">Aggregate cells
                        <script type="dojo/on" data-dojo-event="click" data-dojo-args="evt">
                            require(["dojo/dom"], function(dom){
                                showSelectedCellsToGroup("btsNamesListBox",true);
                            });
                        </script>
                    </button>
                </td></tr>
            <tr><td style="text-align:left" width ='50%'><div style="display:none" id="cell_Filters3G_listbox_div" class="cell_Filters_listbox_div"><%=NE_Filter.get3GCells()%></div></td></tr>        
            <tr><td>
                    <button id="aggregate3GCellsButton" data-dojo-type="dijit/form/Button" type="button">Aggregate cells
                        <script type="dojo/on" data-dojo-event="click" data-dojo-args="evt">
                            require(["dojo/dom"], function(dom){
                                showSelectedCellsToGroup("wbtsNamesListBox",true);
                            });
                        </script>
                    </button>
                </td></tr>
            <tr><td>
            <div id="selectedCellsTable"></div>
             </td></tr>
        </table>
        <!--        <div id="popupMenu" style="display: none">
                    <TABLE class="blingTable" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Popup Menu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>NSN</td>
                            </tr>
                        </tbody>
                    </TABLE>
                </div>-->

        <script type="text/javascript" language="javascript">
            CollapsibleLists.apply();
        </script>
        <script type="text/javascript" language="javascript">
            $('input.liChild').change(function() {
                if ($(this).attr("checked") === "checked") {
                    $(this).parent().parent().parent().parent().find("input[type='checkbox']").each(function() {
                        if ($(this).attr("class") === "liParent") {
                            $(this).attr("checked", "checked");
                        }
                    });
                } else {
                    $(this).parent().parent().parent().parent().find("input[type='checkbox']").each(function() {
                        var uncheck = true;
                        $(this).parent().parent().parent().find("input[type='checkbox']").each(function() {
                            if ($(this).attr("class") === "liChild" && $(this).attr("checked") === "checked") {
                                uncheck = false;
                            }
                        });
                        if ($(this).attr("class") === "liParent" && uncheck) {
                            $(this).attr("checked", null);
                        }
                    });
                }
            });
            $(".expand").click(function() {
                $(this).toggle();
                $(this).next().toggle();
                $(this).parent().parent().children().last().toggle();

            });
            $(".collapse").click(function() {
                $(this).toggle();
                $(this).prev().toggle();
                $(this).parent().parent().children().last().toggle();
            });

            $("input[type='checkbox']").click(function() {
                //                console.warn($(this).attr("checked"));
                if ($(this).attr("checked") !== "checked") {
                    $(this).parent().parent().find("input[type='checkbox']").each(function() {
                        $(this).attr("checked", null);
                    });
                }
                else {
                    $(this).parent().parent().find("input[type='checkbox']").each(function() {
                        $(this).attr("checked", "checked");
                    });
                }
            });
        </script>
        <script>
            function cellSearchBoxKeyUp()
            {
                var edValue = document.getElementById("cellSearchBox");
                var s = edValue.value;
                //            if (s.length > 2) {
                var ar = getFilteredArrayFromArray(btsNames, s);
                populateListboxWithArray("btsNamesListBox", ar);
                //            }
                //        console.log(s);
            }
        </script>
        <script>
            function wcellSearchBoxKeyUp()
            {
                var edValue = document.getElementById("wcellSearchBox");
                var s = edValue.value;
                //            if (s.length > 2) {
                var ar = getFilteredArrayFromArray(wbtsNames, s);
                populateListboxWithArray("wbtsNamesListBox", ar);
                //            }
            }
        </script>
    </body>
</html>
