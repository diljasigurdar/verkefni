import React from 'react';
import {screen, renderWithQueryClient, waitFor} from '../test-utils';
import {App} from '../App';
import * as api from '../api';
import {mockedPrograms} from '../mockData';

describe('App', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2023, 7, 23));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render programs', async () => {
        jest.spyOn(api, 'getStations').mockResolvedValue(['stod2', 'besta0']);
        jest.spyOn(api, 'getStationsProgram').mockResolvedValue(mockedPrograms);

        renderWithQueryClient(<App />);

        await waitFor(() => expect(screen.getByText('Heimsókn')).toBeInTheDocument());
        expect(screen.getByText('Bold and the Beautiful')).toBeInTheDocument();
    });
});
