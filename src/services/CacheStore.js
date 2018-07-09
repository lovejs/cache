const Redis = require("ioredis");
const _ = require("lodash");

class CacheStore {
    constructor(config) {
        this.redis = new Redis(config);
    }

    async set(key, value, expiration = false) {
        let args = [key, JSON.stringify(value)];
        if (expiration) {
            args = [...args, "EX", expiration];
        }

        return await this.redis.set(...args);
    }

    async get(key) {
        const value = await this.redis.get(key);
        if (value) {
            return JSON.parse(value);
        }

        return undefined;
    }

    async delete(key) {
        return await this.redis.del(key);
    }

    async mget(keys) {
        return await this.redis.mget(...keys);
    }
}

module.exports = CacheStore;
