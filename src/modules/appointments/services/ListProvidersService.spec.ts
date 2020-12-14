import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'jonhdoe@example.com',
            password: '123',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'jonhtre@example.com',
            password: '123',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'jonhqua@example.com',
            password: '123',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });
        expect(providers).toEqual([user1, user2]);
    });
});
