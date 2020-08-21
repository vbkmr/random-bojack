import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

const DisplayImage = styled.div`
  background-image: url("${props => props.image}");
  height: 200px;
  width: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Loading = styled.h1`
  margin-left: 40vw;
  margin-top: 40vh;
`;

const INTERVAL_TIMER = 10000; // in ms

const Home = ({ imageUrls }) => {
  const [horsePic, setHorsePic] = useState(imageUrls[0].urls.full);

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
      console.log("error: page not found");
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
      <button>
        <Link href="/button">
          <a>Back to button</a>
        </Link>
      </button>
    </>
  );
};
export const getServerSideProps = async context => {
  const response = await fetch(`${process.env.HOST}/api/images/horse`);
  const result = await response.json();
  const imageUrls = result.results;
  return {
    props: { imageUrls }
  };
};

export default Home;
