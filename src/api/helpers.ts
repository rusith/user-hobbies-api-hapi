/* eslint-disable @typescript-eslint/no-explicit-any */
import Hapi from "@hapi/hapi"

// hanlder for a typed payload
export function createHandler<TI>(
  handler: (payload: TI, req: Hapi.Request, res: Hapi.ResponseToolkit) => unknown
): Hapi.Lifecycle.Method | Hapi.HandlerDecorations {
  return (req, res) => {
    return handler(req.payload as any, req, res)
  }
}
