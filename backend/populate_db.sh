#!/bin/sh

sqlite3 graph.db < schema.sql
python populate_dummy_data.py