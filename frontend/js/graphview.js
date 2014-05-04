var GraphView = Backbone.View.extend({
    sigmaGraph: null,
    
    events: {
        "mouseup #niceButton": "makeNiceUp",
        "mousedown #niceButton": "makeNiceDown",
        "click #addNodeButton": "addNode",
        "click #addEdgeButton": "addEdge"
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

        sigma.renderers.def = sigma.renderers.canvas; // HACK panton, drag-n-drop

        this.sigmaGraph = new sigma({graph: data, container: container});

        sigma.plugins.dragNodes(this.sigmaGraph, this.sigmaGraph.renderers[0]);// HACK panton, drag-n-drop

        this.sigmaGraph.settings("defaultLabelColor", "#fff"); // sorry, style does not belong here
        this.sigmaGraph.settings("font", "Open Sans");     

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

        var flatnode = node.toJSON();
        //flatnode.id = flatnode.identifier;
        
        flatnode.x = Math.random();
        flatnode.y = Math.random();
        flatnode.size = 10;
        flatnode.label = flatnode.id;
        flatnode.color = "#FF9D00";
        flatnode.cid = node.cid;
        
        graph.graph.addNode(flatnode);
        
        this.render();
    },
    
    newEdge: function(edge,collection,xmlhttp) {
        var graph = this.sigmaGraph;
        var flatedge = edge.toJSON();
        flatedge.color = "#fff";
        flatedge.type = "curvedArrow";
        graph.graph.addEdge(flatedge);
        
        this.render();
    },

    render: _.debounce(function() {
        var graph = this.sigmaGraph;
        
        graph.refresh();
    }, 50),
    
    addNode: function() {
        var identifier = prompt("Identifier?");
        
        var node = new Node({id: identifier, properties: {}});
        
        this.models['nodes'].add(node);
        
        node.save({}, {
            success: function(model, response) {
                console.log("new node got " + node.cid); 
                propsView.show(node.get('cid'));
                propsView.render();
            },
            error: function(model, response) {
                console.log('error saving the new node ' + node.cid);
                console.log(node.cid);
                propsView.show(node.cid);
                propsView.render();
            }
        });
        
    },
    
    addEdge: function() {
        console.log(this);
    }
});
