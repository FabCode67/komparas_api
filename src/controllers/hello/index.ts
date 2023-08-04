import { Response, Request } from "express"
import { IHello } from "../../types/hello"
import Hello from "../../models/hello"

export const getHello = async (req: Request, res: Response): Promise<void> => {
  try {
    const hello: IHello[] = await Hello.find().maxTimeMS(30000); // Set timeout to 30 seconds
    res.status(200).json({ hello })
  } catch (error) {
    throw error
  }
}

export const addHello = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IHello, "hello">

    const hello: IHello = new Hello({
      hello: body.hello
    })

    const newHello: IHello = await hello.save()
    const allHello: IHello[] = await Hello.find()

    res
      .status(201)
      .json({ message: "Hello added", hello: newHello, hellos: allHello })
  } catch (error) {
    throw error
  }
}




