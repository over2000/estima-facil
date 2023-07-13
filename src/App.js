import React, { useState } from 'react';
import { Grid, Button, IconButton,Select, MenuItem, FormControl, TextField } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Item from './Components/Item';

function App() {

  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
  };

  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems(prevItems => [...prevItems, <Item tipoItem={selectedType} key={prevItems.length} />]);
  };

  const handleDeleteItem = index => {
    setItems(prevItems => prevItems.filter((item, i) => i !== index));
  };

  return (
    <div style={{ width: '100%' }}>
      <Grid
        container
        spacing={2}
        my={5}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {items.map((item, index) => (
          <Grid item key={index}>
            {item}
            <IconButton variant="contained" onClick={() => handleDeleteItem(index)}>
                <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
        ))}

        <Grid item>
          <FormControl>
            <Select
              style={{ width: 300 }}
              labelId="component-type-label"
              id="component-type"
              value={selectedType}
              onChange={handleSelectType}
              renderInput={(params) => (
                <TextField {...params} label="Atividade" variant="outlined" />
              )}
            >
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Banco de dados">Banco de dados</MenuItem>
              <MenuItem value="Deploy">Deploy</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {selectedType && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => handleAddItem(selectedType)}>
              Adicionar Item {selectedType}
            </Button>
          </Grid>
        )}




      </Grid>
    </div>
  );
}

export default App;
