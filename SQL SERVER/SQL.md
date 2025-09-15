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

1. Explain all types of window functions?
   (Mainly rank, row_num, dense_rank, lead & lag)
3. What is the difference between TRUNCATE and DELETE?
4. What is difference between DML, DDL and DCL?
5. Which is faster between CTE and Subquery?
6. What are constraints and types of Constraints?
7. Different types of Operators ?
8. Difference between Group By and Where Clause?
9. Explain View concepts ?
10. What are different types of constraints?
11. What are the various types of relationships in SQL?
12. What is the difference between where and having?
13. Difference between Function and Store procedure ?
14. How would you optimize a slow SQL query?
15. How do you handle duplicate rows in a SQL query?
16. Write a SQL query to find the top 3 departments with the highest average salary.
17. Write a SQL query to find the employees who have the same name and work in the same department.
18. Write a SQL query to find the departments with no employees.
19. How do you use indexing to improve SQL query performance?
20. Write a SQL query to find the employees who have worked for more than 5 years.
21. What is the difference between SUBQUERY and JOIN?
22. Write a SQL query to find the top 2 products with the highest sales.
23. Write a SQL query to find the customers who have placed an order but have not made a payment.
