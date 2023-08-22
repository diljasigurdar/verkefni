import * as React from 'react';
import StationsDropdown from './StationsDropdown';
import {constructIntervalDates, toAnsiString} from './utils';
import DateDropdown from './DateDropdown';
import {styled} from 'styled-components';
import {ChannelIndexes} from './types';
import ProgramList from './ProgramList';

const StyledDropdownContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
`;

export default function ProgramPage() {
    const formattedDates = constructIntervalDates();

    const [selectedStation, setSelectedStation] = React.useState(ChannelIndexes.stod2);
    const [selectedDate, setSelectedDate] = React.useState(formattedDates[1]);

    return (
        <React.Fragment>
            <StyledDropdownContainer>
                <DateDropdown
                    formattedDates={formattedDates}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <StationsDropdown
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                />
            </StyledDropdownContainer>
            <ProgramList station={selectedStation} date={toAnsiString(selectedDate)} />
        </React.Fragment>
    );
}
