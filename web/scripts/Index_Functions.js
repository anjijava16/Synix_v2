/*
 html2canvas @VERSION@ <http://html2canvas.hertzen.com>
 Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
 http://www.twitter.com/niklasvh
 
 Released under MIT License
 */
//(function(document, window) {
//  var scrStart = '<script type="text/javascript" src="', scrEnd = '"></script>';
//  document.write(scrStart + '../../js/jquery-1.7.1.js' + scrEnd);
//  var html2canvas = ['html2canvas', 'jquery.plugin.html2canvas'], i;
//  for (i = 0; i < html2canvas.length; ++i) {
//    document.write(scrStart + '../../js/' + html2canvas[i] + '.js' + scrEnd);
//  }
//  window.onload = function() {
//    if (window.setUp) {
//      window.setUp();
//    }
//    setTimeout(function() {
//      $(document.body).html2canvas({
//        logging: true,
//        profile: true,
//        useCORS: true
//      });
//    }, 100);
//  };
//}(document, window));
//

//function printpage()
//{
//    window.print();
//}
var BTSNAMES_PRELOAD_SIZE = 30;
var registration_date_value = '20/01/2014';
var chartDivCounter = 0;
var chartDivCounterNSN2G = 1;
var chartDivCounterNSN3G = 2;
var filterLevel = "BSC/RNC";
//var bts_names = {
//    "Red Dress": "reddress.png",
//    "Blue Dress": "bluedress.png",
//    "Black Hair Pin": "hairpin.png"
//};

var chartImageOptions = {
    //Texts displayed below the chart's x-axis and to the left of the y-axis 
    titleFont: "bold 18px serif",
    titleFontColor: "black",
    //Texts displayed below the chart's x-axis and to the left of the y-axis 
    axisLabelFont: "bold 14px serif",
    axisLabelFontColor: "black",
    // Texts for the axis ticks
    labelFont: "normal 12px serif",
    labelFontColor: "black",
    // Text for the chart legend
    legendFont: "bold 12px serif",
    legendFontColor: "black",
    legendHeight: 20    // Height of the legend area
};
var refCluster_Cluster;

function sessionLogout() {
    window.location.replace("login.jsp");
}
//function initBtsNamesList() {
//    console.log("init");
//    xmlhttp = getHttpObject();
//    xmlhttp.onreadystatechange = function() {
//        if (xmlhttp.readyState === 4) {
//            flyToLocation(xmlhttp.responseText);
//        }
//    }
//    xmlhttp.open("GET", "PlaceMarkSearch?cellname=" + str, true);
//    xmlhttp.send(null);
//    for (var item in bts_names)
//    {
//        $('<option value="' + item + '">' + bts_names[item] + '</option>').appendTo('#btsNames');
//    }
//}
function getSelectedValuesFromSelect(objectID) {
    var values = new Array();
    var x = document.getElementById(objectID);
    for (var i = 0; i < x.options.length; i++) {
        if (x.options[i].selected === true) {
//            alert(x.options[i].text);
            values.push(x.options[i].text);
        }
    }
    return values;
}
function getNeFilter(fromCalendar, toCalendar, periodId) {

    var fromDate = [];
    var toDate = [];
    var divC = [];
    var chartPageColumns = [];
    var fillGraph = [];
    var period = [];
    var chartRollerPeriod = [];
    fromDate.push(getFromDate(fromCalendar));
    toDate.push(getToDate(toCalendar));
    if (technology[0] === "2G") {
        divC.push(chartDivCounterNSN2G);
    }
    if (technology[0] === "3G") {
        divC.push(chartDivCounterNSN3G);
    }
    chartPageColumns.push(2);
    period.push(dijit.byId(periodId).get('value'));
    fillGraph.push(false);
    chartRollerPeriod.push(1);
    var neFilter = new Object();
    neFilter.timeFrom = fromDate;
    neFilter.timeTo = toDate;
    neFilter.divCounter = divC;
    neFilter.chartPageColumns = chartPageColumns;
    neFilter.fillGraph = fillGraph;
    neFilter.chartRollerPeriod = chartRollerPeriod;
    neFilter.chartType = chartType;
    if (filterLevel === "BSC/RNC") {
        neFilter.rnc = checkedRncs;
        neFilter.bsc = checkedBscs;
    } else {
        if (technology[0] === "2G") {
            neFilter.cells = getSelectedValuesFromSelect("btsNamesListBox");
            neFilter.twoGNSNCellgroups = getSelectedCellGroups();
        }
        if (technology[0] === "3G") {
            neFilter.cells = getSelectedValuesFromSelect("wbtsNamesListBox");
            neFilter.threeGNSNCellgroups = selected3GNSNCells;
        }
    }
    neFilter.wBts = checkedWbts;
    neFilter.bts = checkedBts;
    neFilter.vendor = vendor;
    neFilter.technology = technology;
    neFilter.selectedCellGroups = getSelectedCellGroupIndexes();
    neFilter.period = period;
    neFilter.logicalGroup = logicalGroup;
//    console.log(neFilter);
    return neFilter;
}
function getSelectedCellGroups() {
    var selectedGroupIds = new Array();
    var selectedCells = new Array();
    for (var i = 0; i < selectedCellsGroups.length; i++) {
        var idName = "enabledBoxGroup_" + i;
        var ckBox = document.getElementById(idName);
        if (ckBox.checked) {
            selectedGroupIds.push(i);
        }
    }
    console.log(selectedGroupIds);
    for (var i = 0; i < selected2GNSNCells.length; i++) {
        for (var j = 0; j < selectedGroupIds.length; j++) {
            if (selected2GNSNCells[i].indexOf("~" + selectedGroupIds[j]) > 0) {
                selectedCells.push(selected2GNSNCells[i]);
            }
        }
    }
    console.log(selectedCells);
    return selectedCells;
}

