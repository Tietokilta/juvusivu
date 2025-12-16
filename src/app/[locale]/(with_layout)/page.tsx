import Header from "@components/Header";
import MainPage from "@components/MainPage";

export default async function Home() {
  return (
    <>
      <Header text="Tietokilta 40" animated />
      <MainPage />
    </>
  );
}
