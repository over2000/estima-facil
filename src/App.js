import React, { useState, useEffect } from 'react';
import { Grid, Button, IconButton, Select, MenuItem, FormControl, TextField, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Item from './Components/Item';

function App() {
  const [selectedType, setSelectedType] = useState('');
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState(0); // Variável para controlar o ID do item

  const getTotalPointsByTipoItem = (tipoItem) => {
    return items.reduce((total, item) => {
      if (item.tipoItem === tipoItem) {
        return total + item.totalPoints;
      }
      return total;
    }, 0);
  };

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
  };

  console.log('items array',items);

  const handleAddItem = () => {
    const newItem = {
      id: itemId,
      tipoItem: selectedType,
      totalPoints: 0,
      description: '',
      selectedValues: [],
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setItemId((prevItemId) => prevItemId + 1);
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

  let frontendTotalPoints = getTotalPointsByTipoItem('Frontend');
  let backendTotalPoints = getTotalPointsByTipoItem('Backend');
  let bancoTotalPoints = getTotalPointsByTipoItem('Banco');

  useEffect(() => {
    frontendTotalPoints = getTotalPointsByTipoItem('Frontend');
    backendTotalPoints = getTotalPointsByTipoItem('Backend');
    bancoTotalPoints = getTotalPointsByTipoItem('Banco');
  }, [items]);

  const generateTextFromItems = () => {
    const descriptionsMap = {};
    let text = "";

    items.forEach((item) => {
      const description = item.description;
      if (!descriptionsMap[description]) {
        descriptionsMap[description] = true;
        text += `\n${description}\n\n`;
      }

      item.selectedValues.forEach((selectedValue) => {
        text += `${selectedValue.value}\n`;
      });
    });

    return text;
  };

  const allText = generateTextFromItems();

  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2} my={5} alignItems="flex-start" justifyContent="center">
        {/* Metade esquerda */}
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" mt={2}>
            {frontendTotalPoints > 0 && (
              <Grid item>
                <Typography variant="h6" color="primary">
                  USTs FRONTEND: {frontendTotalPoints}
                </Typography>
              </Grid>
            )}

            {backendTotalPoints > 0 && (
              <Grid item>
                <Typography variant="h6" color="primary">
                  USTs BACKEND: {backendTotalPoints}
                </Typography>
              </Grid>
            )}

            {bancoTotalPoints > 0 && (
              <Grid item>
                <Typography variant="h6" color="primary">
                  USTs BANCO DE DADOS: {bancoTotalPoints}
                </Typography>
              </Grid>
            )}

            {items.map((item) => (
              <Grid item key={item.id}>
                <Item id={item.id} tipoItem={item.tipoItem} items={items} setItems={setItems} />
                <IconButton variant="contained" onClick={() => handleDeleteItem(item.id)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
            ))}

            <Grid item>
              <FormControl>
                <Select
                  size="small"
                  style={{ width: 300 }}
                  labelId="component-type-label"
                  id="component-type"
                  value={selectedType}
                  onChange={handleSelectType}
                  renderInput={(params) => <TextField {...params} label="Atividade" variant="outlined" />}
                >
                  <MenuItem value="Frontend">Frontend</MenuItem>
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="Banco">Banco</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {selectedType && (
              <Grid item>
                <Button size="small" variant="outlined" color="primary" onClick={handleAddItem}>
                  Adicionar Item {selectedType}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Metade direita */}

        <Grid item xs={12} sm={6}>
        <TextField
        inputProps={{
          style: {fontSize: 13} 
        }}
        multiline
        rows={36}
        variant="outlined"
        fullWidth
        defaultValue={allText}
        // Outras props que você desejar adicionar ao TextField
        disabled
      />
        </Grid>

      </Grid>
    </div>
  );
}

export default App;