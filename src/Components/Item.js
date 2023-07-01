import React, { useState, useEffect } from 'react';

import { Grid, TextField, Autocomplete, Chip, Typography } from '@mui/material';

export default function Item({ tipoItem, onTotalPointsChange }) {

  console.log('e', tipoItem)
  const frontendOptions = [
    { key: 0, value: "P.1 - Programação de 1 operação de banco (criação, leitura, atualização, remoção) no back-end, com dados submetidos pelo front-end. Programação completa, incluindo validação do campo, sanitização das “strings” etc.", points: 5 },
    { key: 1, value: "P.2 - Programação de 1 operação de banco (criação, leitura, atualização, remoção) no back-end, com dados submetidos pelo front-end, baseada em programação semelhante já existente ou CRUD. Programação completa, incluindo validação do campo, sanitização das “strings” etc.", points: 5 },
    { key: 2, value: "P.3 - Programação de 1 funcionalidade simples, no front-end.", points: 5 },
    { key: 3, value: "P.4 - Programação de validação de campos de formulário, no front-end, com mensagens ao usuário.", points: 5 },
    { key: 4, value: "P.5 - Programação de funcionalidade no front-end, completa, com tratamento de dados, validação, submissão ao back-end e tratamento e incorporação do retorno.", points: 5 },
    { key: 5, value: "T.1 - Teste e Debug funcionalidades novas.", points: 5 },
    { key: 6, value: "T.2 - Teste e Debug para manutenção.", points: 5 },
    { key: 7, value: "T.3 - Teste e Debug para manutenção, de sistemas críticos, com dependências de outros sistemas.", points: 5 },
  ];

  const backendendOptions = [
    { key: 0, value: "P.6 - Programação de teste unitário. A programação de teste unitário será remunerada com o mesmo número de USTs da função/método/serviço que esse teste visa a testar.", points: 5 },
    { key: 1, value: "P.7 - Alteração de programação de operação de banco. Esta atividade envolve todo o escopo da alteração (banco e programação).", points: 5 },
    { key: 2, value: "P.8 - Alteração pontual de funcionalidade existente, no back-end para arquitetura orientada a  serviço ou para aplicações monólitos.", points: 5 },
    { key: 3, value: "P.9 - Programação de método para gravação de logs, com teste e debug incluídos.", points: 5 },
    { key: 4, value: "T.1 - Teste e Debug funcionalidades novas.", points: 5 },
    { key: 5, value: "T.2 - Teste e Debug para manutenção.", points: 5 },
    { key: 6, value: "T.3 - Teste e Debug para manutenção, de sistemas críticos, com dependências de outros sistemas.", points: 5 },
  ];

  const bancoOptions = [
    { key: 0, value: "DB.1 - Criação de script para operação direta em banco de dados, incluindo até 10 sub-variações em seus parâmetros.", points: 5 },
    { key: 1, value: "DB.2 - Teste de script de operação direta em banco de dados (apenas quando necessário).", points: 5 },
    { key: 2, value: "DB.3 - Alteração em tabela única - DDL - ALTER", points: 5 },
    { key: 3, value: "DB.4 - Criação de script de DDL (CREATE, ALTER E DROP)", points: 5 },
  ];

  const deployOptions = [
    { key: 0, value: "IM.2 - Implantação do sistema em homologação (trabalho completo, incluindo geração de builds, scripts etc.)", points: 5 },
    { key: 1, value: "IM.2 - Implantação do sistema em produção (trabalho completo, incluindo geração de builds, scripts etc.)", points: 5 },
  ];

  const [options, setOptions] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);



  useEffect(() => {
    if (tipoItem === 'Frontend') {
      setOptions(frontendOptions);
    }
    if (tipoItem === 'Backend') {
      setOptions(backendendOptions);
    }
    if (tipoItem === 'Banco de dados') {
      setOptions(bancoOptions);
    }
    if (tipoItem === 'Deploy') {
      setOptions(deployOptions);
    }

  }, []);

  const calculateTotalPoints = () => {
    let sum = 0;
    selectedItems.forEach(item => {
      sum += item.points || 0;
    });
    return sum;
  };

  const totalPoints = calculateTotalPoints();


  useEffect(() => {
    onTotalPointsChange(totalPoints);
  }, [onTotalPointsChange, totalPoints]);

  return (

    <Grid item
      my={2}
      sx={{

      }}>

      <Typography>Item de {tipoItem}</Typography>



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
          getOptionValue={(option) => option.points}
          style={{ width: 720 }}
          renderInput={(params) => (
            <TextField {...params} label="Atividade" variant="outlined" />

          )}
          onChange={(event, value) => setSelectedItems(value)}
        />
      </Grid>

      <Typography>Total de pontos: {totalPoints}</Typography>

    </Grid>

  );
}