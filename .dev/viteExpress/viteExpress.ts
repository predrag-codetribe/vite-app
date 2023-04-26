// https://noam.hashnode.dev/using-vite-to-serve-and-hot-reload-react-app-express-api-together
import { Plugin, loadEnv } from 'vite'

export function express(path: string): Plugin {
  let mode = ''
  return {
    name: "vite-plugin-express",
    config: (config, env) => {if (config.mode) mode = config.mode},
    configureServer: async (server: any) => {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        // make all environment variables accessible in development
        process.env = {...process.env, ...loadEnv(mode, process.cwd(), "")};
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