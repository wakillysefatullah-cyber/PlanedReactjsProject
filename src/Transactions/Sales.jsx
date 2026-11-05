
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";

export default function Sales({sales, setSales}) {
    const { stock, removeStock } = useInventory();

    const [customer, setCustomer] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [paid, setPaid] = useState(0);
    const [borrow, setBorrow] = useState(null);
          [sales, setSales] = useState(() => {
        try {
            const savedSales = localStorage.getItem("easycount-sales");
            return savedSales ? JSON.parse(savedSales) : [];
        } catch {
            return [];
        }
    });

    // Save sales records after they change.
    useEffect(() => {
        localStorage.setItem("easycount-sales", JSON.stringify(sales));
    }, [sales]);

    // Find the currently selected product.
    const selectedProduct = stock.find(
        (item) => item.productName === productName
    );

    function handleSale(e) {
        e.preventDefault();

        const saleQuantity = Number(quantity);
        const salePrice = Number(price);
        const salePaid = Number(paid);
        const saleBorrowed = Number(borrow);
        const customerName = customer.trim();

        if (!customerName || !productName || quantity === "" || price === "") {
            alert("Please fill out all fields.");
            return;
        }

        if (!Number.isInteger(saleQuantity) || saleQuantity <= 0) {
            alert("Quantity must be a positive whole number.");
            return;
        }

        if (!Number.isFinite(salePrice) || salePrice < 0) {
            alert("Please enter a valid sale price.");
            return;
        }

        if (!selectedProduct) {
            alert("Please select a product.");
            return;
        }

        if (saleQuantity > selectedProduct.quantity) {
            alert(`Only ${selectedProduct.quantity} units are available.`);
            return;
        }

        // Reduce stock first. Record the sale only if stock was updated.
        const result = removeStock(productName, saleQuantity);

        if (!result.success) {
            alert(result.message);
            return;
        }

        const newSale = {
            id: Date.now(),
            customer: customerName,
            productName,
            quantity: saleQuantity,
            price: salePrice,
            paid: paid,
            borrow:(saleQuantity * salePrice) - salePaid,
            total: saleQuantity * salePrice,
            date: new Date().toLocaleDateString(),
        };

        setSales((currentSales) => [newSale, ...currentSales]);

        alert("Sale completed. Stock has been reduced.");

        setCustomer("");
        setProductName("");
        setQuantity("");
        setPrice("");
        setPaid("");
        setBorrow("");
    }

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Sales</h1>
                   
                    <p className="text-gray-500">
                        Record sales and update medicine stock.
                    </p>
                </div>

                <Link
                    to="/"
                    className="bg-black text-white px-5 py-2 rounded-md"
                >
                    &lt;&lt; Back
                </Link>
            </div>

            <form
                onSubmit={handleSale}
                className="flex flex-wrap gap-4 mb-8"
            >
                <input
                    type="text"
                    placeholder="Customer name"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-3 rounded-md"
                >
                    <option value="">Select medicine</option>

                    {stock.map((item) => (
                        <option
                            key={item.id}
                            value={item.productName}
                            disabled={item.quantity <= 0}
                        >
                            {item.productName} — Stock: {item.quantity}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border p-3 rounded-md"
                />

                <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Sale price per unit"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-3 rounded-md"
                />
                <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="paid"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                    className="border p-3 rounded-md"
                />
                {/* <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Borrowed"
                    value={borrow}
                    onChange={(e) => setBorrow(e.target.value)}
                    className="border p-3 rounded-md"
                /> */}

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-md"
                >
                    Complete Sale
                </button>
            </form>

            {selectedProduct && (
                <p className="mb-4 text-emerald-700">
                    Available quantity: {selectedProduct.quantity}
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-100 border-b-2">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Unit Price</th>
                            <th className="p-3">Paid</th>
                            <th className="p-3">Borrowed</th>
                            <th className="p-3">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                        sales.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-6 text-gray-500">
                                    No sales recorded yet.
                                </td>
                            </tr>
                        ) : (
                            sales.map((sale, index) => (
                                <tr key={sale.id} className="border-b">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{sale.date}</td>
                                    <td className="p-3">{sale.customer}</td>
                                    <td className="p-3">{sale.productName}</td>
                                    <td className="p-3">{sale.quantity}</td>
                                    <td className="p-3">
                                        {sale.price.toLocaleString()} AF
                                    </td>
                                    <td className="p-3">{sale.paid}</td>
                                    <td className="p-3">{sale.borrow}</td>
                                    <td className="p-3">
                                        {sale.total.toLocaleString()} AF
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
