# Candidate Vs Primary

`Candidate Key` – A Candidate Key can be any column or a combination of columns that can  **qualify as unique key in database** . There can be multiple Candidate Keys in one table. Each Candidate Key can qualify as Primary Key.

`Primary Key` – A Primary Key is a column or a combination of columns that  **uniquely identify a record** . Only one Candidate Key can be Primary Key.

# Temporary Table

A temporary table in SQL is a table that exists temporarily and is typically used to store intermediate results that you need to access multiple times within a session.

```
CREATE TABLE #TempTable (
    ID INT PRIMARY KEY,
    Name NVARCHAR(50),
    Age INT
);
```

```
DECLARE @TempTableVar TABLE (
    ID INT,
    Name NVARCHAR(50)
);
```


`##TempTable` → global temporary table (visible to all sessions).

## **Cascading Referential Integrity Constraints**

The Cascading Referential Integrity Constraints in SQL Server are the foreign key constraints that tell SQL Server to perform certain actions whenever a user attempts to delete or update a primary key to which an existing foreign keys point

###### SET NULL:

If a user tries to delete or update statement(s) that will affect rows in the foreign key table, then those values will be set to NULL when the primary key record is deleted or updated in the Primary key table. The important thing that we need to keep in mind that the foreign key columns affected must allow NULL values.

###### CASCADE:

If a user tries to delete the statement(s) which will affect the rows in the foreign key table, then those rows will be deleted when the primary key record is deleted. Similarly, if an update statement affects rows in the foreign key table, then those rows will be updated with the value from the primary key record after it has been updated.

###### SET DEFAULT:

If a delete or update statement affects rows in a foreign key table, then all rows containing those foreign keys are set to the default value. All foreign key columns in the related table must have default constraints defined on them.

###### NO ACTION:

This is the default action that SQL Server performs. This specifies that if an update or deletes statement affects rows in foreign key tables, then the action will be denied and rolled back. An error message will be raised.

## **Sequence Object**

A sequence is an object in SQL Server that is used to generate a number sequence. This can be useful when we need to create a unique number to act as a primary key.

The Sequence Object is one of the new features introduced in SQL Server 2012. A sequence is a user-defined object and as its name suggests it generates a sequence of numeric values according to the properties with which it is created. It is similar to the Identity column, but there are many differences between them that we will discuss in our next article. But the most important point to keep in mind is that the Sequence Object in SQL Server is not limited to a column or table but is scoped to an entire database.

## Delete, Truncate And Drop

## Trigger

## Indexs

## Transaction

## Local Temporary Table and Global Temproary Table

## Difference between Having and Where?

## MagicTable

* **Magic Table in Triggers** – In SQL Server, **“Magic Tables”** usually refer to the **special internal tables** `inserted` and `deleted` that exist inside triggers.
* A **specific table named “MagicTable”** in your database.

## VIEWS

A view is a named query stored in the database catalog that allows you to refer to it later.

Advantages of views

Generally speaking, views provide the following advantages:

**Security**

You can restrict users to access directly to a table and allow them to access a subset of data via views.

For example, you can allow users to access customer name, phone, email via a view but restrict them to access the bank account and other sensitive information.

**Simplicity**

A relational database may have many tables with complex relationships e.g., one-to-one and one-to-many that make it difficult to navigate.

However, you can simplify the complex queries with joins and conditions using a set of views.

**Consistency**

Sometimes, you need to write a complex formula or logic in every query.

To make it consistent, you can hide the complex queries logic and calculations in views.

Once views are defined, you can reference the logic from the views rather than rewriting it in separate queries.

## Check And Default

**Check**: A constraint that enforces a condition on the values in a column. It ensures data meets specific criteria. Example: **CHECK (Age >= 18)** in a **Users** table to restrict ages to 18 or older.

**Default**: Specifies a default value for a column if no value is provided during insertion. Example: **DEFAULT 'Active'** for a **Status** column in a **Users** table.

## How do you use indexing to improve SQL query performance?

An index is a data structure (typically a B-tree or hash) that stores a subset of a table’s columns, enabling faster lookups, joins, and filtering. It’s like a book’s index, pointing to data locations without scanning the entire table.

## Differentiate between UNION and UNION ALL.

Union

* **Purpose**: Combines the result sets of multiple **SELECT** queries and **removes duplicate rows** from the final result.
* **Behavior**: Performs a distinct operation, sorting and eliminating duplicate rows across the entire result set.
* **Performance**: Slower than **UNION ALL** because it requires additional processing to identify and remove duplicates.

UnionAll

* **Purpose**: Combines the result sets of multiple **SELECT** queries and **includes all rows**, including duplicates.
* **Behavior**: Does not perform duplicate removal or sorting, simply concatenates the results.
* **Performance**: Faster than **UNION** because it skips the duplicate removal step, making it more efficient for large datasets.
