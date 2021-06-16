const connection = require('../db-config');
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        email: Joi.string().email().max(255).presence(presence),
        firstname: Joi.string().max(255).presence(presence),
        lastname: Joi.string().max(255).presence(presence),
        city: Joi.string().allow(null, '').max(255),
        language: Joi.string().allow(null, '').max(255),
      }).validate(data, { abortEarly: false }).error;
    };

    const findMany = ({ filters: {language}}) => {
        let sql = 'SELECT * FROM users';
        const sqlValues = [];
        if (language){
          sql += ' WHERE language = ?';
          sqlValues.push(language)
        }
    }

    const findOne = (id) => {
        return db
        .query('SELECT * FROM users WHERE id = ?', [id])
        .then(([results]) => results[0])
    }

    const findByEmail = (email) => {
        return db
          .query('SELECT * FROM users WHERE email = ?', [email])
          .then(([results]) => results[0]);
      };
      
      const findByEmailWithDifferentId = (email, id) => {
        return db
          .query('SELECT * FROM users WHERE email = ? AND id <> ?', [email, id])
          .then(([results]) => results[0]);
      };

    const createOne = (data) => {
        return db.query('INSERT INTO users SET ?', data).then(([result]) => {
            const id = result.insertId;
            return { ...data, id };
          });
    }

    const updateOne = (newAttributes, id) => {
        return db
        .query('UPDATE users SET ? WHERE id = ?', [newAttributes, id]);
    }

    const deleteOne = (id) => {
        return db
        .query('DELETE FROM users WHERE id = ?', [id])
        .then(([results]) => results.affectedRows !== 0)
    }

    module.exports = {
        validate,
        findMany,
        findOne,
        findByEmail,
        findByEmailWithDifferentId,
        createOne,
        updateOne,
        deleteOne
      }