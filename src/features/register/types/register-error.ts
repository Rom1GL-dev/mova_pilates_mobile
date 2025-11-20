export type RegisterError = Record<string, string>;

export const LOGIN_ERROR: RegisterError = {
    INVALID_PASSWORD: "Mot de passe invalide",
    USER_NOT_FOUND: "Utilisateur non trouvé",
};
