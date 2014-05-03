#!/bin/env python

from flask import Flask, request, redirect, url_for
from db import *


app = Flask(__name__)


@app.route('/')
def index():
    return redirect(url_for('static', filename="index.html"))


# /graph
import endpoint_graph
app.register_blueprint(endpoint_graph.mod)

if __name__ == '__main__':
    app.run(debug=True)