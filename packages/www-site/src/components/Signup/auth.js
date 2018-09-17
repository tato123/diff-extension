export const signup = async (email, password, displayName) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      displayName,
    }),
  }

  const response = await fetch(`${process.env.API_SERVER}/signup`, {
    ...options,
    method: 'POST',
  })

  if (!response.ok) {
    return Promise.reject(response.statusText)
  }

  return response.json()
}

export const login = async (accessToken, refreshToken, db) => {
  await db.app.auth().setPersistence('session')

  const results = db.app.auth().signInWithCustomToken(accessToken)

  chrome.runtime.sendMessage(
    process.env.EXTENSION_ID,
    { type: 'STORE_TOKEN', payload: { refreshToken } },
    response => {
      console.log('Extension response', response)
    }
  )
  return results
}

export const isUser = async email => {
  const response = await fetch(
    `${process.env.API_SERVER}/validate?email=${email}`
  )

  if (!response.ok) {
    return Promise.reject(response.statusText)
  }

  return response.text()
}
