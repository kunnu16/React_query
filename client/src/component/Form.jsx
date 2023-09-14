import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useMutation,useQueryClient } from '@tanstack/react-query'

const createTodo = (text) => {
  return () => {
    axios.post('http://localhost:8000/todo/create', {title: text})
  }
}

const Form = () => {
  const [text, setText] = useState('')
  const queryClient = useQueryClient();

  const todoMutation = useMutation(createTodo(text), {
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries(['todo']);
    },
    onError: ()=> {
      console.log('Error');
    },
  })
  return (
    <div>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Enter Todo"
      />
      <button onClick={(e) => todoMutation.mutate()}>Create</button>
    </div>
  )
}

export default Form
