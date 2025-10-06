CREATE TABLE payments (
    customer_name varchar(128),
    processed_at date,
    amount int
);

CREATE TABLE balances (
    username varchar(128),
    balance int
);

CREATE TABLE large_table (
    random_int int
);

INSERT INTO payments VALUES ('clement', '2019-12-15', 10);
INSERT INTO payments VALUES ('antoine', '2020-01-01', 100);
INSERT INTO payments VALUES ('clement', '2020-01-02', 10);
INSERT INTO payments VALUES ('antoine', '2020-01-02', 100);
INSERT INTO payments VALUES ('antoine', '2020-01-03', 100);
INSERT INTO payments VALUES ('simon', '2020-02-05', 1000);
INSERT INTO payments VALUES ('antoine', '2020-02-01', 100);
INSERT INTO payments VALUES ('clement', '2020-02-03', 10);
INSERT INTO payments VALUES ('meghan', '2020-01-12', 80);
INSERT INTO payments VALUES ('meghan', '2020-01-13', 70);
INSERT INTO payments VALUES ('meghan', '2020-01-14', 90);
INSERT INTO payments VALUES ('alex', '2019-12-11', 10);
INSERT INTO payments VALUES ('clement', '2020-02-01', 10);
INSERT INTO payments VALUES ('marli', '2020-01-18', 10);
INSERT INTO payments VALUES ('alex', '2019-12-15', 10);
INSERT INTO payments VALUES ('marli', '2020-01-25', 10);
INSERT INTO payments VALUES ('marli', '2020-02-02', 10);

INSERT INTO balances VALUES ('antoine', 0);
INSERT INTO balances VALUES ('clement', 1000);

INSERT INTO large_table (random_int)
SELECT round(random() * 1000000000)
FROM generate_series(1, 50000000) s(i);
