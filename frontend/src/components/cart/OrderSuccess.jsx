// export default function OrderSuccess() {
//     return (
//         <div className="row justify-content-center">
//             <div className="col-6 mt-5 text-center">
//                 <img className="my-5 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200" height="200" />

//                 <h2>Your Order has been placed successfully.</h2>

//                 <a href="/orders">Go to Orders</a>
//             </div>

//         </div>
//     )
// }

export default function OrderSuccess() {
    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 text-center">
                <img
                    className="mx-auto mb-6 w-32 h-32"
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
