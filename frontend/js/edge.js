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
