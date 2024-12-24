import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InputPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) {
      setError('');
      navigate('/greeting', { state: { message: `Merry Christmas, ${name}!` } });
    } else {
      setError('Please enter a name');
    }
  };

  return (
    <div className="christmas-container">
      <div className="input-card">
        <div className="christmas-tree">🎄</div>
        <h1>Christmas Card</h1>
        <form className="input-form" onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <div className="input-wrapper">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input-field"
            />
            <div className="input-decoration">❄️</div>
          </div>
          <button 
            type="submit" 
            className="submit-button"
          >
            Get Card
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default InputPage;