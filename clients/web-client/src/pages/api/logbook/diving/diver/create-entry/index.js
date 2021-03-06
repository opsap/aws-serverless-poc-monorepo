import { getSession, getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function handler(req, res) {
  try {
    // if (req.method !== 'POST') {
    //   res.status(400).send({ message: 'Only POST requests allowed' })
    //   return
    // }
    const session = await getSession(req, res)
    const { idToken } = session

    const response = await fetch(`https://dev-api.opsap.com/logbook/diving/diver/create-entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify(req.body)
    })

    console.log('RESPONSE api route', response)
    const data = await response.json()
    console.log(data)

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})
