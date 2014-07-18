/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tabNames = [];
var currentTabIndex = 0;
var NSN_2G_IX = 0;
var NSN_3G_IX = 1;
//var ZJHB_2G_IX = 2;
//var ZJHB_3G_IX = 3;
var selectedControllerNames = [];
var selectedSiteNames = [];
var selectedCellNames = [];
var cellGroupCounters = [];
var ctrlGroupCounters = [];
var cellGroups = [];
var ctrlGroups = [];

function initMultiArrays() {
    for (var i = 0; i < MAX_TABS; i++) {
        selectedControllerNames.push([i]);
        selectedCellNames.push([i]);
        cellGroupCounters.push([i]);
        cellGroups.push([i]);
        ctrlGroupCounters.push([i]);
        ctrlGroups.push([i]);
    }
}
//function getAllExceptFirstValueFromArray(array){
//     var ar = [];
//    var count = array.length;
//    for (var i = 1; i < count; i++) {
//        if (array[i] !== "" && array[i] !== "0") {
//            ar.push(array[i]);
//        }
//    }
//    console.log(ar);
//    return ar;
//}
function cellSearchBoxKeyUp() {

    var ar = new Object();
    var tabIx = getTabIndex();
    ar.controllers = removeIndexFromArray(removeEmptiesFromArray(selectedControllerNames[tabIx]))
    var divId = getDivId();
    var val = document.getElementById("cellSearchBox" + divId).value;
    if (val.length > 2 || val.length === 0) {
        var btsNames = [];
        xmlhttp = getHttpObject();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var ar = xmlhttp.responseText.split("<~>");
                var arLen = ar.length;
                for (var i = 0; i < arLen; i++) {
                    btsNames.push(ar[i]);
                }
                populateListboxWithArray("cellNames" + divId, btsNames);
                document.getElementById("cellDiv" + getDivId()).style.display = "block";
                document.getElementById("neFilterTable" + getDivId()).style.display = "block";
                document.getElementById("cellsLoader" + getDivId()).style.display = "none";
            }
        };
        xmlhttp.open("GET", "CellNamesServlet?Vendor=" + vendor[0] + "&Technology=" + technology[0] + "&searchStr=" + val + "&controllers=" + JSON.stringify(ar));
        xmlhttp.send(null);
    }
}

function getFilteredArrayFromArray(ar, filter) {

    var filteredAr = new Array();
    console.log("size: " + ar.length);
    for (var i = 0; i < ar.length; i++) {
        if (ar[i].toString().toLowerCase().indexOf(filter.toString().toLowerCase()) > -1) {
            filteredAr.push(ar[i]);
        }
    }
//    console.log("filteredAr: " + filteredAr);
    return filteredAr;
}


function removeEmptiesFromArray(array) {
    var ar = [];
    var count = array.length;
    for (var i = 0; i < count; i++) {
        if (array[i] !== "") {
            ar.push(array[i]);
        }
    }
    return ar;
}

function removeIndexFromArray(array) {
    var ar = [];
    var count = array.length;
    for (var i = 1; i < count; i++) {
        ar.push(array[i]);
    }
    return ar;
}
//function clearArray(array) {
//    var ar = [];
//    var count = array.length;
//    for (var i = 0; i < count; i++) {
//        var val = array[i] + "";
//        if (array[i] !== "" && array[i] !== 0 && (val.indexOf("-deactivated") === -1)) {
//            ar.push(array[i]);
//        }
//    }
////    console.log(ar);
//    return ar;
//}

function getCtrlGroups() {
    var ar = [];
    var g = removeEmptiesFromArray(ctrlGroupCounters[getTabIndex()]);
    for (var i = 0; i < g.length; i++) {
        for (var j = 1; j < ctrlGroups[getTabIndex()].length; j++) {
            var ix = g[i] - 1;
            var val = ctrlGroups[getTabIndex()][j] + "";
            if (val.indexOf("~" + ix) !== -1) {
                ar.push(ctrlGroups[getTabIndex()][j]);
            }
        }
    }
    return ar;
}
function getCellGroups() {
    var ar = [];
    var g = removeEmptiesFromArray(cellGroupCounters[getTabIndex()]);
    for (var i = 0; i < g.length; i++) {
        for (var j = 1; j < cellGroups[getTabIndex()].length; j++) {
            var ix = g[i] - 1;
            var val = cellGroups[getTabIndex()][j] + "";
            if (val.indexOf("~" + ix) !== -1) {
                ar.push(cellGroups[getTabIndex()][j]);
            }
        }
    }
    return ar;
}

function getSelectedControllerNames() {
    var ar = [];
    var tabId = getTabIndex();
    var count = selectedControllerNames[tabId].length;
    for (var i = 1; i < count; i++) {
        if (selectedControllerNames[tabId][i] !== "") {
            ar.push(selectedControllerNames[tabId][i]);
        }
    }
    return ar;
}

