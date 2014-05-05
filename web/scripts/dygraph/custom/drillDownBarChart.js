/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function drillDownBarChart(seriesNumber, cell, dateMS) {
    var chartPageColumnsAr = [];
    var divCounterAr = [];
    var neFilter = new Object();
    var element = getSeries(drillPoints[seriesNumber]);
    var dates = [];
    var timeFromAr = [];
    var timeToAr = [];
    divCounterAr.push(chartDivCounter);
    chartPageColumnsAr.push(1);
    dates[0] = dateMS;
    dates = addDateBuffers(dates);
    if (is2G()) {
        neFilter.bsc = element;
    }
    else {
        neFilter.rnc = element;
    }
    timeFromAr.push(dates[0]);
    timeToAr.push(dates[1]);
    neFilter.timeFrom = timeFromAr;
    neFilter.timeTo = timeToAr;
    neFilter.kpiName = getKPI(drillPoints[seriesNumber]);
    neFilter.vendor = getVendor(drillPoints[seriesNumber]);
    neFilter.technology = getTech(drillPoints[seriesNumber]);
    neFilter.level = getLevel(drillPoints[seriesNumber]);
    neFilter.divCounter = divCounterAr;
    neFilter.chartPageColumns = chartPageColumnsAr;
    neFilter.drillTime = getDrillDate(drillPoints[seriesNumber]);
    neFilter.bts = getBTS(cell);
    neFilter.bcf = getBCF(cell);
//    console.log(element + " " + cell + " " + dates);
    var html;
    $.ajax({
        type: 'POST',
        url: 'WorstCellsBarChartServlet',
        data: JSON.stringify(neFilter),
        dataType: "text",
        success: function(response) {
//            document.getElementById("loaderDiv").style.display = "none";
//            document.getElementById("chartResult").style.display = "block";
//            console.log(response);
            html = response;
        },
        error: function(xhr, textStatus, errorThrown) {
            alert(errorThrown);
            document.getElementById("loaderDiv").style.display = "none";
        }
    });
    return html;
}
function getBTS(cell) {
    var ar = [];
    var split = cell.split("-");
    split = split[0].split(":");
    ar.push(split[1].trim());
    return ar;
}
function getBCF(cell) {
    var ar = [];
    var split = [];
    var split = cell.split("-");
    split = split[1].split(":");
    ar.push(split[1].trim());
    return ar;
}
