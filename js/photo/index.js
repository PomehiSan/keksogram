import './upload-photo.js';
import { setEvents } from './popup.js';
import { openPhotoEdit, resetPhotoEdit } from './scale-photo.js';
import { openPhotoFilter, resetPhotoFilter } from './filter.js';
import { resetFields } from './validation.js';

setEvents([openPhotoEdit, openPhotoFilter], [resetPhotoEdit, resetPhotoFilter, resetFields]);
