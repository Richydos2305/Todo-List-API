import { Request, Response} from 'express';
import { Users } from '../models/users';
import bcrypt from 'bcrypt';
import { getAccessToken, handleError } from '../helpers';

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const name: string = req.body.name;
        const email: string = req.body.email;
        const password: string = req.body.password;
    
        if (!name || !email || !password) {
            return handleError(res, 400, 'All Fields are Mandatory')
        }

        if (await Users.findOne({where: { email }})) {
            return handleError(res, 400, 'User Already Exists. Login Instead')
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = { name, email, password: hashedPassword };
            const user = await Users.create(result);
            
            if (user) {
                res.status(201).send({ token: getAccessToken(user) });
                return;
            } else {
                return handleError(res, 400, 'Invalid Data sent during signup process')
            }
        }
    } catch (err) {
        console.error(err)
        return handleError(res, 500, `${err}`)
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
	const email: string = req.body.email;
	const password: string = req.body.password;

	if (!email || !password) {
        return handleError(res, 400, 'All Fields are Mandatory')
	}
	const user: Users | null = await Users.findOne({ where: { email } });

	if (user) {
		const hashedPassword: string = user.password;

		if (await bcrypt.compare(password, hashedPassword)) {
            const accessToken = getAccessToken(user)
			res.status(200).send({ token: accessToken });
            return;
		}
	} else {
        return handleError(res, 401, 'Email or Password is invalid')
	}
};

// export const getOne = async (
// 	req: requestWithUserData,
// 	res: Response
// ): Promise<void> => {
// 	if (!req.currentUser) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	} else {
// 		const id: string = req.params.id;
// 		const user = await findUser({ id });
// 		if (user) {
// 			if (user.id === req.currentUser.userDetails.id) {
// 				res.send(user);
// 			} else {
// 				res.status(403).send('Access Denied');
// 				throw new Error('Access Denied');
// 			}
// 		} else {
// 			res.send('User does not exist... Sign up Please');
// 		}
// 	}
// };

// export const update = async (
// 	req: requestWithUserData,
// 	res: Response
// ): Promise<void> => {
// 	if (!req.currentUser) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	} else {
// 		const id: string = req.params.id;
// 		const user = await findUser({ id });

// 		if (!user) {
// 			res.send('User does not exist... Sign up Please');
// 		} else if (user.id !== req.currentUser.userDetails.id) {
// 			res.status(403);
// 			throw new Error('Access Denied');
// 		} else {
// 			const display_name: string | undefined = req.body.display_name;
// 			const email: string | undefined = req.body.email;
// 			const location: string | undefined = req.body.location;
// 			const title: string | undefined = req.body.title;
// 			const aboutMe: string | undefined = req.body.aboutMe;

// 			const result = {
// 				display_name,
// 				email,
// 				location,
// 				title,
// 				about_me: aboutMe
// 			};
// 			const id = req.params.id;
// 			try {
// 				await updateUser(result, { id });
// 			} catch (error) {
// 				res.status(500);
// 				throw new Error('Server Error');
// 			}
// 			logger.info('User Info Updated');
// 			res.send('Status: Updated');
// 		}
// 	}
// };

// export const destroy = async (
// 	req: requestWithUserData,
// 	res: Response
// ): Promise<void> => {
// 	if (!req.currentUser) {
// 		res.status(403);
// 		throw new Error('Access Denied');
// 	} else {
// 		const id: string = req.params.id;
// 		const user = await findUser({ id });
// 		if (!user) {
// 			res.send('User does not exist... Sign up Please');
// 		}
// 		// A user cannot Delete another User's account
// 		else if (user.id !== req.currentUser.userDetails.id) {
// 			res.status(403);
// 			throw new Error('Access Denied');
// 		} else {
// 			await deleteUser({ id });
// 			res.status(200).send('User deleted');
// 			logger.info('User Deleted Successfully');
// 		}
// 	}
// };
