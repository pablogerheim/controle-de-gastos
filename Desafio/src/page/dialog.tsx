import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../Home.css"
import { FormControl, InputLabel, Select } from '@material-ui/core';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange() {
        return true
    }
    return (
        <div >
            <Button id="newSpend" variant="contained" color="primary" onClick={handleClickOpen}>
                Nono gasto
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Novo Gasto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Adicione as informações do novo gasto
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Descrição"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        id="date"
                        label="Data"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl variant="outlined" id="categoriaid">
                        <InputLabel htmlFor="outlined-Categoria-native-simple">Categoria</InputLabel>
                        <Select
                            native
                            onChange={handleChange}
                            label="Categoria"
                            inputProps={{
                                name: 'Categoria',
                                id: 'outlined-Categoria-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="valor"
                            label="Valor"
                            type="number"
                            fullWidth
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
