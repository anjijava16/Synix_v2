/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//var MAX_CELLS = 250;
//var REGION_RNC_NAME_ID = "regionRNC";
//var RNC_RNC_NAME_ID = "rnc";
//var BSC_BSC_NAME_ID = "bsc";
//var RNC_WBTS_NAME_ID = "wBts";
//var BSC_BTS_NAME_ID = "bts";
var MAX_CELLS = 255;
var checkedRncs = [];
var checkedBscs = [];
var checkedWbts = [];
var checkedBts = [];
var btsNames = new Array();
var wbtsNames = new Array();
var zjhbbtsNames = new Array();
var zjhbwbtsNames = new Array();
var selectedCells = new Array();
var selectedCellsGroups = new Array();
var selected2GNSNCells = new Array();
var selected2GNSNCellsGroups = new Array();
var selected3GNSNCells = new Array();
var selected3GNSNCellsGroups = new Array();
var enabledCellGroups = new Array();
//var enabled3GNSNCellsGroups = new Array();
//var selected3GNSNCellsGroupIndexes = new Array();
//var selected2GNSNCellsGroupIndexes = new Array();


//function setCheckedNEs() {
//    var id = getTabIndex();
//    clearArrays();
//    checkedRncs = removeEmptiesFromArray(selectedControllerNames[id]);
//    checkedBscs = removeEmptiesFromArray(selectedControllerNames[id]);
//    checkedWbts = selectedCellNames[id];
//    checkedBts = selectedCellNames[id];
////    getCheckedRncsFromElements(REGION_RNC_NAME_ID);
////    getCheckedRncsFromElements(RNC_RNC_NAME_ID);
////    getCheckedBscsFromElements(BSC_BSC_NAME_ID);
////    getCheckedWBtsFromElements(RNC_WBTS_NAME_ID);
////    getCheckedBtsFromElements(BSC_BTS_NAME_ID);
//}
function clearArrays() {
    checkedRncs = [];
    checkedBscs = [];
    checkedWbts = [];
    checkedBts = [];
}
function getCheckedRncsFromElements(elementName) {
    var checkBoxes = document.getElementsByName(elementName);
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].type === "checkbox") {
            if (checkBoxes[i].checked) {
                checkedRncs.push(checkBoxes[i].value);
            }
        }
    }
}

function getCheckedBscsFromElements(elementName) {
    var checkBoxes = document.getElementsByName(elementName);
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].type === "checkbox") {
            if (checkBoxes[i].checked) {
                checkedBscs.push(checkBoxes[i].value);
            }
        }
    }
}

function getCheckedWBtsFromElements(elementName) {
    var checkBoxes = document.getElementsByName(elementName);
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].type === "checkbox") {
            if (checkBoxes[i].checked) {
                checkedWbts.push(checkBoxes[i].value);
            }
        }
    }
}

function getCheckedBtsFromElements(elementName) {
    var checkBoxes = document.getElementsByName(elementName);
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].type === "checkbox") {
            if (checkBoxes[i].checked) {
                checkedBts.push(checkBoxes[i].value);
            }
        }
    }
}

//function showChecked() {
//    console.log("checkedRncs");
//    for (var i = 0; i < checkedRncs.length; i++) {
//        console.log(checkedRncs[i]);
//    }
//    console.log("checkedBscs");
//    for (var i = 0; i < checkedBscs.length; i++) {
//        console.log(checkedBscs[i]);
//    }
//    console.log("checkedWbts");
//    for (var i = 0; i < checkedWbts.length; i++) {
//        console.log(checkedWbts[i]);
//    }
//    console.log("checkedBts");
//    for (var i = 0; i < checkedBts.length; i++) {
//        console.log(checkedBts[i]);
//    }
//}




