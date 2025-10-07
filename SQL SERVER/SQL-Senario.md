## Join tables from **two different SQL Server databases** that live on  **different servers** .

Step 1: Create a Linked Server

```sql
EXEC sp_addlinkedserver 
    @server = 'ServerB_Link',        -- name for the linked server
    @srvproduct = '',
    @provider = 'SQLNCLI',           -- SQL Native Client provider
    @datasrc = 'ServerB\SQL02';      -- actual remote server name

```

Then, configure login credentials:

```sql
EXEC sp_addlinkedsrvlogin 
    @rmtsrvname = 'ServerB_Link',
    @useself = 'false',
    @locallogin = NULL,
    @rmtuser = 'sa',
    @rmtpassword = 'YourPasswordHere';

```

Step 2: Write the Cross-Server Query

```sql
SELECT 
    e.EmployeeID,
    e.EmployeeName,
    d.DeptName
FROM 
    HR_DB.dbo.Employees e
JOIN 
    [ServerB_Link].[FINANCE_DB].[dbo].[Departments] d
ON 
    e.DeptID = d.DeptID;

```



Step 3: (Optional) Use `OPENQUERY` for Better Performance

```sql
SELECT 
    e.EmployeeID,
    e.EmployeeName,
    d.DeptName
FROM 
    HR_DB.dbo.Employees e
JOIN 
    OPENQUERY(ServerB_Link, 
        'SELECT DeptID, DeptName FROM FINANCE_DB.dbo.Departments') d
ON 
    e.DeptID = d.DeptID;

```
