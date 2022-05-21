import jsonServer from "json-server";
import { NextFunction, Request, Response } from "express";
import db from "./db.json";
import jwt from "jsonwebtoken";
import path from "path";

export interface User {
  id?: number;
  login: string;
  name: string;
  password: string;
  contacts: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    adress: string;
  }[];
}

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const authorizedChekker = (req: Request, db: User[]): User | undefined => {
  const { login, password } = req.body;
  return db.find((user) => user.login === login && user.password === password);
};

const isLoginExist = (req: Request, db: User[]) => {
  const { login } = req.params;
  return db.find((user) => user.login === login);
};
server.use(jsonServer.bodyParser);
server.use(middlewares);


server.post("/auth", (req: Request, res: Response, next: NextFunction) => {
  const authorizedUser = authorizedChekker(req, db.users);
  if (authorizedUser) {
    const token = jwt.sign(authorizedUser.login, "shjgsdgf");
    return res.status(200).json({ userId: authorizedUser.id, token });
  } else {
    return res.status(401).json({ message: "NOT AUTORIZED" });
  }
});
server.get("/new/:login", (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginExist = isLoginExist(req, db.users);
    if (!loginExist) {
      return res.status(200).json({ message: "Login is free" });
    } else {
      return res.status(401).json({ message: "Login already exists" });
    }
  } catch (error) {
    console.log(error);
  }
});
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
