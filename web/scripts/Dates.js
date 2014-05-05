/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function distance_between_Dates(date1,date2){
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var d1 = new Date(Date.parse(date1));
    var d2 = new Date(Date.parse(date2));
    var millisBetween = d2.getTime() - d1.getTime();
    var days = millisBetween / millisecondsPerDay;
    return Math.floor(days);
}
function getPreviousDate(daysAgo){
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var dNow = new Date();
    var newD = new Date(dNow-(millisecondsPerDay*daysAgo));
    return newD.format("dd/MM/yyyy");;
}

