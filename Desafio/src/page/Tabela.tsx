import { Box, TableCell, TableRow, TableBody, TableHead, Table, Button } from '@material-ui/core';
import { Idados, IarrDados, deleteEventEndpoint } from "../data/data"
import { v4 } from 'uuid'
import EventEmitter from '../helper/EventEmitter';


function Tabela(dados: IarrDados) {

    function handlexeclude (id:number) {
        deleteEventEndpoint(id)
        EventEmitter.emit('update',{ text: "delete" })
    }

    function Linha(item: Idados) {

        return (
            <TableRow key={v4()}>
                <TableCell component="th" scope="row">{item.descricao}</TableCell>
                <TableCell align="right">{item.categoria}</TableCell>
                <TableCell align="right">{item.dia}</TableCell>
                <TableCell align="right">{item.valor.toString().replace('.', ',')}</TableCell>
                <TableCell align="right">
                <Button onClick={()=> handlexeclude(item.id)} variant="contained" color='secondary'> Excluir</Button>
                </TableCell>
            </TableRow>
        );
    }

    if (dados.length === 0) {
        return <Box> Não foi encontrado valores para este periodo </Box>
    }
    return (
        <>  
          <TableHead >
                <TableCell>Despesa</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Dia</TableCell>
                <TableCell align="right">Valor(R$)</TableCell>
                <TableCell align="right">Excluir Gasto </TableCell>
            </TableHead>
            <TableBody>
            {dados.map((item: Idados) => (

                <Linha
                    key={v4()}
                    mes={item.mes}
                    id={item.id}
                    descricao={item.descricao}
                    categoria={item.categoria}
                    dia={item.dia}
                    valor={item.valor}
                />
            ))}</TableBody>
        </>

    )
}
export { Tabela }