from storm.locals import create_database, Store

from models import Node, Edge, NodeProperty, EdgeProperty

database = create_database("sqlite:graph.db")
store = Store(database)