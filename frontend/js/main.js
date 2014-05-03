var Node = Backbone.Model.extend({
    initialize: function() {
    
    }
});

var GraphView = Backbone.View.extend({
    initialize: function() {

        var container = this.$el.attr('id');
       
        $.getJSON("/graph", function(data) {

            var s = new sigma({graph: data, container: container});
                        
            s.startForceAtlas2();
            
            setTimeout(function() {
                s.stopForceAtlas2();
            }, 1000);

        });
        
    },
    
    render: function() {
    }
});

var view = new GraphView({el: "#graphView"});