import os
from flask import render_template, send_from_directory, redirect, url_for, flash, session, g, jsonify, request, abort
from functools import wraps
from songshift import app, db, theLoginMgr

from songshift.models.songs import Song

from flask.ext.login import login_required, current_user, login_user, logout_user


# @theLoginMgr.user_loader
# def load_user(userid):
#     return User.query.get(userid)


""" -------------------------------------------------------
------------------------------------------------------- """
@app.route('/')
def index():
    navbar = {}
    body = {}
    return render_template('index.html', navbar=navbar, body=body)