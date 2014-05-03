#!/bin/env python

import json

from flask import Blueprint, request
from db import *

mod = Blueprint("analysis", __name__, url_prefix="/analysis")

""" NODES """

@mod.route('/ndegrees/<string:identifier>/<int:degrees>', methods=["GET"])
def read_nodes(identifier, degrees):

    if degrees > 5:
        raise Exception("I am sorry, this doesn't scale - at all")
    
    init_node = db().find(Node, Node.identifier == identifier).one()

    nodes = set((init_node,))
    edges = set()

    for i in range(degrees):

        for node in list(nodes):

            for inbound in node.inbound:
                edges.add(inbound)
                nodes.add(inbound.source)

            for outbound in node.outbound:
                edges.add(outbound)
                nodes.add(outbound.target)

    return json.dumps({
        "edges": map(lambda edge: edge.serialize(), edges),
        "nodes": map(lambda nodes: nodes.serialize(), nodes)
        })