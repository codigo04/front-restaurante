
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material';

export const DeleteDialog = (deleteItem) => {
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleOpenDialog = (id) => {
        setItemToDelete(id);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setItemToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            deleteItem(itemToDelete); // Cambiado a un nombre general
        }
        handleCloseDialog();
    };

    return {
        openDialog: handleOpenDialog, // Exponemos la función de apertura
        dialogComponent: (
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle><Typography variant="h5" fontWeight="bold">
                    Confirmar Eliminación
                </Typography></DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ backgroundColor: "#ff6600", color: "#fff" }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        ),
    };
}

