/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var technology = [];
var vendor = [];
var chartType = [];
var KPI = "KPI";
var REV_AVAIL = "REV_AVAIL";

function clearUserSelections() {
    technology = [];
    vendor = [];
    chartType = [];
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
                persist: false,
                dndController: dndSource
            }, "tree"); // make sure you have a target HTML element with this id
            tree.startup();
//            tree.persist = false;
            tree.on("click", function(object) {
                clearUserSelections();
                if (object.id === "root") {
                    //initTabs();
                    //hideAll();
                    //document.getElementById("sample-ui").style.display = "none";
                    //document.getElementById("map3d").style.display = "none";
                    // document.getElementById("nsn_2G").style.display = "none";
                }
                if (object.id === "NSN_2G_KPI_Charts") {
                    showFilters("NSN_2G_KPI_Charts");
                    vendor.push("NSN");
                    technology.push("2G");
                    chartType.push(KPI);
                    showEditorTab(1, 'chartTab_2G');
                    document.getElementById("filterFromDate").value = getPreviousDate(30);
                }
                if (object.id === "NSN_3G_KPI_Charts") {
                    showFilters("NSN_3G_KPI_Charts");
                    vendor.push("NSN");
                    technology.push("3G");
                    chartType.push(KPI);
                    showEditorTab(2, 'chartTab_3G');
                    document.getElementById("filterFromDate_NSN_3G").value = getPreviousDate(30);
                }
                if (object.id === "NSN_2G_REV_AVAIL") {
                    showFilters("NSN_2G_REV_AVAIL");
                    vendor.push("NSN");
                    technology.push("2G");
                    chartType.push(REV_AVAIL);
                    showEditorTab(3, 'rev_avail_nsn_2G');
                    document.getElementById("PeriodPicker_NSN_2G_REV_AVAIL_FromDate").value = getPreviousDate(30);
                }
                if (object.id === "NSN_3G_REV_AVAIL") {
                    showFilters("NSN_3G_REV_AVAIL");
                    vendor.push("NSN");
                    technology.push("3G");
                    chartType.push(REV_AVAIL);
                    showEditorTab(4, 'rev_avail_nsn_3G');
                    document.getElementById("PeriodPicker_NSN_3G_REV_AVAIL_FromDate").value = getPreviousDate(30);
                }
                if (object.id === "rawData") {
                    var tabs = new Array();
                    tabs[1] = 3;
                    showTab(tabs);
                }
                animateFilterBox();
            }, true);
        });


function animateFilterBox() {
    require(["dojo/_base/fx", "dojo/fx/easing", "dojo/window", "dojo/on", "dojo/dom", "dojo/domReady!"], function(baseFx, easing, win, on, dom) {
        var anim8target = dom.byId("NE_Browser");
        var viewport = win.getBox(win.doc);
        baseFx.animateProperty({
            // use the bounceOut easing routine to have the box accelerate
            // and then bounce back a little before stopping
            easing: easing.bounceOut,
            duration: 300,
            node: anim8target,
            properties: {
                // calculate the 'floor'
                // and subtract the height of the node to get the distance from top we need
                top: {start: 0, end: viewport.h - anim8target.offsetHeight - 5}
            }
        }).play();
    });
}