CREATE TABLE psl (
    team_id varchar PRIMARY KEY,
    team_name varchar UNIQUE NOT NULL,
    played integer CHECK (played >= 0 and played <= 30),
    points integer,
    goal_d integer,
    created_on timestamp with time zone NOT NULL DEFAULT current_timestamp,
    updated_on timestamp with time zone
);


CREATE OR REPLACE FUNCTION timestamp_updated_on_col() 
        RETURNS TRIGGER AS '
  BEGIN
    NEW.updated_on = NOW();
    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

CREATE TRIGGER set_timestamp BEFORE UPDATE
  ON psl FOR EACH ROW EXECUTE PROCEDURE
  timestamp_updated_on_col();




CREATE OR REPLACE FUNCTION check_number_of_rows()
RETURNS TRIGGER AS $$

DECLARE
    max_row_count INTEGER := 16;
BEGIN

    IF (SELECT COUNT(*) as row_count FROM psl) >= max_row_count THEN
            RAISE EXCEPTION 'Cannot insert more than % entries.', max_row_count;
        END IF;
        RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER enforce_rows_count 
    BEFORE INSERT ON psl
    FOR EACH ROW EXECUTE PROCEDURE check_number_of_rows();
