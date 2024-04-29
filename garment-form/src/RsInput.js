import React from 'react';
import TextField from '@mui/material/TextField'; 
import "@fontsource/raleway"

const RsInput = ({ id ,label, value, errorMessage, onChange, placeholder }) => {
  const [error, setError] = React.useState(false);

  const handleChange = (e) => {
    
    onChange(id, e.target.value)
    if(e.target.value === "" || e.target.value === null || e.target.value === undefined ) {
      setError(true)
    } else {
      setError(false)
    }
  }

  return (

    
      <TextField
        fullWidth
        label={label}
        value={value}
        
        error= {error} 
        helperText = {error? errorMessage : ''}
        placeholder={placeholder}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
          style: {fontWeight:550, textAlign: 'right', width:'150%', fontSize:'23px'},
          
        }}
        
        inputProps={{
          style: { textAlign: 'right', fontFamily: 'Raleway' } // Aligns text input right
        }}
        color='success'
        variant='standard'
       
      />
     
  
  );
};

export default RsInput;
