import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useNavigate, useLocation} from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            navigate(`?keyword=${keyword}&page=1`)
        }else{
            navigate(location)
        }
    }

  return (
    <Form onSubmit={submitHandler} className="inline-flex ms-auto">
        <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} className="mr-sm-2 ml-sm-5" placeholder={`Wpisz frazę`}>
        </Form.Control>
        <Button type='submit' variant='outline-success' className="p-2">Szukaj</Button>
    </Form>
  )
}

export default SearchBox
