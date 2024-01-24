CREATE DATABASE DATA_BASE;

USE DATA_BASE;

create table CLIENTE (
    IDCli int IDENTITY,
    NomCli varchar(50),
    AdrCli VARCHAR(50),
    VilleCli varchar(50)
    );
alter TABLE cliente
add CONSTRAINT PK_cliente primary key (IDCli)

create table  CATEGORIE (
    IDCat int IDENTITY,
    libCat varchar(50),
    TarifMO decimal(2,2)
    ) ;
alter table CATEGORIE
add CONSTRAINT PK_categorie PRIMARY key (IDCat)

CREATE table APPAREIL (
    IDApp int IDENTITY,
    DescApp VARCHAR(100),
    RefConstApp VARCHAR(100),
    MarqueApp varchar(100),
    IDCli int,
    IDCat int
    )
alter table APPAREIL
add CONSTRAINT PK_appareil primary key(IDApp)

    
CREATE TABLE PIECE (
    IDPiece int IDENTITY,
    DescPiece VARCHAR(100),
    PUHT FLOAT
    ) 
alter table PIECE
add CONSTRAINT PK_piece primary key(IDPiece)

CREATE TABLE ORDREREPARATION (
    IDOrdre int IDENTITY,
    DiagnosticPanne varchar(100),
    NbHeuresMO FLOAT,
    IDApp int
    )   
alter table ORDREREPARATION
add CONSTRAINT pk_ordrereparation PRIMARY key(IDOrdre)

CREATE TABLE  PIECESACHANGER (
    IDPiece int IDENTITY,
    IDOrdre int ,
    Quantité int 
    )
alter table PIECESACHANGER
add CONSTRAINT PK_PIECESACHANGER PRIMARY KEY(IDPiece);

alter table PIECESACHANGER
add constraint fk_pieceachanger_ordrereparation 
FOREIGN key (IDOrdre) 
REFERENCES ORDREREPARATION(IDOrdre)



