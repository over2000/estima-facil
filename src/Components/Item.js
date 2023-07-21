import React, { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';

export default function Item({ id, tipoItem, items, setItems }) {
  const frontendOptions = [
    { key: 0, value: "P.1 - Programação de 1 operação de banco (criação, leitura, atualização, remoção) no back-end, com dados submetidos pelo front-end. Programação completa, incluindo validação do campo, sanitização das “strings” etc. - 4 UST's", points: 4 },
    { key: 1, value: "P.2 - Programação de 1 operação de banco (criação, leitura, atualização, remoção) no back-end, com dados submetidos pelo front-end, baseada em programação semelhante já existente ou CRUD. Programação completa, incluindo validação do campo, sanitização das “strings” etc. - 2 UST's", points: 2 },
    { key: 2, value: "P.3 - Programação de 1 funcionalidade simples, no front-end. - 2 UST's", points: 2 },
    { key: 3, value: "P.4 - Programação de validação de campos de formulário, no front-end, com mensagens ao usuário. 0,5 UST's", points: 0.5 },
    { key: 4, value: "P.5 - Programação de funcionalidade no front-end, completa, com tratamento de dados, validação, submissão ao back-end e tratamento e incorporação do retorno. - 4 UST's ", points: 4 },
    { key: 5, value: "T.1 - Teste e Debug funcionalidades novas. - 1 UST's", points: 1 },
    { key: 6, value: "T.2 - Teste e Debug para manutenção. - 0,5 UST's", points: 0.5 },
    { key: 7, value: "T.3 - Teste e Debug para manutenção, de sistemas críticos, com dependências de outros sistemas. - 2 UST's", points: 2 },
  ];

  const backendOptions = [
    { key: 0, value: "P.6 - Programação de teste unitário. A programação de teste unitário será remunerada com o mesmo número de USTs da função/método/serviço que esse teste visa a testar. - 4 UST's", points: 4 },
    { key: 1, value: "P.7 - Alteração de programação de operação de banco. Esta atividade envolve todo o escopo da alteração (banco e programação). - 2 UST's", points: 2 },
    { key: 2, value: "P.8 - Alteração pontual de funcionalidade existente, no back-end para arquitetura orientada a  serviço ou para aplicações monólitos. 0,5 UST's", points: 0.5 },
    { key: 3, value: "P.9 - Programação de método para gravação de logs, com teste e debug incluídos. 2 UST's", points: 2 },
    { key: 4, value: "T.1 - Teste e Debug funcionalidades novas. - 1 UST's", points: 1 },
    { key: 5, value: "T.2 - Teste e Debug para manutenção. - 0,5 UST's", points: 0.5 },
    { key: 6, value: "T.3 - Teste e Debug para manutenção, de sistemas críticos, com dependências de outros sistemas. - 2 UST's", points: 2 },
    { key: 7, value: "P.1 - Programação de 1 operação de banco (criação, leitura, atualização, remoção) no back-end, com dados submetidos pelo front-end. Programação completa, incluindo validação do campo, sanitização das “strings” etc. - 4 UST's", points: 4 },
    { key: 8, value: "P.2 - Programação de 1 operação de banco (criação, leitura, atualização, remoção) no back-end, com dados submetidos pelo front-end, baseada em programação semelhante já existente ou CRUD. Programação completa, incluindo validação do campo, sanitização das “strings” etc. - 2 UST's", points: 2 },
  ];

  const bancoOptions = [
    { key: 0, value: "DB.1 - Criação de script para operação direta em banco de dados, incluindo até 10 sub-variações em seus parâmetros. - 2 UST's", points: 2 },
    { key: 1, value: "DB.2 - Teste de script de operação direta em banco de dados (apenas quando necessário). 0,5 UST's", points: 0.5 },
    { key: 2, value: "DB.3 - Alteração em tabela única - DDL - ALTER - 0,5 UST's", points: 0.5 },
    { key: 3, value: "DB.4 - Criação de script de DDL (CREATE, ALTER E DROP) - 0,5 UST's", points: 0.5 },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (tipoItem === 'Frontend') {
      setOptions(frontendOptions);
    } else if (tipoItem === 'Backend') {
      setOptions(backendOptions);
    } else if (tipoItem === 'Banco') {
      setOptions(bancoOptions);
    }
  }, [tipoItem]);

  useEffect(() => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => options.find((option) => option.key === item.key))
    );
  }, [options]);

  useEffect(() => {
    updateItemInItems();
  }, [totalPoints, description]);

  const handleSelectedItemsChange = (event, value) => {
    setSelectedItems(value);
    setTotalPoints(value.reduce((sum, item) => sum + (item.points || 0), 0));
  };

  const updateItemInItems = () => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            totalPoints: totalPoints,
            description: description,
            selectedValues: selectedItems,
          };
        }
        return item;
      })
    );
  };

  return (
    <Grid item my={2}>
      <TextField
        style={{ width: 720 }}
        id="standard-basic"
        label="Descrição"
        size="small"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Grid item xs={12} mt={3}>
        <Autocomplete
          size="small"
          multiple
          id="tags-standard"
          options={options}
          getOptionLabel={(option) => option.value}
          getOptionValue={(option) => option.points}
          style={{ width: 720 }}
          renderInput={(params) => <TextField {...params} label="Atividade" size="small" variant="outlined" />}
          onChange={handleSelectedItemsChange}
          value={selectedItems}
        />
      </Grid>
    </Grid>
  );
}
