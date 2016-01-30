import os
from flask import render_template, send_from_directory, redirect, url_for, flash, session, g, jsonify, request, abort
from functools import wraps
from songshift import app, db, theLoginMgr

from flask.ext.login import login_required, current_user, login_user, logout_user


# @theLoginMgr.user_loader
# def load_user(userid):
#     return User.query.get(userid)


""" -------------------------------------------------------
------------------------------------------------------- """
@app.route('/')
def index():
    navbar = {}


    # call to the API and get some song data
    # song_title = thing()
    song_title = "Got the hello --------------"

    body = {
        "song_title" : song_title,
        "artist" : "Jay Z"
    }

    return render_template('index.html', navbar=navbar, body=body)