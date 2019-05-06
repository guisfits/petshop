import { LoggerService } from "@nestjs/common";

export class CustomerLogger implements LoggerService {
    // Mandar e-mail
    // Salvar no banco
    
    log(message: any, context?: string) {
        console.log(message);
    }    
    
    error(message: any, trace?: string, context?: string) {
        console.error(message);
    }
    
    warn(message: any, context?: string) {
        console.warn(message);
    }
    
    debug?(message: any, context?: string) {
        console.debug(message);
    }
    
    verbose?(message: any, context?: string) {
        console.log(message);
    }
}