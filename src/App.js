import { useEffect,useState } from 'react';
import './App.css';

function App() {
  const [userChoice, setUserChoice] = useState('start')
  const [computerChoice, setComputerChoice] = useState('start')
  const [userPoints, setUserPoints] = useState(0)
  const [computerPoints, setComputerPoints] = useState(0)
  const [turnResult, setTurnResult] = useState()
  const [result, setResult] = useState()
  const [gameOver, setGameOver] = useState(false)

  const choices = ['rock', 'paper', 'scissors']

  const handleOnclick = (choice) => {
    setUserChoice(choice)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  const reset = () => {
    window.location.reload()
  }

  useEffect(() => {
    const comboMoves = userChoice + computerChoice

    if (userPoints <= 4 && computerPoints <= 4) {
      if (comboMoves === 'rockscissors' || comboMoves === 'paperrock' || comboMoves === 'scissorspaper') {
        const UpdateUserPoints = userPoints + 1
        setUserPoints(UpdateUserPoints)
        setTurnResult("→ You Got The Point ←")
        if (UpdateUserPoints === 5) {
          setGameOver(true)
          setTurnResult(null)
          setResult("Congratulation! You Won Against The AI")
        }
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        const UpdateComputerPoints = computerPoints + 1
        setComputerPoints(UpdateComputerPoints)
        setTurnResult("→ AI Got The Point ←")
        if (UpdateComputerPoints === 5) {
          setGameOver(true)
          setTurnResult(null)
          setResult("Oops, AI Win's")
        }
      }

      if (comboMoves === 'rockrock' || comboMoves === 'scissorsscissors' || comboMoves === 'paperpaper') {
        setTurnResult("→ No one got the Point ←")
      }
    }
  }, [userChoice, computerChoice])

  return (
    <div className="App">
      <h1 className="turn-result">{turnResult}</h1>
      <div className="game-body">
        <div className="game-choice">
          <img src={`../images/ai/${computerChoice}.png`} className="ai-hand" />
          <h2>AI : {computerPoints}</h2>
        </div>
        <div className="game-choice">
          <img src={`../images/${userChoice}.png`} className="user-hand" />
          <h2>YOU : {userPoints}</h2>
        </div>
      </div>
      <div className="result">
        <h2 className='final-result'>{result}</h2>
        {gameOver && <button className="reset-btn" onClick={()=>reset()}>Restart Game</button> }
      </div>
      <div className="button-div">
        {choices.map((choice, index) =>
          <button className="button" disabled={gameOver} key={index} onClick={()=> handleOnclick(choice)}>
              <img src={`../images/${choice}.png`} className='btn-img' />
          </button>
        )}
      </div>
    </div>
  );    
}

export default App;
