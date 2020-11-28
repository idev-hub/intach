import axios from "axios";
import appRoot from 'app-root-path';
import fs from "fs";
import path from "path";

export default async function LoadFile(filename, uri) {
    const _path = path.resolve(appRoot + '/temp/' + filename)

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: "get",
                url: uri,
                responseType: "blob"
            })
            await fs.writeFile(_path, response.data,  {encoding: null}, (err) => {
                if (err) throw err;
                resolve(_path)
            })
        } catch (e){
            reject(e)
        }
    })
}