function getSelectedCellNames() {
    var ar = [];
    var tabId = getTabIndex();
    var count = selectedCellNames[tabId].length;
    for (var i = 0; i < count; i++) {
        if (selectedCellNames[tabId][i] !== "") {
            ar.push(selectedCellNames[tabId][i]);
        }
    }
    return ar;
}

function storeCells(objectId) {
    var element = document.getElementById(objectId);
    console.log("storeCells");
    console.log(element);
    var id = getTabIndex();
    var count = selectedCellNames[id].length;
    for (var i = 0; i < count; i++) {
        selectedCellNames[id].pop();
    }
    for (i = 0; i < element.options.length; i++) {
        if (element.options[i].selected) {
            selectedCellNames[id].push(element.options[i].value);
        }
    }
}

function deactivateCellGroup(id) {
    id = id + 1;
    var val = cellGroupCounters[getTabIndex()][id] + "";
    console.log(val);
    if (val.indexOf("-deactivated") > -1) {
        cellGroupCounters[getTabIndex()][id] = id;
    } else {
        cellGroupCounters[getTabIndex()][id] = id + "-deactivated";
    }
}

function deactivateCtrlGroup(id) {
    id = id + 1;
    var val = ctrlGroupCounters[getTabIndex()][id] + "";
    if (val.indexOf("-deactivated") > -1) {
        ctrlGroupCounters[getTabIndex()][id] = id;
    } else {
        ctrlGroupCounters[getTabIndex()][id] = id + "-deactivated";
    }
}

function storeCell(object) {
    var id = getTabIndex();
    selectedCellNames[id].push(object.value);
}

function storeController(checkBox) {
    var id = getTabIndex();
    if (checkBox.checked === true) {
        selectedControllerNames[id].push(checkBox.name);
//        var btn = document.getElementById("showCells" + getDivId());
//        if(controllerSelected()){
//            $(btn).prop('disabled', false); 
//        }
//        else{
//            $(btn).prop('disabled', true);
//        }
    } else {
        for (var i = 0; i < selectedControllerNames[id].length; i++) {
            if (selectedControllerNames[id][i] === checkBox.name) {
                selectedControllerNames[id][i] = "";
            }
        }
    }
}
function controllerSelected() {
    var id = getTabIndex();
    var ctrls = removeIndexFromArray(removeEmptiesFromArray(selectedControllerNames[id]))
    return ctrls.length > 0;
}
function  getDivId() {
    return "_" + getTabIndex();
}

function getTabIndex() {
    if (vendor[0] === "NSN" && technology[0] === "2G" && subGroup === "A") {
        return TAB_IX_NSN2_A;
    } else if (vendor[0] === "NSN" && technology[0] === "3G" && subGroup === "A") {
        return TAB_IX_NSN3_A;
    } else if (vendor[0] === "NSN" && technology[0] === "2G" && subGroup === "R") {
        return TAB_IX_NSN2_R;
    } else if (vendor[0] === "NSN" && technology[0] === "3G" && subGroup === "R") {
        return TAB_IX_NSN3_R;
    } else if (vendor[0] === "NSN" && technology[0] === "2G" && subGroup === "T") {
        return TAB_IX_NSN2_T;
    } else if (vendor[0] === "NSN" && technology[0] === "3G" && subGroup === "T") {
        return TAB_IX_NSN3_T;
    } else if (vendor[0] === "ZJHB" && technology[0] === "2G" && subGroup === "A") {
        return TAB_IX_ZJHB2_A;
    } else if (vendor[0] === "ZJHB" && technology[0] === "3G" && subGroup === "A") {
        return TAB_IX_ZJHB3_A;
    } else if (vendor[0] === "ZJHB" && technology[0] === "2G" && subGroup === "R") {
        return TAB_IX_ZJHB2_R;
    } else if (vendor[0] === "ZJHB" && technology[0] === "3G" && subGroup === "R") {
        return TAB_IX_ZJHB3_R;
    } else if (vendor[0] === "ZJHB" && technology[0] === "2G" && subGroup === "T") {
        return TAB_IX_ZJHB2_T;
    } else if (vendor[0] === "ZJHB" && technology[0] === "3G" && subGroup === "T") {
        return TAB_IX_ZJHB3_T;
    } else if (vendor[0] === "ZBFN" && technology[0] === "2G" && subGroup === "A") {
        return TAB_IX_ZBFN2_A;
    } else if (vendor[0] === "ZBFN" && technology[0] === "3G" && subGroup === "A") {
        return TAB_IX_ZBFN3_A;
    } else if (vendor[0] === "ZBFN" && technology[0] === "2G" && subGroup === "R") {
        return TAB_IX_ZBFN2_R;
    } else if (vendor[0] === "ZBFN" && technology[0] === "3G" && subGroup === "R") {
        return TAB_IX_ZBFN3_R;
    } else if (vendor[0] === "ZBFN" && technology[0] === "2G" && subGroup === "T") {
        return TAB_IX_ZBFN2_T;
    } else if (vendor[0] === "ZBFN" && technology[0] === "3G" && subGroup === "T") {
        return TAB_IX_ZBFN3_T;
    } else if (vendor[0] === "ZKZN" && technology[0] === "2G" && subGroup === "A") {
        return TAB_IX_ZKZN2_A;
    } else if (vendor[0] === "ZKZN" && technology[0] === "3G" && subGroup === "A") {
        return TAB_IX_ZKZN3_A;
    } else if (vendor[0] === "ZKZN" && technology[0] === "2G" && subGroup === "R") {
        return TAB_IX_ZKZN2_R;
    } else if (vendor[0] === "ZKZN" && technology[0] === "3G" && subGroup === "R") {
        return TAB_IX_ZKZN3_R;
    } else if (vendor[0] === "ZKZN" && technology[0] === "2G" && subGroup === "T") {
        return TAB_IX_ZKZN2_T;
    } else if (vendor[0] === "ZKZN" && technology[0] === "3G" && subGroup === "T") {
        return TAB_IX_ZKZN3_T;
    } else if (vendor[0] === "ZCPT" && technology[0] === "2G" && subGroup === "A") {
        return TAB_IX_ZCPT2_A;
    } else if (vendor[0] === "ZCPT" && technology[0] === "3G" && subGroup === "A") {
        return TAB_IX_ZCPT3_A;
    } else if (vendor[0] === "ZCPT" && technology[0] === "2G" && subGroup === "R") {
        return TAB_IX_ZCPT2_R;
    } else if (vendor[0] === "ZCPT" && technology[0] === "3G" && subGroup === "R") {
        return TAB_IX_ZCPT3_R;
    } else if (vendor[0] === "ZCPT" && technology[0] === "2G" && subGroup === "T") {
        return TAB_IX_ZCPT2_T;
    } else if (vendor[0] === "ZCPT" && technology[0] === "3G" && subGroup === "T") {
        return TAB_IX_ZCPT3_T;
    }
}
function loadLists() {
    var neFilter = new Object();
    neFilter = getNeFilter();
    $.ajax({
        type: 'POST',
        url: 'NeHtmlServlet',
        data: JSON.stringify(neFilter),
        dataType: "text",
        success: function(response) {
            $("#neFilterTable" + divId).html(response);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log("error");
            alert(errorThrown);
        }
    });
}

