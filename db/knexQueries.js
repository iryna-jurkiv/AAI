const knex = require('./knex');




module.exports = {
    users: {
        getAll: function() { // Working now
            return knex('users_table').orderBy('user_id', 'desc').select();
        },
        getOne: function(id) {
            return knex('users_table').where('user_id', id).first()
        },
        getOneByEmail: function(email) {
            return knex('users_table').where('email', email)
        },
        getOneByName: function(name) {
            return knex('users_table').where('first_name', name)

        },
        create: function(user) {
            return knex('users').insert(user).returning('*')
        },
        update: (id, user) => {
            return knex('users')
                .where('user_id', id)
                .update(user, 'user_id')
        },
        delete: (id) => {
            return knex('users')
                .where('user_id', id)
                .del();
        }
    },
    accessLevel: {
        getAll: function () {
            return knex.from('users')
                .innerJoin('user_profile', 'users.user_id', 'user_profile.user_id')
        },
        getOne: function (id) {
            return knex.from('users')
                .innerJoin('user_profile', 'users.user_id', 'user_profile.user_id')
                .where('users.user_id', id).first()
        },
        createOne: function(user) {
            return knex('user_profile').insert(user).returning('*')
        },
        updateOne: (id, user_profile) => {
            return knex.from('user_profile')
                .where('user_id', id)
                .update(user_profile, 'user_id')
        },
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
        delete: function (id) {
            console.log('Create this function') // To be created
        }
    }
};
