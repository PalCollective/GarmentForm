import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import formData from './formData.json'
import ClothesForm from './ClothesForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClothesForm formData={formData} />
  </React.StrictMode>
);


