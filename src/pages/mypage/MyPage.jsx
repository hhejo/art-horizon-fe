import Footer from "../../components/Footer";
import Info from "./components/Info";
import Arts from "./components/Arts";

const MyPage = () => {
  return (
    <>
      <section
        className="text-gray-600 body-font border-solid border-gray-50 border-b-2 bg-white"
        style={{ marginTop: "71px", minHeight: "87.5vh" }}
      >
        <div className="container py-24 mx-auto">
          <Info />
          <Arts />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyPage;
