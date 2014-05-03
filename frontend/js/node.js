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
        console.log([this, to]);
        var eid = this.get('id') + "->" + to.get('id');
        var e = new Edge({id: eid, identifier: eid, source: this.get('id'), target: to.get('id'), origin: "manual", confidence: 1, properties: {}});
        //e.save();
        
        console.log(eid);
        
        return e;
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

