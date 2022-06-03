import {useState, useEffect} from 'react'
import { Controllers } from './Controllers'
import styles from './Timer.module.css'

export const Timer = () => {
  const [initial, setInitial] = useState<Date>(new Date())
  const [timer, setTimer] = useState<Date>(new Date(0))
  const [isRunning, setIsRunning] = useState(false)
  const [loop, setLoop] = useState<NodeJS.Timer>()

  function start(){
    setInitial(new Date())
    setIsRunning(!isRunning)
    if(isRunning){
      setTimer(new Date(0))
    }
  }

  function tick(){
    const currentTimer = new Date(+new Date() - +initial)
    setTimer(currentTimer)
  }

  useEffect(() => {
    if(loop) clearInterval(loop)
    if(isRunning){
      setLoop(setInterval(tick, 10))
    }
  }, [isRunning])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{timeFormat(timer)}</h1>
      <Controllers isRunning={isRunning} start={start}/>
    </div>
  )
}

function timeFormat(date: Date | null){
  if(!date) return `00:00:00:00`

  const hours = date.getUTCHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  const hh = hours < 10 ? '0'+hours : hours
  const mm = minutes < 10 ? '0'+minutes : minutes
  const ss = seconds < 10 ? '0'+seconds : seconds
  let cm = String(Math.round(milliseconds / 10))
  cm = Number(cm) < 10 ? '0'+cm : cm

  return `${hh}:${mm}:${ss}:${cm}`
}