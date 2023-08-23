import * as React from 'react';
import {ChannelIndexes} from './types';
import {useQuery} from '@tanstack/react-query';
import {getStationsProgram} from './api';
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Spinner,
} from '@chakra-ui/react';
import {styled} from 'styled-components';
import {formatTime, getEndTime} from './dateUtils';
import {FaCircle, FaMinusCircle, FaPlusCircle} from 'react-icons/fa';

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
    width: 98%;
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

const StyledP = styled.p<{$isExpanded: boolean}>`
    ${props =>
        !props.$isExpanded &&
        `
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    `}
`;

const StyledTitle = styled.p<{$isExpanded: boolean}>`
    margin-left: 20px;
    font-weight: 600;
    font-size: 20px;
    text-align: left;
    white-space: nowrap;
    ${props =>
        !props.$isExpanded &&
        `
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 180px;
    `}
`;

const StyledTime = styled.div`
    width: 60px;
`;

const StyledCircle = styled(FaCircle)`
    margin-left: 20px;
`;

const StyledEpisodes = styled.div`
    margin-left: 20px;
`;

const StyledInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 35%;
`;

const StyledDescription = styled.div`
    text-align: left;
    margin-top: 15px;
`;

interface Props {
    station: ChannelIndexes;
    date: string;
}

export default function ProgramList({station, date}: Props) {
    const {
        data: programInfo,
        isError,
        isLoading,
    } = useQuery(['programInfo', station, date], async () => getStationsProgram(station, date), {
        enabled: !!(station && date),
        retry: false,
    });

    if (isError) {
        return (
            <StyledContainer>
                <div>Ekki náðist að hafa samband við vefþjón</div>
            </StyledContainer>
        );
    }

    if (isLoading) {
        return (
            <StyledContainer>
                <Spinner size={'xl'} />
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Accordion allowToggle>
                {programInfo.map((info, index) => {
                    const {isltitill, upphaf, bannad, thattur, lysing, thattafjoldi, slott} = info;
                    return (
                        <AccordionItem key={index}>
                            {({isExpanded}) => (
                                <React.Fragment>
                                    <h2>
                                        <AccordionButton>
                                            <StyledRowContainer>
                                                <StyledLeftBox as="span">
                                                    <StyledTime>
                                                        {formatTime(new Date(upphaf))}
                                                    </StyledTime>
                                                    <StyledTitle $isExpanded={isExpanded}>
                                                        {isltitill}
                                                    </StyledTitle>
                                                    <StyledCircle size={22} color={bannad} />
                                                    <StyledEpisodes>
                                                        {thattafjoldi !== 0 &&
                                                            `${thattur}/${thattafjoldi}`}
                                                    </StyledEpisodes>
                                                </StyledLeftBox>
                                                <StyledRightBox as="span">
                                                    <StyledP
                                                        hidden={isExpanded}
                                                        $isExpanded={isExpanded}
                                                    >
                                                        {lysing}
                                                    </StyledP>
                                                </StyledRightBox>
                                            </StyledRowContainer>
                                            {isExpanded ? <FaMinusCircle /> : <FaPlusCircle />}
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel marginLeft={'10px'}>
                                        <StyledInfo>
                                            <div>{info.midill_heiti}</div>|
                                            <div>
                                                {formatTime(new Date(upphaf))} -{' '}
                                                {getEndTime(new Date(upphaf), slott)}
                                            </div>
                                            |
                                            <div>
                                                {thattafjoldi !== 0
                                                    ? `Þáttur ${info.thattur} af ${info.thattafjoldi}`
                                                    : `Þáttur ${info.thattur}`}
                                            </div>
                                        </StyledInfo>
                                        <StyledDescription>{lysing}</StyledDescription>
                                    </AccordionPanel>
                                </React.Fragment>
                            )}
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </StyledContainer>
    );
}
