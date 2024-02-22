import "./App.css";
import Form from "./Form";
import logo from "../public/Cordel_logo.png";
function App() {
  return (
    <>
      <div>
        <img src={logo} alt="" className="mb-5, logo" />
      </div>
      <Form />
    </>
  );
}

export default App;
