# Delete Columns of a Table

```sql
ALTER TABLE dbo.Employee
DROP COLUMN Address, Phone, Email;
```

# Rename Table

```sql
EXEC sp_rename 'Employee', 'Consultant';
```

# Find Year

```
SELECT DATEDIFF(yy, '1995-12-31', '2024-08-20') AS DaysBetween;
```

## Update Multiple Columns

```sql
UPDATE Employee
SET Email = 'jb007@test.com', Phone = '111.111.0007', HireDate='05-23-2001'
WHERE EmployeeID = 3;
```

# GROUP BY

```sql
SELECT DeptId, COUNT(EmpId) as 'Number of Employees' 
FROM Employee
GROUP BY DeptId;

--following query will return same data as above
SELECT DeptId, COUNT(*) as 'No of Employees' 
FROM Employee
GROUP BY DeptId;
```

## Create a Primary Key in an Existing Table

```sql
ALTER TABLE Employee
ADD CONSTRAINT PK_Employee_EmployeeID PRIMARY KEY (EmployeeID)
```

# Delete a Primary Key

```sql
ALTER TABLE Employee 
DROP CONSTRAINT PK_Employee_EmployeeID;   
```

# Create a Foreign Key

```sql
CREATE TABLE Employee(
EmployeeID int IDENTITY (1,1) NOT NULL,
FirstName nvarchar (50) NOT NULL,
LastName nvarchar (50) NOT NULL,
DepartmentID int NULL, 
CONSTRAINT PK_EmployeeID PRIMARY KEY (EmployeeID), 
CONSTRAINT FK_Employee_Department FOREIGN KEY (DepartmentID)
REFERENCES Department (DepartmentID)
ON DELETE CASCADE
ON UPDATE CASCADE)
```

# Delete a Foreign Key

```sql
ALTER TABLE Employee   
DROP CONSTRAINT FK_Employee_Department
```

# Explain indexing in a database.

Classic example **"Index in Books"**

# PROCEDURE

CREATE PROCEDURE sales_employees

AS

BEGIN
SELECT name, salary
FROM employees
WHERE department = 'Sales';

END

# friend salary

SELECT St.Name
FROM Students St
JOIN Friends Fr
ON St.ID=Fr.ID
JOIN Packages P1
ON P1.ID= Fr.ID
JOIN Packages P2
ON P2.ID=Fr.Friend_ID
WHERE P2.Salary>P1.Salary
ORDER BY P2.Salary;

# CURSOR

```sql
DECLARE 
    @product_name VARCHAR(MAX), 
    @list_price   DECIMAL;

DECLARE cursor_product CURSOR
FOR SELECT 
        product_name, 
        list_price
    FROM 
        production.products;

OPEN cursor_product;

FETCH NEXT FROM cursor_product INTO 
    @product_name, 
    @list_price;

WHILE @@FETCH_STATUS = 0
    BEGIN
        PRINT @product_name + CAST(@list_price AS varchar);
        FETCH NEXT FROM cursor_product INTO 
            @product_name, 
            @list_price;
    END;

CLOSE cursor_product;

DEALLOCATE cursor_product;


```

## Explain window functions (RANK, ROW_NUMBER, DENSE_RANK, LEAD, LAG)

```sql
-- Sample: Top performers per department
SELECT e.*, 
       ROW_NUMBER() OVER (PARTITION BY DeptId ORDER BY Salary DESC)     AS rn,
       RANK()       OVER (PARTITION BY DeptId ORDER BY Salary DESC)     AS rnk,
       DENSE_RANK() OVER (PARTITION BY DeptId ORDER BY Salary DESC)     AS drnk,
       LAG(Salary)  OVER (PARTITION BY DeptId ORDER BY Salary DESC)     AS prev_salary,
       LEAD(Salary) OVER (PARTITION BY DeptId ORDER BY Salary DESC)     AS next_salary
FROM Employee e;
```

## Difference between TRUNCATE and DELETE

- TRUNCATE: DDL, deallocates pages, resets identity, no WHERE, faster, minimally logged.
- DELETE: DML, row-by-row, supports WHERE, fully logged, can fire triggers.

```sql
TRUNCATE TABLE Employee;        -- remove all rows, reset identity
DELETE FROM Employee WHERE IsTemp = 1;
```

## Difference between DML, DDL and DCL

- DML: Data manipulation (SELECT, INSERT, UPDATE, DELETE)
- DDL: Data definition (CREATE, ALTER, DROP, TRUNCATE)
- DCL: Data control (GRANT, REVOKE, DENY)

## Which is faster between CTE and Subquery?

Neither is inherently faster; both expand to equivalent plans. Performance depends on query, indexes, predicates. CTE improves readability and reusability.

## What are constraints and types of constraints?

Integrity rules on columns/tables: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, DEFAULT, NOT NULL.

