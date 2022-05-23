import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import constellationService from '@services/constellation-service';
import { ParamMissingError } from '@shared/errors';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/constellations',
    add: '/constellations',
    update: '/constellations/:id',
    getOne: '/constellations/:id',
} as const;



/**
 * Get all users.
 */
router.get(p.get, async (_: Request, res: Response) => {
    const constellations = await constellationService.getAll();
    return res.status(OK).json({constellations});
});

/**
 * Get 1 users.
 */
 router.get(p.getOne, async (req: Request, res: Response) => {
     const id = req.params.id;
    const constellations = await constellationService.getOne(id);
    return res.status(OK).json({constellations});
});


/**
 * Add one user.
 */
router.post(p.add, async (req: Request, res: Response) => {
    const { data } = req.body;
    console.log(data);
    // Check param
    if (!data) {
        throw new ParamMissingError();
    }
    // Fetch data
    try {
        const newData = await constellationService.add(data);
        return res.status(CREATED).json(newData);
    } catch (error) {
        return res.status(error.HttpStatus).json({err: error.Msg})
    }
    
});


/**
 * Update one user.
 */
router.put(p.update, async (req: Request, res: Response) => {
    const { data } = req.body;
    const id = req.params.id;
    // Check param
    if (!data) {
        throw new ParamMissingError();
    }
    // Fetch data
    const newData = await constellationService.updateOne(id, data);
    return res.status(CREATED).json(newData);
});

// Export default
export default router;
