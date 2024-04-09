

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductListingPage() {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);

	const fetchProducts = async () => {
		const res = await fetch(`https://dummyjson.com/products?limit=100`);
		const data = await res.json();

		if (data && data.products) {
			setProducts(data.products);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const selectPageHandler = (selectedPage) => {
		if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 10) && selectedPage !== page) {
			setPage(selectedPage);
		}
	};

	return (
		<div>
			{products.length > 0 && (
				<div className="products">
					{products.slice((page - 1) * 10, page * 10).map((prod) => (
						<Link to={`/products/${prod.id}`} key={prod.id}>
							<div className="products__single">
								<img src={prod.thumbnail} alt={prod.title} />
								<span>{prod.title}</span>
								<p>{prod.price}</p>
							</div>
						</Link>
					))}
				</div>
			)}

			{products.length > 0 && (
				<div className="pagination">
					<span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>
					{[...Array(Math.ceil(products.length / 10))].map((_, i) => (
						<span key={i + 1} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>
							{i + 1}
						</span>
					))}
					<span onClick={() => selectPageHandler(page + 1)} className={page < Math.ceil(products.length / 10) ? "" : "pagination__disable"}>▶</span>
				</div>
			)}
		</div>
	);
}

export default ProductListingPage;
