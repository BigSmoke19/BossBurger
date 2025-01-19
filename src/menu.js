import { getItems } from "./state/items/itemsSlice";
import { addItem, removeItem} from "./state/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "./loading";
import './styles/menu.css'

const Menu = () => {

    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.items);

    const [currentItems,setCurrentItems] = useState(items);
    const [categories,setCategories] = useState([]);
    const [currentCat,setCurrentCat] = useState("all");
    const [cartItemsIDs,setCartItemsIDs] = useState([]);

    const cartItems = useSelector(state => state.cart.cartItems);

    const [arabic,setArabic] = useState(false);

    useEffect(() => {
        dispatch(getItems());
      }, [dispatch]);

    useEffect(()=>{
        const cats = new Set();
        if(items){
            items.forEach(item => {
                cats.add(item.category);
            });
        }
        setCategories(Array.from(cats));
        setCurrentItems(items);
    },[items]);

    useEffect(()=>{
        const orderItems = JSON.parse(localStorage.getItem("order"));
        if(orderItems){
            let ids = [];
            orderItems.forEach((item)=>{
                ids.push(item.id);
            });
            setCartItemsIDs(ids);
        }
    },[cartItems]);

    const handleMenu = (cat)=>{
        if(cat === "all"){
           setCurrentItems(items);
        }else{
            const newItems = [];
            if(items){
                items.forEach(item => {
                    if(item.category === cat){
                        newItems.push(item);
                    }
                });
            }
            setCurrentItems(newItems);
        }

    }

    const handleOrder = (item)=>{
        const orderItems = JSON.parse(localStorage.getItem("order"));
        if(cartItemsIDs.includes(item.id)){
            setCartItemsIDs(prev => prev.filter(id => id !== item.id));
            localStorage.setItem('order',JSON.stringify(orderItems.filter(i => i.id !== item.id)));
            dispatch(removeItem(item.id));
        }
        else{
            dispatch(addItem(item));
            let ids = [item.id];
            if(orderItems){
                localStorage.setItem("order",JSON.stringify([...orderItems,item]));
                
                orderItems.forEach((item)=>{
                    ids.push(item.id);
                });
                
            }else{
                localStorage.setItem("order",JSON.stringify([item]));
            }

            setCartItemsIDs(ids);
            
        }
        //console.log(JSON.stringify(cartItems))
    }

    return ( 
        <div className="menu" id="menu" >
            <div className="contact-header">
                <h1>Our Menu</h1>
                    <label className="switch">
                        <input type="checkbox" onChange={()=>setArabic(!arabic)} />
                        <div className="slider"></div>
                        <div className="slider-card">
                            <div className="slider-card-face slider-card-front">En</div>
                            <div className="slider-card-face slider-card-back">Ar</div>
                        </div>
                    </label>
                </div>
            {status === 'loading' && <Loading />}
            <div className="categories">
            <div className={(currentCat!== "all")?"category":"current-cat"} onClick={()=>{handleMenu("all");setCurrentCat("all");}}>
                        All
            </div>
            {status === 'succeeded' && (items.length === 0)?null:
                categories.map((category)=>(
                    <div key={category} className={(currentCat !== category)?"category":"current-cat"} onClick={()=>{handleMenu(category);setCurrentCat(category);}}>
                        {category}
                    </div>
                ))
            }
            </div>
            <div className="items-container">
            {status === 'succeeded' && (currentItems.length === 0)?<h2>No Items Yet....</h2>:
                currentItems.map((item)=>(
                    <div className="item-container" key={item.id}>
                        <div className="image-container">
                            <img className="item-image" src={`data:image/png;base64,${item.image}`} alt="item-image" />
                        </div>
                        <div className="item-info">
                            <p id="category" className="item-data">{item.category}</p>
                            <p id="name" className="item-data">{item.name}</p>
                            <p id="description" className="item-data">{(arabic)?(item.descriptionA)?item.descriptionA:"":item.description}</p>
                            <div className="item-data" id="item-footer">
                                <p id="price">{item.price}$</p>
                                <img onClick={()=>handleOrder(item)} className="cart-logo" src={`./images/${(cartItemsIDs.includes(item.id))?"cartr":"cart+"}.png`} alt="add-to-cart" />
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
            {error && <div>{error}</div>}
        </div>
     );
}
 
export default Menu;