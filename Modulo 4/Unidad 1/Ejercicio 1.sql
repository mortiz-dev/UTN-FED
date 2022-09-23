CREATE DATABASE ejercicio

CREATE TABLE empleados(
    id_emp INT IDENTITY,
    nombre NVARCHAR(50),
    apellido NVARCHAR(50),
    trabajo NVARCHAR(100),
    edad INT,
    salario DECIMAL(26,2),
    mail NVARCHAR(50)
)
