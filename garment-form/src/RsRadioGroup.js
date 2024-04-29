import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';


const RsRadioGroup = ({ id , value,label, items, onChange }) => {

    const [isActive, setIsActive] = useState(false);
    const handleRadioChange = (event) => {
        setIsActive(true);  // Set active to true when any radio button is clicked
        onChange(id, event.target.value);  // Handle change
      };
    return (
  
        <FormControl fullWidth >
        {isActive && 
        <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign:'right', color:'green !important'  }}>{label}</FormLabel>
        }

        {!isActive && 
        <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign:'right', color:'#606060',fontSize:'17.5px', fontWeight:550 }}>{label}</FormLabel>
        }
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          onChange={handleRadioChange}
          name="radio-buttons-group"
          sx={{ alignItems: 'flex-end', flexDirection: 'row-reverse' }}
         
        >
            {items.map(item => (
                <FormControlLabel value={item.value} control={<Radio color='success' />} label={item.label} />
            ))}
          
         
        </RadioGroup>
      </FormControl>
    
       
    
    );
  };
  
  export default RsRadioGroup;