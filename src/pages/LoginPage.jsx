import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import "../index.css";


function LoginPage(){
    const [data, setData] = useState(null)
    const handleChange = (event) => {
      setData(event.target.value);
    };
  
    return (
      <div className="pad">
        <div className='inputBox'>
          <TextField 
            fullWidth
            id="outlined-basic"
            value={data}
            onChange={handleChange}
            inputProps={{min: 0, style: { textAlign: 'center' }}}
          />
        </div>
        <Stack direction="column" spacing={2}>
        <div>
          <div className="row">
            <button className="key" onClick={()=>setData(1)}>
              1
            </button>
            <button className="key" onClick={()=>setData(2)}>
              2
            </button>
            <button className="key" onClick={()=>setData(3)}>
              3
            </button>
          </div>
  
          <div className="row">
            <button className="key" onClick={()=>setData(4)}>
              4
            </button>
            <button className="key" onClick={()=>setData(5)}>
              5
            </button>
            <button className="key" onClick={()=>setData(6)}>
              6
            </button>
          </div>
  
          <div className="row">
            <button className="key" onClick={()=>setData(7)}>
              7
            </button>
            <button className="key" onClick={()=>setData(8)}>
              8
            </button>
            <button className="key" onClick={()=>setData(9)}>
              9
            </button>
          </div>
          <div className="row">
            <button className="key" onClick={()=>setData('*')}>
              *
            </button>
            <button className="key" onClick={()=>setData(0)}>
              0
            </button>
            <button className="key" onClick={()=>setData('#')}>
              #
            </button>
          </div>
        </div>
  
        <div>
          <Button className='btn'  variant="contained">Enter</Button>
        </div>
        <div>
            <Button className="btn" variant="contained">Google Login</Button>
        </div>        
        </Stack>


  
      </div>
    );
}

export default LoginPage