import { Document } from 'mongoose'
import {Request} from 'express'
export interface IUser extends Document{
  name: string
  account: string
  password: string
  avatar: string
  role: string
  type: string
  _doc: object
}


export interface INewUser {
  name: string
  account: string
  password: string
}

export interface IDecodedToken {
  id?: string
  newUser?: INewUser
  iat: number
  exp: number
}

export interface IGgPayload {
  email: string
  email_verified: boolean
  name: string
  picture: string
}

export interface IUserParams {
  name: string 
  account: string 
  password: string
  avatar?: string
  type: string
}

export interface IReqAuth extends Request {
  user? : IUser
}

export interface IAnswers {
  content : string
  isCorrect : boolean
  questionsId : string
}

export interface IQuestions {
  name: string
  categoryId : string
  answersId : Array<IAnswers>
}

export interface ICourse {
  name : string
  released : boolean
  categoryId : string
  descriptions : string
}

export interface ICategory {
  name? : string
}

export interface IChat {
  content: string,
  time: Date,
  user: string,
  idUser: string,
}