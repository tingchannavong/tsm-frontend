import styles from "../styles/LoginPage.module.css";

function SessionCard() {
  return (
    <>
    <div className={styles.container}>
        <h1>Name: </h1>
        <h1>Player Number: </h1>
        <h1>Start Time: </h1>
        <h1>Est. Price: </h1>
    </div>
    </>
  )
}

export default SessionCard