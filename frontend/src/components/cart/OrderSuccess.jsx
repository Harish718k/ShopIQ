export default function OrderSuccess() {
    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="w-full max-w-md bg-gray-900 shadow-xl rounded-2xl p-6 text-center">
                <img
                    className="mx-auto mb-6 w-22 h-22"
                    src="/images/success.png"
                    alt="Order Success"
                />
                <h2 className="text-2xl font-semibold text-green-600 mb-2">
                    Your Order has been placed successfully.
                </h2>
                <a
                    href="/orders"
                    className="inline-block mt-4 text-white bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded-lg"
                >
                    Go to Orders
                </a>
            </div>
        </div>
    );
}
