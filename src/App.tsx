import * as React from 'react';
import {ChakraProvider, Box, Grid, theme} from '@chakra-ui/react';
import {ColorModeSwitcher} from './ColorModeSwitcher';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ProgramPage from './ProgramPage';

const queryClient = new QueryClient();

export const App = () => (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl">
                <Grid>
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <ProgramPage />
                </Grid>
            </Box>
        </ChakraProvider>
    </QueryClientProvider>
);
