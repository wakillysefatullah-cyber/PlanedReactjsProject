ALTER TABLE purchases
ADD COLUMN paid NUMERIC(14,2) NOT NULL DEFAULT 0;

ALTER TABLE purchases
ADD CONSTRAINT chk_purchases_paid
CHECK (paid >= 0 AND paid <= total);
