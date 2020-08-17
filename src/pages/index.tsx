import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";

const DisplayImage = styled.div<{ image: string }>`
  background-image: url("${props => props.image}");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Loading = styled.h1`
  margin-left: 40vw;
  margin-top: 40vh;
`;

const INTERVAL_TIMER = 10000; // in ms

const Home: React.FC = ({ imageUrls }) => {
  const [horsePic, setHorsePic] = useState<string>("");

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
export const getStaticProps = async () => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?&query=horse&client_id=${process.env.CLIENT_ID}`
  );
  const result = await response.json();
  const imageUrls = result.results;
  return {
    props: { imageUrls }
  };
};
export default Home;
