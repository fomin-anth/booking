import { CommandFactory } from 'nest-commander';
import { AppModule } from '../app/app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, ['debug', 'error', 'log']);
}
bootstrap();
