import * as React from 'react';
import {ChannelIndexes} from './types';
import {useQuery} from '@tanstack/react-query';
import {getStationsProgram} from './api';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
} from '@chakra-ui/react';
import {styled} from 'styled-components';
import {formatTime} from './utils';
import {FaCircle} from 'react-icons/fa';

const StyledContainer = styled.div`
    margin-top: 30px;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
`;

const StyledRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    align-items: center;
`;

const StyledRightBox = styled(Box)`
    height: 50px;
    width: 50%;
    display: flex;
    align-items: center;
`;

const StyledLeftBox = styled(Box)`
    width: 50%;
    display: flex;
    align-items: center;
`;

const StyledP = styled.p`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const StyledTitle = styled.p`
    margin-left: 20px;
    font-weight: 600;
    font-size: 20px;
`;

const StyledCircle = styled(FaCircle)`
    margin-left: 20px;
`;

const StyledEpisodes = styled.div`
    margin-left: 20px;
`;

interface Props {
    station: ChannelIndexes;
    date: string;
}

export default function ProgramList({station, date}: Props) {
    const {data: programInfo} = useQuery(
        ['programInfo', station],
        async () => getStationsProgram(station, date),
        {
            enabled: !!(station && date),
        }
    );

    if (!programInfo) {
        return <React.Fragment />;
    }

    const singleProgramInfo = programInfo[0];
    console.log(singleProgramInfo);
    return (
        <StyledContainer>
            <Accordion allowToggle>
                <AccordionItem>
                    {programInfo.map(info => {
                        const {titill, upphaf, bannad, thattur, lysing, thattafjoldi} = info;

                        return (
                            <React.Fragment>
                                <h2>
                                    <AccordionButton>
                                        <StyledRowContainer>
                                            <StyledLeftBox as="span" flex="1" textAlign="left">
                                                <div>{formatTime(new Date(upphaf))}</div>
                                                <StyledTitle>{titill}</StyledTitle>
                                                <StyledCircle
                                                    size={20}
                                                    color={bannad === 'Green' ? 'green' : 'blue'}
                                                />
                                                <StyledEpisodes>
                                                    {thattur}/{thattafjoldi}
                                                </StyledEpisodes>
                                            </StyledLeftBox>
                                            <StyledRightBox as="span" flex="1">
                                                <StyledP>{lysing}</StyledP>
                                            </StyledRightBox>
                                        </StyledRowContainer>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat.
                                </AccordionPanel>
                            </React.Fragment>
                        );
                    })}
                </AccordionItem>
            </Accordion>
        </StyledContainer>
    );
}
