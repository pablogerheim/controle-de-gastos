import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../Home.css"
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { arrCategoria, createEventEndpoint } from "../data/data"
import {v4} from 'uuid'
import { useState } from 'react';
import EventEmitter from '../helper/EventEmitter';

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState<any>("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function handleAdd() {
        date.split('')
        let dia = date[8] + date[9]
        let mes = date.slice(0, 7)
        createEventEndpoint(description, category, price, mes, dia)
        setOpen(false)
        EventEmitter.emit('update',{ text: "update" })
    }
    function handleChangeDescription(params: string) {
        setDescription(params)
    }
    function handleChangeDate(params: string) {
        setDate(params)
    }
    function handleChangeCategory(params: string | unknown) {
        setCategory(params)
    }
    function handleChangePrice(params: string) {
        setPrice(params)
    }

    return (
        <div >
            <Button id="newSpend" variant="contained" color="primary" onClick={handleClickOpen}>
                Novo gasto
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Novo Gasto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Adicione as informações do novo gasto
                    </DialogContentText>
                    <TextField
                        autoFocus
                        onChange={(e) => handleChangeDescription(e.target.value)}
                        margin="dense"
                        id="name"
                        label="Descrição"
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        id="date"
                        onChange={(e) => handleChangeDate(e.target.value)}
                        label="Data"
                        type="date"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        required
                    />

                    <FormControl variant="outlined" id="categoriaid">
                        <InputLabel htmlFor="outlined-Categoria-native-simple">Categoria</InputLabel>
                        <Select
                            native
                            onChange={(e) => handleChangeCategory(e.target.value)}
                            fullWidth
                            required
                            label="Categoria"
                            inputProps={{
                                name: 'Categoria',
                                id: 'outlined-Categoria-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {arrCategoria.map(item => <option key={v4()} value={item} >{item}</option>)}
                        </Select>
                        <TextField
                            autoFocus
                            onChange={(e) => handleChangePrice(e.target.value)}
                            margin="dense"
                            id="valor"
                            label="Valor"
                            type="number"
                            fullWidth
                            required
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
