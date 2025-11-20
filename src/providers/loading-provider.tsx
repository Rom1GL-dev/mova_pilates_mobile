import React, { createContext, useContext, useState } from "react";
import { FullScreenLoader } from "@/components/loader";

interface LoadingCtx {
    loading: boolean;
    setLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingCtx>({} as LoadingCtx);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            {loading && <FullScreenLoader />}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => useContext(LoadingContext);
