
export default function ShowEachSaleReport({sales}){

    return(
        <>
            <h1>Your all <span> Sales </span> Report</h1>
            <br />
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
            
        
        </>
    );
}