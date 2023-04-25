// https://noam.hashnode.dev/using-vite-to-serve-and-hot-reload-react-app-express-api-together
import type { Plugin } from 'vite'

export function express(path: string): Plugin {
  return {
    name: "vite-plugin-express",
    configureServer: async (server: any) => {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        process.env["VITE_DEV_SERVER"] = "true";
        try {
          const { app } = await server.ssrLoadModule(path);
          app(req, res, next);
        } catch (err) {
          console.error(err);
        }
      });
    },
  };
}