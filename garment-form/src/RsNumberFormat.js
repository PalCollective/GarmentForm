import React from 'react';
import TextField from '@mui/material/TextField'; 
import { InputAdornment } from '@mui/material';

const RsNumberFormat = ({ id ,label, value, errorMessage, onChange, suffix, placeholder }) => {
  const [error, setError] = React.useState('');


  const handleChange = (e) => {
    onChange(id, e.target.value)
    if(e.target.value === "" ) {
      setError(true)
    } else {
      setError(false)
    }
  }
 

  return (

    
      <TextField
        fullWidth
        type="number"
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
          style: { textAlign: 'right', width:'150%', fontSize:'23px', fontWeight:550},
          
        }}
        inputProps={{
          style: { textAlign: 'right' }, // Aligns text input right
          
        }}
        InputProps={{
            startAdornment: <InputAdornment position="start">{suffix}</InputAdornment>
        }}
        color='success'
        variant='standard'
        error= {error} 
        helperText = {error? errorMessage : ''}
        
      />
     
  
  );
};

export default RsNumberFormat;
