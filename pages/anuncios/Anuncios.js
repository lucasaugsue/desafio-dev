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

export default function Anuncios() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

    React.useEffect(() => {
        setPage(0);
        setRowsPerPage(5);
    }, []);

  	const headerTable = ["name", "age", "edit", "delete"]
  	const bodyTable = [
	  	{id: 1, name: "qwe", age: "12"},
	  	{id: 2, name: "qwe", age: "12"},
	  	{id: 3, name: "zxc", age: "12"},
	  	{id: 4, name: "qwre", age: "12"},
	  	{id: 5, name: "tyf", age: "12"},
	  	{id: 6, name: "fdgn", age: "13"}
	]
    
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
                        {headerTable.map((title, index) => (
                            <TableCell 
                                key={`${title};;${index}`}
                                className={styles.headCell}
                            >
                                {title} 
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (rowsPerPage > 0
                            ? bodyTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : bodyTable
                        ).map((item, index) => (
                            <TableRow index={index} key={`${item.id};;${index}`}>
                                <TableCell className={styles.bodyCell}>
                                    {item.name}
                                </TableCell>
                                <TableCell className={styles.bodyCell}>
                                    {item.age}
                                </TableCell>
                                <TableCell className={styles.bodyCell}>
                                    <Tooltip title="Editar">
                                        <IconButton 
                                            onClick={() => {
                                                console.log("todo editar")
                                                // props.handleOpenEdit(item);
                                            }} 
                                        >
                                            <EditIcon fontSize="medium" className={styles.iconTable}/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className={styles.bodyCell}>
                                    <Tooltip title="Deletar">
                                        <IconButton 
                                            onClick={() => {
                                                console.log("todo delet")
                                                // props.handleOpenDelete(item)
                                            }}
                                        >
                                            <DeleteIcon fontSize="medium" className={styles.iconTable}/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                    <TablePagination
                        colSpan={6}
                        page={page}
                        count={bodyTable.length}
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
    </div>
}