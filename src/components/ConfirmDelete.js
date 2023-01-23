import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography } from '@material-ui/core';
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDelete({
	open, setOpen, removeFunction, title
}) {
	const handleClose = () => setOpen(false)

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<DialogTitle style={{fontSize: 26}}>
					{title}
				</DialogTitle>
				<DialogContent>
					<Typography style={{ fontSize: 20 }}>
						Tem certeza que deseja excluir?
					</Typography>
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
								Não
                            </Button>
                        </Grid>
						<Grid item xs={12} md={6}>
                            <Button 
                                fullWidth
                                color="primary"
                                variant="contained"
                                onClick={() => {
									handleClose()
									removeFunction()
								}} 
                            >
                                Sim
                            </Button>
                        </Grid>
                    </Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
}
