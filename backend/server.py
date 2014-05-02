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

@app.route('/graph')
def graph_index():

    export = {
        "nodes": [],
        "edges": []
    }

    all_nodes = store.find(Node)

    for node in all_nodes:
        export["nodes"].append({
            "id": node.identifier,
            "label": node.identifier,
            "x": random(),
            "y": random(),
            "size": 1,
            "color": '#008'
        })

    all_edges = store.find(Edge)

    for edge in all_edges:
        export["edges"].append({
            "id": "edge-%d" % edge.id,
            "source": edge.source.identifier,
            "target": edge.target.identifier,
            "size": random(),
            "color": '#444'
        })

    return json.dumps(export)


@app.route('/graph/add', methods=["POST"])
def graph_add():
    print "Got", request.form
    return 'Hello, JC'

if __name__ == '__main__':
    app.run()