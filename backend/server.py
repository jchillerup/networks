#!/bin/env python

from flask import Flask, request, redirect, url_for
from db import *

import json

# TEMP IMPORTS
from random import random

app = Flask(__name__)


@app.route('/')
def index():
    return redirect(url_for('static', filename="index.html"))

@app.route('/graph/nodes/<int:id>', methods=['GET'])
@app.route('/graph/nodes/', methods=['GET'])
@app.route('/graph/nodes/<string:identifier>', methods=['GET'])
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


@app.route('/graph/edges/', methods=['GET'], defaults={"id": None})
@app.route('/graph/edges/<int:id>', methods=['GET'])
def get_edges(id):

    if identifier:
        edge = db().find(Edge, Edge.id == id)
        export = edge.one().serialize()
    else:
        all_edges = db().find(Edge)
        export = map(lambda node: edge.serialize(), all_edges)
   
    return json.dumps(export)



@app.route('/graph/node')
def get_node():

    export = {}

    all_nodes = db().find(Node)
    all_edges = db().find(Edge)

    export["nodes"] = map(lambda node: node.serialize(), all_nodes)
    export["edges"] = map(lambda edge: edge.serialize(), all_edges)

    return json.dumps(export)


@app.route('/graph/add', methods=["POST"])
def graph_add():
    print "Got", request.form
    return 'Hello, JC'

if __name__ == '__main__':
    app.run(debug=True)