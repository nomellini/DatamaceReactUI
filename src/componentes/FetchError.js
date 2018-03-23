import { Redirect } from 'react-router-dom';
import React from 'react'
const FetchError = ({ message, onRetry}) =>
{

  if (message)
    return <Redirect to="/Login" state="{message}"/>
  else
   return null

}

export default FetchError