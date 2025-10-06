# ASP.NET CORE terminal guide

## Create a new webapi

> dotnet new webapi -n appName.API

## Run project

> dotnet run

## Run project with auto update

> dotnet watch run

## Connect and Manage database

- requires installation of "dotnet-ef"
  > dotnet tool install --global dotnet-ef
- view help
  > dotnet ef -h
- add migration
  - requires installation of nuget packages, install via nuget in project
    _ "Microsoft.EntityFrameworkCore"
    _ "Microsoft.EntityFrameworkCore.Design" \* "Microsoft.EntityFrameworkCore.NameOfSqlDatabase" -> eg "Microsoft.EntityFrameworkCore.Sqlite"
    > dotnet ef migrations add MigrationName
- remove migration
  > dotnet ef migrations remove MigrationName

## Apply Migration

> dotnet ef database update
