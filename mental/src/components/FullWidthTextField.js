import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import './FullWidthTextField.css';


export const FullWidthTextField = () => {
    return (
        <Box
          className='Text-field-box'
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField 
            fullWidth
            className='Text-field' 
            label="" 
            id="fullWidth" 
            

          />
        </Box>
      );
}

export default FullWidthTextField;
