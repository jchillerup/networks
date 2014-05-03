var Node = Backbone.Model.extend({
    initialize: function() {
        // make sure to enclose get('properties') as a backbone model too
    }
});

var NodeCollection = Backbone.Collection.extend({
    model: Node,
    url: "/graph/nodes/",
    view: null,
    initialize: function(attr) {
        console.log("Network initialized");
        
        this.view = attr.view;
        
        this.fetch();
        
        // set up an event handler that updates the view when the collection updates
        if (this.view !== null) {
            this.on("sync", view.render);
        }
    }
});

var Edge = Backbone.Model.extend({});

var EdgeCollection = Backbone.Collection.extend({
    model: Edge,
    url: "/graph/edges/",
    view: null,
    initialize: function(attr) {
        this.view = attr.view;
        console.log("Edge collection initialized");
        this.fetch();
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
    initialize: function() {
        var container = this.$el.attr('id');

        var data = {nodes: [], edges: []};

        this.sigmaGraph = new sigma({graph: data, container: container});
                
                /*.drawingProperties({
                defaultLabelColor: '#222',
                defaultLabelSize: 14,
                defaultLabelHoverColor: '#000',
                labelThreshold: 6,
                font: 'Arial',
                edgeColor: 'source',
                defaultEdgeType: 'curve',
                defaultEdgeArrow: 'target'
            });*/
    },
    
    makeNiceDown: function() {
        this.sigmaGraph.startForceAtlas2();
    },
    makeNiceUp: function() {
        this.sigmaGraph.stopForceAtlas2();
    },

    render: _.debounce(function() {
        console.log('view render');
    }, 150)
});


var view = new GraphView({el: "#graphView"});
var nodes = new NodeCollection({view: view});
var edges = new EdgeCollection({view: view});