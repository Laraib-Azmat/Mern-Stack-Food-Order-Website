import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import './List.css'

const List = ({url}) => {

    const [list, setList] = useState([]);
  

    const fetchList = async ()=>{
        const response = await axios.get(`${url}/api/food/list`);
        if(response.data.success){
            setList(response.data.data)
        }else{
            toast.error(response.data.message);
        }
    }

    useEffect(()=>{
        fetchList()
    },[])

    const removeFood = async (foodId)=>{
   const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
   await fetchList();

   if(response.data.success){
    toast.success(response.data.message)
   }else{
    toast.error(response.data.message)
   }
    }

  return (
    <div className='list add flex-col'>
        <p>All Food List</p>
        <div className="list-table">

            <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item,i)=>{
                return(
                    <div key={i} className="list-table-format">
                        <img src={`${url}/images/`+item.image} alt="image" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={()=>removeFood(item._id)} className='delete-icon'><FontAwesomeIcon icon={faDeleteLeft} /></p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default List