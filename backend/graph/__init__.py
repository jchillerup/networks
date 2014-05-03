#!/bin/env python

import json

from flask import Blueprint, request
from db import *

mod = Blueprint('graph', __name__, url_prefix='/graph')

""" NODES """

@mod.route('/nodes', methods=['GET'])
@mod.route('/nodes/<string:identifier>', methods=['GET'])
def get_nodes(identifier=None):

    if identifier:
        node = db().find(Node, Node.identifier == identifier)
        export = node.one().serialize()
    else:
        all_nodes = db().find(Node)
        export = map(lambda node: node.serialize(), all_nodes)
   
    return json.dumps(export)


@mod.route('/nodes', methods=['POST, PUT'])
def createupdate_node():
    req = request.get_json()
    print "Got req", req

    node = db().add(Node())
    node.identifier = req[u"id"]

    for key, value in req[u"properties"].items():
        prop = NodeProperty()
        prop.key = key
        prop.value = values
        node.properties.add(prop)

    db().commit()


@mod.route('/nodes/<string:identifier>', methods=['DELETE'])
def delete_node(identifier=None):
       
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


@mod.route('/edges', methods=['GET'])
@mod.route('/edges/<string:identifier>', methods=['GET'])
def get_edges(identifier=None):

    if identifier:
        edge = db().find(Edge, Edge.identifier == identifier)
        export = edge.one().serialize()
    else:
        all_edges = db().find(Edge)
        export = map(lambda edge: edge.serialize(), all_edges)
   
    return json.dumps(export)


@mod.route('/edges', methods=['POST'])
def create_edge():
    req = request.get_json()
    print "Got req", req

    edge = db().add(Edge())
    edge.identifier = req["id"]
    edge.origin = req["origin"]
    edge.confidence = req["confidence"]

    for key, value in req["properties"].items():
        prop = EdgeProperty()
        prop.key = key
        prop.value = values
        edge.properties.add(prop)

    db().commit()

    return ""


@mod.route('/edges/<string:identifier>', methods=['DELETE'])
def delete_edge(identifier=None):
    
    edge = db().find(Edge, Edge.identifier == identifier).one()
    
    if not node:
        raise Exception("not found")

    db().remove(edge)
    db().commit()
    
    return ""

