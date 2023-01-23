import React from "react";
import {
	Button,
	Divider, Grid, IconButton, Table, TableBody, TableCell,
	TableFooter,
	TableHead, TablePagination, TableRow, Toolbar, Tooltip
} from "@material-ui/core";
import styles from './Anuncios.module.css';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TablePaginationActions from '../../src/components/TablePaginationActions';
import ClientContext from "../../src/contexts/ClientContext";
import { Suspense } from 'react';
import ConfirmDelete from "../../src/components/ConfirmDelete";
import { showNotification } from "@mantine/notifications";

export default function Anuncios() {
    const { apiRequest } = React.useContext(ClientContext);
	
    const [loading, setLoading] = React.useState(false);
    const [anuncios, setAnuncios] = React.useState([]);

    // get anuncios
    const getAnuncios = () => {
        setLoading(true)
        apiRequest("GET", "/anuncios/")
        .then((res) => {
            setAnuncios(res)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    React.useEffect(() => {
        getAnuncios()
    }, []);

    // delete
    const [anuncioDelete, setAnuncioDelete] = React.useState(null);

    const deleteAnuncio = () => {
        setLoading(true)
        apiRequest("DELETE", `/anuncios/delete/${anuncioDelete.id}`)
        .then((res) => {
            getAnuncios()
            showNotification({message: res, color: 'green', autoClose: true})
        })
        .catch((err) => {
            setLoading(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    // TablePagination
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => setPage(newPage);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

    return <div className={styles.container}>
        <div className="table-responsive">
            <Toolbar>
                <Grid
                    container 
                    spacing={2}
                    direction="row"
                    className={styles.headGrid} 
                >
                    <Grid item xs={12} sm={12} md={6}>
                        <h2 className={styles.titleTable}>
                            {"Anúncios"}
                        </h2>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}></Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <Button 
                            fullWidth
                            color="primary" 
                            variant="contained"
                            className={styles.buttonHead}
                            onClick={() =>  console.log('todo esse botao')}
                        > {"adicionar aqui"} </Button>
                    </Grid>
                </Grid>
            </Toolbar>

            <Divider/>
            
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        {["ID", "Nome", "Marca", "Editar", "Deletar"]
                        .map((title, index) => (
                            <TableCell 
                                key={`${title};;${index}`}
                                className={styles.headCell}
                            > {title} </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                    {<Suspense fallback={<div>Loading...</div>}>
                        {!loading ? (
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? anuncios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : anuncios
                                ).map((item, index) => (
                                    <TableRow index={index} key={`${item.id};;${index}`}>
                                        <TableCell className={styles.bodyCell}>
                                            {item.id}
                                        </TableCell>
                                        <TableCell className={styles.bodyCell}>
                                            {item.nome}
                                        </TableCell>
                                        <TableCell className={styles.bodyCell}>
                                            {item.marca}
                                        </TableCell>
                                        <TableCell className={styles.bodyCell}>
                                            <Tooltip title="Editar">
                                                <IconButton onClick={() => setAnuncioDelete(item)} >
                                                    <EditIcon 
                                                        fontSize="medium" 
                                                        className={styles.iconTable}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell className={styles.bodyCell}>
                                            <Tooltip title="Deletar">
                                                <IconButton onClick={() => setAnuncioDelete(item)}>
                                                    <DeleteIcon
                                                        ontSize="medium" 
                                                        className={styles.iconTable}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell className={styles.bodyCell}>
                                        Anuncios...
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Suspense>}
                <TableFooter>
                    <TablePagination
                        colSpan={6}
                        page={page}
                        count={anuncios.length}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        ActionsComponent={TablePaginationActions}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        SelectProps={{
                            inputProps: { 'aria-label': 'Conteúdos por página' },
                            native: true,
                        }}
                    />
                </TableFooter>
            </Table>
        </div>
    
        <ConfirmDelete
            open={!!anuncioDelete}
            setOpen={setAnuncioDelete}
            title={"Remover Anuncio"}
            removeFunction={() => {deleteAnuncio()}}
        />
    </div>
}