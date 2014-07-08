/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//var TAB_IX_ZJHB2 = 5;
//var TAB_IX_ZJHB3 = 6;
//var TAB_IX_ZBFN2 = 7;
//var TAB_IX_ZBFN3 = 8;
//var TAB_IX_ZKZN2 = 9;
//var TAB_IX_ZKZN3 = 10;
//var TAB_IX_ZCPT2 = 11;
//var TAB_IX_ZCPT3 = 12;
var TAB_IX_ZJHB2_A = 5;
var TAB_IX_ZJHB3_A = 6;
var TAB_IX_ZBFN2_A = 7;
var TAB_IX_ZBFN3_A = 8;
var TAB_IX_ZKZN2_A = 9;
var TAB_IX_ZKZN3_A = 10;
var TAB_IX_ZCPT2_A = 11;
var TAB_IX_ZCPT3_A = 12;
var TAB_IX_ZJHB2_R = 13;
var TAB_IX_ZJHB3_R = 14;
var TAB_IX_ZBFN2_R = 15;
var TAB_IX_ZBFN3_R = 16;
var TAB_IX_ZKZN2_R = 17;
var TAB_IX_ZKZN3_R = 18;
var TAB_IX_ZCPT2_R = 19;
var TAB_IX_ZCPT3_R = 20;
var TAB_IX_ZJHB2_T = 21;
var TAB_IX_ZJHB3_T = 22;
var TAB_IX_ZBFN2_T = 23;
var TAB_IX_ZBFN3_T = 24;
var TAB_IX_ZKZN2_T = 25;
var TAB_IX_ZKZN3_T = 26;
var TAB_IX_ZCPT2_T = 27;
var TAB_IX_ZCPT3_T = 28;
var TAB_IX_NSN2_A = 29;
var TAB_IX_NSN2_R = 30;
var TAB_IX_NSN2_T = 31;
var TAB_IX_NSN3_A = 32;
var TAB_IX_NSN3_R = 33;
var TAB_IX_NSN3_T = 34;


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
var subGroup;
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
//                getIconStyle: function(item, opened) {
//                    if (!item.root) {
//                        if (!item.children) {
//                            // Style the nodes that not have childrens
//                            return {backgroundColor: "red"};
//                        } else {
//                            // Style the nodes that have childrens
//                            return {backgroundColor: "blue"};
//                        }
//                    } else {
//                        // Style the root node here
//                        return {backgroundColor: "orange"};
//                    }
//                    console.log("cccc");
//                },
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
            tree.getIconClass = function(item, opened) {
                if (item.type === "NSNchild") {
                    return "NSNchild";
                } else if (item.type === "ZTEchild") {
                    return "ZTEchild";
                } else 
                    if (item.type === "NSNroot") {
                    return "NSNroot";
                } else if (item.type === "ZTEroot") {
                    return "ZTEroot";
                }
//                else if (item.type === undefined || item.type === 'folder')
//                    return (opened ? "dijitFolderOpened" : "dijitFolderClosed");
                else
                    return "dijitFolderOpened";
            }
            tree.startup();
