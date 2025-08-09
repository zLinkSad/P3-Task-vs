CREATE DATABASE B2B_Quotation_Db

use B2B_Quotation_Db

CREATE TABLE Usersss
(
	Id int IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(255),
	UserName VARCHAR(255),
	Password VARCHAR(255),
)

CREATE TABLE Clients
(
	Id INT PRIMARY KEY,
	Name VARCHAR(255),
	LastName VARCHAR(255),
	DNI VARCHAR(11),
)


--for products lock just make a select to this table
CREATE TABLE Products
(
	Id INT PRIMARY KEY,
	Namee VARCHAR(255),
	Price DECIMAL(10,2),
	Description VARCHAR(255)
)

SELECT name 
FROM sys.key_constraints 
WHERE type = 'PK' AND parent_object_id = OBJECT_ID('Products');


ALTER TABLE Products DROP CONSTRAINT PK__Products__3214EC079DD7CE66 --delete constraint PK for a Column

ALTER TABLE Products DROP COLUMN Id -- delete column (it has not PK now)

ALTER TABLE Products ADD Id VARCHAR(10) -- adding new column


ALTER TABLE Products ALTER COLUMN Id VARCHAR(10) NOT NULL --asign that column not null allowed

ALTER TABLE Products ADD CONSTRAINT PK_Products PRIMARY KEY(Id) --assign new PK to new column



ALTER TABLE Products DROP CONSTRAINT FK__Products__Client__3B75D760 --remove FK constraint

ALTER TABLE Products DROP COLUMN ClientId; --DELETE FK reference Columns


select * from Products


--check port & host

use master
go
xp_readerrorlog 0,1, N'SERVER IS LISTENING ON'
go

/*
--verify user sql exist on system
SELECT name, type_desc FROM sys.sql_logins WHERE name = 'SE';

--verify if user has permission
USE B2B_Quotation_Db;
SELECT name, type_desc FROM sys.database_principals WHERE name = 'SE';

--add user SQL allow for db
USE B2B_Quotation_Db;
CREATE USER SE FOR LOGIN SE;
ALTER ROLE db_owner ADD MEMBER SE; */


--historial login failed & why?
EXEC xp_readerrorlog 0,1, N'Login failed'


INSERT INTO Products VALUES (1, 'laptop', 12.00, 'laptop gamer', 1)

INSERT INTO Clients VALUES (1, 'darlyn', 'olivo', '00115121006')

select * from Usersss


