# Queries Example

```sql
SELECT * FROM students
WHERE name = 'John';

SELECT * FROM students
WHERE surname = 'Doe';

SELECT * FROM students
WHERE phone_number = 89654321;

SELECT * FROM students
inner join exam_results on students.student_id = exam_results.student_id
inner join subjects on exam_results.subject_id = subjects.subject_id
WHERE students.surname = 'Doe';

UPDATE students
SET
  date_of_birth = '1999-10-01',
  updated_datetime = now()
WHERE student_id = 100000;

UPDATE students
SET
  name = 'Test@',
  updated_datetime = now()
WHERE student_id = 100000;

CREATE FUNCTION average_user_mark(id INTEGER)
RETURNS FLOAT
LANGUAGE plpgsql
AS $$
DECLARE avg_mark FLOAT;
BEGIN
  SELECT avg(mark)
  FROM exam_results
  WHERE student_id = id
  INTO avg_mark;
  RETURN avg_mark;
END;
$$;

SELECT average_user_mark(1);


CREATE FUNCTION average_subject_mark(id INTEGER)
RETURNS FLOAT
LANGUAGE plpgsql
AS $$
DECLARE avg_mark FLOAT;
BEGIN
  SELECT avg(mark)
  FROM exam_results
  WHERE subject_id = id
  INTO avg_mark;
  RETURN avg_mark;
END;
$$;

SELECT average_subject_mark(1);

CREATE FUNCTION check_mark(id INTEGER, sub_id INTEGER)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  IF EXISTS (
    SELECT mark
    FROM exam_results
    WHERE (student_id = id and subject_id = sub_id and mark < 3)
  ) THEN
    RETURN 'student at red zone';
  ELSE
    RETURN 'student at green zone';
  END IF;
END;
$$;

SELECT *
FROM exam_results
WHERE (student_id = 100000);

SELECT check_mark(100000, 1000);
```
