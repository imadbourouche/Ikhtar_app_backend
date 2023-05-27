-- database signalement field:
-- id, phone, status, description, type, date

CREATE TABLE signalement( 
    id SERIAL PRIMARY KEY,
    phone VARCHAR(30) NOT NULL,
    status VARCHAR(30),
    userlocation VARCHAR(30),
    alertlocation VARCHAR(30),
    description VARCHAR(100),
    type VARCHAR(30),
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO signalement (phone, status, userlocation, alertlocation,description, type) VALUES
('0664951240', 'In_Progress', 'Alger', 'Oued Semar' ,'images/signalement1.mp4','video'),
('0664951111', 'Validated','Setif', 'Guejal' , 'images/signalement2.png','image'),
('0664952222', 'New', 'Oum Bouaghi', 'Oum Bouaghi' , 'images/signalement3.png','image'),
('0664952222', 'New', 'Oran', 'Gaid' , 'This is a description of signalement','description'),
('0664951111', 'Validated', 'Anaba', 'Anaba' , 'images/signalement4.mp3','mp3'),
('0664952222', 'New', '72.55555 , 456.55577', '72.55555 , 456.55577' , 'images/signalement3.png','image'),
('0664952222', 'New', '72.55555 , 456.55577', '72.55555 , 456.55577' , 'This is a description of signalement','description'),
('0664952222', 'New', '72.55555 , 456.55577', '72.55555 , 456.55577' , 'images/signalement3.png','image'),
('0664952222', 'New', '72.55555 , 456.55577', '72.55555 , 456.55577' , 'This is a description of signalement','description'),
('0664951111', 'New', '72.55555 , 456.55577', '72.55555 , 456.55577' , 'images/signalement4.mp3','mp3');






