## I have update one column salary from 500 to 1000 how i can know what was the prev value

In  **SQL Server** , after you run a normal `UPDATE`, SQL Server does not automatically keep the previous value unless you capture or audit it.

To see the old and new value while updating, use `OUTPUT`:

```
UPDATE Employees
SET Salary = 1000
OUTPUT
    deleted.Salary AS PreviousSalary,
    inserted.Salary AS NewSalary
WHERE EmployeeId = 1;
```
