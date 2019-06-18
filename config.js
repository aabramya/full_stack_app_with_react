const env = process.env;

export default {
    port: env.PORT || 3000
};

export const nodeEnv = env.NODE_ENV || 'development';