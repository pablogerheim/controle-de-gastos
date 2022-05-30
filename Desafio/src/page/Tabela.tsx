import { Box, TableCell, TableRow, TableBody, TableHead, Table } from '@material-ui/core';
import { Idados, IarrDados } from "../data/data"
import { v4 } from 'uuid'
function Tabela(dados: IarrDados) {

    function Linha(item: Idados) {

        return (

            <TableRow key={item.id}>
                <TableCell component="th" scope="row">{item.descricao}</TableCell>
                <TableCell align="right">{item.categoria}</TableCell>
                <TableCell align="right">{item.dia}</TableCell>
                <TableCell align="right">{item.valor.toString().replace('.', ',')}</TableCell>
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