//function set2G_FiltersDisplayState(status) {
//    document.getElementById("BSCfilter").style.display = status;
////    document.getElementById("Regionfilter").style.display = status;
//}
//
//function set3G_FiltersDisplayState(status) {
//    document.getElementById("RNCfilter").style.display = status;
//}
function setBtsNames() {
    console.log(btsNames.length);
    if (btsNames.length === 0) {
        xmlhttp = getHttpObject();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var ar = xmlhttp.responseText.split("<~>");
                var arLen = ar.length;
                for (var i = 0; i < arLen; i++) {
                    btsNames.push(ar[i]);
                }
                populateListboxWithArray("btsNamesListBox", btsNames);
            }
        };
        xmlhttp.open("GET", "BtsNamesServlet");
        xmlhttp.send(null);
    }
}
function setWBtsNames() {
    if (wbtsNames.length === 0) {
        xmlhttp = getHttpObject();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var ar = xmlhttp.responseText.split("<~>");
                var arLen = ar.length;
                for (var i = 0; i < arLen; i++) {
                    wbtsNames.push(ar[i]);
                }
                populateListboxWithArray("wbtsNamesListBox", wbtsNames);
            }
        };
        xmlhttp.open("GET", "WBtsNamesServlet");
        xmlhttp.send(null);
    }
}
function setZjhbBtsNames() {
    console.log(zjhbbtsNames.length);
    if (zjhbbtsNames.length === 0) {
        xmlhttp = getHttpObject();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var ar = xmlhttp.responseText.split("<~>");
                var arLen = ar.length;
                for (var i = 0; i < arLen; i++) {
                    zjhbbtsNames.push(ar[i]);
                }
                populateListboxWithArray("ZjhbbtsNamesListBox", zjhbbtsNames);
            }
        };
        xmlhttp.open("GET", "ZjhbBtsNamesServlet");
        xmlhttp.send(null);
    }
}
function setZjhbWBtsNames() {
    if (zjhbwbtsNames.length === 0) {
        xmlhttp = getHttpObject();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var ar = xmlhttp.responseText.split("<~>");
                var arLen = ar.length;
                for (var i = 0; i < arLen; i++) {
                    zjhbwbtsNames.push(ar[i]);
                }
                populateListboxWithArray("ZjhbwbtsNamesListBox", zjhbwbtsNames);
            }
        };
        xmlhttp.open("GET", "ZjhbWBtsNamesServlet");
        xmlhttp.send(null);
    }
}

