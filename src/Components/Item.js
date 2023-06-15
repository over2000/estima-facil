import React, { useState, useEffect } from 'react';

import { Grid, TextField, Autocomplete, Chip, Typography } from '@mui/material';

export default function Item( {tipoItem} ) {

  console.log(tipoItem)


  const fakeDataFromServer = [
    { key: 0, value: "P.1 - Programação de 1 operação de banco (criação, leitura, atualização, remoção) no back-end, com dados submetidos pelo front-end. Programação completa, incluindo validação do campo, sanitização das “strings” etc." },
    { key: 1, value: "P.2 - Programação de 1 operação de banco (criação, leitura, atualização, remoção) no back-end, com dados submetidos pelo front-end, baseada em programação semelhante já existente ou CRUD. Programação completa, incluindo validação do campo, sanitização das “strings” etc." }
  ];

  const fakeDataFromServer2 = [
    { key: 0, value: "Deploy" },
    { key: 1, value: "Deply2222" }
  ];
  
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // here goes your fetch call
    // when response arrives -
    if(tipoItem === 'Banco de dados'){
      setOptions(fakeDataFromServer);
    }
    if(tipoItem === 'Deploy'){
      setOptions(fakeDataFromServer2);
    }
    
  }, []);

  return (

    <Grid item
    my={2}
      sx={{

      }}>

      <TextField
      style={{ width: 720 }}
      id="standard-basic" 
      label="Descrição"
      variant="standard" />

      <Grid item xs={12} mt={3}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={options}
          getOptionLabel={(option) => option.value}
          style={{ width: 720 }}
          renderInput={(params) => (
            <TextField {...params} label="Atividade" variant="outlined" />
          )}
        />
      </Grid>

    </Grid>

  );
}