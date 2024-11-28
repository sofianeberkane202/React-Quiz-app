import { useEffect, useReducer } from "react"

import { fetchData } from "./helper";

function reducer(state, action){
  switch(action.type){
    case 'loading': return {...state, status: 'loading'};
    
    default: new Error('')
  }
}

const initialState= {
  status: 'loading',
  questions: [],
}

export default function App(){

  const [{status, questions}, dispatch]= useReducer(reducer,initialState);
  console.log(status, questions);

  useEffect(function(){
    async function fetchQuestionsData(){
      try {
        const data = await fetchData('http://localhost:8000/questions');
        
      } catch (error) {
        
      }
    }

    fetchQuestionsData();
  })

  return (
    <div className="app">
      <Header/>
      {status==='loading' && <Loader/>}

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
