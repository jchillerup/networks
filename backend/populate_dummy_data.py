#!/bin/env python

from db import *

n1 = store.add(Node())
n1.identifier = u'christianpanton@facebook'

n2 = store.add(Node())
n2.identifier = u'jchillerup@facebook'

n3 = store.add(Node())
n3.identifier = u'randomdude@facebook'

e1 = store.add(Edge())
e1.source = n1
e1.target = n2

e2 = store.add(Edge())
e2.source = n2
e2.target = n1

e3 = store.add(Edge())
e3.source = n1
e3.target = n3

e4 = store.add(Edge())
e4.source = n3
e4.target = n1

e5 = store.add(Edge())
e5.source = n3
e5.target = n2

store.commit()