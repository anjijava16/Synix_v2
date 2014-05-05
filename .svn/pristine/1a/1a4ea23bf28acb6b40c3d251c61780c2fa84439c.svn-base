/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function testWorstCell(btnNumber) {
    chartDivCounter++;
    drillPoints[btnNumber] = "mm>CSSR,GTIBN1,Thu Nov 15 2013 03:00:00 GMT+0200 (South Africa Standard Time),NSN,2G,WORST_CELL ";
    buttonClicked(btnNumber);

}
function buttonClicked(btnNumber) {
    chartDivCounter++;
//    console.log("all:" + drillPoints[btnNumber]);
    var kpiName = getKPI(drillPoints[btnNumber]);
    addEditorTab(kpiName[0]);
    loadServletAjax(btnNumber);
}
function loadServletAjax(btnNumber) {
    var series = getSeries(drillPoints[btnNumber]);
    var dates = getDates(drillPoints[btnNumber]);
    var neFilter = new Object();
    var divCounterAr = [];
    var chartPageColumnsAr = [];
    var timeFromAr = [];
    var timeToAr = [];
    divCounterAr.push(chartDivCounter);
    chartPageColumnsAr.push(1);
    timeFromAr.push(dates[0]);
    timeToAr.push(dates[1]);
    neFilter.kpiName = getKPI(drillPoints[btnNumber]);
    console.log("kpiName: "+getKPI(drillPoints[btnNumber]));
    if (is2G()) {
        neFilter.bsc = series;
    }
    else {
        neFilter.rnc = series;
    }
    neFilter.timeFrom = timeFromAr;
    neFilter.timeTo = timeToAr;
    neFilter.vendor = getVendor(drillPoints[btnNumber]);
    neFilter.technology = getTech(drillPoints[btnNumber]);
    neFilter.level = getLevel(drillPoints[btnNumber]);
    neFilter.divCounter = divCounterAr;
    neFilter.chartPageColumns = chartPageColumnsAr;
    neFilter.drillTime = getDrillDate(drillPoints[btnNumber]);
    console.log(neFilter);
    $.ajax({
        type: 'POST',
        url: 'WorstCellsChartServlet',
        data: JSON.stringify(neFilter),
        dataType: "text",
        success: function(response) {
//            document.getElementById("loaderDiv").style.display = "none";
//            document.getElementById("chartResult").style.display = "block";
//            console.log(response);
            var newDOM_id = "#" + neFilter.kpiName;
//            console.log(document.getElementById(kpiName));
            $(newDOM_id).html(response);
        },
        error: function(xhr, textStatus, errorThrown) {
//            console.log("error");
            alert(errorThrown);
            document.getElementById("loaderDiv").style.display = "none";
        }
    });
}
function is2G() {
    if (technology[0] === "2G") {
        return true;
    }
    return false;
}
function loadServlet(kpiName, series, dates, vendor, technology, level) {
    var xmlhttp = getHttpObject();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
//            console.log(xmlhttp.responseText);
            document.getElementById("WC").innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", "WorstCellsChartServlet?divCounter=" + chartDivCounter + "&kpiName=" + kpiName + "&bsc="
            + series + "&timeFrom=" + dates[0] + "&timeTo=" + dates[1] + "&vendor=" + vendor + "&technology="
            + technology + "&level=" + level + "&chartPageColumns=1");
    xmlhttp.send(null);
}
function getKPI(drillPoint) {
    var ar = [];
    var split = drillPoint.split(drillPointDelimiter);
    var subs = split[1].split(",");
    ar.push(subs[0]);
    return ar;
}

function getVendor(drillPoint) {
    var ar = [];
    var split = drillPoint.split(drillPointDelimiter);
    var subs = split[1].split(",");
    ar.push(subs[3]);
    return ar;
}
function getTech(drillPoint) {
    var ar = [];
    var split = drillPoint.split(drillPointDelimiter);
    var subs = split[1].split(",");
    ar.push(subs[4]);
    return ar;
}
function getLevel(drillPoint) {
    var ar = [];
    var split = drillPoint.split(drillPointDelimiter);
    var subs = split[1].split(",");
    ar.push(subs[5]);
    return ar;
}

function getSeries(drillPoint) {
    var series = [];
    var split = drillPoint.split(drillPointDelimiter);
    for (var i = 1; i < split.length; i++) {
        var subs = split[1].split(",");
        series[i - 1] = subs[1];
    }
    return series;
}
function getDrillDate(drillPoint) {
    var ar = [];
    var dates = [];
    var split = drillPoint.split(drillPointDelimiter);
    for (var i = 1; i < split.length; i++) {
        var subs = split[1].split(",");
        dates[i - 1] = subs[2];
    }
    var d = new Date(dates[0]);
    ar.push(d.format('dd/MM/yyyy hh:mm:ss'));
    return ar;
}
function getDates(drillPoint) {
    var dates = [];
    var split = drillPoint.split(drillPointDelimiter);
    for (var i = 1; i < split.length; i++) {
        var subs = split[1].split(",");
        dates[i - 1] = subs[2];
    }
    return addDateBuffers(dates);
}
function addDateBuffers(dates) {
    var d1 = new Date(dates[0]);
    var d2 = new Date(d1);
    var dateLower = getLowerDate(d1);
    var dateUpper = getUpperDate(d2);
    dates[0] = dateLower;
    dates[1] = dateUpper;
    return  dates;
}
function getLowerDate(d) {
    d = new Date(d - (4 * 3600 * 1000));
    return d.format('dd/MM/yyyy hh:mm:ss');
}
function getUpperDate(d) {
//    var ms = d.getMilliseconds();
//    d = new Date(d + (4 * 3600 * 1000));
    d.setHours(d.getHours() + 4);
    return d.format('dd/MM/yyyy hh:mm:ss');
}

