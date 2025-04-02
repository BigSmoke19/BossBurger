import { getItems } from "./state/items/itemsSlice";
import { addItem, removeItem} from "./state/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "./loading";
import './styles/menu.css';
import axios from "axios";
import Ingredeints from "./ingredients";
import { getCats } from "./state/categories/categoriesSlice";

const Menu = ({arabic,setArabic}) => {

    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.items);
    const { categories , status : categoriesStatus, error : categoriesError } = useSelector((state) => state.categories);

    const [intialItems,setIntialItems] = useState([]);

    const [currentItems,setCurrentItems] = useState([]);
    //const [categories,setCategories] = useState([]);
    const [currentCat,setCurrentCat] = useState("all");
    const [cartItemsIDs,setCartItemsIDs] = useState([]);

    const cartItems = useSelector(state => state.cart.cartItems);

    const [ingredItemID,setIngredItemID] = useState(null);

    useEffect(() => {
        dispatch(getItems());
      }, [dispatch]);
      
    useEffect(() => {
        dispatch(getCats());
      }, [dispatch]);

      useEffect(() => {
        const handleSave = async (text) => {
            try {
                await axios.post('http://192.168.2.100:8000/save', { text });
                alert('Text data saved');
            } catch (error) {
                console.error('Error saving text data:', error);
            }
        };

        const handleRetrieve = async () => {
            try {
                const response = await axios.get('http://192.168.2.100:8000/retrieve');
                return response.data.text;
            } catch (error) {
                console.error('Error retrieving text data:', error);
            }
        };

        const fetchData = async () => {
            console.log("fetch");


            
            setIntialItems(items);



            try {
                const response = await axios.get('http://192.168.2.100:8000/retrieve');
                if(response.status === 200){

                    if (items.length !== 0) {
                    
                       await handleSave(JSON.stringify(items));
                       
                   } else {
                       const retrievedData = await handleRetrieve();
                       setIntialItems(JSON.parse(retrievedData));
                   }
               }
            } catch (error) {
                console.log("no server found");
            }
    
            

        };

        fetchData();
    }, [items]);

    useEffect(()=>{
        const sortedItems = [...items].sort((a, b) => {
            const categoryComparison = categories.indexOf(a.category) - categories.indexOf(b.category);
            if (categoryComparison === 0) {
              // If categories are the same, sort alphabetically by name
              return a.name.localeCompare(b.name);
            }
            return categoryComparison;
          });
          
          setCurrentItems(sortedItems);
          
    },[intialItems]);

    /*useEffect(()=>{
        const cats = new Set();
            if (intialItems) {
                intialItems.forEach(item => {
                    cats.add(item.category);
                });
            }
            const stringArray = Array.from(cats);
            const sortedArray = stringArray.sort((a, b) => a.localeCompare(b));
            setCategories(sortedArray);
    },[intialItems])*/

    useEffect(()=>{
            let ids = [];
            cartItems.forEach((item)=>{
                ids.push(item.id);
            });
            setCartItemsIDs(ids);
    },[cartItems]);



    const handleMenu = (cat)=>{
        if(cat === "all"){
            const sortedItems = [...items].sort((a, b) => {
                const categoryComparison = categories.indexOf(a.category) - categories.indexOf(b.category);
                if (categoryComparison === 0) {
                  // If categories are the same, sort alphabetically by name
                  return a.name.localeCompare(b.name);
                }
                return categoryComparison;
              });
              
              setCurrentItems(sortedItems);
              
        }else{
            let newItems = [];
            if(intialItems){
                intialItems.forEach(item => {
                    if(item.category === cat){
                        newItems.push(item);
                    }
                });
            };
            newItems = [...newItems].sort((a, b) => a.category.localeCompare(b.category));
            setCurrentItems(newItems);
        }

    }

    const handleOrder = (item)=>{
        if(cartItemsIDs.includes(item.id)){
            setCartItemsIDs(prev => prev.filter(id => id !== item.id));
            dispatch(removeItem(item.id));
        }
        else{
            if(!item.subItems){
                dispatch(addItem(item));
            }else{
                if(item.subItems.length === 0){
                    dispatch(addItem(item));
                }else{
                    if(item.checkedSubs.length !== 0){
                        dispatch(addItem(item));
                    }
                }
            }
            
            
           
        }
        
    }

    const handlePreOrder = (item) =>{

    
            if(cartItemsIDs.includes(item.id)){
                setCartItemsIDs(prev => prev.filter(i => i !== item.id));
                dispatch(removeItem(item.id));
            }else{
                setIngredItemID(item.id);
            }
       
        
        
    }

    /*const handleAddsCheck = (e,oldItem) =>{
        setCurrentItems(prev => prev.map((item)=>
            item.id === oldItem.id ? { ...item, addsChecked: e.target.checked } : item
        ));

        if(cartItemsIDs.includes(oldItem.id))
            { handleOrder(oldItem)};

    }*/

    const handleAddSubs = (e,oldItem,sub) =>{
        (e.target.checked)?
        setCurrentItems(prev => prev.map((item)=>
            item.id === oldItem.id ? { ...item, checkedSubs: [...item.checkedSubs, sub] } : item
        )):
        setCurrentItems(prev => prev.map((item)=>
            item.id === oldItem.id ? { ...item,checkedSubs: item.checkedSubs.filter(s => s !== sub) } : item
        ));

        if(cartItemsIDs.includes(oldItem.id))
            { handleOrder(oldItem)};
    }

    const handleChangeCat = (category) =>{
        setCurrentCat(category);
        handleMenu(category);
    };

    const handleIngredientsClose = () =>{
        setIngredItemID(null);
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
            {(status === 'succeeded' && (currentItems.length === 0) )|| status === 'loading'?null: <div className={(currentCat!== "all")?"category":"current-cat"} onClick={()=>{handleMenu("all");setCurrentCat("all");}}>
                        All
            </div>}
            {(status === 'succeeded' && (currentItems.length === 0) )|| status === 'loading'?null:
                categories.map((category)=>(
                    <div key={category} className={(currentCat !== category)?"category":"current-cat"} onClick={()=>{handleChangeCat(category)}}>
                        {category}
                    </div>
                ))
            }
            </div>
            <div className="items-container">
            {status === 'succeeded'  && currentItems && (currentItems.length === 0)?<h2>No Items Yet....</h2>:
                (!currentItems || (status === "loading"))?null:currentItems.map((item)=>(
                    <div className="item-container" key={item.id}>
                        <div className="image-container">
                            <img className="item-image" src={`data:image/png;base64,${item.image}`} alt="item-image" />
                        </div>
                        <div className="item-info">
                            <p id="category" className="item-data">{item.category}</p>
                            <div className="item-data">
                                <p id="name" >{item.name}
                                </p>
                            </div>
                          {item.subItems.length === 0 && <p id="description" className="item-data">{(arabic)?(item.descriptionA)?item.descriptionA:"":item.description}</p>}
                          {item.subItems && item.subItems.length !== 0 && <p id="description" className="item-data">
                            {(item.subItems.length !== 0)?item.subItems.map((sub)=>(
                                <span key={item.subItems.indexOf(sub)} className="subItems">{sub}
                                 <input type="checkbox" onChange={(e)=>handleAddSubs(e,item,sub)} checked={Array.isArray(item.checkedSubs) && item.checkedSubs.includes(sub)}  />
                                 </span>
                            ))
                            :(arabic)?(item.descriptionA)?item.descriptionA:"":item.description}
                            </p>}
                            <div className="item-data" id="item-footer">
                                <p id="price">{item.price}$</p>
                                <img onClick={()=>handlePreOrder(item)} className="cart-logo" src={`./images/${(cartItemsIDs.includes(item.id))?"cartr":"cart+"}.png`} alt="add-to-cart" />
                            </div>
                            {ingredItemID === item.id && <Ingredeints item={item} handleClose={handleIngredientsClose} handleSave={handleOrder} arabic={arabic} />}
                        </div>
                    </div>
                ))
            }
            </div>
            {error && console.log(error)}
        </div>
     );
}
 
export default Menu