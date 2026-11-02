import { useParams, Link , useLocation} from "react-router-dom";

export default function LedgerAccount() {

    const { id } = useParams();

    const location = useLocation();

    const ledger = location.state?.ledger;

    return (
        <section className="p-6">

            <div className="flex justify-between items-center border-b pb-4">

                <div>
                    <h1 className="text-2xl font-bold">
                       Ledger name: <span className="text-blue-700 ">
                        {ledger?.name || "Ledger Account"}
                       </span>
                    </h1>

                    <p className="text-gray-700">
                        Account ID: {id}
                    </p>
                </div>

                <Link
                    to="/AllLedgers"
                    className="bg-black text-white px-8 py-2 text-xl font-bold font-serif rounded-md"
                >
                    {`<<Back`}
                </Link>

            </div>

            {/* Ledger information */}
            <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-gray-100 p-4 rounded-md text-center">
                    <p className="text-gray-500">Ledger Name</p>
                    <h2 className="font-bold text-xl text-blue-700">
                        {ledger?.name || "Not available"}
                    </h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-md text-center">
                    <p className="text-gray-500">Phone</p>
                    <h2 className="font-bold text-xl text-blue-700">
                        {ledger?.phone || "Not available"}
                    </h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-md text-center">
                    <p className="text-gray-500">Area</p>
                    <h2 className="font-bold text-xl text-blue-700">
                        {ledger?.area || "Not available"}
                    </h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-md text-center">
                    <p className="text-gray-500">Address</p>
                    <h2 className="font-bold text-xl text-blue-700">
                        {ledger?.address || "Not available"}
                    </h2>
                </div>

            </div>

        </section>
    );
}