import { Box, TableCell, TableRow, TableBody, TableHead, Table } from '@material-ui/core';
import { Idados, IarrDados } from "../data/data"
//import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';



function Tabela(dados: IarrDados, classes:any) {

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
    //const classes = useStyles();
    return (
        <>  
        <Table className={classes.table} size="small" aria-label="a dense table"></Table>              
            <TableHead >
                <TableCell>Despesa</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Dia</TableCell>
                <TableCell align="right">Valor(R$)</TableCell>
            </TableHead>
            <TableBody>
            {dados.map((item: Idados) => (

                <Linha
                    mes={item.mes}
                    id={item.id}
                    descricao={item.descricao}
                    categoria={item.categoria}
                    dia={item.dia}
                    valor={item.valor}
                />
            ))}</TableBody>
            <Table/>
        </>

    )
}
export { Tabela }