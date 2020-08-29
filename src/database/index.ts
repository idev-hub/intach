import AsyncNedb from 'nedb-async'
import path from "path"

export const users = new AsyncNedb({filename: path.join('./src/database', 'users.db')})
