#!/bin/env python

from flask import Flask, request, redirect, url_for
from flask.ext.socketio import SocketIO, emit

from db import *

app = Flask(__name__)
#app.config['SECRET_KEY'] = 'secret!'
#socketio = SocketIO(app)

@app.route('/')
def index():
    return redirect(url_for('static', filename="index.html"))

# /graph
import graph
app.register_blueprint(graph.mod)

# /analysis
import analysis
app.register_blueprint(analysis.mod)

if __name__ == '__main__':
    #socketio.run(app)
    app.run(debug=True)