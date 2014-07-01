/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tabNames = [];
var currentTabIndex = 0;
var NSN_2G_IX = 0;
var NSN_3G_IX = 1;
var ZJHB_2G_IX = 2;
var ZJHB_3G_IX = 3;
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
function removeEmptiesFromArray(array) {
    var ar = [];
    var count = array.length;
    for (var i = 1; i < count; i++) {
        var val = array[i] + "";
        if (array[i] !== "" && (val.indexOf("-deactivated") === -1)) {
            ar.push(array[i]);
        }
    }
//    console.log(ar);
    return ar;
}

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
    } else {
        var ix = selectedControllerNames[id].indexOf(checkBox.name);
        //delete selectedControllerNames[id][ix];
        selectedControllerNames[id][ix] = "";
    }
}

function  getDivId() {
    return "_" + getTabIndex();
}

function getTabIndex() {
    if (vendor[0] === "NSN" && technology[0] === "2G") {
        return NSN_2G_IX;
    } else if (vendor[0] === "NSN" && technology[0] === "3G") {
        return NSN_3G_IX;
    } else if (vendor[0] === "ZJHB" && technology[0] === "2G") {
        return ZJHB_2G_IX;
    } else if (vendor[0] === "ZJHB" && technology[0] === "3G") {
        return ZJHB_3G_IX;
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
            $("#testResult" + divId).html(response);
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
    setCheckedNEs();
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
    toggleFilterTableVisible(document.getElementById("testResult" + getDivId()), visible);
    toggleFilterTableVisible(document.getElementById("aggCtrl" + getDivId()), visible);
    toggleFilterTableVisible(document.getElementById("aggCell" + getDivId()), visible);
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