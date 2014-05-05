/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var queryTabCounter = 0;
var newTabIndex = 1;
var editorTabs = new Array();
var selectedTabTitle;
//var filterTabs = new Array();



//require(["dijit/layout/TabContainer", "dijit/layout/ContentPane", "dojo/domReady!"], 
//function(TabContainer, ContentPane){
//    var tc = new TabContainer({
//        style: "height: 100%; width: 100%;"
//    }, "tc1-prog");
//
//    var cp1 = new ContentPane({
//         title: "Food",
//         content: "We offer amazing food"
//    });
//    tc.addChild(cp1);
//
//    var cp2 = new ContentPane({
//         title: "Drinks",
//         content: "We are known for our drinks."
//    });
//    tc.addChild(cp2);
//
//    tc.startup();
//    hideAllTabsButWelcome();
//});

//function initTabs(){
//    editorTabs[1] = dijit.byId('welcomeWindow');
////    editorTabs[2] = dijit.byId('tab2');
////    editorTabs[3] = dijit.byId('tab3');
////    editorTabs[4] = dijit.byId('tab4');
//}
//function hideAll(){
//    children = dijit.byId('editorWindow').getChildren();
//    for(i=0; i<children.length; i++){
//        dijit.byId('editorWindow').removeChild(dijit.byId(children[i]));
//    }
//}

function hideEditorTab(tabID, dijitID) {
    editorTabs[tabID] = dijit.byId(dijitID);
    dijit.byId('editorWindow').removeChild(dijit.byId(dijitID));
//    children = dijit.byId('editorWindow').getChildren();
//    for(i=0; i<children.length; i++){
//        //        if(!isChartTab(children[i].title) && !isGlobeTab(children[i].title) && !isWelcomeTab(children[i].title)){
//        if(!isWelcomeTab(children[i].title)){
//            dijit.byId('editorWindow').removeChild(dijit.byId(children[i]));
//        }
//    }
}

function isChartTab(title) {
    return title.indexOf("Charts_") !== -1;
}
function isGlobeTab(title) {
    return title === "Globe";
}
function isWelcomeTab(title) {
    return title === "Welcome";
}
function showEditorTab(location, dijitID) {
    var i;
    var loop = editorTabs.length;
    for (i = 0; i <= loop; i++) {
        if (typeof editorTabs[i] !== "undefined" && editorTabs[i].id === dijitID) {
            if (!childExists(dijitID)) {
                dijit.byId('editorWindow').addChild(editorTabs[i], location);
            }
            selectTab('editorWindow', dijitID);
        }
    }
}



//function showFilterTab(location, dijitID) {
//    var i;
//    var loop = filterTabs.length;
//    for (i = 0; i <= loop; i++) {
//        if (typeof filterTabs[i] !== "undefined" && filterTabs[i].id === dijitID) {
//            if (!childExists(dijitID)) {
//                dijit.byId('NE_Browser').addChild(filterTabs[i], location);
//            }
//            selectTab('NE_Browser',dijitID);
//        }
//    }
//}

function childExists(tabName) {
    var children = dijit.byId('editorWindow').getChildren();
    for (i = 0; i < children.length; i++) {
        if (children[i].id === tabName) {
            return true;
        }
    }
    return false;
}
function setTabTitle(tabID, title) {
    dijit.byId(tabID).set("title", title);
}
function selectTab(window, tab) {
    dijit.byId(window).selectChild(tab);
    dijit.byId(tab).resize();
//    dojo.byId(tab).resize();
}
function addEditorTab(name) {
    var myTabContainer = dijit.byId("editorWindow"),
            tab = dijit.byId(name);

    if (tab) {
        myTabContainer.selectChild(tab);
    } else {
        tab = new dijit.layout.ContentPane({
            id: name,
            title: name,
            closable: true
        });
        myTabContainer.addChild(tab);
        myTabContainer.startup();
        myTabContainer.selectChild(tab);
    }
} 