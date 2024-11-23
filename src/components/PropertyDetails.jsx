import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("https://flat-backend.onrender.com/api/property/editproperty", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property._id, // Add propertyId
          updatedProperty: editedProperty,
        }),
      });
  
      if (response.ok) {
        alert("Property details updated successfully!");
      } else {
        alert("Failed to update property details.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProperty((prevProperty) => ({ ...prevProperty, [name]: value }));
  };

  if (!property) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Property Not Found</h1>
        <button onClick={() => navigate("/propertylist")} style={styles.button}>
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Property Details</h1>
      <div style={styles.detailsCard}>
        {isEditing ? (
          <form style={styles.form}>
            <label style={styles.label}>
              Link:
              <input
                type="text"
                name="link"
                value={editedProperty.link}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Owner Name:
              <input
                type="text"
                name="ownerName"
                value={editedProperty.ownerName}
                onChange={handleInputChange}
                style={styles.input}
              />
              
            </label>
            <label style={styles.label}>
              Comments :
              <textarea
                name="comments"
                value={editedProperty.comments}
                onChange={handleInputChange}
                style={styles.textarea}
              />
              
            </label>
            <label style={styles.label}>
  Visited:
  <select
    name="visited"
    value={editedProperty.visited}
    onChange={handleInputChange}
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</label>
<label style={styles.label}>
  Considering:
  <select
    name="considering"
    value={editedProperty.considering}
    onChange={handleInputChange}
    style={styles.input}
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
    <option value="Maybe">Maybe</option>
  </select>
</label>

            <label style={styles.label}>
              Description:
              <textarea
                name="description"
                value={editedProperty.description}
                onChange={handleInputChange}
                style={styles.textarea}
              />
            </label>
            <label style={styles.label}>
              Rent:
              <input
                type="number"
                name="rent"
                value={editedProperty.rent}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Maintenance:
              <input
                type="number"
                name="maintenance"
                value={editedProperty.maintenance}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
  Furnishing:
  <select
    name="furnishing"
    value={editedProperty.furnishing}
    onChange={handleInputChange}
    style={styles.input}
  >
    <option value="">Select Furnishing</option>
    <option value="Fully Furnished">Fully Furnished</option>
    <option value="None">Unfurnished</option>
    <option value="Semi-Furnished">Semi-Furnished</option>
  </select>
</label>

            <label style={styles.label}>
              Deposit:
              <input
                type="number"
                name="deposit"
                value={editedProperty.deposit}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Location:
              <input
                type="text"
                name="location"
                value={editedProperty.location}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <button onClick={handleSave} style={styles.saveButton}>
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <h2 style={styles.propertyTitle}>{property.description}</h2>
            <p style={styles.link}>
              <a href={property.link} target="_blank" rel="noopener noreferrer">
                Link to property
              </a>
            </p>
            <p>
              <strong>escription:</strong> {property.description}
            </p>
            
            <p>
              <strong>Gated Security:</strong> {property.gatedSecurity}
            </p>
            <p>
              <strong>Owner:</strong> {property.ownerName}
            </p>
            <p>
              <strong>Rent:</strong> ₹{property.rent + property.maintenance}
            </p>
            <p>
              <strong>Deposit:</strong> ₹{property.deposit}
            </p>
            <p>
              <strong>Location:</strong> {property.location}
            </p>
            <p>
              <strong>Considering:</strong> {property.considering}
            </p>
            <p>
              <strong>Visited:</strong> {property.visited}
            </p>
            <p>
              <strong>Furnishing:</strong> {property.furnishing}
            </p>
            <p>
              <strong>Area:</strong> {property.area}
            </p>
            <p>
              <strong>Comments:</strong> {property.comments}
            </p>
            <p>
              <strong>Distance from bus stop:</strong> {property.distancebusStop}
            </p>
            <p>
              <strong>Distance from Oracle:</strong> {property.distanceOracle}
            </p>
            <p>
              <strong>Distance from Flipkart:</strong> {property.distanceFlipkart}
            </p>
            <div style={styles.boxContainer}>
              <iframe
                src={property.link}
                style={styles.iframe}
                title="Property Link"
              ></iframe>
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                style={styles.iframe}
                title="Location Map"
              ></iframe>
            </div>
            <div style={styles.buttonsContainer}>
              <button onClick={handleEdit} style={styles.editButton}>
                Edit
              </button>
              <button onClick={() => navigate("/propertylist")} style={styles.button}>
                Back to List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    backgroundColor: "#f4f7fa",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    color: "#343a40",
    fontSize: "36px",
    marginBottom: "30px",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "25px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "16px",
    color: "#495057",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    marginBottom: "10px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    marginBottom: "10px",
    height: "100px",
  },
  saveButton: {
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  boxContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  iframe: {
    width: "100%",
    height: "300px",
    borderRadius: "8px",
  },
  link: {
    color: "#007bff",
    fontSize: "18px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "10px 18px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  editButton: {
    padding: "10px 18px",
    backgroundColor: "#ffc107",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  propertyTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#343a40",
  },
};

export default PropertyDetails;
