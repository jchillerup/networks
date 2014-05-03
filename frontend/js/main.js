var Node = Backbone.Model.extend({
    url: '/graph/nodes',
    initialize: function() {
        // make sure to enclose get('properties') as a backbone model too
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

var Edge = Backbone.Model.extend({});

var EdgeCollection = Backbone.Collection.extend({
    model: Edge,
    url: "/graph/edges",
    initialize: function() {
        console.log("Edge collection initialized");
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
        
        var $list = this.$('ul');
        
        $list.empty();
        
        for (var attr in node.get('properties')) {
            $("<li>"+attr+": "+node.get('properties')[attr]+"</li>").appendTo($list);
        }
    },
    
    getActiveNode: function() {
        if (this.active !== null) 
            return this.model.get({cid: this.active});
        
        return null;
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
        
        // Render every time any of our attached models sync
        for (var model in attr.models) {
            attr.models[model].on('sync', _.bind(this.render, this));
            
            this.models[model] = attr.models[model];
        }

        this.propsView = attr.propsView;

        this.sigmaGraph = new sigma({graph: data, container: container});
        this.sigmaGraph.bind('clickNode', function(ev) { propsView.show(ev.data.node.cid); });
        
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
    },
    
    makeNiceDown: function() {
        this.sigmaGraph.startForceAtlas2();
    },
    makeNiceUp: function() {
        this.sigmaGraph.stopForceAtlas2();
    },

    render: _.debounce(function() {
        var graph = this.sigmaGraph;
        
        var nodes = this.models['nodes'].toJSON();
        var edges = this.models['edges'].toJSON();
        
        this.models['nodes'].each(function(node) {
            var flatnode = node.toJSON();
            //flatnode.id = flatnode.identifier;
            
            flatnode.x = Math.random();
            flatnode.y = Math.random();
            flatnode.size = 1;
            flatnode.label = flatnode.identifier;
            flatnode.cid = node.cid;

            console.log(flatnode);

            graph.graph.addNode(flatnode);
        });
        
        this.models['edges'].each(function(edge) {
            var flatedge = edge.toJSON();
            //flatedge['id'] = 'e' + flatedge['id'];
            console.log(flatedge);
            graph.graph.addEdge(flatedge);
        });
        
        graph.refresh();
    }, 150)
});


var nodes = new NodeCollection();
var edges = new EdgeCollection();
var propsView = new PropertiesView({el: "#propertyView", model: nodes});
var view = new GraphView({el: "#graphView", models: {nodes: nodes, edges: edges}, propsView: propsView});