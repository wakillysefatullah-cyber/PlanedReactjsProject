ALTER TABLE sales_return_items
    ADD COLUMN sale_item_id BIGINT NOT NULL
    REFERENCES sale_items(id);

ALTER TABLE purchase_return_items
    ADD COLUMN purchase_item_id BIGINT NOT NULL
    REFERENCES purchase_items(id);
