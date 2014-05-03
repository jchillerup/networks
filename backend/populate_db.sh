#!/bin/sh

sqlite3 graph.db < schema.sql
python2 populate_dummy_data.py
