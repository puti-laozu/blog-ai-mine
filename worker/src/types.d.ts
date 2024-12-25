declare module 'itty-router' {
  export class Router {
    constructor(options?: { base?: string });
    get(path: string, handler: (request: Request, ...args: any[]) => any): this;
    post(path: string, handler: (request: Request, ...args: any[]) => any): this;
    put(path: string, handler: (request: Request, ...args: any[]) => any): this;
    delete(path: string, handler: (request: Request, ...args: any[]) => any): this;
    handle(request: Request, ...args: any[]): Promise<Response>;
  }
}

declare module 'itty-router-extras' {
  export function json(body: any, init?: ResponseInit): Response;
  export function error(code: number, message: string): Response;
  export function status(code: number, message?: string): Response;
} 