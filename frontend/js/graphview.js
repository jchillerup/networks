var GraphView = Backbone.View.extend({
    sigmaGraph: null,
    
    events: {
        "mouseup #niceButton": "makeNiceUp",
        "mousedown #niceButton": "makeNiceDown",
        "click #addNodeButton": "addNode"
    },
    unimplemented: function() {
        console.error('Unimplemented!');
    },
    models: [],
    propsView: null,
    initialize: function(attr) {
        var container = this.$el.attr('id');

        var data = {nodes: [], edges: []};
        
        for (var model in attr.models) {
            this.models[model] = attr.models[model];
        }

        this.propsView = attr.propsView;

        sigma.renderers.def = sigma.renderers.canvas; // HACK panton, drag-n-drop

        this.sigmaGraph = new sigma({graph: data, container: container});

        sigma.plugins.dragNodes(this.sigmaGraph, this.sigmaGraph.renderers[0]);// HACK panton, drag-n-drop

        this.sigmaGraph.settings("defaultLabelColor", "#fff"); // sorry, style does not belong here
        this.sigmaGraph.settings("font", "Open Sans");     

        this.sigmaGraph.bind('clickNode', function(ev) { propsView.show(ev.data.node.cid); });
        this.sigmaGraph.bind('clickStage', function(ev) { propsView.hide(); });
        
        this.models['edges'].on('add', _.bind(this.newEdge, this));
        this.models['nodes'].on('add', _.bind(this.newNode, this));
    },
    
    makeNiceDown: function() {
        this.sigmaGraph.startForceAtlas2();
    },
    makeNiceUp: function() {
        this.sigmaGraph.stopForceAtlas2();
    },
    nodeidx: 0,
    newNode: function(node, collection, xmlhttp) {
        var graph = this.sigmaGraph;

        var flatnode = node.toJSON();
        //flatnode.id = flatnode.identifier;
        
        var modulo = Math.ceil(Math.sqrt( _.size(this.models['nodes']) ));

        flatnode.x = (this.nodeidx % modulo) / 4;
        flatnode.y = (Math.floor( this.nodeidx++ / modulo )) / 4;
        flatnode.size = 10;
        flatnode.label = flatnode.properties.name || flatnode.id;
        flatnode.color = "#FF9D00";
        flatnode.originalcolor = flatnode.color;
        flatnode.cid = node.cid;
        
        graph.graph.addNode(flatnode);

        var allnodes = graph.graph.nodes();
        for(var idx in allnodes){
            if(allnodes[idx].cid == node.cid){
                node.graphnode = allnodes[idx];
                break;
            }
        }

        this.render();
    },
    
    newEdge: function(edge,collection,xmlhttp) {
        var graph = this.sigmaGraph;
        var flatedge = edge.toJSON();
        flatedge.color = "rgba(255,255,255,0.2)";
        flatedge.type = "curvedArrow";
        graph.graph.addEdge(flatedge);
        
        this.render();
    },
    
    renderDammit: function() {
        var graph = this.sigmaGraph;
        
        graph.refresh();
    },
    
    render: _.debounce(function() {   // HACK, get this to call renderDammit
        var graph = this.sigmaGraph;
        
        graph.refresh();
    }, 50),

    addNode: function() {


        var name = prompt("Name?");

        if (name === null || name === "") {
            return;
        }

        var identifier = name.toLowerCase().replace(" ", "-") + "@manual";
        
        var node = new Node({id: identifier, properties: {name: name}});
        
        this.models['nodes'].add(node);
        
        node.save({}, {
            success: function(model, response) {
                console.log("new node got " + node.cid); 
                propsView.show(node.get('cid'));
                propsView.render();
            },
            error: function(model, response) {
                console.log('error saving the new node ' + node.cid);
                console.log(node.cid);
                propsView.show(node.cid);
                propsView.render();
            }
        });
        
    },
    
    clearSearchResults: function(noRender) {
        this.models['nodes'].each(function(node) {
            console.log(node);
            node.graphnode.color = node.graphnode.originalcolor;
            node.graphnode.size = 10;
        });
        
        if (!noRender)
            this.render();
    },

    search: function(term) {
        term = term.toLowerCase();
        
        this.clearSearchResults( true );

        var results = nodes.filter(function(node) {
            if (node.id.toLowerCase().indexOf(term) !== -1)
                return true;
            
            var props = node.get('properties');
            
            for (idx in props)
                if (props[idx].toLowerCase().indexOf(term) !== -1)
                    return true;
            
            return false;
        });
        
        _.each(results, function(result) {
            console.log(result);
            result.graphnode.color = "#f00";
            result.graphnode.size = 15;
        });
        
        this.render();

        return results;
    }
    
});
