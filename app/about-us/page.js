import React from "react";
import PageLayout from "@/components/partials/PageLayout";
import AboutUsPage from "@/components/pages/AboutUsPage";

export const metadata = {
  title: "Citiinfo – Australia Business Directory | About Our Platform",
  description:
    "Learn about Citiinfo, an Australia business directory helping users discover local businesses and services while enabling companies to promote their listings online.",
};

const page = () => {
  return (
    <>
      <PageLayout>
        <AboutUsPage />
      </PageLayout>
    </>
  );
};

export default page;
