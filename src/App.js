import "./App.css";
import Calculator from "./component/Calculator";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <Calculator />
        </Router>
      </div>
    </div>
  );
}

export default App;
