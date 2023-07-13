import React, { useState } from 'react';
import { Grid, Button, IconButton, Select, MenuItem, FormControl, TextField } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Item from './Components/Item';

function App() {
  const [selectedType, setSelectedType] = useState('');
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState(0); // Variável para controlar o ID do item


  console.log('items',items)

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAddItem = () => {
    const newItem = {
      id: itemId,
      tipoItem: selectedType,
      totalPoints: 0,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setItemId((prevItemId) => prevItemId + 1); // Incrementa o ID do item
  };

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleTotalPointsChange = (itemId, newTotalPoints) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, totalPoints: newTotalPoints };
        }
        return item;
      })
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2} my={5} direction="column" alignItems="center" justifyContent="center">
      {items.map((item) => (
  <Grid item key={item.id}>
    <Item
      id={item.id}
      tipoItem={item.tipoItem}
      totalPoints={item.totalPoints}
      onTotalPointsChange={handleTotalPointsChange}
    />
    <IconButton variant="contained" onClick={() => handleDeleteItem(item.id)}>
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
              renderInput={(params) => <TextField {...params} label="Atividade" variant="outlined" />}
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
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Adicionar Item {selectedType}
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default App;
