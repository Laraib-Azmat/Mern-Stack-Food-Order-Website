import React, { useState } from 'react'
import './Add.css'
import uploadImg from '../../../assets/Upload.gif';
import axios from 'axios';
import { toast } from 'react-toastify';


const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:'',
        description:'',
        price:'',
        category:'Salad'
    });

    const onChangeHandler = (event)=>{
            const name = event.target.name;
            const value = event.target.value;
            setData(prev=>({...data,[name]:value})) 
    }
    
    const onSubmitHandler = async (e)=>{
            e.preventDefault();
            const formData = new FormData();
            formData.append("name",data.name);
            formData.append("description",data.description);
            formData.append("price",Number(data.price));
            formData.append("category",data.category);
            formData.append("image",image);

            const response = await axios.post(`${url}/api/food/add`,formData);
            if(response.data.success){
                    setData({
                        name:'',
                        description:'',
                        price:'',
                        category:'Salad'
                    });
                    setImage(false);
                    toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
    }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
 
     <div  className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):uploadImg} alt='upload' />
            </label>
            <input type='file' onChange={(e)=>setImage(e.target.files[0])} id='image' hidden required />
     </div>

     <div className="add-name flex-col">
        <p>Food Name</p>
        <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Type here' />
     </div>

     <div className="add-description flex-col">
        <p>Food description</p>
        <textarea name='description' rows="6" onChange={onChangeHandler} value={data.description} placeholder='Write Description here' required></textarea>
     </div>

     <div className="add-category-price">
        <div className="add-category flex-col">
            <p>Food category</p>
            <select name='category' onChange={onChangeHandler} value={data.category} > 
                <option value='Salad'>Salad</option>
                <option value='Rolls'>Rolls</option>
                <option value='Deserts'>Deserts</option>
                <option value='Sandwich'>Sandwich</option>
                <option value='Cake'>Cake</option>
                <option value='PureVeg'>Pure veg</option>
                <option value='Pasta'>Pasta</option>
                <option value='Noodles'>Noodles</option>
            </select>
        </div>

        <div className="add-price flex-col">
            <p>Food Price</p>
            <input type='Number' name='price' onChange={onChangeHandler} value={data.price} />
        </div>
     </div>

     

     <button type='submit' className='add-btn' >ADD</button>

        </form>
    </div>
  )
}

export default Add