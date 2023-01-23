import React from "react";
import moment from 'moment'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
import styles from './AnuncioModal.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography, TextField, Card, FormControl, Select, MenuItem } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDelete({
	open, setOpen, 
    action, title,
    currentAnuncio,
    donos, buttonActionText
}) {
	const handleClose = () => setOpen(false)
    
    const [selectValue, setSelectValue] = React.useState(null);

	const handleChange = (e) => setOpen(data => ({
        ...data,
        [e.target.name]: e.target.value
    }))

    if(!currentAnuncio) return null;

	return (
		<div>
			<Dialog
				open={open}
                maxWidth="lg"
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<DialogTitle className={styles.dialogTitle}>
					{title}
				</DialogTitle>
				<DialogContent>
                    <Grid 
                        container 
                        spacing={3}
                        direction="row" 
                        style={{margin: '0vh 1vw 0vh 0vw'}}
                        xs={12} sm={12} md={12} 
                    >
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                fullWidth
                                type="text"
                                name="nome"
                                variant="outlined"
                                label="Nome"
                                value={{...currentAnuncio}.nome}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                fullWidth
                                type="text"
                                name="marca"
                                variant="outlined"
                                label="Marca"
                                value={{...currentAnuncio}.marca}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                fullWidth
                                type="date"
                                name="ano_de_fabricacao"
                                variant="outlined"
                                label="Ano de fabricação"
                                value={
                                    {...currentAnuncio}.ano_de_fabricacao 
                                    ? moment({...currentAnuncio}.ano_de_fabricacao)
                                    .format("YYYY-MM-DD") : ""
                                }
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                fullWidth
                                type="text"
                                name="descricao"
                                variant="outlined"
                                label="Descricao"
                                value={{...currentAnuncio}.descricao}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>

                        <Grid item sm={12} md={12} lg={12}>
                            <Typography className={styles.dialogText}
                            > Insira os donos </Typography> 
                        </Grid>
                        <Grid item sm={12} md={4} lg={4}>
                            <FormControl
                                fullWidth
                                variant="outlined"
                            >
                                <Select
                                    fullWidth
                                    value={{...selectValue}.nome}
                                    onChange={(e) => setSelectValue(e.target.value)}
                                >
                                    {donos.map((item, index) => 
                                        <MenuItem 
                                            key={`${item.id};;${index}`}
                                            value={item}
                                        > {item.nome} </MenuItem> 
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item sm={12} md={1} lg={1}>
                            <Button
                                variant="contained"
                                className={styles.addButton}
                                onClick={() => {
                                    if(!{...selectValue}.id) return null;

                                    if(currentAnuncio.donos_anuncios) {
                                        setOpen(data => ({
                                            ...data,
                                            donos_anuncios: [
                                                ...data.donos_anuncios,
                                                {...selectValue}
                                            ]
                                        }))

                                    } else setOpen(data => ({
                                        ...data,
                                        donos_anuncios: [ 
                                            {...selectValue}
                                        ]
                                    }))
                                    
                                    setSelectValue(null)
                                }}
                            >
                                <AddIcon 
                                    fontSize="medium"
                                    className={styles.icon}
                                />
                            </Button>
                        </Grid>

                        <Grid item sm={12} md={12} lg={12}>
                            <Card 
                                variant="outlined"
                                className={styles.card}
                            >
                                <Grid
                                    container
                                    spacing={1}
                                    direction="row"
                                >
                                    {(currentAnuncio.donos_anuncios || [])
                                    .map((item, index) => (
                                        <Grid 
                                            item
                                            key={`${item};;${index}`}
                                            xs={6} sm={6} md={4}
                                        >
                                            <Card 
                                                variant="elevation"
                                                className={styles.cardItem}
                                             >
                                                <Grid 
                                                    container
                                                    spacing={1}
                                                    direction="row"
                                                >
                                                    <Grid item>
                                                        <CloseIcon
                                                            className={styles.closeIcon}
                                                            onClick={() => {
                                                                setOpen(data => ({
                                                                    ...data,
                                                                    donos_anuncios: data.donos_anuncios.filter(i => i.id !== item.id) 
                                                                }))
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        {item.nome}
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>)
                                    )}
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
				</DialogContent>
				<DialogActions>
					<Grid 
                        container 
                        spacing={1}
						style={{margin: '1vh'}}
                    >
                        <Grid item xs={12} md={6}>
                            <Button 
                                fullWidth
                                color="primary"
                                variant="outlined"
                                onClick={() => handleClose()} 
                            > Cancelar </Button>
                        </Grid>
						<Grid item xs={12} md={6}>
                            <Button 
                                fullWidth
                                color="primary"
                                variant="contained"
                                onClick={() => {
									handleClose()
									action()
								}} 
                            > <div className={styles.textButton}> {buttonActionText} </div> </Button>
                        </Grid>
                    </Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
}
