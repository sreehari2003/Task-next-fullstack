import type { NextApiRequest, NextApiResponse } from 'next'
import connectionDB from "../../database/connection";
import task from "../../database/modal";




connectionDB();
const handler = async (req: NextApiRequest,res:NextApiResponse) => {
    if(req.method === 'POST'){
         const body = req.body;
         if(!req.body){
            res.status(404).json({
                ok: false,
                message:"Could not finish the request"
            })
         }
        await task.create(body);
         res.status(200).json({
            ok: true,
            message:"task was created successfully"
        })

    }else if(req.method === 'GET'){
        const tasks = await task.find();
        if(!tasks){
            res.status(404).json({
                ok: false,
                message:"Could not find the tasks"
            })
        }
       res.status(200).json({
           ok: true,
           tasks:tasks
       })
    }else if(req.method === 'DELETE'){
    const {id} = req.body;
    if(!id){
        res.status(404).json({
            ok: false,
            message:"Could not finish the task id"
        })
    }
    await task.findByIdAndDelete(id);

    res.status(200).json({
        ok: false,
        message:"task was deleted"
    })
    }
}

export default handler;