function getFromDate(objectID) {
    var d = document.getElementById(objectID).value;
    return d + " 00:00:00";
}
function getToDate(objectID) {
    var d = document.getElementById(objectID).value;
    return d + " 23:00:00";
}
function getBrowser() {
    if (navigator.vendor === "Google Inc.") {
        return "Chrome";
    } else {
        if (navigator.appName === "Netscape") {
            return "Firefox";
        }
    }
    return navigator.appName;
}



//function setFilteredCellNames(rcCheckedBox, clusterCheckedBox) {
//    var out = "";
//    var rcBoxes = getSelectedCheckBoxes(rcCheckedBox);
//    var clusterBoxes = getSelectedCheckBoxes(clusterCheckedBox);
//    var refCluster_Cluster_ar = refCluster_Cluster.split("~");
////    console.log("rcBoxes:"+rcBoxes);
////    console.log("refCluster_Cluster_ar:"+refCluster_Cluster_ar);
//    var arRc = rcBoxes.split("~");
//    var arCluster = clusterBoxes.split("~");
//    for (var i = 0; i < refCluster_Cluster_ar.length; i++) {
//        var ar = refCluster_Cluster_ar[i].split(">");
//        for (var j = 0; j < arRc.length; j++) {
//            if (clustersEmpty(arCluster)) {
//                if ((ar[0] === arRc[j])) {
//                    out += "~" + ar[2];
//                }
//            } else {
//                for (var k = 0; k < arCluster.length; k++) {
//                    if ((ar[0] === arRc[j]) && (ar[1] === arCluster[k])) {
//                        out += "~" + ar[2];
//                    }
//                }
//            }
//        }
//    }
//    if (out !== "") {
//        out = out.substring(1);
//    }
//    out = sortString(out);
//    loadSelectWithCellNames(out);
////    console.log("cellnames=" + out); 
//}
function clustersEmpty(clusters) {
//   console.log("clustersEmpty:"+clusters.length);
    return clusters.length <= 1;
}
//function loadSelectWithCellNames(cellNames) {
//    var selectObject = document.getElementById("filteredCellNames");
//    clearlistbox(selectObject);
//    var ar = cellNames.split("~");
//    for (var i = 0; i < ar.length; i++) {
//        selectObject.options[i] = new Option(ar[i], i);
//    }
//}

function clearlistbox(lb) {
    for (var i = lb.options.length - 1; i >= 0; i--) {
        lb.options[i] = null;
    }
    lb.selectedIndex = -1;
}
function getSelectedCheckBoxes(checkBoxClassName) {
    var out = "";
    checkboxes = document.getElementsByName(checkBoxClassName);
    for (var i in checkboxes) {
        if (checkboxes[i].checked) {
            out += "~" + checkboxes[i].value;
        }
    }
    if (out !== "") {
        out = out.substring(1);
    }
    return out;
}

function getSelectedCellGroupIndexes() {
    var checkedGroups = [];
    var matchClass = "cellsChkBox_" + vendor[0] + "_" + technology[0];
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if ((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1 && elems[i].checked) {
            checkedGroups.push(elems[i].id);
//            console.log(elems[i].id + ":" + elems[i].checked);
        }
    }
    return checkedGroups;
}

