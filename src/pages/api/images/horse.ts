const fetch = require('isomorphic-unfetch');
const url = "https://api.unsplash.com/search/photos?&query=horse&client_id=qwsMPXru1mQVCIU13RhAMYvJGzWwIpjfVsICqncS-m4";

import { NextApiRequest, NextApiResponse } from "next";
export default function getHorsePics(req: NextApiRequest, res: NextApiResponse) {
if(req.method === "GET") {
    const fetchData = async () => {
        let res = await fetch (url, {method: "GET"});
        let response = await res.json();
        return response;
    };
  }
};


    