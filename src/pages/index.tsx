import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const DisplayImage = styled.div<{ image: string }>`
  background-image: url("${props => props.image}");
  width: 100%;
  height: 800px;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
`;
const Home: React.FC = () => {
  const [horsePic, setHorsePic] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(
          "https://api.unsplash.com/search/photos?&query=horse&client_id=qwsMPXru1mQVCIU13RhAMYvJGzWwIpjfVsICqncS-m4"
        )
        .then(response => {
          if (index <= 9) {
            setIndex(index + 1);
            setHorsePic(response.data.results[index].urls.regular);
          } else {
            setIndex(0);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [index]);
  return (
    <>
      <DisplayImage image={horsePic} />
    </>
  );
};
export default Home;