function getCellNames(rc, cluster) {
    var out = "";
    var refCluster_Cluster_ar = refCluster_Cluster.split("~");
    var arLen = refCluster_Cluster_ar.length;
    for (var i = 0; i < arLen; i++) {
        var ar = refCluster_Cluster_ar[i].split(">");
        if ((ar[0] === rc) && (ar[1] === cluster)) {
            out += "~" + ar[2];
        }
    }
    out = out.substring(1, out.length);
    return out;
}
function treeClick(id) {
    if (id === "root") {
        //        document.getElementById("sample-ui").style.display = "none";
        //        document.getElementById("map3d").style.display = "none";
        document.getElementById("nsn_2G").style.display = "none";
    }
}
//--Function to get the xmlhttp object
function getHttpObject() {
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else {
        alert("Your browser does not support XMLHTTP!");
    }
    return xmlhttp;
}
function loadKMLAll(str) {
    xmlhttp = getHttpObject();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            plotAll(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", "GoogleEarthHandler?cellname=" + str, true);
    xmlhttp.send(null);
}
function flyTo(str) {
    xmlhttp = getHttpObject();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            flyToLocation(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", "PlaceMarkSearch?cellname=" + str, true);
    xmlhttp.send(null);
}
function toggleCheckedBoxes(source, boxesToToggle, div) {
    checkboxes = document.getElementsByName(boxesToToggle);
    for (var i in checkboxes) {
        checkboxes[i].checked = source.checked;
    }
    showFilteredCheckedBoxes(boxesToToggle, div);
}
function showFilteredCheckedBoxes(checkBoxClassName, divName) {
    var rc = "";
    var div = document.getElementById(divName);
    checkboxes = document.getElementsByName(checkBoxClassName);
    for (var i in checkboxes) {
        if (checkboxes[i].checked) {
            var ar = getClusters(checkboxes[i].value).split("~");
            for (var j = 0; j < ar.length; j++) {
                if (!strContainsStr(rc, ar[j])) {
                    rc += "~" + ar[j];
                }
            }
            //            rc = addUnique(rc,getClusters(checkboxes[i].value));
        }
    }
    rc = sortString(rc);
    div.innerHTML = stringToCheckBoxHTML(checkBoxClassName, rc);
}
function getClusters(rc) {
    var out = "";
    var refCluster_Cluster_ar = refCluster_Cluster.split("~");
    var arLen = refCluster_Cluster_ar.length;
    for (var i = 0; i < arLen; i++) {
        var ar = refCluster_Cluster_ar[i].split(">");
        if (ar[0] === rc) {
            out += "~" + ar[1];
        }
    }
    out = out.substring(1, out.length);
    return out;
}
function stringToCheckBoxHTML(checkBoxClassName, str) {
    var out = "";
    var ar = str.split("~");
    for (var i = 1; i < ar.length; i++) {
        out += "<INPUT TYPE=CHECKBOX NAME='CLUSTER' onClick=setFilteredCellNames('" + checkBoxClassName + "','CLUSTER') VALUE='" + ar[i] + "'>" + ar[i] + "<BR>";
    }
    return out;
}
function sortString(str) {
    return arrayToString(sortArray(str.split("~")), "~");
}
function arrayToString(ar, delimiter) {
    var out = "";
    for (var i = 0; i < ar.length; i++) {
        out += delimiter + ar[i];
    }
    if (out.length > 0) {
        out = out.substring(1, out.length);
    }
    return out;
}
function sortArray(ar) {
    return ar.sort();
}

function strContainsStr(baseStr, testStr) {
    return baseStr.indexOf(testStr) !== -1;
}

//function outputSelected(opt) {
//    var sel = getSelected(opt);
//    var strSel = "";
//    for (var item in sel)       
//        strSel += sel[item].value + "\n";
//    alert("Selected Items:\n" + strSel);
//}
//function getSelected(opt) {
//    var selected = new Array();
//    var index = 0;
//    for (var intLoop = 0; intLoop < opt.length; intLoop++) {
//        if ((opt[intLoop].selected) ||
//            (opt[intLoop].checked)) {
//            index = selected.length;
//            //selected[index] = opt[intLoop].value;
//            selected[index] = intLoop;
//        }
//    }
//    return selected;
//}

//function loadCharts(RCcheckboxList,CLUSTERScheckboxList,SITEScheckboxList){
//    xmlhttp = getHttpObject();
////    console.log(CLUSTERScheckboxList);
////    console.log(SITEScheckboxList);
//    var rc = new Array();
//    var clusters = new Array();
//    var sites = new Array();
//    rc = getSelected(RCcheckboxList);
//    clusters = getSelected(CLUSTERScheckboxList);
//    sites = getSelected(SITEScheckboxList);
//    JSON.stringify(rc+clusters+sites);
//    //var data = document.getElementById("filterDiv").innerHTML;
//    xmlhttp.onreadystatechange=function(){
//        if(xmlhttp.readyState==4){
//            //console.log(document.getElementById("nsn_2G"));
//            document.getElementById("nsn_2G").innerHTML = xmlhttp.responseText;
//        }
//    }
//    console.log(sites);
//    xmlhttp.open("POST","ChartServlet?rc="+rc,true);
//    //xmlhttp.setRequestHeader("Content-type", "index.jsp")
//    xmlhttp.send(null)
////xmlhttp.send(null);
//}
//function loadCharts(str){
//    xmlhttp = getHttpObject();
//    xmlhttp.onreadystatechange=function(){
//        if(xmlhttp.readyState==4){
//            console.log(document.getElementById("nsn_2G"));
//            document.getElementById("nsn_2G").innerHTML = xmlhttp.responseText;
//        }
//    }
//    xmlhttp.open("GET","ChartServlet?chart="+str,true);
//    xmlhttp.send(null);
//}
function clearTextBox(name) {
    document.getElementById(name).value = '';
}
function addCells(textBoxName, listName) {
    var selectOption = document.getElementById(listName);
    var text = document.getElementById(textBoxName).value;
    for (var i = 0; i < selectOption.options.length; i++) {
        if (selectOption.options[i].selected === true) {
            text += "," + selectOption.options[i].text;
        }
    }
    if (text !== "") {
        text = text.substring(1);
    }
    document.getElementById(textBoxName).value = text;
}
