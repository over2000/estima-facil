import React, { useState } from 'react';
import { Grid, Button, IconButton, Select, MenuItem, FormControl, TextField, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Item from './Components/Item';

function App() {
  const [selectedType, setSelectedType] = useState('');
  const handleSelectType = event => {
    setSelectedType(event.target.value);
  };

  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems(prevItems => [
      ...prevItems,
      { tipoItem: selectedType, selectedItems: [], totalPoints: 0 }
    ]);
  };

  const handleDeleteItem = index => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleItemsChange = (index, newItems) => {
    setItems(prevItems =>
      prevItems.map((item, i) => (i === index ? { ...item, selectedItems: newItems } : item))
    );
  };

  const handleTotalPointsChange = (index, points) => {
    setItems(prevItems =>
      prevItems.map((item, i) => (i === index ? { ...item, totalPoints: points } : item))
    );
  };

  const calculateTotalPoints = () => {
    let sum = 0;
    items.forEach(item => {
      sum += item.totalPoints;
    });
    return sum;
  };

  console.log('e');

  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2} my={5} direction="column" alignItems="center" justifyContent="center">
        {items.map((item, index) => (
          <Grid item key={index}>
            <Item
              tipoItem={item.tipoItem}
              selectedItems={item.selectedItems}
              onItemsChange={newItems => handleItemsChange(index, newItems)}
              onTotalPointsChange={points => handleTotalPointsChange(index, points)}
            />
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
              renderInput={params => <TextField {...params} label="Atividade" variant="outlined" />}
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

        <Grid item>
          <Typography>Total de pontos: {totalPoints}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
