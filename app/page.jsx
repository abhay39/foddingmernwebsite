
import MainPage from "@/layout/Main";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <div className="">
        <MainPage />
      </div>
    </Suspense>
  );
}
