import * as React from 'react';
import {Menu, MenuButton, Button, MenuList, MenuItem} from '@chakra-ui/react';
import {FaChevronDown} from 'react-icons/fa';
import {formatDate} from './utils';

interface Props {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    formattedDates: Date[];
}

export default function DateDropdown({selectedDate, setSelectedDate, formattedDates}: Props) {
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<FaChevronDown />}
                width={400}
                textAlign={'left'}
                marginLeft={10}
            >
                {formatDate(selectedDate)}
            </MenuButton>
            <MenuList width={400}>
                {formattedDates.map(date => (
                    <MenuItem onClick={() => setSelectedDate(date)} key={date.toString()}>
                        {formatDate(date)}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
