import IntroPage from "./IntroPage.tsx";
import { useState } from "react";
import MainPage from "./MainPage.tsx";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete ? (
        <IntroPage onComplete={() => setIntroComplete(true)} />
      ) : (
        <MainPage />
      )}
    </>
  );
}
