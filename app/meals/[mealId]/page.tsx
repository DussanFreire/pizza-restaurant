import React from "react";

type PageProps = {
  params: {
    mealId: string;
  };
};

async function Page({ params }: PageProps) {
  const { mealId } = await params;
  console.log(params);

  return <div>{mealId}</div>;
}

export default Page;
