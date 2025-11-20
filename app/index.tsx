import { useEffect, useState } from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import Loader from "@/components/loader";
import * as SecureStore from "expo-secure-store";
import { ROUTES } from "@/config/routes.config";

export default function Index() {
    const router = useRouter();
    const navState = useRootNavigationState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (!navState?.key) return;

            const hasOpened = await SecureStore.getItemAsync("hasOpenedApp");

            if (hasOpened) {
                router.replace(ROUTES.home.index);
            } else {
                await SecureStore.setItemAsync("hasOpenedApp", "true");
                router.replace(ROUTES.onboarding.index);
            }

            setLoading(false);
        })();
    }, [navState?.key]);

    if (loading) return <Loader />;

    return null;
}
