import { NextApiRequest, NextApiResponse } from "next";
export default function getHorsePics(req: NextApiRequest, res: NextApiResponse){
   if(req.method === "GET"){
    let res =await fetch("https://api.unsplash.com/search/photos?&query=horse&client_id=qwsMPXru1mQVCIU13RhAMYvJGzWwIpjfVsICqncS-m4",{method: "GET"});
    let response =await res.json();
    return response;
    } 
}

