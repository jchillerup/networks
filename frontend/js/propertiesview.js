var PropertiesView = Backbone.View.extend({
    active: null,
    connect: null,
    events: {
        "click #addEdgeButton": "addEdge",
        "click #addProperty": "addProperty",
        "click #save": "saveNode"
    },

    initialize: function() {
        this.model.on('change:properties', _.bind(this.render, this));
        this.hide();
    },
    
    show: function(which) {
        //console.log(this.active.graphNode);

        this.$el.show();
        this.active =  which;
        console.log(["Setting active to ", this.active]);

        this.render();

        if(this.connect !== null){

            var to = this.getActiveNode();

            if(this.connect == to) return;

            var new_edge = this.connect.addEdgeTo(to);      
            edges.add(new_edge);
            new_edge.save();

            this.connect = null;
        }

    },

    hide: function(){
        this.$el.hide();
    },

    render: function() {
        var node = this.model.get({cid: this.active});
        
        var $list = this.$('tbody');
        
        $list.empty();
        
        for (var attr in node.get('properties')) {
            $("<tr><td>"+attr+"</td><td>"+node.get('properties')[attr]+"</td></tr>").appendTo($list);
        }

        var $ident = this.$('#identifierInfo');
        $ident.text(node.id);
                
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
    },
    
    addEdge: function() {
        var from = this.getActiveNode();
        this.connect = from;
        this.hide();
    },
    
    saveNode: function() {
        this.getActiveNode().save();
    }
});
