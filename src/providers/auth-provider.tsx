import React from "react";
import { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { fetcher } from "@/libs/fetcher";
import { ROUTES } from "@/config/routes.config";
import { Redirect } from "expo-router";
import { View } from "react-native";

const getUser = async () => {
    const response = await fetcher.get<{ user: UserSession }>("/v1/auth/me");
    return response.user;
};

export type UserSession = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    tel: string;
    dob: string | null;
    role: string;
};

interface AuthFnResponse {
    ok: boolean;
    error?: string;
}

interface AuthCtx {
    user: UserSession | null;
    logout: () => Promise<AuthFnResponse>;
    setUser: (user: UserSession) => void;
    loading: boolean;
}

const AuthContext = React.createContext<AuthCtx>({} as AuthCtx);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = React.useState<UserSession | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const sessionId = await SecureStore.getItemAsync("sessionId");

                if (!sessionId) {
                    setUser(null);
                    return;
                }

                const user = await getUser();
                setUser(user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const logout = React.useCallback(async () => {
        try {
            await fetcher.post("/v1/auth/logout");

            await SecureStore.deleteItemAsync("sessionId");

            setUser(null);

            return { ok: true };
        } catch (error) {
            if (error instanceof AxiosError) {
                return { ok: false, error: error.response?.data.message };
            }
            return { ok: false, error: "Une erreur est survenue" };
        }
    }, []);

    if (loading) {
        return <View className="flex h-screen w-screen items-center justify-center" />;
    }

    return <AuthContext.Provider value={{ user, logout, setUser, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const useMe = () => {
    const { user } = useAuth();
    return user!;
};

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) {
        return <Redirect href={ROUTES.login.index} />;
    }

    return <>{children}</>;
};
