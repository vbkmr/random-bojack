import { NextApiRequest, NextApiResponse } from "next";
const fetch = require("isomorphic-unfetch");

const url = `https://api.unsplash.com/search/photos?&query=horse&client_id=${process.env.CLIENT_ID}`;

export default async function getHorsePics(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let result = await fetch(url, { method: "GET" });
    let response = await result.json();
    res.send(response);
  } else {
    res.status(400);
    res.end();
  }
}


    