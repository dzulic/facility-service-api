CREATE TABLE IF NOT EXISTS agenda_entry
(
    id                      BIGINT NOT NULL,
    date_created            TIMESTAMP with time zone,
    date_modified           TIMESTAMP with time zone,
    modified_by             VARCHAR(255),
    created_by              VARCHAR(255),
    room_id                 UUID,
    time                    TIMESTAMP WITHOUT TIME ZONE,
    use_purpose_description VARCHAR(255),
    reserved_by_user        UUID,
    CONSTRAINT pk_agenda_entry PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXIST agenda_day
(
    id                  BIGINT NOT NULL,
    date_created        TIMESTAMP with time zone,
    date_modified       TIMESTAMP with time zone,
    modified_by         VARCHAR(255),
    created_by          VARCHAR(255)
    CONSTRAINT pk_agenda_day PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXIST agenda_week
(
    id            BIGINT NOT NULL,
    date_created  TIMESTAMP with time zone,
    date_modified TIMESTAMP with time zone,
    modified_by   VARCHAR(255),
    created_by    VARCHAR(255),
    agendas       BIGINT,
    CONSTRAINT pk_agenda_week PRIMARY KEY (id)
);


CREATE TABLE calendar
(
    id            BIGINT NOT NULL,
    date_created  TIMESTAMP with time zone,
    date_modified TIMESTAMP with time zone,
    modified_by   VARCHAR(255),
    created_by    VARCHAR(255),
    CONSTRAINT pk_calendar PRIMARY KEY (id)
);

ALTER TABLE IF NOT EXIST agenda_day
    ADD CONSTRAINT FK_AGENDA_DAY_ON_AGENDA_DAY_ENTITIES FOREIGN KEY (agenda_day_entities) REFERENCES agenda_week (id);

ALTER TABLE agenda_day
    ADD CONSTRAINT FK_AGENDA_DAY_ON_AGENDA_ENTRIES FOREIGN KEY (agenda_entries) REFERENCES agenda_day (id);

ALTER TABLE agenda_week
    ADD CONSTRAINT FK_AGENDA_WEEK_ON_AGENDAS FOREIGN KEY (agendas) REFERENCES calendar (id);

CREATE INDEX idx_agendaentryentity ON agenda_entry (reserved_by_user);
