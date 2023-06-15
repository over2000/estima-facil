import React, { useState } from 'react';
import { Grid, Button, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Item from './Components/Item';

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems(prevItems => [...prevItems, <Item key={prevItems.length} />]);
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
          <Button variant="text" color="primary" onClick={handleAddItem}>
            Adicionar Item
          </Button>
          <Button variant="text" color="primary">
            Gerar Texto
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
