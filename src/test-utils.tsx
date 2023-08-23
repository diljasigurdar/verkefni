import * as React from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {ChakraProvider, theme} from '@chakra-ui/react';
import {QueryClient} from '@tanstack/query-core';
import {QueryClientProvider} from '@tanstack/react-query';

const AllProviders = ({children}: {children?: React.ReactNode}) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
    render(ui, {wrapper: AllProviders, ...options});

export const renderWithQueryClient = (children: JSX.Element) => {
    const testQueryClient = new QueryClient();

    return customRender(
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    );
};
export * from '@testing-library/react';
export {customRender as render};
