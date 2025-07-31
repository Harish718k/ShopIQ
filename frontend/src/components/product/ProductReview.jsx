// export default function ProductReview({reviews}) {
//     return (
//         <div class="reviews w-75">
//             <h3>Other's Reviews:</h3>
//             <hr />
//             {reviews && reviews.map(review => (
//                 <div key={review._id} class="review-card my-3">
//                     <div class="rating-outer">
//                         <div class="rating-inner" style={{width: `${review.rating/5*100}%`}}></div>
//                     </div>
//                     <p class="review_user">by {review.user.name}</p>
//                     <p class="review_comment">{review.comment}</p>

//                     <hr />
//                 </div>
//             ))
//             }
           
//         </div>
//     )
// }

export default function ProductReview({ reviews }) {
  return (
    <div className="w-full md:w-3/4 mx-auto mt-6">
      <h3 className="text-xl font-semibold text-gray-300 mb-2">Others' Reviews:</h3>
      <hr className="mb-4" />
      {reviews && reviews.map(review => (
        <div
          key={review._id}
          className="bg-gray-800 shadow-md rounded-lg p-4 mb-4"
        >
          {/* Star Rating Bar */}
          <div className="relative w-[120px] h-5 bg-gray-700 rounded overflow-hidden mb-2">
            <div
              className="absolute top-0 left-0 h-full bg-yellow-400"
              style={{ width: `${(review.rating / 5) * 100}%` }}
            />
          </div>

          <p className="text-sm text-gray-300 mb-1">
            <span className="font-semibold text-gray-700">by {review.user.name}</span>
          </p>

          <p className="text-gray-400">{review.comment}</p>
          <hr className="mt-4" />
        </div>
      ))}
    </div>
  );
}
