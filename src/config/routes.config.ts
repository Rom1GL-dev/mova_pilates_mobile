export const ROUTES = {
    404: "/404",
    home: { index: "/home" },
    onboarding: { index: "/onboarding" },
    login: { index: "/login" },
    register: { index: "/register" },
    profile: {
        index: "/profile",
        settings: { index: "/profile/settings" },
        update: { index: "/profile/update" },
        courses: { index: "/profile/courses" },
    },
} as const;