function populateListboxWithArray(listboxid, ar) {
    var object = document.getElementById(listboxid);
    object.innerHTML = '';
    var loopSize = ar.length;
    loopSize = ar.length > MAX_CELLS ? MAX_CELLS : ar.length;
    for (var i = 0; i < loopSize; i++) {
//        console.log(ar[i]);
        object.options[i] = new Option(ar[i], ar[i]);
    }
}
//function populateWBTS_NamesList() {
//    var object = document.getElementById("wbtsNamesListBox");
//    for (var i = 0; i < wbtsNames.length; i++) {
//        object.options[i] = new Option(wbtsNames[i], i);
//    }
//}
//function getFilteredArrayFromArray(ar, filter) {
//
//    var filteredAr = new Array();
//    console.log("size: " + ar.length);
//    for (var i = 0; i < ar.length; i++) {
//        if (ar[i].toString().toLowerCase().indexOf(filter.toString().toLowerCase()) > -1) {
//            filteredAr.push(ar[i]);
//        }
//    }
////    console.log("filteredAr: " + filteredAr);
//    return filteredAr;
//}
function tabClicked(tabName) {
    selectedTabTitle = tabName;
    if (tabName === "2G SLA KPI") {
        technology[0] = "2G";
        vendor[0] = "NSN";
    } else if (tabName === "3G SLA KPI") {
        technology[0] = "3G";
        vendor[0] = "NSN";
    } else if (tabName === "ZTE-JHB 2G SLA KPI") {
        technology[0] = "2G";
        vendor[0] = "ZJHB";
    }
    if (tabName === "ZTE-JHB 3G SLA KPI") {
        technology[0] = "3G";
        vendor[0] = "ZJHB";
    }
//    document.getElementById("resultTable" + getDivId()).style.display = "none";
}
//function showFilters(tabName) {
//    selectedTabTitle = tabName;
//    document.getElementById("filterTable").style.display = "block";
//    hideAllFilters();
//    console.log(tabName);
//    console.log(filterLevel);
//    if (tabName === "2G SLA KPI" || tabName === "2G Revenue/Site") {
//        technology[0] = "2G";
//        vendor[0] = "NSN";
//        if (filterLevel === "BSC/RNC") {
//            document.getElementById("BSCfilter").style.display = "block";
//            document.getElementById("2Gcell_Filters_search").style.display = "none";
//            document.getElementById("cell_Filters2G_listbox_div").style.display = "none";
//            document.getElementById("selectedCellsTable").innerHTML = "";
//        } else if (filterLevel === "Cell") {
//            loadBTS_NamesIntoListBoxes();
//            document.getElementById("BSCfilter").style.display = "none";
//            document.getElementById("2Gcell_Filters_search").style.display = "block";
//            document.getElementById("cell_Filters2G_listbox_div").style.display = "block";
//            displayDijitButton("aggregate2GCellsButton", true);
//            addSelectedCellsToGroup("btsNamesListBox", false);
//        }
//    }
//    if (tabName === "3G SLA KPI" || tabName === "3G Revenue/Site") {
//        technology[0] = "3G";
//        vendor[0] = "NSN";
//        if (filterLevel === "BSC/RNC") {
//            document.getElementById("RNCfilter").style.display = "block";
//            document.getElementById("3Gcell_Filters_search").style.display = "none";
//            document.getElementById("cell_Filters3G_listbox_div").style.display = "none";
//            document.getElementById("selectedCellsTable").innerHTML = "";
//        } else if (filterLevel === "Cell") {
//            loadBTS_NamesIntoListBoxes();
//            document.getElementById("RNCfilter").style.display = "none";
//            document.getElementById("3Gcell_Filters_search").style.display = "block";
//            document.getElementById("cell_Filters3G_listbox_div").style.display = "block";
//            displayDijitButton("aggregate3GCellsButton", true);
//            addSelectedCellsToGroup("wbtsNamesListBox", false);
//        }
//    }
//    if (tabName === "ZTE-JHB 2G SLA KPI") {
//        technology[0] = "2G";
//        vendor[0] = "ZJHB";
//        if (filterLevel === "BSC/RNC") {
//            document.getElementById("ZjhbBSCfilter").style.display = "block";
//            document.getElementById("zjhb2cell_Filters_search").style.display = "none";
//            document.getElementById("zjhb2cell_Filters_listbox_div").style.display = "none";
//            document.getElementById("selectedCellsTable").innerHTML = "";
//        } else if (filterLevel === "Cell") {
//            loadBTS_NamesIntoListBoxes();
//            document.getElementById("ZjhbBSCfilter").style.display = "none";
//            document.getElementById("zjhb2cell_Filters_search").style.display = "block";
//            document.getElementById("zjhb2cell_Filters_listbox_div").style.display = "block";
////            displayDijitButton("aggregate2GCellsButton", true);
//            addSelectedCellsToGroup("ZjhbbtsNamesListBox", false);
//        }
//    }
//    if (tabName === "ZTE-JHB 3G SLA KPI") {
//        technology[0] = "3G";
//        vendor[0] = "ZJHB";
//        if (filterLevel === "BSC/RNC") {
//            document.getElementById("ZjhbRNCfilter").style.display = "block";
//            document.getElementById("zjhb3cell_Filters_search").style.display = "none";
//            document.getElementById("zjhb3cell_Filters_listbox_div").style.display = "none";
//            document.getElementById("selectedCellsTable").innerHTML = "";
//        } else if (filterLevel === "Cell") {
//            loadBTS_NamesIntoListBoxes();
//            document.getElementById("ZjhbRNCfilter").style.display = "none";
//            document.getElementById("zjhb3cell_Filters_search").style.display = "block";
//            document.getElementById("zjhb3cell_Filters_listbox_div").style.display = "block";
////            displayDijitButton("aggregate2GCellsButton", true);
//            addSelectedCellsToGroup("ZjhbbtsNamesListBox", false);
//        }
//    }
//    if (tabName === "Welcome") {
//        document.getElementById("filterTable").style.display = "none";
//    }
//}
function loadBTS_NamesIntoListBoxes() {
    var btsListCount = document.getElementById("btsNamesListBox").options.length;
    var wbtsListCount = document.getElementById("wbtsNamesListBox").options.length;
    var zjhbbtsListCount = document.getElementById("ZjhbbtsNamesListBox").options.length;
    var zjhbwbtsListCount = document.getElementById("ZjhbwbtsNamesListBox").options.length;
    if (btsListCount === 0 && selectedTabTitle === "2G SLA KPI") {
        setBtsNames();
    } else if (wbtsListCount === 0 && selectedTabTitle === "3G SLA KPI") {
        setWBtsNames();
    } else if (zjhbbtsListCount === 0 && selectedTabTitle === "ZTE-JHB 2G SLA KPI") {
        setZjhbBtsNames();
    } else if (zjhbwbtsListCount === 0 && selectedTabTitle === "ZTE-JHB 3G SLA KPI") {
        setZjhbWBtsNames();
    }
}