function plotCharts() {
    var divId = getDivId();
    document.getElementById("loaderDiv" + divId).style.display = "block";
    document.getElementById("chartResult" + divId).style.display = "none";
    document.getElementById("resultTable" + divId).style.display = "block";
//    setCheckedNEs();
    var neFilter = new Object();
    console.log("comboPeriodID" + dijit.byId('comboPeriodID'));
    neFilter = getNeFilter();
    $.ajax({
        type: 'POST',
        url: 'ChartServlet',
        data: JSON.stringify(neFilter),
        dataType: "text",
        success: function(response) {
            document.getElementById("loaderDiv" + divId).style.display = "none";
            document.getElementById("chartResult" + divId).style.display = "block";
            $("#chartResult" + divId).html(response);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log("error");
            alert(errorThrown);
            document.getElementById("loaderDiv" + divId).style.display = "none";
        }
    });
}

function toggleFilterTableVisibility(visible) {
    var button = document.getElementById("showHideFilterTable" + getDivId());
    toggleButtonTitle(button, visible);
    toggleLabelTitle("showHideLabel" + getDivId(), visible);
    toggleFilterTableVisible(document.getElementById("neFilterTable" + getDivId()), visible);
    toggleFilterTableVisible(document.getElementById("aggCtrl" + getDivId()), visible);
    toggleFilterTableVisible(document.getElementById("aggCell" + getDivId()), visible);
    toggleFilterTableVisible(document.getElementById("showCells" + getDivId()), visible);
}

function toggleFilterTableVisible(object, visible) {
    if (visible === false) {
        object.style.display = "none";
    } else if (visible === true) {
        object.style.display = "block";
    } else {
        if (object.style.display === "block") {
            object.style.display = "none";
        } else {
            object.style.display = "block";
        }
    }
}

function toggleButtonTitle(button, visible) {
    if (visible === false) {
        button.firstChild.data = "+";
    } else if (visible === true) {
        button.firstChild.data = "-";
    } else if (button.firstChild.data === "-") {
        button.firstChild.data = "+";
    } else {
        button.firstChild.data = "-";
    }
}

function toggleLabelTitle(label, visible) {
    var l = document.getElementById(label);
    if (visible === false) {
        l.innerHTML = "Show filters&nbsp;&nbsp;";
    } else if (visible === true) {
        l.innerHTML = "Hide filters&nbsp;&nbsp;";
    } else if (l.innerHTML === "Hide filters&nbsp;&nbsp;") {
        l.innerHTML = "Show filters&nbsp;&nbsp;";
    } else {
        l.innerHTML = "Hide filters&nbsp;&nbsp;";
    }
}

function showCellDiv() {
    document.getElementById("neFilterTable" + getDivId()).style.display = "none";
    document.getElementById("cellsLoader" + getDivId()).style.display = "block";
    cellSearchBoxKeyUp();
}