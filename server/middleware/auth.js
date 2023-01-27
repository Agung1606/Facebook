import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(StatusCodes.UNAUTHORIZED).json({message: "UNAUTHORIZED"});
    }

    const token = authHeader.split(' ')[1];
    const verifed = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verifed;
    next();
}

export default verifyToken;