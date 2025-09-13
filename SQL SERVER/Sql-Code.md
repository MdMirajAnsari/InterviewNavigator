--==================================Highest Salary

```sql
SELECT DISTINCT Salary, [EmpName]
FROM EmpSalary
ORDER BY Salary DESC
OFFSET 1 ROWS
FETCH NEXT 1 ROW ONLY;
--=====================================
SELECT TOP 1 Salary, [EmpName]
FROM (
    SELECT TOP 2 Salary, [EmpName]
    FROM EmpSalary
    ORDER BY Salary DESC
) AS Temp
ORDER BY Salary ASC;

--====================================

SELECT DeptName, EmpName, Salary
FROM (
    SELECT 
        DeptName,
        EmpName,
        Salary,
        DENSE_RANK() OVER (PARTITION BY DeptName ORDER BY Salary DESC) AS SalaryRank
    FROM EmpDepSal
) AS Ranked
WHERE SalaryRank = 2
```

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
SELECT e.DepartmentID, e.Name, e.Salary
FROM Employees e
JOIN (
    SELECT DepartmentID, MAX(Salary) AS MaxSalary
    FROM Employees
    GROUP BY DepartmentID
) m
ON e.DepartmentID = m.DepartmentID AND e.Salary = m.MaxSalary;

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

## Pivot Table

```sql
  SELECT Product, [North] AS NorthSales, [South] AS SouthSales, [East] AS EastSales, [West] AS WestSales
FROM (
    SELECT Product, Region, Amount
    FROM Sales
) AS SourceTable
PIVOT (
    SUM(Amount) FOR Region IN ([North], [South], [East], [West])
) AS PivotTable;

```

## Write a query to find employees earning more than their manager?

```sql
SELECT 
    e.EmployeeID,
    e.Name AS EmployeeName,
    e.Salary AS EmployeeSalary,
    m.Name AS ManagerName,
    m.Salary AS ManagerSalary
FROM Employees e
JOIN Employees m
    ON e.ManagerID = m.EmployeeID
WHERE e.Salary > m.Salary;

```
