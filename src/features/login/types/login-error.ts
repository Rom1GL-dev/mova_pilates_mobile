export type LoginError = Record<string, string>;

export const LOGIN_ERROR: LoginError = {
    INVALID_PASSWORD: "Mot de passe invalide",
    USER_NOT_FOUND: "Utilisateur non trouvé",
};
