import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '../../../services/UpdateProfileService';
import ShowProfileService from '../../../services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfileContent = container.resolve(ShowProfileService);

        const user = await showProfileContent.execute({ user_id });

        const userWithoutPassword = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        };

        return response.json(userWithoutPassword);
    }

    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });

        const userWithoutPassword = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        };

        return response.json(userWithoutPassword);
    }
}
