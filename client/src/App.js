import './App.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Form from './component/Form'

function App() {
  const { data } = useQuery(['todo'], async () => {
    try {
      const res = await axios.get('http://localhost:8000/todo')
      return res.data;
    } catch (error) {
      throw error;
    }
  })

  console.log('Data', data)
  return (
    <div className="App">
      <Form />
      {data && data.data && data.data.map((todo) => <li key={todo.id}>{todo.title}</li>)}
    </div>
  )
}

export default App
