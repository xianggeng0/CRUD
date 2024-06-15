const TOKENKEY = 'token_key'

function setToken(token){
  localStorage.setItem(TOKENKEY,token)
}

function getToken(){
  return localStorage.getItem(TOKENKEY)
}

function removeToken(){
  return localStorage.removeItem(TOKENKEY)
}
export {
  setToken,
  getToken,
  removeToken
}