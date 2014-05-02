#!/bin/env python

from db import *

all_nodes = store.find(Edge)
print list(all_nodes)