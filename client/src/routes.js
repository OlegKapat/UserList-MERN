import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import {UserList} from './pages/UserList'
import {EditPage} from './pages/EditPage'

export const UseRouts=( isAuthenticated)=>{
  if(isAuthenticated){
   return (  <Switch>
    <Route exact path="/userlist" >
      <UserList />
    </Route>
    <Route exact path="/userlist/:id"  >
      <EditPage />
    </Route>
    <Redirect to="/userlist" />
  </Switch>
   )
  }
   return(
       <Switch>
     <Route>
         <AuthPage path={'/'} exact></AuthPage>
     </Route>
     </Switch>
   )
}