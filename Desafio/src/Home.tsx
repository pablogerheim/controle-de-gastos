import { useState, useEffect } from "react";
import { Tabela } from "./page/Tabela";
import { Resumo } from "./page/Resumo"
import { arrMes, arrAno, api, signOutEndpoint } from './data/data';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Box, Select, InputLabel, Paper, Avatar, TableContainer, Table, Button } from "@material-ui/core";
import { createStyles, Theme } from '@material-ui/core/styles';
import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Idados, IarrDados } from "./data/data"

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
    let { mes } = useParams<{ mes: string }>();
    const navigate = useNavigate();

    const [dados, setDados] = useState<IarrDados>([])
    const [controle, setControle] = useState<number>(0)
    const [controleURL, setControleURL] = useState<number>(0)
    const [valorTotal, setValorTotal] = useState<number>(0)
    const [selecMes, setSelecMes] = useState<string>('07')
    const [selecAno, setSelecAno] = useState<string>('2020')
    const [aba, setAba] = useState<Boolean>(false)

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
        setControleURL(1)
        setControle(1)
    }, [mes])

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

    function handlelogout(): void {signOutEndpoint()} 


    let detalhes = useMemo(() => Tabela(dados), [dados])

    let resumo = useMemo(() => Resumo(dados), [dados])

    const classes = useStyles();
    return (
        <><Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
            <h1>Controle de Gastos</h1>
            <Box display={'flex'} alignItems={'center'} gridGap={'7px'}>
            <Avatar src="../public/logo512.png" alt="Avatar"/>
                <Button onClick={() => handlelogout}><a href="/">Sair</a></Button>
            </Box>
        </Box>
                <TableContainer component={Paper}>
                    <Box margin="5px 20px"  >
                        <InputLabel id="demo-simple-select-label">Ano</InputLabel>
                        <Select
                            style={{ width: "190px", marginBottom:"10px" }}
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
                            style={{ width: "190px" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selecMes}
                            onChange={handleChangeMes}
                        >
                            {arrMes.map((item, i) => (
                                <MenuItem key={i} value={i.toString().padStart(2, '0')}>{item}</MenuItem>
                            ))}
                        </Select>
                        <Box style={{ direction: "rtl" }}>
                            Despesa total: {valorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </Box>
                    </Box>
                <Box display={"flex"} justifyContent={"center"} gridGap={'10px'} width={"100%"} boxShadow={' inherit'}
                paddingBottom={'7px'} >
                        <Button variant="contained" type="button" onClick={() => setAba(false)}>Resumo</Button>
                        <Button variant="contained" type="button" onClick={() => setAba(true)}>Detalhes</Button>
                    </Box>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        {aba ? detalhes : resumo}
                    </Table>
                </TableContainer>
        </>
    );
}

export { Home };
