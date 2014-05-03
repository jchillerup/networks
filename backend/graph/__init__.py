#!/bin/env python

import json

from flask import Blueprint, request
from db import *

mod = Blueprint("graph", __name__, url_prefix="/graph")

""" NODES """

@mod.route('/nodes', methods=["GET"])
@mod.route('/nodes/<string:identifier>', methods=["GET"])
def read_nodes(identifier=None):

    if identifier:
        node = db().find(Node, Node.identifier == identifier)
        export = node.one().serialize()
    else:
        all_nodes = db().find(Node)
        export = map(lambda node: node.serialize(), all_nodes)
   
    return json.dumps(export)


@mod.route('/nodes', methods=["POST", "PUT"])
def createupdate_node():
    req = request.get_json()

    try:

        identifier = req[u"id"]

        node = db().find(Node, Node.identifier == identifier).one()

        if node is None:
            node = db().add(Node())
            node.identifier = identifier

        props = db().find(NodeProperty, NodeProperty.node_id == Node.id, Node.identifier == identifier)

        for prop in props:
            db().remove(prop)

        for key, value in req[u"properties"].items():
            prop = NodeProperty()
            prop.key = key
            prop.value = value
            node.properties.add(prop)

        db().commit()

    except Exception, e:
        db().rollback()
        raise e

    return ""  


@mod.route('/nodes/<string:identifier>', methods=["DELETE"])
def delete_node(identifier=None):
    
    try:
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

    except Exception, e:
        db().rollback()
        raise e

    return ""


""" EDGES """


@mod.route('/edges', methods=['GET'])
@mod.route('/edges/<string:identifier>', methods=['GET'])
def read_edges(identifier=None):

    if identifier:
        edge = db().find(Edge, Edge.identifier == identifier)
        export = edge.one().serialize()
    else:
        all_edges = db().find(Edge)
        print list(all_edges)
        export = map(lambda edge: edge.serialize(), all_edges)
   
    return json.dumps(export)


@mod.route('/edges', methods=["POST", "PUT"])
def createupdate_edge():
    req = request.get_json()

    try:
        identifier = req[u"id"]

        edge = db().find(Edge, Edge.identifier == identifier).one()
        
        if edge is None:
            edge = db().add(Edge())
            edge.identifier = identifier

        edge.origin = req[u"origin"]
        edge.confidence = req[u"confidence"]

        source = db().find(Node, Node.identifier == req[u"source"]).one()
        target = db().find(Node, Node.identifier == req[u"target"]).one()

        if target is None or source is None:
            raise Exception("invalid target or source")

        edge.source = source
        edge.target = target

        props = db().find(EdgeProperty, EdgeProperty.edge_id == Edge.id, Edge.identifier == identifier)

        for prop in props:
            db().remove(prop)

        for key, value in req[u"properties"].items():
            prop = EdgeProperty()
            prop.key = key
            prop.value = value
            edge.properties.add(prop)

        db().commit()

    except Exception, e:
        db().rollback()
        raise e

    return ""


@mod.route('/edges/<string:identifier>', methods=['DELETE'])
def delete_edge(identifier=None):
    
    edge = db().find(Edge, Edge.identifier == identifier).one()
    
    if not node:
        raise Exception("not found")

    db().remove(edge)
    db().commit()
    
    return ""

