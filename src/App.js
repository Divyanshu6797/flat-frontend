import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={HomePage()} /> {/* Home page */}
      <Route path="propertylist" element={<PropertyList />} />
      <Route path="propertylist/:id" element={<PropertyDetails />} />
    </Routes>
  </Router>
);

// HomePage component for the landing page with the big button
const HomePage = () => {
  return (
    <div style={styles.container}>
      <Link to="/propertylist" style={styles.button}>
        Let's go a big one
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(45deg, #ff6f61, #ffb6c1, #8e44ad)", // colorful gradient background
    fontFamily: "Arial, sans-serif",
    color: "#fff",
  },
  button: {
    backgroundColor: "#FF5733", // Bright red button
    padding: "20px 40px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
    borderRadius: "50px",
    textDecoration: "none", // Remove underline from the Link
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
  },
  buttonHover: {
    transform: "scale(1.1)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
  },
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
