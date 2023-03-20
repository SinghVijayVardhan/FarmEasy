import React,{useEffect, useState} from "react";
import UserSection from "./User";
import Edit from "./Edit";
import OfferList from "./offerList";
import ProductsList from "./productList";

export default function UserProfile() {
    const [page,setpage]=useState(true);
    const [op,setop] = useState(true);

    const changepage = (d)=>{
        setpage(d);
    }

    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem('user'));
        setop(data.farmer);
    },[op]);

    const setPage = ()=>{
        setpage(false);
    }

    if(page===true){
        return (
            <section style={{ backgroundColor: '#eee'}}>
            <UserSection setPage={setPage}/>
            <div className="container-fluid" style={{margin:'30px'}}>
                {op?<ProductsList />:<OfferList />}
            </div>
            </section>
        )
    }
    else{
        return(
            <Edit setpage={changepage}/>
        )
    }
}