#!/bin/env python

from db import *

all_nodes = db().find(Node)
all_edges = db().find(Edge)

import pprint 
pprint.pprint(map(lambda node: node.serialize(), all_nodes))
pprint.pprint(map(lambda edge: edge.serialize(), all_edges))