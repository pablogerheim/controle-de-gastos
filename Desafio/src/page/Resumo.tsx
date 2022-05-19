import { Box } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useTotal, IarrDados } from '../data/data';



function Resumo(dados:IarrDados) { console.log(dados)

    let dados1 = useTotal(dados)
    if (dados1 === undefined) {
        return <Box> Não foi encontrado valores para este periodo </Box>
    }else return (
        <TableRow >
            <TableCell component="th" scope="Row">alimentacao: {dados1.alimentacao}</TableCell>
            <TableCell align="right">lazer: {dados1.lazer}</TableCell>
            <TableCell align="right">alimentacao: {dados1.alimentacao}</TableCell>
            <TableCell align="right">moradia: {dados1.moradia}</TableCell>
            <TableCell align="right">transporte: {dados1.transporte}</TableCell>
            <TableCell align="right">outros: {dados1.outros}</TableCell>
        </TableRow>
    );
}

export { Resumo }