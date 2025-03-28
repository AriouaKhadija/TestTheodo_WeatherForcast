import { fetchWeather } from './weatherSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockedJSon from '../../mocks/mockedJSon';

const axiosMock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);

describe('weather actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ weather: {} });
    axiosMock.reset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch FETCH_WEATHER_SUCCESS when the API call is successful', async () => {
    const mockData = MockedJSon;
    axiosMock.onGet('/weather').reply(200, mockData);

    await store.dispatch(fetchWeather());

    const actions = store.getActions();
    expect(actions[0].type).toBe('weather/fetchWeather/pending');
    expect(actions[1].type).toBe('weather/fetchWeather/fulfilled');
    expect(actions[1].payload).toEqual(mockData);
  });

  it('should dispatch FETCH_WEATHER_FAILURE when the API call fails', async () => {
    axiosMock.onGet('/weather').reply(500);

    await store.dispatch(fetchWeather());

    const actions = store.getActions();
    expect(actions[0].type).toBe('weather/fetchWeather/pending');
    expect(actions[1].type).toBe('weather/fetchWeather/rejected');
    expect(actions[1].error.message).toBe('Request failed with status code 500');
  });
});
