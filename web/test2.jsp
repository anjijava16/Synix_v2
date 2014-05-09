<%-- 
    Document   : test2
    Created on : 27 Feb 2014, 3:43:23 PM
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


    <tr>
        <td width='100%'><div class="many "id="div1_1" style=width:95%; height:50%;></div>
            <p align='center'><font color="gray"><small><ins>Zoom in:</ins> click/drag &nbsp;&nbsp;&nbsp;<ins>Zoom out:</ins> double click&nbsp;&nbsp;&nbsp;<ins>Target:</ins> <span style="background-color:#00FF00;color:#000000;">0.0%</span></small></font><table width="100%" BORDER=1 cellpadding='3' cellspacing='0'>
                <tr>
                    <td align='center'><input type="button" id='drillDownBtn_0' style='display: block;' disabled=""; value="Drill Down"; onclick="buttonClicked(0)";/>
                    </td>
                </tr>
            </table>
            <div id="demoimgDiv_10" style="display: none;">
                <img id="demoimg_10" src="images/oraclesmall.png"/></div>
            <p style="text-align:left">
                <button id="update-img__10" onclick="createImage(g_10, 'demoimg_10', 'demoimgDiv_10')">Print chart</button> 
                </p>
        </td>
    </tr>
    <br>
</table>var g_11 = new Dygraph(document.getElementById("div2_1"),
"2014/03/11 00:00:00,9.85323401995802082292246589279163221572E01\n2014/03/12 00:00:00,9.87061581491533628659803912884801795928E01\n2014/03/13 00:00:00,9.88553409231120697486091165919121718004E01\n", {
labels: [ 'Period_Start_Time','GTIBN1' ],
labelsKMB: true,animatedZooms: true,'Target': {strokeWidth: 3, strokePattern: [7, 2, 2, 2]},rollPeriod: null,
title:'CSSR',
highlightSeriesOpts: {strokeWidth: 2,strokeBorderWidth: 1,highlightCircleSize: 5,},showRoller: false,
errorBars: false,
legend: 'always',
labelsDivStyles: { 'width': '2px' }
}
);
g_11.updateOptions({annotationClickHandler: function(ann, point, dg, event) {    console.log("click: " + nameAnnotation(ann));},annotationDblClickHandler: function(ann, point, dg, event) {    console.log("dblclick: " + nameAnnotation(ann));},annotationMouseOverHandler: function(ann, point, dg, event) {},annotationMouseOutHandler: function(ann, point, dg, event) {},pointClickCallback: function(event, p) {    if (p.annotation)return;    var ann = {series: p.name,xval: p.xval,kpi:'CSSR',vendor:'NSN',tech:'2G',level:'WORST_CELL',chartID: 1,shortText: clickCount    };    var anns = g_11.annotations();    anns.push(ann);g_11.setAnnotations(anns);clickCount++;},fillGraph: null,rightGap: 30});var line = document.createElement("div");line.className = "line yline";document.getElementById("div2_1").appendChild(line);lines.push(line);

</body>
</html>
