var nodes = new NodeCollection();
var edges = new EdgeCollection();
var auxfiles = new AuxFilesCollection();

var propsView = new PropertiesView({el: "#propertyView", model: nodes});
var auxFilesView = new AuxFilesView({el: '#auxFiles', model: auxfiles});

var view = new GraphView({el: "#graphView", models: {nodes: nodes, edges: edges}, propsView: propsView});