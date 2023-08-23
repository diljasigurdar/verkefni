import * as React from 'react';
import {Menu, MenuButton, Button, MenuList, MenuItem, Tooltip} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {FaChevronDown} from 'react-icons/fa';
import {getStations} from './api';
import {channelInfo} from './channelIcons';
import {ChannelIndexes} from './types';

interface Props {
    selectedStation: ChannelIndexes;
    setSelectedStation: React.Dispatch<React.SetStateAction<ChannelIndexes>>;
}

export default function StationsDropdown({selectedStation, setSelectedStation}: Props) {
    const {data: stations} = useQuery(['stations'], async () => getStations());

    const channelKeys = Object.keys(channelInfo);
    const usableStations = stations?.filter(station =>
        channelKeys.includes(station)
    ) as ChannelIndexes[];

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<FaChevronDown />}
                width={400}
                textAlign={'left'}
                marginLeft={10}
            >
                <div dangerouslySetInnerHTML={{__html: channelInfo[selectedStation].image}} />
            </MenuButton>
            <MenuList width={400}>
                {usableStations?.map(station => (
                    <MenuItem key={station} onClick={() => setSelectedStation(station)}>
                        <Tooltip label={channelInfo[station].name} placement="right">
                            <div
                                style={{marginLeft: '20px'}}
                                dangerouslySetInnerHTML={{__html: channelInfo[station].image}}
                            />
                        </Tooltip>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
