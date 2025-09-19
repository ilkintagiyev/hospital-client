'use client'; // bu, komponentin client tərəfdə işlədiyini bildirir
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ConfigProvider } from 'antd';

export default function ClientComponent({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}