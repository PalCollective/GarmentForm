import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RsInput from './RsInput';

const RsCheckbox = ({ id , value,label,  onChange }) => {
  return (
 
<FormControlLabel sx={{
        
        width: '100%',
        justifyContent: 'flex-end', // Moves the label and checkbox to the right
        marginRight: 0, // Adjusts margin to align properly if needed
        '& .MuiFormControlLabel-label': {
          textAlign: 'right', // Ensures the text is right-aligned
          
        }
      }}
control={<Checkbox 
color='success'  
checked={value}
onChange={e => onChange(id, e.target.checked)}
/>}
label={label}

/>

  );
}

export default RsCheckbox;