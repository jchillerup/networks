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

@app.route('/graph/nodes/', methods=['GET'], defaults={"identifier": None})
@app.route('/graph/nodes/<string:identifier>', methods=['GET'])
def get_nodes(identifier):

    if identifier:
        node = db().find(Node, Node.id == identifier)
        export = nodes.one().serialize()
    else:
        all_nodes = db().find(Node)
        export = map(lambda node: node.serialize(), all_nodes)
   
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