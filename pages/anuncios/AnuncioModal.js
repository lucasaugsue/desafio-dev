import React from "react";
import moment from 'moment'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
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
				<DialogTitle style={{fontSize: 26}}>
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
                            <Typography 
                                variant="body"
                                style={{
                                    color:"gray",
                                    marginLeft: 10,
                                    marginBottom: 20, 
                                }}
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
                                style={{
                                    borderRadius: 8, 
                                    marginBottom: 5,
                                    backGroundColor: "#5F5F5F",
                                    padding: '8px 0px 8px 0px',
                                }}
                            >
                                <AddIcon 
                                    fontSize="medium"
                                    style={{color:"#555555"}}
                                />
                            </Button>
                        </Grid>

                        <Grid item sm={12} md={12} lg={12}>
                            <Card 
                                variant="outlined"
                                style={{
                                    margin: 5,
                                    borderRadius: 8,
                                    padding: "20px 20px 20px 20px",
                                    overflow:'scroll',
                                    maxHeight:400
                                }}
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
                                                style={{
                                                    borderRadius: 15,
                                                    backgroundColor: "#eeeeee",
                                                    padding: "5px 5px 5px 5px",
                                                }}
                                             >
                                                <Grid 
                                                    container
                                                    spacing={1}
                                                    direction="row"
                                                >
                                                    <Grid item>
                                                        <CloseIcon
                                                            onClick={() => {
                                                                setOpen(data => ({
                                                                    ...data,
                                                                    donos_anuncios: data.donos_anuncios.filter(i => i.id !== item.id) 
                                                                }))
                                                            }}
                                                            style={{
                                                                fontSize:20,
                                                                color: "#515A5A", 
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        {item.nome}
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                        )
                                    )}
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
				</DialogContent>
				<DialogActions>
					<Grid container style={{marginTop:'1%', margin:"2%"}} spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Button 
                                fullWidth
                                color="secondary"
                                variant="contained"
                                onClick={() => handleClose()} 
                            >
								Cancelar
                            </Button>
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
                            > {buttonActionText} </Button>
                        </Grid>
                    </Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
}