//            tree.persist = false;
            tree.on("click", function(object) {
                clearUserSelections();

                if (object.id === "N2_Accessibility") {
//                    showFilters("2G SLA KPI");
                    subGroup = "A";
                    vendor.push("NSN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_NSN2_A, 'NSNchartTab_2G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "N2_Retainability") {
//                    showFilters("2G SLA KPI");
                    subGroup = "R";
                    vendor.push("NSN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_NSN2_R, 'NSNchartTab_2G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "N2_Traffic") {
//                    showFilters("2G SLA KPI");
                    subGroup = "T";
                    vendor.push("NSN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_NSN2_T, 'NSNchartTab_2G_T');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                if (object.id === "N3_Accessibility") {
//                    showFilters("3G SLA KPI");
                    subGroup = "A";
                    vendor.push("NSN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_NSN3_A, 'NSNchartTab_3G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "N3_Retainability") {
//                    showFilters("3G SLA KPI");
                    subGroup = "R";
                    vendor.push("NSN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_NSN3_R, 'NSNchartTab_3G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "N3_Traffic") {
//                    showFilters("3G SLA KPI");
                    subGroup = "T";
                    vendor.push("NSN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_NSN3_T, 'NSNchartTab_3G_T');
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
                    subGroup = "A";
                    vendor.push("ZJHB");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZJHB2_A, 'ZJHBchartTab_2G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZJHB2_Retainability") {
                    subGroup = "R";
                    vendor.push("ZJHB");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZJHB2_R, 'ZJHBchartTab_2G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZJHB2_Traffic") {
                    subGroup = "T";
                    vendor.push("ZJHB");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZJHB2_T, 'ZJHBchartTab_2G_T');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                if (object.id === "ZJHB3_Accessibility") {
                    subGroup = "A";
                    vendor.push("ZJHB");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZJHB3_A, 'ZJHBchartTab_3G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZJHB3_Retainability") {
                    subGroup = "R";
                    vendor.push("ZJHB");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZJHB3_R, 'ZJHBchartTab_3G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZJHB3_Traffic") {
                    subGroup = "T";
                    vendor.push("ZJHB");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZJHB3_T, 'ZJHBchartTab_3G_T');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZBFN2_Accessibility") {
                    subGroup = "A";
                    vendor.push("ZBFN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZBFN2_A, 'ZBFNchartTab_2G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZBFN2_Retainability") {
                    subGroup = "R";
                    vendor.push("ZBFN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZBFN2_R, 'ZBFNchartTab_2G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZBFN2_Traffic") {
                    subGroup = "T";
                    vendor.push("ZBFN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZBFN2_T, 'ZBFNchartTab_2G_T');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                if (object.id === "ZBFN3_Accessibility") {
                    subGroup = "A";
                    vendor.push("ZBFN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZBFN3_A, 'ZBFNchartTab_3G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZBFN3_Retainability") {
                    subGroup = "R";
                    vendor.push("ZBFN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZBFN3_R, 'ZBFNchartTab_3G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZBFN3_Traffic") {
                    subGroup = "T";
                    vendor.push("ZBFN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZBFN3_T, 'ZBFNchartTab_3G_T');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZKZN2_Accessibility") {
                    subGroup = "A";
                    vendor.push("ZKZN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZKZN2_A, 'ZKZNchartTab_2G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZKZN2_Retainability") {
                    subGroup = "R";
                    vendor.push("ZKZN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZKZN2_R, 'ZKZNchartTab_2G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZKZN2_Traffic") {
                    subGroup = "T";
                    vendor.push("ZKZN");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZKZN2_T, 'ZKZNchartTab_2G_T');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                if (object.id === "ZKZN3_Accessibility") {
                    subGroup = "A";
                    vendor.push("ZKZN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZKZN3_A, 'ZKZNchartTab_3G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZKZN3_Retainability") {
                    subGroup = "R";
                    vendor.push("ZKZN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZKZN3_R, 'ZKZNchartTab_3G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZKZN3_Traffic") {
                    subGroup = "T";
                    vendor.push("ZKZN");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZKZN3_T, 'ZKZNchartTab_3G_T');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZCPT2_Accessibility") {
                    subGroup = "A";
                    vendor.push("ZCPT");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZCPT2_A, 'ZCPTchartTab_2G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZCPT2_Retainability") {
                    subGroup = "R";
                    vendor.push("ZCPT");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZCPT2_R, 'ZCPTchartTab_2G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZCPT2_Traffic") {
                    subGroup = "T";
                    vendor.push("ZCPT");
                    technology.push("2G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZCPT2_T, 'ZCPTchartTab_2G_T');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(TRAFFIC_LOGICAL_GROUP_ID);
                    loadLists();
                }
                if (object.id === "ZCPT3_Accessibility") {
                    subGroup = "A";
                    vendor.push("ZCPT");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZCPT3_A, 'ZCPTchartTab_3G_A');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(ACCESS_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZCPT3_Retainability") {
                    subGroup = "R";
                    vendor.push("ZCPT");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZCPT3_R, 'ZCPTchartTab_3G_R');
                    document.getElementById("filterFromDate" + divId).value = getPreviousDate(DATE_WINDOW);
                    logicalGroup.push(RETAIN_LOGICAL_GROUP_ID);
                    loadLists();
                }
                else if (object.id === "ZCPT3_Traffic") {
                    subGroup = "T";
                    vendor.push("ZCPT");
                    technology.push("3G");
                    divId = getDivId();
                    chartType.push(KPI);
                    showEditorTab(TAB_IX_ZCPT3_T, 'ZCPTchartTab_3G_T');
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