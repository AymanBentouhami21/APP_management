from establish_conn import conn

from flask import Flask,render_template,jsonify
#import pandas as pd
#import requests
#from sklearn.svm import SVC
#import pickle

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')
def home():
    template_path = 'home.html'
    return render_template(template_path,name='Home')


if __name__ == '__main__':
    app.run()