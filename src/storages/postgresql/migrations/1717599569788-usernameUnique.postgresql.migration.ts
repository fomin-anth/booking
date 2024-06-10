import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsernameUnique1717599569788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            alter table users add unique(username) 
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
