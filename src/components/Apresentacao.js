import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material';
import styles from './Apresentacao.module.css';

export default function Header(){
    const router = useRouter()

    return <section className={styles.header}>
        <div className={styles.container}>
            <div className={styles.main}>
                <Button
                    variant="contained" 
                    className={styles.buttonStart}
                    onClick={(e) =>  {
                        e.preventDefault();
                        router.push('/anuncios')
                    }}
                > Comece aqui </Button>
                <a className={styles.a1}>Anúcio de</a>
                <a className={styles.a2}>Automóveis</a>
                <p className={styles.text}>Um projeto utilizando React no front-end e Node.js no back-end com a finalidade de que seja possível listar, visualizar, criar, editar e excluir carros de uma aplicação de anuncios de venda de automóveis.</p>
            </div>
            
            <div className={styles.secondary}>
                <img
                    alt=''
                    src={'by-car.png'} 
                    className={styles.imagemCarro}
                />
            </div>
        </div>
    </section>
}