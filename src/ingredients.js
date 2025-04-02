import { useState } from 'react';
import './styles/ingredeints.css';

const Ingredeints = ({item,handleSave,handleClose,arabic}) => {
    const [checked,setChecked] = useState([]);
    const [notes,setNotes] = useState("");

    const handleAddIng = (ing) =>{
        (checked.includes(ing))?
        setChecked(prev => prev.filter(i => i !== ing))
        :
        setChecked(prev => [...prev,ing])
        ;
    }

    const handlePreSave = () =>{
        handleSave({...item,addedIngredients: checked,notes: notes});
        handleClose();
    }

    return ( 
        <div className='ing-container'>
            <button className='close-btn' onClick={handleClose}>X</button>
            <h2 className='ing-title'>{(arabic)?"اضافات":"Additions"}</h2>
            <div className='ings'>
            {(!item.ingredients || item.ingredients?.length === 0 ) && <div>No Additions for this item</div>}
            {item.ingredients && item.ingredients.map((ing)=>(
                <span key={item.ingredients.indexOf(ing)} >{ing}
                <input type="checkbox" onChange={()=>handleAddIng(ing)} checked={checked.includes(ing)}  />
                </span>
            ))}
            </div>
            <h2 className='ing-title'>{(arabic)?"ملاحظات":"Notes"}</h2>
            <textarea placeholder='Notes here...' className='notes' value={notes} onChange={(e)=>{setNotes(e.target.value)}}/>
            <button className='save-btn' onClick={()=>handlePreSave()}>Save</button>
        </div>
     );
}
 
export default Ingredeints;