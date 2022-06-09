import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../Home.css"
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { arrCategoria, updateEventEndpoint } from "../data/data"
import {v4} from 'uuid'
import { useState } from 'react';
import EventEmitter from '../helper/EventEmitter';

export default function FormDialog({
    category = "",
    description = "",
    date = "",
    price = "",
    id = ""
}): JSX.Element {
    const [open, setOpen] = useState(false);
    const [ccategory, setCategory] = useState<any>(category);
    const [cdescription, setDescription] = useState(description);
    const [cdate, setDate] = useState(date);
    const [cprice, setPrice] = useState(price);



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function handleAdd() {
        cdate.split('')
        let dia = date[8] + date[9]
        let mes = date.slice(0, 7)
        updateEventEndpoint(cdescription, ccategory, cprice, mes, dia, id)
        setOpen(false)
        EventEmitter.emit('update',{ text: "update" })
    }
    function handleChangeDescription(params: string) {
        setDescription(params)
    }
    function handleChangeDate(params: string) {
        console.log(params)
        setDate(params)
    }
    function handleChangeCategory(params: any ) {
        setCategory(params)
    }
    function handleChangePrice(params: string) {
        setPrice(params)
    }

    return (
        <div >
            <Button id="newSpend" variant="contained" color="primary" onClick={handleClickOpen}>
                Atualizar
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Atualizar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Adicione as informações do atualizadas
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={cdescription}
                        onChange={(e) => handleChangeDescription(e.target.value)}
                        margin="dense"
                        id="name"
                        label="Descrição"
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        value={cdate}
                        id="date"
                        onChange={(e) => handleChangeDate(e.target.value)}
                        label="Data"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        required
                    />

                    <FormControl variant="outlined" id="categoriaid">
                        <InputLabel htmlFor="outlined-Categoria-native-simple">Categoria</InputLabel>
                        <Select
                            value={ccategory}
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
                            value={cprice}
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
