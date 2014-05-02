var Node = Backbone.Model.extend({
    initialize: function() {
    
    }
});

var GraphView = Backbone.View.extend({
    initialize: function() {
        var g = {
            nodes: [],
            edges: []
        };
        var i = 0, N = 100, E = 100;

        for (i = 0; i < N; i++)
            g.nodes.push({
                id: 'n' + i,
                label: 'Node ' + i,
                x: Math.random(),
                y: Math.random(),
                size: 1,
                color: '#008'
            });

        for (i = 0; i < E; i++)
            g.edges.push({
                id: 'e' + i,
                source: 'n' + (Math.random() * N | 0),
                target: 'n' + (Math.random() * N | 0),
                size: Math.random(),
                color: '#444'
            });
        
        console.log(g);

        var s = new sigma({graph: g, container: this.$el.attr('id')});
        
        s.startForceAtlas2();
        
        setTimeout(function() {
            s.stopForceAtlas2();
        }, 10000);
    },
    
    render: function() {
    }
});

var view = new GraphView({el: "#graphView"});