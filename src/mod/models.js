/* eslint-disable class-methods-use-this */
import pool from '../mid/pg';

const createClause = (table, columns, valueHolders, values) => pool.query(`INSERT INTO ${table} (${columns}) VALUES(${valueHolders}) RETURNING id`, values);

const retrieveClause = (selection, table, where, values) => pool.query(`SELECT ${selection} FROM ${table} WHERE ${where}`, values);

const updateClause = (table, set, where, values) => pool.query(`UPDATE ${table} SET ${set} WHERE ${where}', ${values}`);

const deleteClause = (table, where, values) => pool.query(`DELETE FROM ${table} WHERE ${where}, ${values}`);

export default {
  createClause, retrieveClause, updateClause, deleteClause,
};
