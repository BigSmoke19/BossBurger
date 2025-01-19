import { useSelector,useDispatch } from 'react-redux';
import './styles/order.css';
import { removeItem } from './state/cart/cartSlice';
import { useEffect, useState } from 'react';



const Order = ({scroll,handleCart}) => {

    const Items = useSelector(state => state.cart.cartItems);
    const [orderItems,setOrderItems] = useState(Items.map((item)=>({...item,quantity : 1})));
    const [total,setTotal] = useState(0);

    useEffect(()=>{
        const countDict = {};
        orderItems.forEach(item => {
            countDict[item.id] = (countDict[item.id] || 0) + item.quantity; 
        });
        setOrderItems(Items.map((item)=>({...item,quantity :(countDict[item.id])? countDict[item.id]: 1})));
    },[Items]);

    useEffect(()=>{
        let newTotal = 0;
        orderItems.forEach((item)=>{newTotal += (item.price * item.quantity)});
        setTotal(newTotal);
    },[orderItems]);

    //console.table(orderItems);
    const dispatch = useDispatch();


    const handleRemoveItem = (itemID) =>{
        const orderItems = JSON.parse(localStorage.getItem("order"));
        localStorage.setItem('order',JSON.stringify(orderItems.filter(item => item.id !== itemID)));
        dispatch(removeItem(itemID));
    }

    const handleQuanity = (id,sign) =>{
        if(sign === "add"){
            setOrderItems(prev => prev.map((item)=>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        }else{
            setOrderItems(prev => prev.map((item)=>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ));
        }
    }

    const handleConfirm = ()=>{
        const phoneNumber = '+96171271468'; 
        const message = orderItems.map(item => `${item.quantity} ${item.name}`).join('\n');
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappLink, '_blank');
    }
     
    return ( 
        <div className={(!scroll)?"order":"order-scroll"}>
            <div className='order-header'>           
                <span className='exit' onClick={handleCart}>X</span>
                <span className='order-title'>order</span>
            </div>
            <div className="order-items">
                { orderItems && orderItems.map((item)=>(
                    <div className="order-item-container" key={item.id}>
                        <div className="order-image-container">
                            <img className="order-item-image" src={`data:image/png;base64,${item.image}`} alt="item-image" />
                        </div>
                        <div className="order-item-info">
                            <div id="category-container">
                                <div className='category-div'><p id="order-category" >{item.category}</p></div>
                                <div className='quantity-container'>
                                    <img onClick={()=>handleQuanity(item.id,"add")} className='add-logo' src="./images/plus.png" alt="plus" />
                                    <span className='quantity'>{item.quantity}</span>
                                    <img onClick={()=>(item.quantity > 1)?handleQuanity(item.id,"minus"):()=>{}} className='add-logo' src="./images/minus.png" alt="minus" />
                                </div>
                            </div>
                            <p id="name" className="item-data">{item.name}</p>
                            <p id="description" className="item-data">{item.description}</p>
                            <div id='item-footer' className="item-data">
                                <p id="price">{item.price}$</p>
                                <img onClick={()=>handleRemoveItem(item.id)} className='bin-logo' src="./images/bin.png" alt="" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!orderItems && <div>No Order Yet!</div>}
            <div className='order-total'>
               <div>
               <span>total: </span><span className='total'>{total}$</span>
               </div>
               <div className='confirm-button'><button onClick={handleConfirm} className='confirm'>Confirm Order</button></div>
            </div>
        </div>
     );
}
 
export default Order;