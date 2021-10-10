/* eslint-disable @typescript-eslint/no-explicit-any */
import Boom from "@hapi/boom"
import Hapi from "@hapi/hapi"

// hanlder for a typed payload
export function createHandler<TI>(
  handler: (payload: TI, req: Hapi.Request, res: Hapi.ResponseToolkit) => unknown
): Hapi.Lifecycle.Method | Hapi.HandlerDecorations {
  return (req, res) => {
    return handler(req.payload as any, req, res)
  }
}

export function handleValidatinError(request: Hapi.Request, res: Hapi.ResponseToolkit, err: Error): any {
  if (process.env.NODE_ENV === "production") {
    console.error("ValidationError:", err.message)
    throw Boom.badRequest(`Invalid request payload input - ${err.message}`)
  } else {
    console.error(err)
    throw err
  }
}
