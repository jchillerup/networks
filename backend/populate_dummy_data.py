#!/bin/env python

from db import *

n1 = db().add(Node())
n1.identifier = u'christianpanton@facebook'

n2 = db().add(Node())
n2.identifier = u'jchillerup@facebook'

n3 = db().add(Node())
n3.identifier = u'randomdude@facebook'

e = db().add(Edge())
e.source = n1
e.target = n2
e.origin = u"facebook"

e = db().add(Edge())
e.source = n2
e.target = n1
e.origin = u"facebook"


e = db().add(Edge())
e.source = n1
e.target = n3
e.origin = u"facebook"


e = db().add(Edge())
e.source = n3
e.target = n1
e.origin = u"facebook"

e.source = n3
e.target = n2
e.origin = u"facebook"

db().commit()