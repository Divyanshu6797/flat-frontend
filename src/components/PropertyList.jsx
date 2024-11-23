import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    minRent: "0",
    maxRent: "50000",
    minDeposit: "0",
    maxDeposit: "100000",
    minDistanceBusStop: "0",
    maxDistanceBusStop: "10",
    minDistanceOracle: "0",
    maxDistanceOracle: "10",
    minDistanceFlipkart: "0",
    maxDistanceFlipkart: "10",
    furnishing: "All",
    gatedSecurity: "All",
    considering: "All",
    visited: "All",
  });

  const [newProperty, setNewProperty] = useState({
    link: "",
    ownerName: "",
    description: "",
    rent: "",
    maintenance: "",
    furnishing: "",
    deposit: "",
    considering: "",
    location: "",
    distanceBusStop: "",
    brokerNo: "",
    considered: "",
    visited: "",
    distanceOracle: "",
    distanceFlipkart: "",
    comments: "",
    area: "",
    gatedSecurity: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://flat-backend.onrender.com/api/property/getpropertylist")
      .then((response) => {
        console.log(response.data)
        setProperties(response.data);
        setFilteredProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching property list:", error);
      });
  }, []);

  const handleAddProperty = () => {
    setShowForm(true);
  };
  const handleDeleteProperty = (id) => {
    // Send the POST request to delete the property
    axios
      .post("https://flat-backend.onrender.com/api/property/deleteproperty", { id })
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted property from the lists
          setProperties(properties.filter((property) => property.id !== id));
          setFilteredProperties(filteredProperties.filter((property) => property.id !== id));
          
          // Show success message
          
            alert("Property deleted successfully!");
          
          
        } else {
          alert("Error deleting the property. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error deleting property:", error);
        alert("An error occurred while deleting the property.");
      });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert number fields to numbers
    const numberFields = ['rent', 'maintenance', 'deposit', 'distanceBusStop', 'distanceOracle', 'distanceFlipkart'];
    const processedValue = numberFields.includes(name) ? Number(value) : value;
    setNewProperty({ ...newProperty, [name]: processedValue });
  };

  const handleSaveNewProperty = () => {
    axios
      .post("https://flat-backend.onrender.com/api/property/addproperty", newProperty)
      .then((response) => {
        // Success: Show success message and update the state
        alert("Property added successfully!");
        
        setProperties([response.data, ...properties]);
        setFilteredProperties([response.data, ...filteredProperties]);
        setShowForm(false);
        setNewProperty({
          link: "",
          ownerName: "",
          description: "",
          rent: "",
          maintenance: "",
          furnishing: "",
          deposit: "",
          considering: "",
          location: "",
          distanceBusStop: "",
          brokerNo: "",
          considered: "",
          visited: "",
          distanceOracle: "",
          distanceFlipkart: "",
          comments: "",
          area: "",
          gatedSecurity: "",
        });
      })
      .catch((error) => {
        // Error: Show error message and redirect to property list page
        console.error("Error adding new property:", error);
        const errorMessage = error.response?.data?.message || "Failed to save property.";
        
        // Alert with specific error message
        alert(errorMessage);
  
        // Redirect to Property List page
        navigate("/propertylist");
      });
  };
  
  const handleView = (property) => {
    navigate(`/propertylist/${property.id}`, { state: { property } });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = properties.filter((property) => {
      return (
        (parseInt(property.rent) >= parseInt(filters.minRent) && parseInt(property.rent) <= parseInt(filters.maxRent)) &&
        (parseInt(property.deposit) >= parseInt(filters.minDeposit) && parseInt(property.deposit) <= parseInt(filters.maxDeposit)) &&
        (parseInt(property.distanceBusStop) >= parseInt(filters.minDistanceBusStop) && parseInt(property.distanceBusStop) <= parseInt(filters.maxDistanceBusStop)) &&
        (parseFloat(property.distanceOracle) >= parseFloat(filters.minDistanceOracle) && parseFloat(property.distanceOracle) <= parseFloat(filters.maxDistanceOracle)) &&
        (parseFloat(property.distanceFlipkart) >= parseFloat(filters.minDistanceFlipkart) && parseFloat(property.distanceFlipkart) <= parseFloat(filters.maxDistanceFlipkart)) &&
        (filters.furnishing === "All" || property.furnishing === filters.furnishing) &&
        (filters.gatedSecurity === "All" || property.gatedSecurity === filters.gatedSecurity) &&
        (filters.considering === "All" || property.considering === filters.considering) &&
        (filters.visited === "All" || property.visited === filters.visited)
      );
    });
    setFilteredProperties(filtered);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Property List</h1>

      <button onClick={toggleFilterDropdown} style={styles.button}>Filter Properties</button>

      {showFilterDropdown && (
        <div style={styles.filterDropdown}>
          <div style={styles.filterRow}>
            <label>Min Rent:</label>
            <input
              type="number"
              name="minRent"
              value={filters.minRent}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
            <label>Max Rent:</label>
            <input
              type="number"
              name="maxRent"
              value={filters.maxRent}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterRow}>
            <label>Min Deposit:</label>
            <input
              type="number"
              name="minDeposit"
              value={filters.minDeposit}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
            <label>Max Deposit:</label>
            <input
              type="number"
              name="maxDeposit"
              value={filters.maxDeposit}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterRow}>
            <label>Furnishing:</label>
            <select
              name="furnishing"
              value={filters.furnishing}
              onChange={handleFilterChange}
              style={styles.filterInput}
            >
              <option value="All">All</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="None">None</option>
            </select>
          </div>
          <div style={styles.filterRow}>
            <label>Gated Security:</label>
            <select
              name="gatedSecurity"
              value={filters.gatedSecurity}
              onChange={handleFilterChange}
              style={styles.filterInput}
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div style={styles.filterRow}>
            <label>Considering:</label>
            <select
              name="considering"
              value={filters.considering}
              onChange={handleFilterChange}
              style={styles.filterInput}
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Maybe">Maybe</option>
            </select>
          </div>
          <div style={styles.filterRow}>
            <label>Visited:</label>
            <select
              name="visited"
              value={filters.visited}
              onChange={handleFilterChange}
              style={styles.filterInput}
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div style={styles.actions}>
            <button onClick={() => { setShowFilterDropdown(false) }} style={styles.button}>Close</button>
            <button onClick={applyFilters} style={styles.button}>Apply Filters</button>
          </div>
        </div>
      )}

      <div style={styles.actions}>
        <button onClick={handleAddProperty} style={styles.button}>Add Property</button>
      </div>

      {showForm && (
        <div style={styles.propertyCard}>
          <h2>Add Property</h2>
          <div style={styles.propertyRow}>
            <div style={styles.propertyField}>
              <label style={styles.label}>Link</label>
              <input
                type="text"
                name="link"
                value={newProperty.link}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={newProperty.ownerName}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={newProperty.description}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Rent</label>
              <input
                type="number"
                name="rent"
                value={newProperty.rent}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Maintenance</label>
              <input
                type="number"
                name="maintenance"
                value={newProperty.maintenance}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Furnishing</label>
              <select
                name="furnishing"
                value={newProperty.furnishing}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="">Select</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="None">None</option>
              </select>
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Deposit</label>
              <input
                type="number"
                name="deposit"
                value={newProperty.deposit}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Considering</label>
              <select
                name="considering"
                value={newProperty.considering}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                name="location"
                value={newProperty.location}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Distance from Bus Stop (km)</label>
              <input
                type="number"
                name="distanceBusStop"
                value={newProperty.distanceBusStop}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Broker Number</label>
              <input
                type="text"
                name="brokerNo"
                value={newProperty.brokerNo}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Considered</label>
              <select
                name="considered"
                value={newProperty.considered}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Visited</label>
              <select
                name="visited"
                value={newProperty.visited}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Distance from Oracle (km)</label>
              <input
                type="number"
                name="distanceOracle"
                value={newProperty.distanceOracle}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Distance from Flipkart (km)</label>
              <input
                type="number"
                name="distanceFlipkart"
                value={newProperty.distanceFlipkart}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Comments</label>
              <textarea
                name="comments"
                value={newProperty.comments}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Area</label>
              <input
                type="text"
                name="area"
                value={newProperty.area}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.propertyField}>
              <label style={styles.label}>Gated Security</label>
              <select
                name="gatedSecurity"
                value={newProperty.gatedSecurity}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div style={styles.actions}>
            <button onClick={handleSaveNewProperty} style={styles.button}>Save</button>
            <button onClick={() => setShowForm(false)} style={styles.button}>Cancel</button>

            </div>
        </div>
      )}

      <div style={styles.propertyList}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property.id}
              style={styles.propertyCard}
              onClick={(e) => { handleView(property);}}
            >
   <h3>
  <a
    href={property.link}
    target="_blank"  // This ensures it opens in a new tab
    rel="noopener noreferrer"  // Security feature for links opening in new tabs
    onClick={(e) => {
      // Prevent any propagation or default behavior if necessary, but opening in new tab is handled by `target="_blank"`
      e.stopPropagation();
    }}
  >
    Link to property
  </a>
