import React from 'react';
import { useRouter } from 'next/router'
import styles from './Header.module.css';
import Menu from '@mui/icons-material/Menu';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';

export default function Header({transparent : transparentProps = true}){
    const router = useRouter()

    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [transparent, setTransparent] = React.useState(false);
    const [open, setOpen] = React.useState(false)

    const listItens = [
        {id: 1, title: "Início", section: "/"},
        {id: 2, title: "Anúncios", section: "/anuncios"},
    ]

    const handleScroll = e => {
        setScrollPosition(document.documentElement.scrollTop)
    }

    React.useEffect(() => {
        setTransparent(scrollPosition <= 100)
    }, [scrollPosition])

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return <div>
        <div className={
            transparent
            ? styles.basicHeaderTransparent
            : styles.basicHeader
        }>
            <div className={styles.gridContainerLogo}>
                <div className={styles.itemLogo}>
                    {".".split("")
                    .map((letra, index) => <div 
                        className={styles.logo}
                        key={`${letra};;${index}`}
                        onClick={() => {
                            setOpen(false)
                            window.location.href=`/`
                        }} 
                    >
                        {letra}
                    </div>)}
                </div>
                <div/>
                <div 
                    className={styles.itemIcon}
                    onClick={() => setOpen(!open)} 
                >
                    <Menu className={styles.icon}/>
                </div>
            </div>
            <Collapse 
                in={open}
                timeout="auto" 
                unmountOnExit
                className={styles.collapse}  
            >
                <List 
                    component="div" 
                    disablePadding
                    className={styles.list} 
                >
                    {listItens.map((i, index) => 
                    <ListItemButton 
                        sx={{ pl: 3 }}
                        key={`${i.id};;${index}`}
                        onClick={(e) => {
                            setOpen(false)
                            e.preventDefault();
                            router.push(`${i.section}`)
                        }}
                    >
                        <ListItemText primary={i.title} />
                    </ListItemButton>)}
                </List>
            </Collapse>
        </div>
    </div> 
}
