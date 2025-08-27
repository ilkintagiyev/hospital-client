import dynamic from "next/dynamic";
import Main from "@/layout/Main";
import React from "react";
import AboutPage from "@/components/About";


const Page = () => {
  return (
    <Main>
      <AboutPage />
    </Main>
  );
};

export default Page;
