#!/bin/env python

import json

from flask import Blueprint, request
from db import *

mod = Blueprint("analysis", __name__, url_prefix="/analysis")

""" NODES """

@mod.route('/ndegrees/<string:identifier>/<int:degrees>', methods=["GET"])
def read_nodes(identifier, degrees):
    
    node = db().find(Node, Node.identifier == identifier).one()

    for inbound in node.inbound:
        print inbound

    for outbound in node.outbound:
        print outbound
    

    return ""