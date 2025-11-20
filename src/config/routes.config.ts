export const ROUTES = {
    404: "/404",
    home: { index: "/home" },
    onboarding: { index: "/onboarding" },
    forgetPassword: { index: "/forget-password" },

    login: { index: "/login" },
    register: { index: "/register" },
    profile: {
        index: "/profile",
        settings: {
            index: "/profile/settings",
            updatePassword: { index: "/profile/settings/update-password" },
            updateEmail: { index: "/profile/settings/update-email" },
            updateEmailOtp: { index: "/profile/settings/update-email-otp" },
        },
        update: { index: "/profile/update" },
        courses: { index: "/profile/courses" },
    },
} as const;
