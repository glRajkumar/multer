### File upload using Multer
examples for image uploads using MERN stack
React files are named as according to the express file names

### (1) single image uploading  - single.js
displaying image by serving url from server

### (2) multiple images uploading  - multiple.js
displaying image by serving url from server

### (3) to save images in db using server as storage - saveInDb.js
displaying image by serving ids from mongodb. Images are saved using the Image Model.
(images are saved in server also. It is advised to use For small size of files. You can change the storage engine according to your need)

### (4) to save images in db (directly) using "multer-gridfs-storage" - usingGfs.js
displaying image by streaming using "gridfs-stream"
(Best solution for large files. The easiest way of find document is finding by name, not by id.)

### (5) (dropped) as a function way of image uploading  - anotherWay.js


### Things to consider
look form data in submit functions of SingleForm.js and MultipleForm.js

### Changes for future use
change accept attribute of input in each React files