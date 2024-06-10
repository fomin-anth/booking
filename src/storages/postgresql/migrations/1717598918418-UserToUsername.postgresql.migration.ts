import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserToUsername1717598918418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            alter table users rename column name to username;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
