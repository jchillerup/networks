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
