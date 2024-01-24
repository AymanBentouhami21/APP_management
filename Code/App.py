
import pyodbc
from flask import Flask,render_template,jsonify, request
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


@app.route('/insertOrder', methods=['POST'])
def insertOrder():
    conn_str = (
    r'Driver={SQL Server};'
    r'Server=DESKTOP-A4UCBC2;'
    r'Database=DATA_BASE;'
    r'Trusted_Connection=yes;'
    )
    conn = pyodbc.connect(conn_str)

    try:
        dataToSend = request.json
        try:
            dataToSend['NBHeuresMOValue'] = float(dataToSend['NBHeuresMOValue'])
        except:
            return "NBHeuresMOValue should be a float"
        try:
            dataToSend['IDOrdre'] = int(dataToSend['IDOrdre'])
        except:
            return "IDOrdre should be a digit"
        try:
            cursor = conn.cursor()
            cursor.execute("USE DATA_BASE")
            query = f"INSERT INTO ORDREREPARATION(DiagnosticPanne, NbHeuresMO, IDApp) Values ('{dataToSend['diagnosticPanne']}',{dataToSend['NBHeuresMOValue']},{dataToSend['IDOrdre']})"
            print(query)
            cursor.execute(query)
            cursor.commit()
        except Exception as e:
            return e

    except:
        print("error")

    
    return "Ordre inserted succesfully"
        

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)