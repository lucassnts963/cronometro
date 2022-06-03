import styles from './Controllers.module.css'

interface Props {
  start:  () => void
  isRunning: boolean
}

export const Controllers = ({ start, isRunning } : Props) => {
  return (
    <div className={styles.containerControllers}>
      <button className={styles.button} onClick={start}>{isRunning ? 'Reiniciar' : 'Iniciar'}</button>
    </div>
  )
}
