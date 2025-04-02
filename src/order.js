import { useSelector,useDispatch } from 'react-redux';
import './styles/order.css';
import { removeItem } from './state/cart/cartSlice';
import { useEffect, useState } from 'react';



const Order = ({scroll,handleCart,arabic}) => {

    const Items = useSelector(state => state.cart.cartItems);
    const [orderItems,setOrderItems] = useState(Items.map((item)=>({...item,quantity : 1})));
    const [total,setTotal] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        setOrderItems(prevOrderItems => {
            const countDict = {};
            prevOrderItems.forEach(item => {
                countDict[item.id] = (countDict[item.id] || 0) + item.quantity;
            });
    
            return Items.map(item => ({
                ...item,
                quantity: countDict[item.id] ? countDict[item.id] : 1,
                ...(item.checkedSubs && item.checkedSubs.length !== 0 ? { quantity: item.checkedSubs.length } : {}),
            }));
        });
    }, [Items]);

    useEffect(()=>{
        let newTotal = 0;
        orderItems.forEach((item)=>{newTotal += (item.price * item.quantity)});
        setTotal(newTotal.toFixed(2));
    },[orderItems]);

    useEffect(()=>{
        orderItems.forEach((item)=>{
            if(item.quantity === 0){
                dispatch(removeItem(item.id));
            }
        })
    },[orderItems,dispatch])

    


    const handleRemoveItem = (itemID) =>{
        dispatch(removeItem(itemID));
    }

    const handleQuanity = (id,sign) =>{
        if(sign === "add"){
            setOrderItems(prev => prev.map((item)=>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        }else{
            setOrderItems(prev => prev.map((item)=>
                item.id === id ? { ...item, quantity: (item.checkedSubs && item.checkedSubs.length !== 0)?(item.quantity === item.checkedSubs.length)?item.quantity:item.quantity - 1:item.quantity - 1 } : item
            ));
        }
    }

    const handleConfirm = ()=>{
        const phoneNumber = '+96171271468'; 
        const message = orderItems.map(item => `- ${item.quantity} ${item.name} \n ${(item.checkedSubs.length !== 0)?"SubItems: "+ item.checkedSubs.join(',')+"\n":""}  ${(item.addedIngredients.length !== 0)?"Added Ingredients: "+item.addedIngredients.join(',')+"\n":""} ${(item.notes.trim() !== "")?"Notes: "+item.notes+"\n":""} subtotal: ${item.quantity * item.price}$`).join('\n \n');
        const finalMessage = `\n \n ${message}\nTotal: ${total}$`;
        const encodedMessage = encodeURIComponent(finalMessage);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappLink, '_blank');

        console.log(orderItems);
    }


    const handleAddsCheck = (e,oldItem) =>{
        setOrderItems(prev => prev.map((item)=>
            item.id === oldItem.id ? { ...item, addsChecked: e.target.checked } : item
        ));

    }

    const handleAddSubs = (e,oldItem,sub) =>{
        (e.target.checked)?
        setOrderItems(prev => prev.map((item)=>
            item.id === oldItem.id ? { ...item, checkedSubs: [...item.checkedSubs, sub],quantity:item.checkedSubs.length } : item
        )):
        setOrderItems(prev => prev.map((item)=>
            item.id === oldItem.id ? { ...item,checkedSubs: item.checkedSubs.filter(s => s !== sub) } : item
        ));


        setOrderItems(prev => prev.map((item)=>
            item.id === oldItem.id ? { ...item,quantity:item.checkedSubs.length } : item
        ));


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
                            <div className="item-data" id="category-container">
                                <div className='category-div'><p id="order-category" >{item.category}</p></div>
                                <div className='quantity-container'>
                                    <img onClick={()=>handleQuanity(item.id,"add")} className='add-logo' src="./images/plus.png" alt="plus" />
                                    <span className='quantity'>{item.quantity}</span>
                                    <img onClick={()=>(item.quantity > 1)?handleQuanity(item.id,"minus"):()=>{}} className='add-logo' src="./images/minus.png" alt="minus" />
                                </div>
                            </div>
                            <div className="item-data">
                                <p id="name" >{item.name}
                                {item.additions && <span className="adds">{item.additions}
                                    <input type="checkbox" checked={item.addsChecked} onChange={(e)=>handleAddsCheck(e,item)} /></span>}
                                </p>
                            </div>
                            {!item.subItems && <p  id="description" className="item-data">{(arabic)?(item.descriptionA)?item.descriptionA:"":item.description}</p>}
                          {item.subItems && <p id="description" className="item-data">
                            {(item.subItems.length !== 0)?item.subItems.map((sub)=>(
                                <span key={item.subItems.indexOf(sub)} className="subItems">{sub}
                                 <input type="checkbox" onChange={(e)=>handleAddSubs(e,item,sub)} checked={item.checkedSubs.includes(sub)}  /></span>
                            ))
                            :(arabic)?(item.descriptionA)?item.descriptionA:"":item.description}
                            </p>}
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
               <div className='confirm-button'><button onClick={handleConfirm} className='confirm'>{(arabic)?"تاكيد الطلب":"Confirm Order"}</button></div>
            </div>
        </div>
     );
}
 
export default Order;