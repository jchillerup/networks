#!/bin/env python

import json

from flask import Blueprint
from db import *

mod = Blueprint('graph', __name__, url_prefix='/graph')

""" NODES """

@mod.route('/nodes', methods=['GET'])
@mod.route('/nodes/<int:id>', methods=['GET'])
@mod.route('/nodes/<string:identifier>', methods=['GET'])
def get_nodes(id=None, identifier=None):

    if id:
        node = db().find(Node, Node.id == id)
        export = node.one().serialize()
    elif identifier:
        node = db().find(Node, Node.identifier == identifier)
        export = node.one().serialize()
    else:
        all_nodes = db().find(Node)
        export = map(lambda node: node.serialize(), all_nodes)
   
    return json.dumps(export)


@mod.route('/nodes', methods=['POST'])
def create_node():
    print "GOT PUT"
    return "not implemented"

@mod.route('/nodes/<int:id>', methods=['PUSH'])
@mod.route('/nodes/<string:identifier>', methods=['PUSH'])
def update_node(id=None, identifier=None):
    print "GOT PUSH"
    return "not implemented"

@mod.route('/nodes/<int:id>', methods=['DELETE'])
@mod.route('/nodes/<string:identifier>', methods=['DELETE'])
def delete_node(id=None, identifier=None):
       
    if id:
        node = db().find(Node, Node.id == id).one()
    elif identifier:
        node = db().find(Node, Node.identifier == identifier).one()
    
    if not node:
        raise Exception("not found")

    # remove all edges to this node
    for inbound in node.inbound:
        db().remove(inbound)

    # remove all edges from this node
    for outbound in node.outbound:
        db().remove(outbound)

    db().remove(node)
    db().commit()

    return ""


""" EDGES """


@mod.route('/edges', methods=['GET'], defaults={"id": None})
@mod.route('/edges/<int:id>', methods=['GET'])
def get_edges(id):

    if id:
        edge = db().find(Edge, Edge.id == id)
        export = edge.one().serialize()
    else:
        all_edges = db().find(Edge)
        export = map(lambda edge: edge.serialize(), all_edges)
   
    return json.dumps(export)


@mod.route('/edges/<int:id>', methods=['DELETE'])
@mod.route('/edges/<string:identifier>', methods=['DELETE'])
def delete_edge(id=None, identifier=None):
       
    if id:
        edge = db().find(Edge, Edge.id == id).one()
    elif identifier:
        edge = db().find(Edge, Edge.identifier == identifier).one()
    
    if not node:
        raise Exception("not found")

    db().remove(edge)
    db().commit()
    
    return ""