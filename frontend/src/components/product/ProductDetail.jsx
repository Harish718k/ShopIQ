
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import Loader from '../layouts/Loader';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { toast } from "react-hot-toast";
import ProductReview from "./ProductReview";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { Star } from "lucide-react";

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const increaseQty = () => {
        const count = document.querySelector('.count');
        if (product.stock === 0 || count.valueAsNumber >= product.stock) return;
        setQuantity(count.valueAsNumber + 1);
    };

    const decreaseQty = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber === 1) return;
        setQuantity(count.valueAsNumber - 1);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData));
    };

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose();
            dispatch(clearReviewSubmitted());
            toast.success("Review Submitted Successfully");
        }

        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id));
        }

        return () => {
            dispatch(clearProduct());
        };
    }, [dispatch, id, isReviewSubmitted, error]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="flex flex-col lg:flex-row gap-10 px-4 py-8 max-w-7xl mx-auto">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2">
                            <Swiper
                                navigation
                                modules={[Navigation]}
                                className="rounded-xl"
                                >
                                {product.images?.map((image) => (
                                    <SwiperSlide key={image._id}>
                                    <img
                                        src={image.image}
                                        alt={product.name}
                                        className="w-full h-[400px] object-contain"
                                    />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Info Section */}
                        <div className="w-full lg:w-1/2 space-y-4">
                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                            <p className="text-gray-200 text-sm">Product ID: {product._id}</p>

                            <div className="flex items-center gap-2">
                                <div className="relative w-24 h-4 bg-gray-200 rounded">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-yellow-400 rounded"
                                        style={{ width: `${(product.ratings / 5) * 100}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-300">({product.numOfReviews} reviews)</span>
                            </div>

                            <p className="text-2xl font-bold text-green-600">${product.price}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                                <button onClick={decreaseQty} className="px-3 py-1 bg-red-500 text-white rounded">-</button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                    className="count w-12 text-center border rounded"
                                />
                                <button onClick={increaseQty} className="px-3 py-1 bg-emerald-500 text-white rounded">+</button>
                            </div>

                            <button
                                disabled={product.stock === 0}
                                onClick={() => {
                                    dispatch(addCartItem(product._id, quantity));
                                    toast.success(`${product.name} added to cart!`);
                                }}
                                className="mt-2 px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:bg-gray-400"
                            >
                                Add to Cart
                            </button>

                            <p className="mt-2">
                                Status:{" "}
                                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </p>

                            <div>
                                <h4 className="text-lg font-medium mt-4">Description:</h4>
                                <p className="text-gray-300">{product.description}</p>
                            </div>

                            <p className="text-sm text-gray-400">Sold by: <strong>{product.seller}</strong></p>

                            {user ? (
                                <button
                                    onClick={handleShow}
                                    className="mt-4 px-6 py-2 bg-emerald-600 text-gray-300 rounded hover:bg-emerald-700"
                                >
                                    Submit Your Review
                                </button>
                            ) : (
                                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                                    Login to post a review
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Review Modal */}
                    {show && (
                    <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg p-6 w-[90%] max-w-md shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Submit Review</h2>
                            <button onClick={handleClose} className="text-gray-300 hover:text-gray-700">&times;</button>
                        </div>

                        <ul className="flex gap-2 mb-3">
                            {[1, 2, 3, 4, 5].map(star => (
                            <li
                                key={star}
                                onClick={() => setRating(star)}
                                className={`cursor-pointer text-2xl ${star <= rating ? 'text-orange-400' : 'text-gray-400'}`}
                            >
                                <Star />
                            </li>
                            ))}
                        </ul>

                        <textarea
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border rounded p-2 mb-4"
                            placeholder="Write your review..."
                        />

                        <div className="text-right">
                            <button
                            disabled={loading}
                            onClick={reviewHandler}
                            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                            >
                            Submit
                            </button>
                        </div>
                        </div>
                    </div>
                    )}


                    {/* Reviews Section */}
                    {product.reviews && product.reviews.length > 0 && (
                        <ProductReview reviews={product.reviews} />
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}
