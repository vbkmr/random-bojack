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
const DisplayError = styled.h1<{ message: string }>`
  color: red;
`;

const INTERVAL_TIMER = 10000; // in ms
interface ImageUrl {
  urls: {
    full: string;
  };
}

interface Props {
  imageUrls: [ImageUrl] | null;
  errorMessage: null | string;
}

const Home: React.FC<Props> = ({ imageUrls, errorMessage }) => {
  const [horsePic, setHorsePic] = useState<string | null>(
    imageUrls ? imageUrls[0].urls.full : null
  );
  let index = 1;
  const setIntervalFunction = () => {
    if (imageUrls && imageUrls.length) {
      if (index <= imageUrls.length - 1) {
        setHorsePic(imageUrls[index].urls.full);
        index = index + 1;
      } else {
        setHorsePic(imageUrls[0].urls.full);
        index = 1;
      }
    } else {
      console.log("errorMessage: page not found");
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

  if (errorMessage) {
    return <DisplayError message={errorMessage} />;
  }
  if (!horsePic) {
    return <Loading>loading...</Loading>;
  } else return <DisplayImage image={horsePic} />;
};

export const getStaticProps = async () => {
  let imageUrls: [ImageUrl] | null = null;
  let errorMessage: null | string = null;
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?&query=horse&client_id=${process.env.CLIENT_ID}`
    );
    const result = await response.json();
    imageUrls = result.results;
  } catch (err) {
    errorMessage = "something bad happened";
  }
  return {
    props: { imageUrls, errorMessage }
  };
};

export default Home;
