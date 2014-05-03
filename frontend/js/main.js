var nodes = new NodeCollection();
var edges = new EdgeCollection();
var propsView = new PropertiesView({el: "#propertyView", model: nodes});
var view = new GraphView({el: "#graphView", models: {nodes: nodes, edges: edges}, propsView: propsView});

        /*
         drawingProperties({
         defaultLabelColor: '#222',
         defaultLabelSize: 14,
         defaultLabelHoverColor: '#000',
         labelThreshold: 6,
         font: 'Arial',
         edgeColor: 'source',
         defaultEdgeType: 'curve',
         defaultEdgeArrow: 'target'
         */