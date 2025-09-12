# Table Join

```
select first_name,item from Customers
join Orders where Customers.customer_id==Orders.customer_id
```

# Second highest age

SELECT DISTINCT AGE

FROM Customers

ORDER BY AGE DESC

OFFSET 1ROWS

FETCHNEXT1ROWS ONLY

++++++++++++++++++++++++++++++++++++++++

 SELECT TOP1 AGE FROM (

 SELECT  TOP2  AGE FROM Customers ORDER BY AGE DESC

 ) AS INNERQUERY ORDER BY AGE ASC

---

EmpId   Name   ManagerId

1 John 3

2 Naresh Null

3 Mike 2

Mike - Naresh

Jhon- Mike

Naresh-null

SELECT E1.Name AS Employee, E2.Name AS Manager

FROM YourTableName E1

LEFT JOIN YourTableName E2 ON E1.ManagerId = E2.EmpId;

---

SELECT*

FROM Orders

INNER JOIN Customers ON Orders.customer_id = Customers.customer_id;

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

# VIEW

CREATE VIEW sales_employees AS
SELECT name, salary
FROM employees
WHERE department = 'Sales';

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

# Transaction

BEGIN TRANSACTION;

-- Deduct from Account 1
UPDATE Accounts
SET Balance = Balance - 100
WHERE AccountID = 1;

-- Add to Account 2
UPDATE Accounts
SET Balance = Balance + 100
WHERE AccountID = 2;

-- Check for errors and commit or rollback
IF @@ERROR = 0
BEGIN
    COMMIT;
END
ELSE
BEGIN
    ROLLBACK;
END;

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

Most asked SQL Interview Questions

1. Explain order of execution of SQL.
2. Explain all types of joins in SQL?
3. What are triggers in SQL?
4. What is stored procedure in SQL
5. Explain all types of window functions?
   (Mainly rank, row_num, dense_rank, lead & lag)
6. What is the difference between TRUNCATE and DELETE?
7. What is difference between DML, DDL and DCL?
8. Which is faster between CTE and Subquery?
9. What are constraints and types of Constraints?
10. Different types of Operators ?
11. Difference between Group By and Where Clause?
12. Explain View concepts ?
13. What are different types of constraints?
14. What are the various types of relationships in SQL?
15. Difference between Primary Key and Secondary Key?
16. What is the difference between where and having?
17. Find the second highest salary of an employee?
18. Difference between Function and Store procedure ?
19. How would you optimize a slow SQL query?
20. Difference between INNER JOIN and OUTER JOIN?
21. How do you handle duplicate rows in a SQL query?
22. Write a SQL query to find the top 3 departments with the highest average salary.
23. Write a SQL query to find the employees who have the same name and work in the same department.
24. Write a SQL query to find the departments with no employees.
25. How do you use indexing to improve SQL query performance?
26. Write a SQL query to find the employees who have worked for more than 5 years.
27. What is the difference between SUBQUERY and JOIN?
28. Write a SQL query to find the top 2 products with the highest sales.
29. How do you use stored procedures to improve SQL query performance?
30. Write a SQL query to find the customers who have placed an order but have not made a payment.
31. Write a SQL query to find the employees who work in the same department as their manager.
32. How do you use window functions to solve complex queries?
33. Write a SQL query to find the top 3 products with the highest average price.
34. Write a SQL query to find the employees who have not taken any leave in the last 6 months
35. Explain order of execution of SQL.
36. Explain all types of joins in SQL?
37. What are triggers in SQL?
38. What is stored procedure in SQL

SQL Must Know Differences:

🔰 RANK vs DENSE_RANK:
RANK: Provides a ranking with gaps if there are ties.
DENSE_RANK: Provides a ranking without gaps, even in the case of ties.

🔰 HAVING vs WHERE Clause:
WHERE: Filters rows before grouping.
HAVING: Filters groups after the GROUP BY clause.

🔰 UNION vs UNION ALL:
UNION: Removes duplicates and combines results.
UNION ALL: Combines results without removing duplicates.

🔰 JOIN vs UNION:
JOIN: Combines columns from multiple tables.
UNION: Combines rows from multiple tables with similar structure.

🔰 ISNULL vs COALESCE:
ISNULL: Replaces NULL with a specified value, accepts two parameters.
COALESCE: Returns the first non-NULL value from a list of expressions, accepting multiple parameters.

🔰 INTERSECT vs INNER JOIN:
INTERSECT: Returns common rows from two queries.
INNER JOIN: Combines matching rows from two tables based on a condition.

🔰 EXCEPT vs NOT IN:
EXCEPT: Returns rows in the first query but not in the second.
NOT IN: Filters rows where a column's value is not in a given list.

1.Intro to SQL

• Definition
• Purpose
• Relational DBs
• DBMS

2.Basic SQL Syntax
• SELECT
• FROM
• WHERE
• ORDER BY
• GROUP BY

3. Data Types
   • Integer
   • Floating-Point
   • Character
   • Date
   • VARCHAR
   • TEXT
   • BLOB
   • BOOLEAN

4.Sub languages
• DML
• DDL
• DQL
• DCL
• TCL

5. Data Manipulation
   • INSERT
   • UPDATE
   • DELETE
6. Data Definition
   • CREATE
   • ALTER
   • DROP
   • Indexes

7.Query Filtering and Sorting
• WHERE
• AND
• OR Conditions
• Ascending
• Descending

8. Data Aggregation
   • SUM
   • AVG
   • COUNT
   • MIN
   • MAX

9.Joins and Relationships
• INNER JOIN
• LEFT JOIN
• RIGHT JOIN
• Self-Joins
• Cross Joins
• FULL OUTER JOIN

10.Subqueries
• Subqueries used in
• Filtering data
• Aggregating data
• Joining tables
• Correlated Subqueries

11.Views
• Creating
• Modifying
• Dropping Views

12.Transactions
• ACID Properties
• COMMIT
• ROLLBACK
• SAVEPOINT
• ROLLBACK TO SAVEPOINT

13.Stored Procedures
• CREATE PROCEDURE
• ALTER PROCEDURE
• DROP PROCEDURE
• EXECUTE PROCEDURE
• User-Defined Functions (UDFs)

14.Triggers
• Trigger Events
• Trigger Execution and Syntax

15. Security and Permissions
    • CREATE USER
    • GRANT
    • REVOKE
    • ALTER USER
    • DROP USER


18.Backup and Recovery
• Database Backups
• Point-in-Time Recovery


23. Data Import and Export
    • Importing and Exporting Data (CSV, JSON)
    • Using SQL Dump Files

24.Database Design
• Entity-Relationship Diagrams (ERDs)
• Normalization Techniques

25.Advanced Indexing
• Composite Indexes
• Covering Indexes


Here are some SQL interview questions related to joins:

1. How would you combine data from two tables to find matching records?
2. Can you write a query to retrieve data from multiple tables based on a common column?
3. How would you handle a scenario where you need to fetch data from two tables, but there's no direct relationship between them?
4. Can you optimize a query that uses multiple subqueries to fetch data from different tables?
5. How would you identify and resolve data inconsistencies between two tables?
6. Can you write a query to find records in one table that don't have corresponding records in another table?
7. How would you merge data from two tables to create a unified view?
8. Can you explain how to use set operations (UNION, INTERSECT, EXCEPT) to combine data from multiple tables?
