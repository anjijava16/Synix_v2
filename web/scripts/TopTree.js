/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var divId;
var PERSIST_TREE = true;
var SHOWROOT = false;
var DATE_WINDOW = 14;
var ACCESS_LOGICAL_GROUP_ID = 0;
var RETAIN_LOGICAL_GROUP_ID = 1;
var TRAFFIC_LOGICAL_GROUP_ID = 2;
var logicalGroup = [];
var technology = [];
var vendor = [];
var chartType = [];
var KPI = "KPI";
var REV_AVAIL = "REV_AVAIL";
function updatePrice(item) {
    alert(item);
    console.log("item" + item);
}
function clearUserSelections() {
    technology = [];
    vendor = [];
    chartType = [];
    logicalGroup = [];
}
require(["dojo/store/JsonRest", "dijit/Tree", "dijit/tree/dndSource", "dojo/query"],
        function(JsonRest, Tree, dndSource, query) {

            treeMenu = JsonRest({
                target: "data/",
                mayHaveChildren: function(object) {
                    // see if it has a children property
                    return "children" in object;
                },
                getChildren: function(object, onComplete, onError) {
                    // retrieve the full copy of the object
                    this.get(object.id).then(function(fullObject) {
                        // copy to the original object so it has the children array as well.
                        object.children = fullObject.children;
                        // now that full object, we should have an array of children
                        onComplete(fullObject.children);
                    }, function(error) {
                        // an error occurred, log it, and indicate no children
                        console.error(error);
                        onComplete([]);
                    });
                },
                getRoot: function(onItem, onError) {
                    // get the root object, we will do a get() and callback the result
                    this.get("root").then(onItem, onError);
                },
                getLabel: function(object) {
                    // just get the name
//                    console.log(object);
                    return object.name;
                },
                pasteItem: function(child, oldParent, newParent, bCopy, insertIndex) {
                    var store = this;
                    store.get(oldParent.id).then(function(oldParent) {
                        store.get(newParent.id).then(function(newParent) {
                            var oldChildren = oldParent.children;
                            dojo.some(oldChildren, function(oldChild, i) {
                                if (oldChild.id === child.id) {
                                    oldChildren.splice(i, 1);
                                    return true; // done
                                }
                            });
                            store.put(oldParent);
                            newParent.children.splice(insertIndex || 0, 0, child);
                            store.put(newParent);
                        }, function(error) {
                            alert("Error occurred (this demo is not hooked up to a real database, so this is expected): " + error);
                        });
                    });
                },
                put: function(object, options) {
                    this.onChildrenChange(object, object.children);
                    this.onChange(object);
                    return JsonRest.prototype.put.apply(this, arguments);
                },
                remove: function(id) {
                    this.onDelete({
                        id: id
                    });
                    return JsonRest.prototype.remove.apply(this, arguments);
                }
            });
            var tree = new Tree({
                model: treeMenu,
                persist: PERSIST_TREE,
                showRoot: SHOWROOT,
                dndController: dndSource
            }, "tree"); // make sure you have a target HTML element with this id
            tree.startup();
//            tree.persist = false;
            tree.on("click", function(object) {
                clearUserSelections();
                
                if (object.id === "N2_Accessibility") {
//                    showFilters("2G SLA KPI");
                    vendor.push("NSN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(1, 'chartTab_2G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "N2_Retainability") {
//                    showFilters("2G SLA KPI");
                    vendor.push("NSN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(1, 'chartTab_2G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "N2_Traffic") {
//                    showFilters("2G SLA KPI");
                    vendor.push("NSN");
                    technology.push("2G");
                    chartType.push(KPI);
                    showEditorTab(1, 'chartTab_2G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                if (object.id === "N3_Accessibility") {
//                    showFilters("3G SLA KPI");
                    vendor.push("NSN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(2, 'chartTab_3G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "N3_Retainability") {
//                    showFilters("3G SLA KPI");
                    vendor.push("NSN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(2, 'chartTab_3G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "N3_Traffic") {
//                    showFilters("3G SLA KPI");
                    vendor.push("NSN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(2, 'chartTab_3G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "NSN_2G_REV_AVAIL") {
//                    showFilters("NSN_2G_REV_AVAIL");
                    vendor.push("NSN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(REV_AVAIL);
                    showEditorTab(3, 'rev_avail_nsn_2G');
                    document.getElementById("PeriodPicker_NSN_2G_REV_AVAIL_FromDate").value = getPreviousDate(DATE_WINDOW);
                    loadLists();
                }
                else if (object.id === "NSN_3G_REV_AVAIL") {
//                    showFilters("NSN_3G_REV_AVAIL");
                    vendor.push("NSN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(REV_AVAIL);
                    showEditorTab(4, 'rev_avail_nsn_3G');
                    document.getElementById("PeriodPicker_NSN_3G_REV_AVAIL_FromDate").value = getPreviousDate(DATE_WINDOW);
                    loadLists();
                }
                else if (object.id === "ZJHB2_Accessibility") {
//                    showFilters("ZTE-JHB 2G SLA KPI");
                    vendor.push("ZJHB");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(5, 'ZJHBchartTab_2G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZJHB2_Retainability") {
//                    showFilters("ZTE-JHB 2G SLA KPI");
                    vendor.push("ZJHB");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(5, 'ZJHBchartTab_2G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZJHB2_Traffic") {
//                    showFilters("ZTE-JHB 2G SLA KPI");
                    vendor.push("ZJHB");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(5, 'ZJHBchartTab_2G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                if (object.id === "ZJHB3_Accessibility") {
//                    showFilters("ZTE-JHB 3G SLA KPI");
                    vendor.push("ZJHB");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(6, 'ZJHBchartTab_3G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZJHB3_Retainability") {
//                    showFilters("ZTE-JHB 3G SLA KPI");
                    vendor.push("ZJHB");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(6, 'ZJHBchartTab_3G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZJHB3_Traffic") {
//                    showFilters("ZTE-JHB 3G SLA KPI");
                    vendor.push("ZJHB");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(6, 'ZJHBchartTab_3G');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "rawData") {
                    var tabs = new Array();
                    tabs[1] = 13;
                    showTab(tabs);
                }
//                animateFilterBox();
            }, true);
        });


//function animateFilterBox() {
//    require(["dojo/_base/fx", "dojo/fx/easing", "dojo/window", "dojo/on", "dojo/dom", "dojo/domReady!"], function(baseFx, easing, win, on, dom) {
//        var anim8target = dom.byId("NE_Browser");
//        var viewport = win.getBox(win.doc);
//        baseFx.animateProperty({
//            // use the bounceOut easing routine to have the box accelerate
//            // and then bounce back a little before stopping
//            easing: easing.bounceOut,
//            duration: 300,
//            node: anim8target,
//            properties: {
//                // calculate the 'floor'
//                // and subtract the height of the node to get the distance from top we need
//                top: {start: 0, end: viewport.h - anim8target.offsetHeight - 5}
//            }
//        }).play();
//    });
//}