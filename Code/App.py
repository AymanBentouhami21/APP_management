
import pyodbc
from flask import Flask,render_template,jsonify, request
#import pandas as pd
#import requests
#from sklearn.svm import SVC
#import pickle

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

def establish_conn():
    conn_str = (
    r'Driver={SQL Server};'
    r'Server=DESKTOP-A4UCBC2;'
    r'Database=DATA_BASE;'
    r'Trusted_Connection=yes;'
    )
    conn = pyodbc.connect(conn_str)
    conn.execute("USE DATA_BASE")
    return conn

@app.route('/')
def home():
    template_path = 'home.html'
    return render_template(template_path,name='Home')


@app.route('/insertOrder', methods=['POST'])
def insertOrder():
    
    conn = establish_conn()
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

    conn.close()
    return "Ordre inserted succesfully"
        

@app.route('/chercherClient')
def chercherClient():
    nom = request.args.get('Nom')
    print(nom)
    conn = establish_conn()

    querystmt = f"SELECT * from CLIENTE WHERE NOMCli LIKE ?"
    result = conn.execute(querystmt, (nom,))
    rows = result.fetchall()
    for row in rows :
        print(row)
    client_list = [{"IDCli":row[0],"NomCli":row[1],"adrCli":row[2],"VilleCli":row[3]} for row in rows]
    
    conn.close()

    return jsonify(client_list)

@app.route('/chercherPieces')
def chercherPieces():
    puht = request.args.get('PUHT')
    print('#################')
    print(puht)
    conn = establish_conn()
    querystmt = f"SELECT * FROM PIECE WHERE PUHT >= ?"
    result = conn.execute(querystmt,(puht,))
    rows = result.fetchall()
    piece_list = [{"IDPiece":row[0], "DescPiece":row[1], "PUHT":row[2]} for row in rows]

    conn.close()
    return jsonify(piece_list)

@app.route('/chercherOrdreDeReparation')
def chercherOrdreDeReparation():
    quantity = request.args.get('quantity')
    print(quantity)
    conn = establish_conn()
    querystmt = f"SELECT * FROM ORDREREPARATION WHERE IDOrdre in (SELECT IDOrdre from PIECESACHANGER WHERE Quantité = ?)"
    result = conn.execute(querystmt,(quantity,))
    rows = result.fetchall()
    ordre_list = [{"IDOrdre":row[0], "DiagnosticPanne":row[1], "NbHeuresMO":row[2], "IDApp":row[3]} for row in rows]
    conn.close()

    return jsonify(ordre_list)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)