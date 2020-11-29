# -*- coding: utf-8 -*-
import socket
print(socket.gethostbyname(socket.getfqdn(socket.gethostname())))
from flask import Flask, request
import datetime
import os
import sys
import vk_api
import json
import csv
import pandas as pd
from flask import jsonify
import face_recognition
import cv2
from flask_cors import CORS, cross_origin
import numpy as np
import urllib
import shutil

app = Flask(__name__,static_url_path='/static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app = Flask(__name__,static_url_path='/static')

@app.route('/id')
@cross_origin()
def up_id():
    return '''<html>
   <body>
      <form action = "http://192.168.0.125:54321/uploader_id?url=123" method = "POST"
         enctype = "multipart/form-data">
         <input type = "file" name = "file" />
         <input type = "submit"/>
      </form>
   </body>
</html>'''

@app.route('/uploader_id', methods=['GET', 'POST'])
@cross_origin()
def upload_id():
    def auth_handler():
        key = input("Enter authentication code: ")
        remember_device = True
        return key, remember_device

    def users_fr(user_id):
        global token
        response = requests.get(user_id)
        return response.json()['response']['items']

    def users_gr(user_id):
        global token
        response = requests.get()
        return response.json()['response']['items']

    login, password = 'login', 'pass'
    vk_session = vk_api.VkApi(login, password, auth_handler=auth_handler)
    try:
        vk_session.auth(token_only=True)
    except vk_api.AuthError as error_msg:
        print(error_msg)
        return
    vk = vk_session.get_api()
    scr_n = request.args.get("url")[15:]
    print("id=" + scr_n)
    user1 = "None"
    try:
        nam1 = vk.utils.resolveScreenName(screen_name=scr_n)['object_id']
        user1 = vk.users.get(user_id=nam1, fields='photo_400, verified, sex, bdate, city, country, home_town, has_photo, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me, can_be_invited_group')
    except Exception as er:
        print(str(er))
    ############################################################
    if not user1 == "None":
        directory = 'static/faces'
        files = os.listdir(directory) # список всех файлов в папке
        known_face_encodings = []
        known_face_names = []
        for file_name in files:
            print("[Files]: " + file_name)
            known_face_encodings.append(face_recognition.face_encodings(face_recognition.load_image_file("static/faces/" + file_name))[0])
            known_face_names.append(file_name[0:-4])
        face_locations = []
        face_encodings = []
        face_names = []
        in_name = 'img_face_tmp.jpg'
        out_name = 'img_face_in_' + datetime.datetime.now().strftime("%d_%m_%Y_%H_%M_%S") + '.jpg'
        
        in_buff = 'static/tmp/' + out_name
        out_buff = 'static/faces/' + out_name

        resource = urllib.request.urlopen(str(user1[0]['photo_400']))
        out = open(in_buff, 'wb')
        out.write(resource.read())
        out.close()
      
        try:
            frame = cv2.imread(in_buff)
            rgb_small_frame = frame[:, :, ::-1]
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
            face_names = []
            for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]
                else:
                    face_names.append(name)
                    shutil.copy2(in_buff, "static/faces/" + scr_n + ".jpg")
        except Exception as er:
            print("[ERROR]: " + str(er))
        
    return jsonify(user1)
 
@app.route('/face')
@cross_origin()
def up_face():
    return '''<html>
   <body>
      <form action = "http://192.168.0.125:54321/uploader_face" method = "POST"
         enctype = "multipart/form-data">
         <input type = "file" name = "file" />
         <input type = "submit"/>
      </form>
   </body>
</html>'''

@app.route('/uploader_face', methods=['GET', 'POST'])
@cross_origin()
def upload_face():
    directory = 'static/faces'
    files = os.listdir(directory) # список всех файлов в папке
    known_face_encodings = []
    known_face_names = []
    for file_name in files:
        print("[Files]: " + file_name)
        known_face_encodings.append(face_recognition.face_encodings(face_recognition.load_image_file("static/faces/" + file_name))[0])
        known_face_names.append(file_name[0:-4])
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True
    face_in = request.files['file'].read()
    in_name = 'img_face_tmp.jpg'
    out_name = 'img_face_in_' + datetime.datetime.now().strftime("%d_%m_%Y_%H_%M_%S") + '.jpg'
    out = open('static/tmp/' + out_name, 'wb')
    out.write(face_in)
    out.close()
    in_buff = 'static/tmp/' + in_name
    out_buff = 'static/tmp/' + out_name
    try:
        frame = cv2.imread(out_buff)
        rgb_small_frame = frame[:, :, ::-1]
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        face_names = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
            face_names.append(name)
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            cv2.rectangle(frame, (left-1, bottom ), (right+1, bottom + 35), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom + 28), font, 0.8, (255, 255, 255), 1)
        cv2.imwrite(out_buff,frame)
    except Exception as er:
        print("[ERROR]: " + str(er))
    s = name
    return s

import threading
if __name__ == "__main__":
    threading.Thread(target=app.run, kwargs={'host':'0.0.0.0','port':54321}).start()
