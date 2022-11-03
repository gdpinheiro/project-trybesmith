import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/users.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const userCreated = await this.userService.create(user);

    const secret = 'projectTrybeSmith';
    const token = jwt.sign({ data: userCreated }, secret);

    res.status(201).json({ token });
  };
}

export default UserController;
