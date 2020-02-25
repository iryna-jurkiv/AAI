const knex = require('./knex');


module.exports = {
    users: {
        getAll: function() { // Working now
            return knex('users_table').orderBy('user_id', 'desc').select();
        },
        getOne: function(id) {
            return knex('users_table').where('user_id', id).first()
        },
        getOneByUserID: function(id) {
            return knex('users_table').where('user_id', id).first()
        },
        getOneByEmployeeID: function(id) {
            return knex('users_table').where('employee_number', id).first()
        },
        getOneByEmail: function(email) {
            return knex('users_table').where('email', email)
        },
        getOneByName: function(name) {
            return knex('users_table').where('first_name', name)

        },
        getOneByDepartment: function(department) {
          return knex('users_table').where('department', department)
        },
        create: function(user) {
            return knex('users_table').insert(user).returning('*')
        },
        update: (id, user) => {
            return knex('users_table')
                .where('employee_number', id)
                .update(user, 'user_id')
        },
        updateByUID: (id, user) => {
            return knex('users_table')
                .where('user_id', id)
                .update(user, 'user_id')
        },
        delete: (id) => {
            return knex('users_table')
                .where('user_id', id)
                .del();
        },
        getByAccessLevel: function (access_level) {
            return knex('users_table').where('access_level', access_level)

        },
        getManager: function (id) {
          return knex('users_table').where('user_id', id).first()
        },
        getManagerStaffList: function (id) {
          return knex('users_table').where('manager', id)
        }
      },
    requests: {
        getAllUsersRequests: function (id) {
            return knex('user_requests').where('user_id', id)
        },
        createOne: function (user_request) {
            return knex('user_requests').insert(user_request)
        },
        getOne: function () {
            console.log('Create this function') // To be created
        },
        delete: function () {
            console.log('Create this function') // To be created
        }
    },
    personal: {
        create: function(user) {
            return knex('users_details').insert(user).returning('*')
        },
        update: (id, user) => {
            return knex('users_details')
                .where('employee_number', id)
                .update(user, 'employee_number')
        },
        getPersonalData: (id) => {
            return knex('users_details').where('employee_number', id).first()
        }

    }
};


// accessLevel: {
//     getAll: function () {
//         return knex.from('hr')
//             .innerJoin('user_profile', 'hr.user_id', 'user_profile.user_id')
//     },
//     getOne: function (id) {
//         return knex.from('hr')
//             .innerJoin('user_profile', 'hr.user_id', 'user_profile.user_id')
//             .where('hr.user_id', id).first()
//     },
//     createOne: function(user) {
//         return knex('user_profile').insert(user).returning('*')
//     },
//     updateOne: (id, user_profile) => {
//         return knex.from('user_profile')
//             .where('user_id', id)
//             .update(user_profile, 'user_id')
//     },
// },
