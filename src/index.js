const { Plugin } = require("@lovejs/framework");

class CachePlugin extends Plugin {
    async registerServices(container, origin) {
        container.setParameter("cache.configuration", this.get());
        await container.loadDefinitions(__dirname + "/_framework/services/services.yml", origin);
    }
}

module.exports = CachePlugin;
