import Footer from "../../layouts/footer";
import NavBar from "../../layouts/navbar";

import "./style.scss"
function ErrorPage({ errorStatus, errorMessage = "Page not found. Please try again!" }) {
  return (
    <>
      <NavBar />
      <div className="error-wrapper">
        <h1 className="error-status">{errorStatus}</h1>
        <p className="error-message">{errorMessage}</p>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
