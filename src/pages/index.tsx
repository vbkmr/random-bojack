import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";

const DisplayImage = styled.div<{ image: string }>`
  background-image: url("${props => props.image}");
  width: 100%;
  height: 800px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface ImageUrl {
  urls: {
    full: string;
  };
}

interface ImageApiResponse {
  data: {
    results: [ImageUrl];
  };
}

const Home: React.FC = () => {
  const [horsePic, setHorsePic] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<[ImageUrl] | null>(null);
  
  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/search/photos?&query=horse&client_id=qwsMPXru1mQVCIU13RhAMYvJGzWwIpjfVsICqncS-m4"
      )
      .then((response: ImageApiResponse) => {
        setImageUrls(response.data.results);
      })
      .catch((error: ErrorConstructor) => {
        console.log(error);
      });
  }, []);

  let index = 0;
  const setIntervalFunction = () => {
    if (imageUrls !== null) {
      if (index <= imageUrls.length - 1) {
         setHorsePic(imageUrls[index].urls.full);
         index = index + 1;
      } else {
        setHorsePic(imageUrls[0].urls.full);
        index = 1;
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(setIntervalFunction, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [imageUrls]);

  return (
    <>
      <DisplayImage image={horsePic} />
    </>
  );
};
export default Home;
