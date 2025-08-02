export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return !!user && user.token
}

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('user')) || null
}

export const logout = () => {
  localStorage.removeItem('user')
}

