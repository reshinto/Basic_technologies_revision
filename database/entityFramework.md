# Entity Framework
* it is an open source object-relational mapping framework for ADO.NET
  * ADO.NET provides consistent access to data sources
    * eg SQL Server and XML
    * and to data sources exposed through OLE DB and ODBC
## How to use Entity Franework in visual studio
* open NuGet Package Manager Console
* key in all of the following commands in the NuGet Package Manager Console
### Enable migrations (required for first times)
* this will create the default database files in the "App_Data" folder
> enable-migrations
### Add migration
* use to create migration
* name of migration is dependent on the domain model
* first time migration usually name as "InitialModel"
> add-migration MigrationFileName
* if required to overwrite, use the ```-force```
> add-migration ModelName -force
* this can be used to create migration file and then manually modify the migration file
* the following will be auto generated
```
using System;
using System.Data.Entity.Migrations;

public partial class MigrationFileName : DbMigration
{
  public override void Up()  // use to update db based on code written
  {}
  
  public override void Down()  // use to revert our migrations
  {}
}
```
* write sql code in either the Up or Down method
```
Sql("INSERT INTO ModelName (Id, PropertyName1, PropertyName2) VALUES (numberValue, numberValue, numberValue)");
```
### Update database
* after adding migration, database has yet to be updated
* this will update the database files stored in the "App_Data" folder
> update-database