function hideAllFilters() {
    console.log("hiding all");
    document.getElementById("BSCfilter").style.display = "none";
    document.getElementById("2Gcell_Filters_search").style.display = "none";
    document.getElementById("cell_Filters2G_listbox_div").style.display = "none";
    document.getElementById("RNCfilter").style.display = "none";
    document.getElementById("3Gcell_Filters_search").style.display = "none";
    document.getElementById("cell_Filters3G_listbox_div").style.display = "none";

    document.getElementById("ZjhbBSCfilter").style.display = "none";
    document.getElementById("ZjhbRNCfilter").style.display = "none";
    document.getElementById("zjhb2cell_Filters_search").style.display = "none";
    document.getElementById("zjhb3cell_Filters_search").style.display = "none";
    document.getElementById("zjhb2cell_Filters_listbox_div").style.display = "none";
    document.getElementById("zjhb3cell_Filters_listbox_div").style.display = "none";

    displayDijitButton("aggregate2GCellsButton", false);
    displayDijitButton("aggregate3GCellsButton", false);
}
function displayDijitButton(id, display) {
    var state = display ? 'block' : 'none';
    require(['dojo/dom-style', 'dijit/registry'], function(domStyle, registry) {
        domStyle.set(registry.byId(id).domNode, 'display', state);
    });
}
function addSelectedCellsToGroup(addSelectedValues) {
    if (addSelectedValues) {
        var values = getSelectedCellNames();
        addValuesToCellGroup(values);
    }
    var html = "<TABLE class='blingTable2' cellspacing='0'>"
            + "<thead>"
            + "<tr>"
            + "<th width='10%' align='center'>Enabled</th>"
            + "<th width='10%' align='center'>Group Name</th>"
            + "<th width='80%' align='center' >Cells</th>"
            + "</tr>"
            + "</thead>";
    for (var i = 0; i < cellGroupCounters[getTabIndex()].length - 1; i++) {
        html += "<tbody>";
        html += "<tr>";
        html += "<td><input type='checkbox' onClick=\"deactivateCellGroup(" + i + ")\" id=enabledBoxGroup_" + i + " checked='checked'/></td>";
        html += "<td><label>Group_" + i + "</label></td>";
        html += "<td>";
        for (var j = 1; j < cellGroups[getTabIndex()].length; j++) {
            var ar = cellGroups[getTabIndex()][j].split("~");
            if (parseInt(ar[1]) === i) {
                html += ar[0] + ",&nbsp;";
            } else {
            }
        }
        html += "</td>";
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</TABLE>";
    html += "</TABLE>";
    html += "<button id=\"clearCellsButton" + divId + "\" type=\"button\" onclick=\"clearCellGroups()\" style=\"display: block;\">Clear list</button>";
    document.getElementById("selectedCellsTable" + getDivId()).innerHTML = html;
}
function addValuesToCellGroup(values) {
    addArraytoArray(cellGroups[getTabIndex()], values, cellGroupCounters[getTabIndex()].length - 1);
    cellGroupCounters[getTabIndex()].push(cellGroupCounters[getTabIndex()].length);
}
function addValuesToCtrlGroup(values) {
    addArraytoArray(ctrlGroups[getTabIndex()], values, ctrlGroupCounters[getTabIndex()].length - 1);
    ctrlGroupCounters[getTabIndex()].push(ctrlGroupCounters[getTabIndex()].length);
}
function addArraytoArray(dest, source, groupId) {
    for (var i = 0; i < source.length; i++) {
        dest.push(source[i] + "~" + groupId);
    }
}


function addSelectedControllersToGroup(addSelectedValues) {
    var divId = getDivId();
    if (addSelectedValues) {
        var values = getSelectedControllerNames();
        addValuesToCtrlGroup(values);
    }
    var html = "<TABLE class='blingTable2' cellspacing='0'>"
            + "<thead>"
            + "<tr>"
//            + "<th width='10%' align='center'>Enabled</th>"
            + "<th width='10%' align='center'>Group Name</th>"
            + "<th width='80%' align='center' >Controllers</th>"
            + "</tr>"
            + "</thead>";
    for (var i = 0; i < ctrlGroupCounters[getTabIndex()].length - 1; i++) {
        html += "<tbody>";
        html += "<tr>";
//        html += "<td><input type='checkbox' onClick=\"deactivateCtrlGroup(" + i + ")\" checked='checked'/></td>";
        html += "<td><label>Group_" + i + "</label></td>";
//        html += "<td style=\"width: 500px\">";
        html += "<td>";
        for (var j = 1; j < ctrlGroups[getTabIndex()].length; j++) {
            var ar = ctrlGroups[getTabIndex()][j].split("~");
            if (parseInt(ar[1]) === i) {
                html += ar[0] + ",&nbsp;";
            } else {
            }
        }
        html += "</td>";
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</TABLE>";
    html += "</TABLE>";
    html += "<button id=\"clearCtrlsButton" + divId + "\" type=\"button\" onclick=\"clearCtrlGroups()\" style=\"display: block;\">Clear list</button>";
    document.getElementById("selectedControllersTable" + getDivId()).innerHTML = html;
    unCheckAll();
}

function clearCtrlGroups() {
    document.getElementById("selectedControllersTable" + getDivId()).innerHTML = "";
    ctrlGroups[getTabIndex()] = [];
    ctrlGroupCounters[getTabIndex()] = [];
    ctrlGroups[getTabIndex()].push(0);
    ctrlGroupCounters[getTabIndex()].push(0);
}

function clearCellGroups() {
    document.getElementById("selectedCellsTable" + getDivId()).innerHTML = "";
    cellGroups[getTabIndex()] = [];
    cellGroupCounters[getTabIndex()] = [];
    cellGroups[getTabIndex()].push(0);
    cellGroupCounters[getTabIndex()].push(0);
}

//function objectExists(id) {
//    return document.getElementById(id) !== null;
//}
//function clearSelected2GNSNCellsGroups() {
//    var size = selected2GNSNCellsGroups.length;
//    for (var i = 0; i < size; i++) {
//        selected2GNSNCellsGroups.pop();
//    }
//}

//function clearSelected3GNSNCellsGroups() {
//    var size = selected3GNSNCellsGroups.length;
//    for (var i = 0; i < size; i++) {
//        selected3GNSNCellsGroups.pop();
//    }
//}

//function clearSelectedCells() {
//    var size = selectedCells.length;
////    console.log(selectedCells);
//    for (var i = 0; i < size; i++) {
//        selectedCells.pop();
//    }
//}

//function clearEnabledCellGroups() {
//    var size = enabledCellGroups.length;
////    console.log(selectedCells);
//    for (var i = 0; i < size; i++) {
//        enabledCellGroups.pop();
//    }
//}

function checkUnCheckAll() {
    var check = document.getElementById("selectAllCkBox" + getDivId()).checked;
    var checkboxes = new Array();
    checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type === 'checkbox' && checkboxes[i].className === "ctrlChBox" + getDivId()) {
            checkboxes[i].checked = check;
            storeController(checkboxes[i]);
        }
    }
}

function unCheckAll() {
    var checkboxes = new Array();
    checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type === 'checkbox' && checkboxes[i].className === "ctrlChBox" + getDivId()) {
            checkboxes[i].checked = false;
            storeController(checkboxes[i]);
        }
    }
    document.getElementById("selectAllCkBox" + getDivId()).checked = false;
}