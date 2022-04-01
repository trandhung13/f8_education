const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let queryCourse = Course.find();

        if (req.query.hasOwnProperty('_sort')) {
            queryCourse.sort({
                [req.query.column]: req.query.type,
            });
        } 

        Promise.all([queryCourse, Course.countDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses)
                })
            )
            .catch(next);
    }
    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted()
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}

module.exports = new MeController;
