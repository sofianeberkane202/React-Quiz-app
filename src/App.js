import { useEffect, useReducer } from "react"

import { fetchData } from "./helper";
import { Question } from "./Question";

function reducer(state, action){
  switch(action.type){
    case 'loading': return {...state, status: 'loading'};
    case 'ready': return {...state, status: "ready", questions: action.payload.Data};
    case 'active': return {...state, status: 'active'};
    
    default: new Error('')
  }
}

const initialState= {
  status: 'loading',
  questions: [],
  index: 0,
}

export default function App(){

  const [{status, questions, index}, dispatch]= useReducer(reducer,initialState);
  // console.log(status, questions);

  useEffect(function(){
    async function fetchQuestionsData(){
      try {
        const data = await fetchData('http://localhost:8000/questions');
        dispatch({type: "ready", payload: {Data: data}});
        
      } catch (error) {
        
      }
    }


    status=== 'loading' && fetchQuestionsData();
  },[status])

  return (
    <div className="app">
      <Header/>
      <main>
        {status==='loading' && <Loader/>}
        {status==='ready' && 
        
        <button 
        className="btn btn-ui"
        onClick={() => dispatch({type: 'active'})}
        >
          Start Quiz
        </button>}
        
        {status==='active' && 
        <Question
        question={questions[index]}
        />}
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


