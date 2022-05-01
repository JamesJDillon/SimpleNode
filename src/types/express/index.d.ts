import express from "express";
import RequestUser from "../requser";

declare global {
  namespace Express {
    interface Request {
      /*
        Extend the default express Request type so we can attach
        a user to it with our authentication middleware. 
      */
      user: RequestUser
    }
  }
}