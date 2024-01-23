CREATE DATABASE DATA_BASE;

USE DATA_BASE;

create table CLIENTE (
    IDCli int primary key IDENTITY,
    NomCli varchar(50),
    AdrCli VARCHAR(50),
    VilleCli varchar(50)
    );

create table  CATEGORIE (
    IDCat int primary key IDENTITY,
    libCat varchar(50),
    TarifMO decimal(2,2)
    ) ;

CREATE table APPAREIL (
    IDApp int primary key IDENTITY,
    DescApp VARCHAR(100),
    RefConstApp VARCHAR(100),
    MarqueApp varchar(100),
    IDCli int FOREIGN key REFERENCES CLIENTE(IDCli),
    IDCat int FOREIGN key REFERENCES CATEGORIE(IDCat)
    )
    
CREATE TABLE PIECE (
    IDPiece int primary key IDENTITY,
    DescPiece VARCHAR(100),
    PUHT FLOAT
    ) 

CREATE TABLE ORDREREPARATION (
    IDOrdre int primary key IDENTITY,
    DiagnosticPanne varchar(100),
    NbHeuresMO FLOAT,
    IDApp int FOREIGN key REFERENCES APPAREIL(IDApp)
    )   

CREATE TABLE  PIECESACHANGER (
    IDPiece int primary key IDENTITY,
    IDOrdre int FOREIGN key REFERENCES ORDREREPARATION(IDOrdre) ,
    Quantité int )

