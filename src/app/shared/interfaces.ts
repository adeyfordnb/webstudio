export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface Slide {
  url: string,
  text: string,
  id?: string
}

export interface MainObj {
  mainText?: {
    firstBlock: string,
    secondBlock: string
  },
  description?: string,
  links?: {
    instagram: string,
    telegram: string,
    facebook: string
  }
}
