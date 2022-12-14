import defaultConfig from './default-config.json'
import customConfig from './custom-config.json'
export class Config {
    tabbarParamsFromConfig(param){
        if (customConfig['TABBAR'][param]){
            return customConfig['TABBAR'][param]
        } else {
            console.warn('Provide custom TABBAR ' + param)
        }
        return defaultConfig['TABBAR'][param]
    }
    headerParamsFromConfig(param){
        if (customConfig['HEADER'][param]){
            return customConfig['HEADER'][param]
        } else {
            console.warn('Provide custom HEADER ' + param)
        }
        return defaultConfig['HEADER'][param]
    }

    splashParamsFromConfig(){
        if (customConfig['SPLASH']){
            const config = { ...customConfig['SPLASH'] };

            if (config.background) {
                config.background = require(`../assets/img/splash/${config.background}`);
            }

            if (config.logo) {
                config.logo = require(`../assets/img/splash/${config.logo}`);
            }

            return config;
        } else {
            console.warn('Provide param "SPLASH" to custom config');
        }
        return defaultConfig['SPLASH']
    }

    get showAddressBlock() {
        if (customConfig.DEFAULT_ADDRESS_BLOCK){
            return customConfig.DEFAULT_ADDRESS_BLOCK
        } else {
            console.warn('Provide DEFAULT_ADDRESS_BLOCK!')
        }
        return defaultConfig.DEFAULT_ADDRESS_BLOCK
    }
}