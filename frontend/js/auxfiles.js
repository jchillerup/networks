var AuxFile = Backbone.Model.extend({
    url: "graph/files"
});

var AuxFilesCollection = Backbone.Collection.extend({
    model: AuxFile,
    url: "graph/files",
    initialize: function() {
        console.log('AuxFilesCollection initialized');
        this.fetch();
    }
});


var AuxFilesView = Backbone.View.extend({
    
    

    initialize: function() {
        this.render();
    },
    
    render: function() {
    }
    
});