import axios from 'axios';
import {ChannelIndexes, SingleProgram} from './types';

export const apiActions = {
    get: async ({url}: {url: string}) => {
        try {
            const result = await axios.get(url);
            return result.data;
        } catch (e) {
            throw new Error('Something went wrong');
        }
    },
};

const stationsUrl = 'https://api.stod2.is/dagskra/api';

export const getStations = async (): Promise<string[]> => apiActions.get({url: stationsUrl});

export const getStationsProgram = async (
    station: ChannelIndexes,
    date: string
): Promise<SingleProgram[]> => apiActions.get({url: `${stationsUrl}/${station}/${date}`});
