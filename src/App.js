import "./App.css";
import Calculator from "./component/Calculator";
import { ThemeProvider } from "./component/ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <div className="wrapper">
          <Router>
            <Calculator />
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
