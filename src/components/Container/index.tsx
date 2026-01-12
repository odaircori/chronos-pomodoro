import styles from './styles.module.css'

type ContainerChildren = {
    children: React.ReactNode
}

export function Container({children}: ContainerChildren){
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    {children}
                </div>
            </div>            
        </>
    )
}