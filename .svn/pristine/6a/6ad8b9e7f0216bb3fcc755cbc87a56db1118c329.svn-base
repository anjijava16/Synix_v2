/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var drillPoints = new Array();
var drillPointDelimiter = ">";
var clickCount = 0;

function addAnnotation() {
    return function(g) {
        var ann = g.annotations();
        var graph_num = 0;


        for (var i = 0; i < ann.length; i++) {
            initHtmlAtIndex(i);
//            console.log(nameAnnotation(ann[i]));
//            var name = nameAnnotation(ann[i]);
            graph_num = ann[i].chartID;
            drillPoints[ann[i].chartID] += drillPointDelimiter
                    + ann[i].kpi + "," + ann[i].series + "," + new Date(ann[i].xval)
                    + "," + ann[i].vendor + "," + ann[i].tech + "," + ann[i].level;
        }
        if (ann.length > 0) {
//            console.log(drillPoints);
            enableDrillButtons();
//            document.getElementById("drillList_" + graph_num).innerHTML = drillPoints;
        }
        function enableDrillButtons() {
            for (var i = 0; i < drillPoints.length; i++) {
//                document.getElementById("drillDownBtn_" + i).style.display = "block";
                document.getElementById("drillDownBtn_" + i).disabled = false;
            }
        }
    };
    function initHtmlAtIndex(index) {
        drillPoints[index] = "";
    }
}
