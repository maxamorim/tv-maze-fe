import type { AppConfig } from "@/models/app-config.model";

class ConfigService {
    appConfig!: AppConfig;
    
    getAppConfig = (): Promise<AppConfig> => {
        return fetch('/config/config.json')
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default new ConfigService();