import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { Link } from "react-router-dom";

let ProductList = () => {
   
    const productData = useSelector((state)=>state.product);
    const productID = useSelector((state)=>state.productadded);
    const [isLoading,setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("Inside Users useEffect")
        if (productData.length==0) {
            callApi();
        } else {
            setIsLoading(false);
        }
    },[])
    let callApi = async () => {
        //fetch is used to make api calls.
        let res = await fetch('https://dummyjson.com/products');
        let jsonResponse = await res.json();
        console.log(jsonResponse);
        //Adding custom delay
        setTimeout(()=>{
            dispatch(addProduct(jsonResponse.products));
            setIsLoading(false);
        },2000)
    }
    
    function addproducts() {
        dispatch(addToCart());
    }; 
    
    return isLoading ? 
        (<div>
        <h4>Loading user data...</h4>
        </div>) 
        : 
        (
        <div>
            <h2 style={{textAlign:'center'}}>Posts</h2>
            <div className="posts-container">
            {
                productData.map((products)=>{
                    return (
                        <div className="post-card">
                            
                                <img src={products.thumbnail}></img>
                                <p className="post_title">Title: {products.title}</p>
                                <p className="post_price">Price: ${products.price}</p>   
                                <button onClick={addproducts(products.id)}>Add to cart</button>   
                                <Link to={'/cart'}>go to cart</Link>              
                        </div>
                        
                    )
                    
                })
                
            }
        </div>
        </div>
        
    )
}

export default ProductList;