import React from "react";
import styles from './ConfirmDelete.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography } from '@material-ui/core';

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
                maxWidth="lg"
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<DialogTitle className={styles.dialogTitle}>
					{title}
				</DialogTitle>
				<DialogContent>
					<Typography className={styles.dialogText}>
						Tem certeza que deseja excluir?
					</Typography>
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
                                color="secondary"
                                variant="contained"
                                onClick={() => handleClose()} 
                            > Não </Button>
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
                            > Sim </Button>
                        </Grid>
                    </Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
}
