ALTER TABLE sales
    ADD COLUMN paid NUMERIC(14,2) NOT NULL DEFAULT 0,
    ADD CONSTRAINT chk_sales_paid CHECK (paid >= 0 AND paid <= total);

ALTER TABLE sale_items     ADD COLUMN batch_no VARCHAR(50);
ALTER TABLE purchase_items ADD COLUMN batch_no VARCHAR(50);

ALTER TABLE items ADD COLUMN company VARCHAR(150);

-- Items are looked up by name, and names must be unique (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS ux_items_name_lower ON items (LOWER(name));