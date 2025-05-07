import express from 'express';
import { body } from 'express-validator';
import programController from '../controllers/program.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import requestHandler from '../handlers/request.handler.js';
const router = express.Router({ mergeParams: true });
router.get('/:programId', tokenMiddleware.auth, programController.getProgramById);
router.get('/all', tokenMiddleware.auth, programController.getPrograms);
router.get('/current', programController.getCurrentProgram);
// Neues Programm erstellen
router.post('/', tokenMiddleware.auth, body('semester').notEmpty(), body('startDate').isISO8601(), body('endDate').isISO8601(), body('public').isBoolean(), requestHandler.validate, programController.createProgram);
// Programm löschen
router.delete('/:programId', tokenMiddleware.auth, programController.deleteProgram);
// Show zu einem Programm hinzufügen
router.post('/:programId/shows', tokenMiddleware.auth, body('showId').notEmpty(), requestHandler.validate, programController.addShowToProgram);
// Show von einem Programm entfernen
router.delete('/:programId/shows/:showId', tokenMiddleware.auth, programController.removeShowFromProgram);
export default router;
//# sourceMappingURL=program.route.js.map