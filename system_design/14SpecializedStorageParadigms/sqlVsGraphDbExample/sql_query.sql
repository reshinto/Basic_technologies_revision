-- Find the interviewers who interviews and failed Clement
-- and who also applied to and got rejected by Facebook.
SELECT interviewers.name
FROM (
    candidates
    JOIN interviews ON (candidates.id = interviews.candidate_id AND candidates.name = 'Clement' AND interviews.score = 'failed')
    JOIN interviewers ON (interviewers.id = interviews.interviewer_id)
)
WHERE EXISTS (
    SELECT *
    FROM applications
    WHERE company = 'Facebook' AND candidate_id = interviewers.id AND statues = 'rejected'
);
