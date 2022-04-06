# Indexes
* Sooner or later there comes a time when database performance is no longer satisfactory
* One of the very first things you should turn to when that happens is database indexing
* The goal of creating an index on a particular table in a database
  * is to make it faster to search through the table and find the row or rows that we want
* Indexes can be created using one or more columns of a database table
  * providing the basis for rapid random lookups and efficient access of ordered records

## Example: A library catalog
* A library catalog is a register that contains the list of books found in a library
* The catalog is organized like a database table generally with 4 columns:
  1. book title
  2. writer
  3. subject
  4. date of publication
* There are usually 2 such catalogs:
  1. sorted by the book title
  2. sorted by the writer name
* can either think of a writer you want to read
  * then look through their books
  * or look up a specific book title
* These catalogs are like indexes for the database of books
* They provide a sorted list of data that is easily searchable by relevant information
* An index is a data structure that can be perceived as a table of contents
  * that points us to the location where actual data lives
* when we create an index on a column of a table
  * we store that column and a pointer to the whole row in the index
* Just like a traditional relational data store
  * can apply this concept to larger datasets
* The trick with indexes is that we must carefully consider how users will access the data
* In the case of data sets that are many terabytes in size, but have very small payloads (e.g., 1 KB)
  * indexes are a necessity for optimizing data access
* Finding a small payload in such a large dataset can be a real challenge
  * since we can’t possibly iterate over that much data in any reasonable time
* it is very likely that such a large data set is spread over several physical devices
  * this means we need some way to find the correct physical location of the desired data
  * Indexes are the best way to do this
![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/indexes.png "Indexes")
## How do Indexes decrease write performance?
* An index can dramatically speed up data retrieval
  * but may itself be large due to the additional keys
    * which slow down data insertion & update.
* When adding rows or making updates to existing rows for a table with an active index
  * we have to write the data and have to update the index
    * This will decrease the write performance
      * This performance degradation applies to all insert, update, and delete operations for the table
      * thus, adding unnecessary indexes on tables should be avoided and indexes that are no longer used should be removed
* adding indexes is about improving the performance of search queries
* If the goal of the database is to provide a data store that is often written to and rarely read from
  * decreasing the performance of the more common operation (writing)
    * is probably not worth the increase in performance we get from reading
