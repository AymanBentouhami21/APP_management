USE DATA_BASE;

insert into CATEGORIE(libCat, TarifMO) VALUES('TV',0.2)
insert into CATEGORIE(libCat, TarifMO) VALUES('Laptop',0.2)
insert into CATEGORIE(libCat, TarifMO) VALUES('Telecommande',0.05)

insert into PIECE(DescPiece, PUHT) VALUES('Ecran 20 pouces', 2000)
insert into PIECE(DescPiece, PUHT) VALUES('Cable', 20)
insert into PIECE(DescPiece, PUHT) VALUES('Clavier', 700)


ALTER table Ordrereparation
drop CONSTRAINT
