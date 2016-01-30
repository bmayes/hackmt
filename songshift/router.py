import os
from flask import render_template, send_from_directory, redirect, url_for, flash, session, g, jsonify, request, abort
from functools import wraps
from songshift import app, db, theLoginMgr

from flask.ext.login import login_required, current_user, login_user, logout_user

import soundcloud


# @theLoginMgr.user_loader
# def load_user(userid):
#     return User.query.get(userid)


""" -------------------------------------------------------
------------------------------------------------------- """
@app.route('/')
def index():

    # client id provided by soundcloud
    SC_CLIENT_ID = '8173b8c45f9a7ed733c87095efde5b73'

    navbar = {}


    client = soundcloud.Client(client_id=SC_CLIENT_ID)

    # call to the API and get some song data
    # song_title = thing()
    song_title = "Got the hello --------------"

    body = {
        "song_title" : song_title,
        "artist" : "Jay Z"
    }

    return render_template('index.html', navbar=navbar, body=body)