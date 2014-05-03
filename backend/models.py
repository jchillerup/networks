from storm.locals import *

class Node(Storm):
    __storm_table__ = "node"
    id = Int(primary=True)
    identifier = Unicode()
    properties = ReferenceSet(id, "NodeProperty.node_id")
    inbound = ReferenceSet(id, "Edge.target_id")
    outbound = ReferenceSet(id, "Edge.source_id")

    def __repr__(self):
        return "<node: %s>" % self.identifier

    def serialize(self):
        obj = {
            "id": self.id,
            "identifier": self.identifier,
            "properties": _key_value(self.properties)
        }
        return obj


class NodeProperty(Storm):
    __storm_table__ = "nodeprop"
    id = Int(primary=True)
    node_id = Int()
    key = Unicode()
    value = Unicode()
    node = Reference(node_id, "Node.id")

class Edge(Storm):
    __storm_table__ = "edge"
    id = Int(primary=True)
    origin = Unicode()
    confidence = Float()
    source_id = Int()
    target_id = Int()
    source = Reference(source_id, "Node.id")
    target = Reference(target_id, "Node.id")
    properties = ReferenceSet(id, "EdgeProperty.edge_id")

    def __repr__(self):
        return "<edge: %s (%s) %s>" % (self.source.identifier, self.target.identifier)

    def serialize(self):
        obj = {
            "id": self.id,
            "confidence": self.confidence,
            "origin": self.origin,
            "source": self.source.identifier,
            "target": self.target.identifier,
            "properties": _key_value(self.properties)
        }
        return obj

class EdgeProperty(Storm):
    __storm_table__ = "edgeprop"
    id = Int(primary=True)
    edge_id = Int()
    key = Unicode()
    value = Unicode()
    edge = Reference(edge_id, "Edge.id")

def _key_value(propobj):
    kv = {}
    for obj in propobj:
        kv[obj.key] = obj.value
    return kv