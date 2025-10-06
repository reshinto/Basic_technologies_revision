# Init Example

```sql
CREATE TABLE IF NOT EXISTS students (
  student_id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  name VARCHAR(50) NOT NULL CHECK (name ~ '^([A-Za-z]|[0-9]){3,}$'),
  surname VARCHAR(50) NOT NULL,
  date_of_birth DATE,
  phone_number INTEGER NOT NULL,
  primary_skill VARCHAR(128) NOT NULL,
  created_datetime TIMESTAMP NOT NULL DEFAULT now(),
  updated_datetime TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO students (name, surname, phone_number, primary_skill)
SELECT
  left(md5(random()::text), 50),
  left(md5(random()::text), 50),
  floor(random() * 9999999 + 80000000)::int,
  left(md5(random()::text), 128)
FROM generate_series(2, 100000) s(i);

INSERT INTO students (student_id, name, surname, date_of_birth, phone_number, primary_skill)
VALUES (100000, 'John', 'Doe', '1990-01-01', 89654321, 'Java');


CREATE TABLE IF NOT EXISTS subjects (
  subject_id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  subject_name VARCHAR(128) NOT NULL,
  tutor VARCHAR(128) NOT NULL
);

INSERT INTO subjects (subject_name, tutor)
SELECT
  left(md5(random()::text), 128),
  left(md5(random()::text), 128)
FROM generate_series(2, 1000) s(i);

INSERT INTO subjects (subject_id, subject_name, tutor)
VALUES (1000, 'Programming', 'John Doe');


CREATE TABLE IF NOT EXISTS exam_results (
  exam_result_id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
  mark float NOT NULL
);

INSERT INTO exam_results (student_id, subject_id, mark)
SELECT
  floor(random() * 99999 + 1)::int,
  floor(random() * 999 + 1)::int,
  random() * 10
FROM generate_series(2, 1000000) s(i);

INSERT INTO exam_results (exam_result_id, student_id, subject_id, mark)
VALUES (1000000, 100000, 1000, 2);
```
