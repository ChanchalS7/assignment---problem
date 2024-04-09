

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchProductDetails = async () => {
			const res = await fetch(`https://dummyjson.com/products/${productId}`);
			const data = await res.json();

			console.log(data);

			if (data) {
				setProduct(data);
			}
		};

		fetchProductDetails(); // Call fetchProductDetails inside the useEffect callback
	}, [productId]); // Include productId in the dependency array

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Product Details Page</h1>
			<img src={product.thumbnail} alt={product.title} />
			<h2>{product.title}</h2>
			<p>{product.description}</p>
			<p>Price: {product.price}</p>
			<p>Discount: {product.discountPercentage}%</p>
			<p>Rating: {product.rating}</p>
			<p>Brand: {product.brand}</p>
			<p>Category: {product.category}</p>
		</div>
	);
}

export default ProductDetailsPage;
