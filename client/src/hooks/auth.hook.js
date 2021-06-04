import {useState, useCallback, useEffect} from 'react'

const storageUser="userdata"

export const useAuth=()=>{
  const [userId,setUserId]= useState(null)

  const login=useCallback((id)=>{
      setUserId(id)
      localStorage.setItem(storageUser,JSON.stringify({userId:id}))
  },[])
 useEffect(()=>{
     const data= JSON.parse( localStorage.getItem(storageUser))
     if(data ){
        login(data.userId)
 }},[login])
  return {login, userId}
}