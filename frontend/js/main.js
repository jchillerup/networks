var Edge = Backbone.Model.extend({
    url: '/graph/edges'
});

var EdgeCollection = Backbone.Collection.extend({
    model: Edge,
    url: "/graph/edges",
    initialize: function() {
        console.log("Edge collection initialized");
        this.fetch();
    }
});

var Node = Backbone.Model.extend({
    url: '/graph/nodes',
    initialize: function() {
        // make sure to enclose get('properties') as a backbone model too
    },
    
    setProperty: function(key, value) {
        var props = this.get('properties');
        props[key] = value;
        this.set('properties', props);
        
        this.trigger('change:properties');
    },
    
    addEdgeTo: function(to) {
        var eid = this.id + "->" + to.id;
        var e = new Edge({id: eid, source: this.id, target: to.id, origin: "manual", confidence: 1, properties: {}});
        e.save();
    }
});

var NodeCollection = Backbone.Collection.extend({
    model: Node,
    url: "/graph/nodes",
    initialize: function() {
        console.log("Network initialized");
        this.fetch();
    }
});



var PropertiesView = Backbone.View.extend({
    active: null,

    initialize: function() {
        this.model.on('change:properties', _.bind(this.render, this));
    },
    
    show: function(which) {
        this.active =  which;
        this.render();
    },

    render: function() {
        console.log('propsview render');
        
        var node = this.model.get({cid: this.active});
        
        var $list = this.$('tbody');
        
        $list.empty();
        
        for (var attr in node.get('properties')) {
            $("<tr><td>"+attr+"</td><td>"+node.get('properties')[attr]+"</td></tr>").appendTo($list);
        }
    },
    
    getActiveNode: function() {
        if (this.active !== null) 
            return this.model.get({cid: this.active});
        
        return null;
    },
    
    addProperty: function() {
        var key = prompt("Property name");
        var value = prompt("Value");
        
        
        var n = this.getActiveNode();
        n.setProperty(key, value);
    }
});

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