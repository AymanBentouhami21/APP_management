USE DATA_BASE;

insert into CATEGORIE(libCat, TarifMO) VALUES('TV',0.2)
insert into CATEGORIE(libCat, TarifMO) VALUES('Laptop',0.2)
insert into CATEGORIE(libCat, TarifMO) VALUES('Telecommande',0.05)

insert into PIECE(DescPiece, PUHT) VALUES('Ecran 20 pouces', 2000)
insert into PIECE(DescPiece, PUHT) VALUES('Cable', 20)
insert into PIECE(DescPiece, PUHT) VALUES('Clavier', 700)




insert into cliente(NomCli,AdrCli,VilleCli) values('nom1','addr1','ville1')
insert into cliente(NomCli,AdrCli,VilleCli) values('nom2','addr2','ville2')
insert into cliente(NomCli,AdrCli,VilleCli) values('nom3','addr3','ville3')


insert into ORDREREPARATION(DiagnosticPanne,NbHeuresMO,IDApp) values ('problem1',1,1)
insert into ORDREREPARATION(DiagnosticPanne,NbHeuresMO,IDApp) values ('problem2',2,2)
insert into ORDREREPARATION(DiagnosticPanne,NbHeuresMO,IDApp) values ('problem3',3,3)


insert into PIECESACHANGER(IDOrdre,Quantité) values(1002,0)
insert into PIECESACHANGER(IDOrdre,Quantité) values(1003,0)
insert into PIECESACHANGER(IDOrdre,Quantité) values(1004,1)
insert into PIECESACHANGER(IDOrdre,Quantité) values(1005,2)

SELECT * FROM ORDREREPARATION

SELECT PIECE.PUHT * PIECESACHANGER.Quantité AS Facture
FROM PIECE
JOIN PIECESACHANGER ON PIECE.IDPiece = PIECESACHANGER.IDPiece
WHERE PIECESACHANGER.IDOrdre = 1004;
