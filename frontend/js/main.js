var Node = Backbone.Model.extend({
    initialize: function() {
    
    }
});

var Network = Backbone.Collection.extend({
    model: Node
});

var GraphView = Backbone.View.extend({
    sigmaGraph: null,
    
    events: {
        "mouseup #niceButton": "makeNiceUp",
        "mousedown #niceButton": "makeNiceDown"
    },

    initialize: function() {
        var container = this.$el.attr('id');

        $.getJSON("/graph", _.bind(function(data) {
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
        }, this));
    },
    
    makeNiceDown: function() {
        this.sigmaGraph.startForceAtlas2();
    },
    makeNiceUp: function() {
        this.sigmaGraph.stopForceAtlas2();
    },

    render: function() {
    }
});

var view = new GraphView({el: "#graphView"});