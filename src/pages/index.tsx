import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const DisplayImage = styled.div<{ image: string }>`
  background-image: url("${(props) => props.image}");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Loading = styled.h1`
  margin-left: 40vw;
  margin-top: 40vh;
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

const INTERVAL_TIMER = 10000; // in ms

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
    if (imageUrls !== null) {
      setHorsePic(imageUrls[0].urls.full);
    }

    const interval = setInterval(setIntervalFunction, INTERVAL_TIMER);
    return () => {
      clearInterval(interval);
    };
  }, [imageUrls]);

  if (!horsePic) {
    return <Loading>loading...</Loading>;
  }

  return (
    <>
      <DisplayImage image={horsePic} />
    </>
  );
};
export default Home;
