#!/bin/env python

import json

from flask import Blueprint
from db import *

mod = Blueprint('graph', __name__, url_prefix='/graph')

@mod.route('/nodes/<int:id>', methods=['GET'])
@mod.route('/nodes/', methods=['GET'])
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


@mod.route('/edges/', methods=['GET'], defaults={"id": None})
@mod.route('/edges/<int:id>', methods=['GET'])
def get_edges(id):

    if id:
        edge = db().find(Edge, Edge.id == id)
        export = edge.one().serialize()
    else:
        all_edges = db().find(Edge)
        export = map(lambda edge: edge.serialize(), all_edges)
   
    return json.dumps(export)

