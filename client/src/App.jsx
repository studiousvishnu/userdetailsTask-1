import  { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    contactNumber: '',
  });
  const [showEnteredData, setShowEnteredData] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('submittedData')) || [];
    setSubmittedData(storedData);
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    return name.length >= 6;
  };

  const isValidContactNumber = (contactNumber) => {
    const contactNumberRegex = /^\d{10}$/;
    return contactNumberRegex.test(contactNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      name: !formData.name ? 'Enter name' : (!isValidName(formData.name) ? 'Enter at least 6 letters for the name' : ''),
      email: !formData.email ? 'Enter email' : (!isValidEmail(formData.email) ? 'Enter a valid email address' : ''),
      contactNumber: !formData.contactNumber ? 'Enter phone number' : (!isValidContactNumber(formData.contactNumber) ? 'Enter a valid 10-digit mobile number' : ''),
    };

    setValidationErrors(errors);

    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('submittedData')) || [];
    const newData = [...storedData, formData];
    localStorage.setItem('submittedData', JSON.stringify(newData));
    setSubmittedData(newData);

    setConfirmationMessage('Form submitted successfully');
    setFormData({ name: '', email: '', contactNumber: '' });
  };

  return (
    <div className="App">
      <h1>Task by Indus</h1>
      <table className="form-table">
        <tbody>
          <tr>
            <td><label>Name:</label></td>
            <td>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, name: e.target.value }))}
              />
              <div className="error-message">{validationErrors.name}</div>
            </td>
          </tr>
          <tr>
            <td><label>Email:</label></td>
            <td>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))}
              />
              <div className="error-message">{validationErrors.email}</div>
            </td>
          </tr>
          <tr>
            <td><label>Contact Number:</label></td>
            <td>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, contactNumber: e.target.value }))}
              />
              <div className="error-message">{validationErrors.contactNumber}</div>
            </td>
          </tr>
          <tr>
  <td colSpan="2" align="center">
    <button type="submit" onClick={handleSubmit}>Submit</button>
  </td>
</tr>
        
      {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}

      <tr>
  <td colSpan="2" align="center">
    <button onClick={() => setShowEnteredData(!showEnteredData)}>
      {showEnteredData ? 'Hide Entered Data' : 'Show Entered Data'}
    </button>
  </td>
</tr>
</tbody>
      </table>

      {showEnteredData && (
        <div>
          <h2>Entered Data</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
