import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 20, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointments.execute({
            provider_id: 'provider',
            year: 2020,
            month: 12,
            day: 20,
        });

        console.log('appointments', appointments);

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
