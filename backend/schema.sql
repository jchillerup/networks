DROP TABLE IF EXISTS node;
DROP TABLE IF EXISTS edge;
DROP TABLE IF EXISTS nodeprop;
DROP TABLE IF EXISTS edgeprop;

CREATE TABLE node (
    id INTEGER PRIMARY KEY, 
    identifier TEXT
);

CREATE TABLE edge (
    id INTEGER PRIMARY KEY,
    identifier TEXT,
    origin TEXT,
    confidence REAL,
    source_id INTEGER,
    target_id INTEGER
);

CREATE TABLE edgeprop (
    id INTEGER PRIMARY KEY,
    edge_id INTEGER,
    key TEXT,
    value TEXT
);

CREATE TABLE nodeprop (
    id INTEGER PRIMARY KEY,
    node_id INTEGER,
    key TEXT,
    value TEXT
);