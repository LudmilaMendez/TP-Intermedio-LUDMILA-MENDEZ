import { Router } from 'express';
import * as categoriesController from '../controllers/categories.controller';


const router: Router = Router();


// getAll()
router.get('/', categoriesController.getAll);
// getById()
router.get('/:id', categoriesController.getById);
// create()
router.post('/', categoriesController.create);
// update()
router.put('/:id', categoriesController.update);
// delete()
router.delete('/:id', categoriesController.deleteById);
    

    export default router;