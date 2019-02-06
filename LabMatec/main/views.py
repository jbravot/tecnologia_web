# -*- coding: utf-8 -*-
#
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from pymongo import MongoClient
import simplejson as json
from bson import json_util

#=====================================================#
def connectMongoDb():
    client = MongoClient('localhost', 27017)
    db = client.LabMatecDB
    return db.Data

#=====================================================#
@login_required()
def listaDashboard(request):
    lista = []
    db = connectMongoDb()
    results = db.find()
    for doc in results:
        lista.append(doc)

    return HttpResponse(json.dumps(lista, default=json_util.default), content_type='application/json')