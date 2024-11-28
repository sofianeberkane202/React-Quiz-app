import { useEffect, useReducer } from "react"

import { fetchData } from "./helper";
import { Question } from "./Question";

function reducer(state, action){
  switch(action.type){
    case 'loading': return {...state, status: 'loading'};
    case 'ready': return {...state, status: "ready", questions: action.payload.Data};
    case 'active': return {...state, status: 'active'};
    case 'answers': 
    const newPoints= 
    action.answer === state.questions[state.index].correctOption ?
    state.pointsEarned + state.questions[state.index].points :
    state.pointsEarned;
    
    return {
      ...state,
      status:'answered',
      choosenAnswer: action.answer,
      pointsEarned: newPoints,
      };
    
    case 'nextQuestion': 
      const nextQuestion = state.index + 1;
      return {...state,
        status: 'active' , 
        index: nextQuestion,
        choosenAnswer: null,
      };

    case 'finish': 
    return{...state,
    status: 'finish',
    index:0,
    answerChoosen:null, 
    };
    
    default: new Error('There is no kind of type like this one!!!')
  }
}

const initialState= {
  status: 'loading',
  questions: [],
  index: 0,
  choosenAnswer: null,
  pointsEarned: 0,
}

export default function App(){

  const [{status, questions, index,choosenAnswer,pointsEarned}, dispatch]= useReducer(reducer,initialState);
  

  useEffect(function(){
    async function fetchQuestionsData(){
      try {
        const data = await fetchData('http://localhost:8000/questions');
        dispatch({type: "ready", payload: {Data: data}});
        
      } catch (error) {
        
      }
    }


    status==='loading' && fetchQuestionsData();
  },[status])

  return (
    <div className="app">
      <Header/>
      <main className="main">
        {status==='loading' && <Loader/>}
        {status==='ready' && 
        
        <div className="start">
          <button 
          className="btn btn-ui"
          onClick={() => dispatch({type: 'active'})}
          >
            Start Quiz
          </button>
        </div>
        }

        {(status==='active' || status==='answered') &&
          <ProgressBar
          numQuestions={questions.length}
          points={questions.map(q => q.points)}
          currentQuestion={index + 1}
          pointsEarn={pointsEarned}
          />
        }
        
        {status==='active' && 
        <>
          <Question
          question={questions[index]}
          dispatch={dispatch}
          />
        </>
        
        }

        {status==='answered' &&
        <>
          <Question
          question={questions[index]}
          dispatch={dispatch}
          answerChoosen={choosenAnswer}
          />

          {index + 1< questions.length ?
          <button 
          className="btn btn-ui"
          onClick={() => dispatch({type: "nextQuestion"})}
          >
            Next
          </button>
          :
          <button 
          className="btn btn-ui"
          onClick={() => dispatch({type: "finish"})}
          >
            Finish
          </button>

          }
        </>
        }

        {status === 'finish' && 
        <Result
        numQuestions={questions.length}
        pointsEarned={pointsEarned}
        points={questions.map(q => q.points)}
        /> }
        
      </main>

      

    </div>
  )
}

function Header(){
  return(
    <div className="app-header">
        <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="logo"/>
        <h1>the react quiz</h1>
      </div>
  )
}

function Loader(){
  return(
    <div className="loader-container">
      <p className="loader"></p>
    </div>
  )
}

function ProgressBar({points, numQuestions,currentQuestion,pointsEarn}){
  const totalPoints = points.reduce((acc,point) => acc + point,0);
  return (
    <>
      <progress value={currentQuestion}  max={numQuestions}/>
      <div className="progress">
        <p>Question {currentQuestion} / {numQuestions}</p>
        <p>Points {pointsEarn} / {totalPoints}</p>
      </div>
    </>
  )
}



function Result({pointsEarned,points}){
  const totalPoints = points.reduce((acc,point) => acc + point,0);
  const percentage = Math.ceil(pointsEarned * 100 / totalPoints)
  return (
    <p className="result">{`You scored (${percentage}%)`} </p>
  )
}