import os
from flask import render_template, send_from_directory, redirect, url_for, flash, session, g, jsonify, request, abort
from functools import wraps

from requests import models

from songshift import app, db, theLoginMgr

from songshift.models.songs import Song

from flask.ext.login import login_required, current_user, login_user, logout_user

import soundcloud
import random
import json
from models.songs import Song
from datetime import date
import re
import operator
import math

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


def getNewTrack(next_href='/tracks'):
    # client id provided by soundcloud
    if next_href == '':
        next_href = '/tracks'

    SEARCH_AHEAD = 100  # num of items to preload
    suggestion_threshold = 60  # percent of loads that are liked genres

    valid_track_types = 'original, remix'
    users_tags = getTagList()

    tracks = client.get(next_href,
                        limit=SEARCH_AHEAD,
                        order='created_at',
                        types=valid_track_types,
                        tag_list=users_tags,
                        linked_partitioning=1)

    need_track = True
    while need_track:
        try:
            tracks = client.get(tracks.next_href,
                                limit=SEARCH_AHEAD,
                                order='created_at',
                                types=valid_track_types,
                                genre=users_tags,
                                linked_partitioning=1)
            valid_tracks = []
            for track in tracks.collection:
                if validTrack(track):
                    valid_tracks.append(track)
            if valid_tracks:
                track = random.choice(valid_tracks)
                need_track = False

        except Exception:
            pass

    if not track:
        getNewTrack()

    # if not validTrack(rand_track):
    #     getNewTrack()

    return track, tracks.next_href


def validTrack(track):
    # tag_count = len(track.tag_list.split(' '))
    # if tag_count <= 1: return False
    # if int(track.duration) > 6000 or int(track.duration) < 1000:
    #     return False
    if int(track.playback_count) < 50 or track.streamable == 'false':
        return False

    return True


@app.route('/newsong', methods=['GET'])
def loadSong():
    track, next_href = getNewTrack(request.args['next_href'])

    # fetch track to stream
    track1 = client.get('/tracks/%d' % track.id)
    # get the tracks streaming URL
    stream_url = client.get(track1.stream_url, allow_redirects=False)

    track_dict = {
        "tags": track.tag_list,
        "next_href": next_href,
        "song_title": track.title,
        "artist": track.user['username'],
        "artwork_url": track.artwork_url,
        "song_id": track.id,
        "stream_url": stream_url.location,
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

    excludes = ['soundcloud']

    for tag in tracks.tag_list.split(' '):
        tag = re.sub('[^A-Za-z]+', '', tag)
        if not tag or tag == '': break
        if tag in excludes:
            break
        tag = tag.lower()

        song = Song(
            songid=song_id,
            genre=tag.strip(),
            affinity=vote
        )
        db.session.add(song)

    db.session.commit()

    return ""


def getTagList():
    alphalist = Song.query.order_by(Song.genre).all()

    genre_count = 3
    SUGGESTION_THRESHOLD = 80
    scores = {}

    for tag in alphalist:
        if not tag.genre in scores:
            scores[tag.genre] = tag.affinity
        else:
            scores[tag.genre] += tag.affinity

    sorted_scores = sorted(scores.items(), key=operator.itemgetter(1), reverse=True)
    total_points = 0
    for score in sorted_scores:
        print score
        if score[1] > 0:
            # score[1] = math.floor(math.log(score[1], 3))
            total_points += score[1]

    genre_list = ""
    while len(genre_list) <= genre_count:
        rand_suggestions = random.randint(0,100)
        if rand_suggestions >= SUGGESTION_THRESHOLD:
            continue

        rand_index = random.randint(0, total_points)
        for score in sorted_scores:
            rand_index -= score[1]
            if rand_index <= 0:
                genre = score[0]
                break
        if not genre in genre_list:
            genre_list += genre + ', '

    return genre_list
