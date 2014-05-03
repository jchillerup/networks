var GraphView = Backbone.View.extend({
    sigmaGraph: null,
    
    events: {
        "mouseup #niceButton": "makeNiceUp",
        "mousedown #niceButton": "makeNiceDown",
        "click #addNodeButton": "unimplemented",
        "click #addEdgeButton": "unimplemented"
    },
    unimplemented: function() {
        console.error('Unimplemented!');
    },
    models: [],
    propsView: null,
    initialize: function(attr) {
        var container = this.$el.attr('id');

        var data = {nodes: [], edges: []};
        
        for (var model in attr.models) {
            this.models[model] = attr.models[model];
        }

        this.propsView = attr.propsView;

        this.sigmaGraph = new sigma({graph: data, container: container});
        this.sigmaGraph.bind('clickNode', function(ev) { propsView.show(ev.data.node.cid); });
        
        
        this.models['edges'].on('add', _.bind(this.newEdge, this));
        this.models['nodes'].on('add', _.bind(this.newNode, this));

    },
    
    makeNiceDown: function() {
        this.sigmaGraph.startForceAtlas2();
    },
    makeNiceUp: function() {
        this.sigmaGraph.stopForceAtlas2();
    },
    
    newNode: function(node, collection, xmlhttp) {
        var graph = this.sigmaGraph;

        console.log('new node');
        
        var flatnode = node.toJSON();
        //flatnode.id = flatnode.identifier;
        
        flatnode.x = Math.random();
        flatnode.y = Math.random();
        flatnode.size = 1;
        flatnode.label = flatnode.identifier;
        flatnode.cid = node.cid;
        
        graph.graph.addNode(flatnode);
        
        this.render();
    },
    
    newEdge: function(edge,collection,xmlhttp) {
        var graph = this.sigmaGraph;
        var flatedge = edge.toJSON();
        graph.graph.addEdge(flatedge);
        
        this.render();
    },

    render: _.debounce(function() {
        var graph = this.sigmaGraph;
        
        graph.refresh();
    }, 50)
});
