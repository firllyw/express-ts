import Constellation, { IConstellation } from '@models/constellation-model';
import { CreateQuery } from 'mongoose';
import { DuplicateError} from '@shared/errors';
/**
 * 
 * @param data 
 * @returns 
 */
async function add(data
    : CreateQuery<IConstellation>): Promise<IConstellation> {
    const check = await Constellation.findOne({name: data.name});
    if (check) {
        throw DuplicateError;
    }
    return Constellation.create(data).then((response: IConstellation) => {
        return response;
    }).catch((error: Error) => {
        throw error;
    });
}

/**
 * 
 * @param name 
 * @returns 
 */
async function getAll(): Promise<IConstellation[]> {
    return await Constellation.find();
}

/**
 * 
 * @param id 
 * @returns 
 */
 async function getOne(id:any): Promise<any> {
    return Constellation.findById(id);
}

/**
 * 
 * @param id 
 * @param data 
 * @returns 
 */
async function updateOne(id: any, data
    : CreateQuery<IConstellation>): Promise<string> {
    return Constellation.findByIdAndUpdate(id, data)
        .then((res) => {
            return 'ok';
        }).catch((error: Error) => {
            throw error;
        });
}



// Export default
export default {
    add,
    updateOne,
    getAll,
    getOne,
} as const;
