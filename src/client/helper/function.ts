export const webrtcUrl = (uri: string | undefined = undefined): string => {
  const SOCKET_HOST = process.env.VITE_SOCKET_URL
  const NAMESPACE = process.env.VITE_SOCKET_WEBRTC_NAMESPACE

  if (!uri) {
    uri = NAMESPACE
  }

  if (uri?.startsWith('/')) {
    uri = uri.substring(0, 1)
  }
  if (SOCKET_HOST?.endsWith('/')) {
    return SOCKET_HOST + uri
  }

  return SOCKET_HOST + '/' + uri
}

export const webrtcTurnServer = () => {
  return {
    urls: process.env.VITE_TURN_SERVER_URL,
    username: process.env.VITE_TURN_SERVER_USER,
    credential: process.env.VITE_TURN_SERVER_CRED
  }
}
