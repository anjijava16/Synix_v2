/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
require([  "dojo/data/ItemFileWriteStore",
    "cbtree/Tree",                
    "cbtree/models/ForestStoreModel"], 
    function(  ItemFileWriteStore, Tree, 
        ForestStoreModel) {
        modelConfig = {
            store: null, 
            query: {
                type: 'parent'
            },  
            rootLabel: "root",
            rootId: 'root',
            checkboxAll:  false,
            multiState: false,
            checkedRoot: false,
            checkboxState: true,
            checkedStrict: true
        };
        var treeConfig = {
            model: null,
            id: "MenuTree",
            branchReadOnly: true,
            branchIcons: true,
            icon: null,
            leafReadOnly: false,
            nodeIcons: true,
            showRoot: false
        };
                
        configStore = new ItemFileWriteStore( {
            url:'scripts/TreeLayout.json'
        });
        modelConfig['store'] = configStore;

        setAttr = function (attr, value) {
            // Update the common model or tree configuration object
            if (attr in modelConfig) modelConfig[attr] = value;
            if (attr in treeConfig)  treeConfig[attr] = value;
        }
    
        buildTree = function (domLocation) {
            // Build the configurable tree. If one exists delete it first.
            if (configTree) {
                var treeModel = configTree.model;
                if (treeModel) {
                    treeModel.destroy();
                    delete configTree.model;
                }
                configTree.destroy();
                delete configTree;
            }
            treeConfig.model = new ForestStoreModel( modelConfig );
            configTree = new Tree( treeConfig );
            configTree.placeAt(domLocation);
            configTree.startup();
//            initTabs();
//            hideSome();
            
            configTree.on("click", function(object){
                if(object.id == "earth_all_sites"){
                    if(object.checked=="true"){
                        document.getElementById("loaderDiv_GE").style.display = "block";
//                        document.getElementById("loaderDiv_GE").style.visibility = "visible";
                        console.log(document.getElementById("loaderDiv_GE"));
                        loadKMLAll('*');
//                        document.getElementById("loaderDiv_GE").style.display = "none";
                    }else{
                        clearKMLAll();
                    }
                }
                if(object.name == "Earth" || object.id == "Show_GE_Globe"){
                    var tabs = new Array();
                    tabs[1] = 1;
//                    hideSome();
                    showTab(tabs);
//                    setTabTitle(1, "Globe Viewer");
//                    document.getElementById("nsn_2G").style.display = "none";
                    document.getElementById("sample-ui").style.display = "block";
                    document.getElementById("map3d").style.display = "block";
                    init(); 
                }
                       
               
            }, true);
        }
    });

