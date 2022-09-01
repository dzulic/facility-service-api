CREATE TABLE IF NOT EXISTS agenda_entry
(
    id                      UUID,
    date_created            timestamptz,
    date_modified           timestamptz,
    modified_by             VARCHAR(255),
    created_by              VARCHAR(255),
    room_id                 UUID,
    time_start              timestamptz,
    time_end                timestamptz,
    use_purpose_description VARCHAR(255),
    reserved_by_user        VARCHAR(50),
    CONSTRAINT pk_agenda_entry PRIMARY KEY (id)
);

CREATE INDEX idx_agendaentryentity ON agenda_entry (reserved_by_user);
SET TIME ZONE 'UTC';
