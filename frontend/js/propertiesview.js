var PropertiesView = Backbone.View.extend({
    active: null,
    events: {
        "click #addEdgeButton": "addEdge"
    },

    initialize: function() {
        this.model.on('change:properties', _.bind(this.render, this));
    },
    
    show: function(which) {
        this.active =  which;
        console.log(["Setting active to ", this.active]);
        this.render();
    },

    render: function() {
        var node = this.model.get({cid: this.active});
        
        var $list = this.$('tbody');
        
        $list.empty();
        
        for (var attr in node.get('properties')) {
            $("<tr><td>"+attr+"</td><td>"+node.get('properties')[attr]+"</td></tr>").appendTo($list);
        }
        
        
        var $select = this.$('#addEdgeSelector');
        $select.empty();
        
        console.log($select);
        this.model.each(function(node) {
            $("<option>").attr('value', node.get('id')).html(node.get('id')).appendTo($select);
        });
        
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
        var to = this.model.get({cid: this.$('#addEdgeSelector').val()});
        
        var e = from.addEdgeTo(to);
        
        edges.add(e);
        e.save();
    }
});
