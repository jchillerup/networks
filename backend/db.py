import threading

from storm.locals import create_database, Store

from models import Node, Edge, NodeProperty, EdgeProperty

_dbpool = {}

def db():

    tid = threading.current_thread()

    try:
        return _dbpool[tid]
    except KeyError:
        database = create_database("sqlite:graph.db")
        store = Store(database)
        _dbpool[tid] = store
        return store
