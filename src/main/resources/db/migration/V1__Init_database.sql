CREATE TABLE university
(
    id            uuid         NOT NULL,
    date_created  timestamp    NULL,
    date_modified timestamp    NULL,
    modified_by   varchar(255) NULL,
    created_by    varchar(255) NULL,
    name          varchar(255) NOT NULL,
    city          varchar(255) NOT NULL,
    country       varchar(255) NOT NULL,
    CONSTRAINT university_pkey PRIMARY KEY (id)
);
CREATE TYPE room_type AS ENUM ('interactive','lecture','combined','auditoria');

CREATE TABLE room
(
    id              uuid         NOT NULL,
    date_created    timestamp    NULL,
    date_modified   timestamp    NULL,
    modified_by     varchar(255) NULL,
    created_by      varchar(255) NULL,
    room_id         varchar(255) NOT NULL,
    room_type       room_type    NOT NULL,
    sitting_places  integer      NULL,
    computer_places integer      NULL,
    university_id   uuid         NOT NULL,
    CONSTRAINT room_entity_pkey PRIMARY KEY (id),
    CONSTRAINT fk_university_entity FOREIGN KEY (university_id) REFERENCES university (id)
);