```sql
ALTER TABLE Employee ADD CONSTRAINT CK_Salary CHECK (Salary >= 0);
```

## Different types of operators

Arithmetic (+,-,*,/,%), Comparison (=, <>, >, <, >=, <=), Logical (AND, OR, NOT), Bitwise (&, |, ^), String (+ in some DBs), LIKE/IN/BETWEEN.

## Difference between GROUP BY and WHERE clause

- WHERE filters rows before grouping.
- GROUP BY aggregates rows; use HAVING to filter groups.

```sql
SELECT DeptId, COUNT(*)
FROM Employee
WHERE Active = 1
GROUP BY DeptId
HAVING COUNT(*) > 5;
```

## Explain View concepts

Views are stored SELECTs. Simplify access, encapsulate logic, restrict columns. Indexed views (SQL Server) can materialize results with restrictions.

```sql
CREATE VIEW vw_ActiveEmployees AS
SELECT EmpId, Name, DeptId FROM Employee WHERE Active = 1;
```

## Types of constraints (summary)

- PRIMARY KEY: uniqueness + not null.
- FOREIGN KEY: referential integrity.
- UNIQUE: uniqueness (allows one NULL per column in some DBs).
- CHECK: custom predicate.
- DEFAULT: default value.
- NOT NULL: disallow NULLs.

## Types of relationships in SQL

One-to-One, One-to-Many, Many-to-Many (via junction table).

```sql
-- Many-to-many via junction
CREATE TABLE StudentCourse(
  StudentId int REFERENCES Student(StudentId),
  CourseId  int REFERENCES Course(CourseId),
  CONSTRAINT PK_SC PRIMARY KEY(StudentId, CourseId)
);
```

## Difference between WHERE and HAVING

WHERE filters rows; HAVING filters after aggregation/groups.

```sql
SELECT DeptId, SUM(Salary) AS Total
FROM Employee
GROUP BY DeptId
HAVING SUM(Salary) > 100000;
```

## Difference between Function and Stored Procedure

- Function: returns value/table, no side-effects (generally), can be used in SELECT, no explicit transaction control.
- Procedure: may return 0..n result sets/outputs, can perform DML, transactions, error handling.

## How to optimize a slow SQL query

- Add appropriate indexes; cover predicates and joins.
- Review execution plan; fix scans/hot spots.
- Reduce row counts early (WHERE), avoid SELECT *.
- Rewrite with set-based ops; consider proper JOINs and SARGable predicates.
- Update statistics; consider indexing includes.

## How to handle duplicate rows

```sql
-- Find duplicates by keys
SELECT Col1, Col2, COUNT(*)
FROM T
GROUP BY Col1, Col2
HAVING COUNT(*) > 1;

-- Delete duplicates keeping one (SQL Server example)
WITH cte AS (
  SELECT *, ROW_NUMBER() OVER(PARTITION BY Col1, Col2 ORDER BY (SELECT 1)) AS rn
  FROM T
)
DELETE FROM cte WHERE rn > 1;
```

## Top 3 departments with highest average salary

```sql
SELECT TOP 3 DeptId, AVG(Salary) AS AvgSalary
FROM Employee
GROUP BY DeptId
ORDER BY AvgSalary DESC;
```

## Employees with same name in same department

```sql
SELECT Name, DeptId, COUNT(*)
FROM Employee
GROUP BY Name, DeptId
HAVING COUNT(*) > 1;
```

## Departments with no employees

```sql
SELECT d.DeptId, d.Name
FROM Department d
LEFT JOIN Employee e ON e.DeptId = d.DeptId
WHERE e.DeptId IS NULL;
```

## How to use indexing to improve performance

- Create nonclustered indexes on join/filter columns (e.g., Employee(DeptId), include needed columns).
- Use covering indexes to avoid lookups.
- Avoid functions on indexed columns in predicates.

## Employees who have worked for more than 5 years

```sql
SELECT *
FROM Employee
WHERE DATEDIFF(year, HireDate, GETDATE()) > 5;
```

## Difference between SUBQUERY and JOIN

- JOIN: combine rows from multiple tables side-by-side; generally clearer for relational retrieval.
- SUBQUERY: nested SELECT; good for existence checks, scalar lookups. Performance depends on plan; often interchangeable.

## Top 2 products with highest sales

```sql
SELECT TOP 2 p.ProductId, SUM(oi.Quantity * oi.Price) AS Sales
FROM OrderItems oi
JOIN Product p ON p.ProductId = oi.ProductId
GROUP BY p.ProductId
ORDER BY Sales DESC;
```

## Customers who placed an order but not paid

```sql
SELECT DISTINCT c.CustomerId, c.Name
FROM Customer c
JOIN [Order] o ON o.CustomerId = c.CustomerId
LEFT JOIN Payment pay ON pay.OrderId = o.OrderId
WHERE pay.OrderId IS NULL;
```
