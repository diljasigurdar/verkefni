import {ColorModeScript} from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {setDefaultOptions} from 'date-fns';
import {is} from 'date-fns/locale';
import {App} from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

// set default locale to is
setDefaultOptions({
    locale: is,
});

root.render(
    <React.StrictMode>
        <ColorModeScript />
        <App />
    </React.StrictMode>
);
