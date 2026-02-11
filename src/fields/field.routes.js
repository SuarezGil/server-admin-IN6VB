import { Router } from "express";
import { createField, getFields } from './field.controller.js';
import { uploadFieldImage } from "../../middlewares/file-uploader.js";

const router = Router();

router.post(
    '/create',
    uploadFieldImage.single('image'),
    createField
)
router.get(
    '/get',
    getFields
)

export default router;  