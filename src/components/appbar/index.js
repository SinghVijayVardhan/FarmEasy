import { AppbarContainer, AppbarHeader, Applist } from "../../styles/appbar"
import Actions from "./action";
import React,{useState,useEffect} from "react";
import FarmerBar from "./FarmerBar";
import CompanyBar from "./CompanyBar";

export default function Appbar() {
    const [bar,setbar] = useState(false);
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('user'));
      setbar(data.farmer);
    },[bar])
    
    return (
        <AppbarContainer>
            <AppbarHeader>
                FarmEasy
            </AppbarHeader>
            {bar?<FarmerBar />:<CompanyBar />}
            <Actions />
        </AppbarContainer>
    )
}