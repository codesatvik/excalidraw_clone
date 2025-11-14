if (!process.env.JWTSECRET) {
    throw new Error("JWTSECRET environment variable is not set");
}

export const JWTSECRET = process.env.JWTSECRET;