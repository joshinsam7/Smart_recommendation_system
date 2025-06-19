import React from 'react';
import { useEffect,useState } from 'react';
import '../CSS/HomePage.css';

function Home() {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8383/api/products?page=${page}&limit=24`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched products:", data); 
                setProducts(data);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setProducts([]); 
            });
    }, [page]);


    const handleSearch = () => {
        setBackgroundColor(backgroundColor === 'white' ? 'lightblue' : 'white');
    };

    const handleLike = (asin, name, element) => {
        console.log("Like button clicked for ASIN:", name);
        element.classList.toggle("fa-thumbs-down");

        fetch(`http://localhost:8383/api/products/like/${asin}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log("Like response:", data);
        })
        .catch(err => {
            console.error("Error liking product:", err);
        });
    };

    return (
        <div className='Home-Main-Container'>
            <div className='home-dashboard'>
                <input type='text' placeholder='Search' />
                <button className="home-button-search" onClick={handleSearch}>Go</button>
            </div>

            <div className="homepage">
                <h2>Movie's List</h2>
                <div className="product-grid">
                {Array.isArray(products) && products.map((p) => (
                    <div className="product-card" key={p.asin}>
                        {
                            console.log(p.image_url)
                        }
                        <img src={p.image_url} alt={p.title} />
                        <h4>{p.name}</h4>
                        { 
                            p.price != null ? <p>Price: ${p.price}</p> : <p>Free</p> 
                        }
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                        <i onClick={(e) => handleLike(p.asin, p.name, e.currentTarget)} className="fa fa-thumbs-up"></i>
                    </div>
                ))}
                </div>
            </div>
            <button onClick={() => setPage(page => page - 1)} disabled={page === 1}>Prev</button>
            <button onClick={() => setPage(page => page + 1)}>Next</button>
        </div>
    );
}

export {Home} ;