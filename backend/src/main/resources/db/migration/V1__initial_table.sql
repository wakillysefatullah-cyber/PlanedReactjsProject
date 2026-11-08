CREATE TABLE IF NOT EXISTS ledgers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    area VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    unit VARCHAR(30) NOT NULL,
    purchase_price NUMERIC(14,2) NOT NULL DEFAULT 0,
    sale_price NUMERIC(14,2) NOT NULL DEFAULT 0,
    stock_qty NUMERIC(14,3) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_items_purchase_price CHECK (purchase_price >= 0),
    CONSTRAINT chk_items_sale_price CHECK (sale_price >= 0),
    CONSTRAINT chk_items_stock CHECK (stock_qty >= 0)
);

CREATE TABLE IF NOT EXISTS sales (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ledger_id BIGINT NOT NULL REFERENCES ledgers(id),
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total NUMERIC(14,2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_sales_total CHECK (total >= 0)
);

CREATE TABLE IF NOT EXISTS sale_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sale_id BIGINT NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    item_id BIGINT NOT NULL REFERENCES items(id),
    qty NUMERIC(14,3) NOT NULL,
    price NUMERIC(14,2) NOT NULL,
    line_total NUMERIC(14,2)
        GENERATED ALWAYS AS (ROUND(qty * price, 2)) STORED,

    CONSTRAINT chk_sale_items_qty CHECK (qty > 0),
    CONSTRAINT chk_sale_items_price CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS purchases (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ledger_id BIGINT NOT NULL REFERENCES ledgers(id),
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total NUMERIC(14,2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_purchases_total CHECK (total >= 0)
);

CREATE TABLE IF NOT EXISTS purchase_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    purchase_id BIGINT NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
    item_id BIGINT NOT NULL REFERENCES items(id),
    qty NUMERIC(14,3) NOT NULL,
    price NUMERIC(14,2) NOT NULL,
    line_total NUMERIC(14,2)
        GENERATED ALWAYS AS (ROUND(qty * price, 2)) STORED,

    CONSTRAINT chk_purchase_items_qty CHECK (qty > 0),
    CONSTRAINT chk_purchase_items_price CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS sales_returns (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sale_id BIGINT NOT NULL REFERENCES sales(id),
    return_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total NUMERIC(14,2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_sales_returns_total CHECK (total >= 0)
);

CREATE TABLE IF NOT EXISTS sales_return_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sales_return_id BIGINT NOT NULL REFERENCES sales_returns(id) ON DELETE CASCADE,
    item_id BIGINT NOT NULL REFERENCES items(id),
    qty NUMERIC(14,3) NOT NULL,
    price NUMERIC(14,2) NOT NULL,
    line_total NUMERIC(14,2)
        GENERATED ALWAYS AS (ROUND(qty * price, 2)) STORED,

    CONSTRAINT chk_sales_return_qty CHECK (qty > 0),
    CONSTRAINT chk_sales_return_price CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS purchase_returns (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    purchase_id BIGINT NOT NULL REFERENCES purchases(id),
    return_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total NUMERIC(14,2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_purchase_returns_total CHECK (total >= 0)
);

CREATE TABLE IF NOT EXISTS purchase_return_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    purchase_return_id BIGINT NOT NULL REFERENCES purchase_returns(id) ON DELETE CASCADE,
    item_id BIGINT NOT NULL REFERENCES items(id),
    qty NUMERIC(14,3) NOT NULL,
    price NUMERIC(14,2) NOT NULL,
    line_total NUMERIC(14,2)
        GENERATED ALWAYS AS (ROUND(qty * price, 2)) STORED,

    CONSTRAINT chk_purchase_return_qty CHECK (qty > 0),
    CONSTRAINT chk_purchase_return_price CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS receipts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ledger_id BIGINT NOT NULL REFERENCES ledgers(id),
    amount NUMERIC(14,2) NOT NULL,
    receipt_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_receipts_amount CHECK (amount > 0)
);

CREATE TABLE IF NOT EXISTS payments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ledger_id BIGINT NOT NULL REFERENCES ledgers(id),
    amount NUMERIC(14,2) NOT NULL,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_payments_amount CHECK (amount > 0)
);

CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    amount NUMERIC(14,2) NOT NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_expenses_amount CHECK (amount > 0)
);

CREATE INDEX IF NOT EXISTS idx_sales_ledger
 ON sales(ledger_id);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale
 ON sale_items(sale_id);
CREATE INDEX IF NOT EXISTS idx_sale_items_item
 ON sale_items(item_id);
CREATE INDEX IF NOT EXISTS idx_purchases_ledger
 ON purchases(ledger_id);
CREATE INDEX IF NOT EXISTS idx_purchase_items_purchase
 ON purchase_items(purchase_id);
CREATE INDEX IF NOT EXISTS idx_purchase_items_item
 ON purchase_items(item_id);
CREATE INDEX IF NOT EXISTS idx_sales_returns_sale
 ON sales_returns(sale_id);
CREATE INDEX IF NOT EXISTS idx_purchase_returns_purchase
 ON purchase_returns(purchase_id);
CREATE INDEX IF NOT EXISTS idx_receipts_ledger
 ON receipts(ledger_id);
CREATE INDEX IF NOT EXISTS idx_payments_ledger
 ON payments(ledger_id);
CREATE INDEX IF NOT EXISTS idx_sales_date
 ON sales(invoice_date);
CREATE INDEX IF NOT EXISTS idx_purchases_date
 ON purchases(invoice_date);