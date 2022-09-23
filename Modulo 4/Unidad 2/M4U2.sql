-- 1

SELECT nombre, trabajo
FROM empleados

-- 2

SELECT nombre, edad
FROM empleados

-- 3

SELECT nombre, edad
FROM empleados
WHERE trabajo LIKE ('Programador%')

-- 4

SELECT *
FROM empleados
WHERE edad > 30

-- 5

SELECT apellido, mail
FROM empleados
WHERE nombre LIKE('%Juan%')

-- 6

SELECT nombre
FROM empleados
WHERE trabajo IN('Desarrollador Web', 'Programador')

-- 7

SELECT id_emp, nombre, apellido, trabajo
FROM empleados
WHERE id_emp >= 15 AND id_emp <= 20

-- 8

SELECT *
FROM empleados
WHERE trabajo LIKE('Programador%') AND salario < 80000

-- 9

SELECT *
FROM empleados
WHERE trabajo LIKE('Programador%') AND salario >= 75000 AND salario <= 90000

-- 10

SELECT *
FROM empleados
WHERE apellido LIKE('S%')

-- 11

SELECT *
FROM empleados
WHERE nombre LIKE('%l')

-- 12

INSERT INTO empleados(nombre, apellido, trabajo, edad, salario, mail) 
VALUES ('Francisco', 'Perez', 'Programador', 26, 90000, 'francisco@bignet.com')

-- 13

DELETE
FROM empleados
WHERE nombre = 'Hernan' AND apellido = 'Rosso'

-- 14

UPDATE empleados
SET salario = 90000
WHERE nombre = 'Daniel' AND apellido = 'Gutierrez'