import pyodbc

conn_str = (
    r'Driver={SQL Server};'
    r'Server=DESKTOP-A4UCBC2;'
    r'Database=DATA_BASE;'
    r'Trusted_Connection=yes;'
)

conn = pyodbc.connect(conn_str)
print("connection:" + str(conn))
