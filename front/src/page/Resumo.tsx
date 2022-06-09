import { Box } from '@material-ui/core';
import { useTotal, IarrDados } from '../data/data';

const styled = { display: "flex", justifyContent: "space-between", margin: "0px 20px" }

function Resumo(dados: IarrDados) {

    let dados1 = useTotal(dados)
    if (dados1 === undefined) {
        return <Box> Não foi encontrado valores para este periodo </Box>
    } else return (
        <Box style={{ display: "flex", flexDirection: "column" }} >
            <Box style={styled} > <p>Categoria</p><p> Valor</p></Box>
            <Box style={styled} > <p>Lazer:</p><p> {dados1.lazer.toFixed(2)}</p></Box>
            <Box style={styled} > <p>Saúde:</p><p> {dados1.saude.toFixed(2)}</p></Box>
            <Box style={styled} > <p>Alimentação:</p><p> {dados1.alimentacao.toFixed(2)}</p></Box>
            <Box style={styled} > <p>Moradia:</p><p> {dados1.moradia.toFixed(2)}</p></Box>
            <Box style={styled} > <p>Transporte:</p><p> {dados1.transporte.toFixed(2)}</p></Box>
            <Box style={styled} > <p>Outros:</p><p> {dados1.outros.toFixed(2)}</p></Box>
        </Box>
    );
}

export { Resumo }