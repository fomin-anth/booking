import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBookingsUsersRoles1717415167707 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.query(`CREATE TYPE user_role AS ENUM ('admin', 'user')`);

    await queryRunner.query(
      `
CREATE TABLE users (
  id serial PRIMARY KEY NOT NULL,
  name varchar not null,
  role user_role NOT NULL DEFAULT 'user',
  password_hash varchar,
  salt varchar not null
)`,
    );

    await queryRunner.query(
      `
CREATE TABLE bookings (
  id serial PRIMARY KEY NOT NULL, 
  user_id integer NOT NULL, 
  date date NOT NULL, 
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
)`,
    );
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.query(`DROP TYPE user_role`);
    await queryRunner.query(`DROP TABLE users`);
    await queryRunner.query(`DROP TABLE bookings`);
  }
}
