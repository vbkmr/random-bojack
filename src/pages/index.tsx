import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  results: [ImageUrl];
}

const INTERVAL_TIMER = 10000; // in ms

const Home: React.FC = () => {
  const [horsePic, setHorsePic] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<[ImageUrl] | null>(null);

  useEffect(() => {
      const fetchData = async () => {
      const res = await fetch("/api/images/horse");
      const response:ImageApiResponse = await res.json();
      setImageUrls(response.results);
    };
    fetchData();
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
