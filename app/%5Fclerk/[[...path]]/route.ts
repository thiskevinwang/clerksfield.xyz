import { createFrontendApiProxyHandlers } from "@clerk/nextjs/server";
import { clerkProxyPath } from "@/clerk-proxy";

export const { GET, POST, PUT, DELETE, PATCH } =
  createFrontendApiProxyHandlers({
    proxyPath: clerkProxyPath,
  });
