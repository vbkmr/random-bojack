import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const DisplayImage = styled.div<{ image: string[] }>`
  background-image: url("${props => props.image}");
  width: 100%;
  height: 800px;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface ImageUrl {
  urls: {
    regular: [string];
  };
}

interface ImageApiResponse {
  data: {
    results: [ImageUrl];
  };
}

const Home: React.FC = () => {
  const [horsePic, setHorsePic] = useState<string[]>([]);
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
  useEffect(() => {
    if (imageUrls !== null) {
      const interval = setInterval(() => {
        if (index <= imageUrls.length - 1) {
          index = index + 1;
          setHorsePic(imageUrls[index].urls.regular);
          console.log( "shilpi");
        } else {
          index = 0;
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [imageUrls]);

  return (
    <>
      <DisplayImage image={horsePic} />
    </>
  );
};
export default Home;
