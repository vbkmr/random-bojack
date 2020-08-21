import React from "react";
import Link from "next/link";

const clickHere = () => {
  return (
    <>
      <h1>Click here on this button</h1>
      <button>
        <Link href="/ssr">
          <a>click me to go to SSR</a>
        </Link>
      </button>
    </>
  );
};
export default clickHere;
