import { useState, createContext, useMemo, useContext, ReactNode, useCallback } from 'react';

import { Meme } from '../types';

interface IHaveChildrenProps {
    children: ReactNode;
}

interface TApiResponse {
    data: Meme[];
    error: any;
    loading: boolean;
    getAPIData: () => Promise<void>;
}

const MemesContext = createContext<TApiResponse | null>(null);

export const MemesProvider: React.FC<IHaveChildrenProps> = ({ children }) => {
    const [data, setData] = useState<Meme[]>([]);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const getAPIData = useCallback(async () => {
        setLoading(true);
        try {
            const apiResponse = await fetch('https://api.memegen.link/templates');
            const json = await apiResponse.json();
            console.log(json);
            setData(json);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }, []);

    const value: TApiResponse = useMemo(
        () => ({ getAPIData, data, error, loading }),
        [getAPIData, data, error, loading]
    );

    return (
        <MemesContext.Provider value={value}>
            {children}
        </MemesContext.Provider>
    );
};

export const useHttp = (): TApiResponse => {
    const context = useContext(MemesContext);
    if (!context) {
        throw new Error('Something went wrong');
    }
    return context;
};