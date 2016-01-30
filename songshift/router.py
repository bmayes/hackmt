import os
from flask import render_template, send_from_directory, redirect, url_for, flash, session, g, jsonify, request, abort
from functools import wraps
from songshift import app, db, theLoginMgr

from songshift.models.songs import Song

from flask.ext.login import login_required, current_user, login_user, logout_user

# import soundcloud
import random


# @theLoginMgr.user_loader
# def load_user(userid):
#     return User.query.get(userid)


""" -------------------------------------------------------
------------------------------------------------------- """
@app.route('/')
def index():
    navbar = {}




    track = getNewTrack()
    body = {
        "song_title" : track.title,
        "artist" : track.user['username'],
        "artwork_url" : track.artwork_url,
        "song_id" : track.id
    }

    return render_template('index.html', navbar=navbar, body=body)


def getNewTrack():

    # client id provided by soundcloud
    SC_CLIENT_ID = '8173b8c45f9a7ed733c87095efde5b73'

    SEARCH_AHEAD = 100 #num of items to preload
    valid_track_types = 'original, remix, recording, live'
    users_genres = "rock, electronic"

    client = soundcloud.Client(client_id=SC_CLIENT_ID)

    # fetch random track
    # track_id = random.randint(100,1000)
    # track = client.get('/tracks/%d' % track_id)

    tracks = client.get('/tracks',
                        limit=SEARCH_AHEAD,
                        types=valid_track_types,
                        genre=users_genres)

    rand_num = random.randint(0, SEARCH_AHEAD-1)
    rand_track = tracks[rand_num]

    return rand_track