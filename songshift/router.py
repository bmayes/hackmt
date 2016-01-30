import os
from flask import render_template, send_from_directory, redirect, url_for, flash, session, g, jsonify, request, abort
from functools import wraps
from songshift import app, db, theLoginMgr

from songshift.models.songs import Song

from flask.ext.login import login_required, current_user, login_user, logout_user

import soundcloud
import random
import json
from models.songs import Song
import datetime

# @theLoginMgr.user_loader
# def load_user(userid):
#     return User.query.get(userid)

SC_CLIENT_ID = '8173b8c45f9a7ed733c87095efde5b73'
client = soundcloud.Client(client_id=SC_CLIENT_ID)

""" -------------------------------------------------------
------------------------------------------------------- """


@app.route('/')
def index():
    navbar = {}

    track = getNewTrack()
    # body = {
    #     "song_title" : track.title,
    #     "artist" : track.user['username'],
    #     "artwork_url" : track.artwork_url,
    #     "song_id" : track.id,
    #     "stream_url" : track.stream_url
    # }
    body = {
        "song_title": "",
        "artist": "",
        "artwork_url": ""
    }

    return render_template('index.html', navbar=navbar, body=body)


def getNewTrack():
    # client id provided by soundcloud


    SEARCH_AHEAD = None  # num of items to preload
    suggestion_threshold = 80  # percent of loads that are liked genres

    valid_track_types = 'original, remix, recording, live'
    users_tags = "rock, electronic"

    rand = random.randint(0, 100);
    if rand <= suggestion_threshold:  # differs from user's likes
        tracks = client.get('/tracks',
                            limit=SEARCH_AHEAD,
                            order='playback_count',
                            types=valid_track_types)
    else:
        tracks = client.get('/tracks',
                            limit=SEARCH_AHEAD,
                            order='playback_count',
                            types=valid_track_types,
                            genre=users_tags)

    rand_track = random.choice(tracks)

    if not rand_track:
        getNewTrack()

    if not validTrack(rand_track):
        getNewTrack()

    return rand_track


def validTrack(track):

    tag_count = len(track.tag_list.split(' '))
    if tag_count <= 1: return False
    print tag_count
    # if int(track.playback_count) < 50: return False
    # if track.streamable == 'false': return False
    # if int(track.release_year) <= (int(datetime.date.year) - 5): return False
    # duration must be longer than minute but shorter than 6 minutes
    # if track.duration > 1000 & track.duration <= 6000: return False

    return True

@app.route('/newsong', methods=['GET'])
def loadSong():
    track = getNewTrack()
    track_dict = {
        "song_title": track.title,
        "artist": track.user['username'],
        "artwork_url": track.artwork_url,
        "song_id": track.id,
        "stream_url": track.stream_url,
        "play_count": track.playback_count
    }

    return json.dumps(track_dict)


@app.route('/vote', methods=['GET'])
def voteSong():

    vote = None
    if request.args['like'] == 'true':
        vote = 1
    elif request.args['like'] == 'false':
        vote = -1
    else:
        vote = 0

    song_id = int(request.args['song_id'])
    tracks = client.get('/tracks/%d' % song_id)

    for tag in tracks.tag_list.split(' '):
        song = Song(
            songid=song_id,
            genre=tag.strip(),
            affinity=vote
        )
        db.session.add(song)

    db.session.commit()

    return ""

# @app.route('/songpage', methods=['GET'])
# def fetchSongPage():
#     song_id = request.form['song_id']