</h3>


              <p>{property.address}</p>
              <p>Rent: {property.rent}</p>
              <p>Deposit: {property.deposit}</p>
              <p>Furnishing: {property.furnishing}</p>
              <p>Location : {property.location}</p>
              <p>Area : {property.area}</p>
              {/* <p>Gated Security: {property.gatedSecurity}</p> */}
              <p>Visited: {property.visited}</p>
              <p>Considering: {property.considering}</p>
              <p>Distance from bus stop: {property.distanceBusStop}</p>
              <p>Distance From Oracle: {property.distanceOracle}</p>
              <p>Distance from Flipkart: {property.distanceFlipkart}</p>
              <button onClick={(e) => {e.stopPropagation(); handleDeleteProperty(property._id); }}>Delete Property</button>
            </div>
            
            
          ))
        ) : (
          <p>No properties found with the applied filters.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: "0 auto",
    padding: "20px",
    width: "80%",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    margin: "10px",
    borderRadius: "4px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    gap: "10px",
  },
  propertyCard: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    marginBottom: "15px",
    cursor: "pointer",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  propertyRow: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  propertyField: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontWeight: "500",
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    width: "100%",
  },
  filterDropdown: {
    position: "absolute",
    top: "50px",
    right: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    borderRadius: "8px",
    zIndex: 10,
    width: "300px",
  },
  filterRow: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  filterInput: {
    marginLeft: "0",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  propertyList: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
};

export default PropertyList;