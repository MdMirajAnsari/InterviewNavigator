--==================================DUPLICATE EMAILS

```sql
SELECT MIN(id) AS id,
TRIM(LOWER(email)) AS cleaned_email
FROM users
GROUP BY cleaned_email
ORDER BY id
```

--=================================Highest salary each departments

```sql
select
d.name as department_name
, e.id as employee_id
, first_name
, last_name
, salary
from employees e
join departments d on e.department_id = d.id
where (department_id , salary) in
(select
department_id
,  max(salary) as highest_salary
from employees
group by 1)
order by d.name
```

## How do you handle duplicate rows in a SQL query?

```sql
SELECT FirstName, LastName, DepartmentID, COUNT(*) as EmployeeCount
FROM Employees
GROUP BY FirstName, LastName, DepartmentID
HAVING COUNT(*) > 1;
```

## Write a SQL query to find the top 3 departments with the highest average salary.

```sql
SELECT TOP 3
    d.DepartmentName,
    ROUND(AVG(e.Salary), 2) AS AverageSalary
FROM Employees e
INNER JOIN Departments d
    ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName
ORDER BY AverageSalary DESC;
```

## Write a SQL query to find the employees who have worked for more than 5 years.

```sql
SELECT 
    e.EmployeeID,
    e.FirstName,
    e.LastName,
    e.HireDate,
    DATEDIFF(YEAR, e.HireDate, GETDATE()) AS YearsOfService
FROM Employees e
WHERE DATEDIFF(YEAR, e.HireDate, GETDATE()) > 5;
```

## A database cursor is an object that enables traversal over the rows of a result set. It allows you to process individual row returned by a query.

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

# SQL Query Interview Questions and Answers

Assume these common tables for the examples:

```sql
Employees(EmployeeId, EmployeeName, DepartmentId, ManagerId, Salary, Email, LoginDate)
Departments(DepartmentId, DepartmentName)
```

## Find the second- and third-highest salary

Use `DENSE_RANK()` when duplicate salaries should share the same rank.

```sql
WITH SalaryRank AS
(
    SELECT
        EmployeeId,
        EmployeeName,
        Salary,
        DENSE_RANK() OVER (ORDER BY Salary DESC) AS SalaryRank
    FROM Employees
)
SELECT EmployeeId, EmployeeName, Salary, SalaryRank
FROM SalaryRank
WHERE SalaryRank IN (2, 3);
```

If you need exactly one second-highest and one third-highest employee row, use `ROW_NUMBER()` instead.

```sql
WITH SalaryRank AS
(
    SELECT
        EmployeeId,
        EmployeeName,
        Salary,
        ROW_NUMBER() OVER (ORDER BY Salary DESC) AS RowNum
    FROM Employees
)
SELECT EmployeeId, EmployeeName, Salary
FROM SalaryRank
WHERE RowNum IN (2, 3);
```

## Find the top three salaries from each department

Use `DENSE_RANK()` if employees with the same salary should be included together.

```sql
WITH DepartmentSalaryRank AS
(
    SELECT
        e.EmployeeId,
        e.EmployeeName,
        e.DepartmentId,
        d.DepartmentName,
        e.Salary,
        DENSE_RANK() OVER
        (
            PARTITION BY e.DepartmentId
            ORDER BY e.Salary DESC
        ) AS SalaryRank
    FROM Employees e
    INNER JOIN Departments d
        ON e.DepartmentId = d.DepartmentId
)
SELECT EmployeeId, EmployeeName, DepartmentName, Salary, SalaryRank
FROM DepartmentSalaryRank
WHERE SalaryRank <= 3
ORDER BY DepartmentName, Salary DESC;
```

Use `ROW_NUMBER()` instead if you want exactly three rows per department.

## Difference between ROW_NUMBER, RANK and DENSE_RANK

`ROW_NUMBER()` gives a unique sequential number to each row, even when values are tied.

`RANK()` gives the same rank to tied rows, but skips the next rank numbers.

`DENSE_RANK()` gives the same rank to tied rows and does not skip rank numbers.

Example salaries: `10000, 9000, 9000, 8000`

| Salary | ROW_NUMBER | RANK | DENSE_RANK |
| --- | --- | --- | --- |
| 10000 | 1 | 1 | 1 |
| 9000 | 2 | 2 | 2 |
| 9000 | 3 | 2 | 2 |
| 8000 | 4 | 4 | 3 |

## Find duplicate records

Find duplicate emails:

```sql
SELECT
    Email,
    COUNT(*) AS DuplicateCount
FROM Employees
GROUP BY Email
HAVING COUNT(*) > 1;
```

