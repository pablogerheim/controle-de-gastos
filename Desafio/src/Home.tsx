import { useState, useEffect } from "react";
import { Tabela } from "./page/Tabela";
import { Resumo } from "./page/Resumo"
import { arrMes, arrAno, api } from './data/data';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Box, Select, InputLabel, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Button } from "@material-ui/core";
import { createStyles, Theme } from '@material-ui/core/styles';
import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {Idados, IarrDados} from "./data/data"
//import { AContext } from "./context/Context";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        table: {
            minWidth: 650,
        },
    }),
);

function Home() {

    //const [ dados:IarrDados, setDados: ] = useContext(AContext)

    let { mes } = useParams<{ mes: string }>();
    const navigate = useNavigate();

    const [dados, setDados] = useState<IarrDados>([])
    const [controle, setControle] = useState<number>(0)
    const [controleURL, setControleURL] = useState<number>(0)
    const [valorTotal, setValorTotal] = useState<number>(0)
    const [selecMes, setSelecMes] = useState<string>('07')
    const [selecAno, setSelecAno] = useState<string>('2020')
    const [aba, setAba] = useState<Boolean>(false)


    useMemo(() => {
        setControleURL(1)
        setControle(1)
    }, [mes])

    useEffect(() => {
        setTimeout(() => {
            if (controle === 0 && controleURL === 0) {
                navigate(`/despesas/${selecAno}-${selecMes}`)
            }
            if (controle === 0) {
                setControle(1)
                setTimeout(async () => {
                    setDados(await api(selecAno, selecMes))
                }, 500)
            }
            if (`${selecAno}-${selecMes}` !== mes && controle === 1 && mes !== undefined && controleURL === 1) {
                console.log("URL2")
                setControle(0)
                navURL(mes)
            }
        }, 200)
    }, [selecAno, selecMes, dados, mes])

    useMemo(() => {
        let valorT: number = 0
        dados.map((obj: Idados) => valorT += obj.valor)
        setValorTotal(valorT)
    }, [dados])

    function navURL(mes: string) {
        let xA: string = mes.slice(-2)
        setSelecMes(xA)
        let xM: string = mes.slice(0, 4)
        setSelecAno(xM)
    }

    const handleChangeMes = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelecMes(event.target.value as string);
        setControle(0)
        setControleURL(0)
    };
    const handleChangeAno = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelecAno(event.target.value as string);
        setControle(0)
        setControleURL(0)
    };


    let detalhes = useMemo(() => Tabela(dados), [dados])

    let resumo = useMemo(() => Resumo(dados), [dados])

    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead >
                    <Box display="grid" margin="20px" >
                        <InputLabel id="demo-simple-select-label">Ano</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selecAno}
                            onChange={handleChangeAno}
                        >
                            {arrAno.map((item, i) => (
                                <MenuItem key={i} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                        <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selecMes}
                            onChange={handleChangeMes}
                        >
                            {arrMes.map((item, i) => (
                                <MenuItem key={i} value={i.toString().padStart(2, '0')}>{item}</MenuItem>
                            ))}
                        </Select>
                        Despesa total: {valorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </Box>
                    <Button type="button" onClick={() => setAba(false)}>Resumo</Button>
                    <Button type="button" onClick={() => setAba(true)}>Detalhes</Button>

                </TableHead>
                <TableBody>{aba ? detalhes : resumo}</TableBody>
            </Table>
        </TableContainer>
    );
}

export { Home };