Find duplicate records based on multiple columns:

```sql
SELECT
    EmployeeName,
    DepartmentId,
    Salary,
    COUNT(*) AS DuplicateCount
FROM Employees
GROUP BY EmployeeName, DepartmentId, Salary
HAVING COUNT(*) > 1;
```

## Delete duplicates while retaining one row

Use `ROW_NUMBER()` to keep one row and delete the rest.

```sql
WITH DuplicateRows AS
(
    SELECT
        EmployeeId,
        ROW_NUMBER() OVER
        (
            PARTITION BY Email
            ORDER BY EmployeeId
        ) AS RowNum
    FROM Employees
)
DELETE FROM DuplicateRows
WHERE RowNum > 1;
```

This keeps the lowest `EmployeeId` for each email. Change the `ORDER BY` if a different row should be retained.

## Find employees earning more than their manager

Use a self join on the employee table.

```sql
SELECT
    e.EmployeeId,
    e.EmployeeName,
    e.Salary AS EmployeeSalary,
    m.EmployeeName AS ManagerName,
    m.Salary AS ManagerSalary
FROM Employees e
INNER JOIN Employees m
    ON e.ManagerId = m.EmployeeId
WHERE e.Salary > m.Salary;
```

## Find records present in one table but not another

Using `LEFT JOIN`:

```sql
SELECT c.CustomerId, c.CustomerName
FROM Customers c
LEFT JOIN Orders o
    ON c.CustomerId = o.CustomerId
WHERE o.CustomerId IS NULL;
```

Using `NOT EXISTS`, which is often a good choice:

```sql
SELECT c.CustomerId, c.CustomerName
FROM Customers c
WHERE NOT EXISTS
(
    SELECT 1
    FROM Orders o
    WHERE o.CustomerId = c.CustomerId
);
```

Using `EXCEPT`:

```sql
SELECT CustomerId FROM Customers
EXCEPT
SELECT CustomerId FROM Orders;
```

## Implement pagination

Use `OFFSET` and `FETCH` in SQL Server.

```sql
DECLARE @PageNumber int = 2;
DECLARE @PageSize int = 10;

SELECT
    EmployeeId,
    EmployeeName,
    Salary
FROM Employees
ORDER BY EmployeeId
OFFSET (@PageNumber - 1) * @PageSize ROWS
FETCH NEXT @PageSize ROWS ONLY;
```

Always use a stable `ORDER BY` when implementing pagination.

For large tables, keyset pagination can perform better than high `OFFSET` values:

```sql
DECLARE @LastEmployeeId int = 100;
DECLARE @PageSize int = 10;

SELECT TOP (@PageSize)
    EmployeeId,
    EmployeeName,
    Salary
FROM Employees
WHERE EmployeeId > @LastEmployeeId
ORDER BY EmployeeId;
```

## Calculate running totals

Use `SUM()` as a window function.

```sql
SELECT
    EmployeeId,
    EmployeeName,
    DepartmentId,
    Salary,
    SUM(Salary) OVER
    (
        PARTITION BY DepartmentId
        ORDER BY EmployeeId
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS RunningDepartmentSalary
FROM Employees
ORDER BY DepartmentId, EmployeeId;
```

For sales data:

```sql
SELECT
    OrderDate,
    Amount,
    SUM(Amount) OVER
    (
        ORDER BY OrderDate
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS RunningTotal
FROM Sales
ORDER BY OrderDate;
```

## Find consecutive dates or consecutive login days

A common technique is to subtract `ROW_NUMBER()` from each date. Consecutive dates produce the same group key.

```sql
WITH DistinctLogins AS
(
    SELECT DISTINCT
        EmployeeId,
        CAST(LoginDate AS date) AS LoginDate
    FROM Employees
    WHERE LoginDate IS NOT NULL
), LoginGroups AS
(
    SELECT
        EmployeeId,
        LoginDate,
        DATEADD
        (
            DAY,
            -ROW_NUMBER() OVER
            (
                PARTITION BY EmployeeId
                ORDER BY LoginDate
            ),
            LoginDate
        ) AS GroupKey
    FROM DistinctLogins
)
SELECT
    EmployeeId,
    MIN(LoginDate) AS StartDate,
    MAX(LoginDate) AS EndDate,
    COUNT(*) AS ConsecutiveDays
FROM LoginGroups
GROUP BY EmployeeId, GroupKey
HAVING COUNT(*) >= 3
ORDER BY EmployeeId, StartDate;
```

This example finds employees with at least three consecutive login days. Change `HAVING COUNT(*) >= 3` based on the required streak length.
