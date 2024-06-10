import { Test, TestingModule } from '@nestjs/testing';
import { CsvProvider } from './csv.provider';

describe('Csv', () => {
  let provider: CsvProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvProvider],
    }).compile();

    provider = module.get<CsvProvider>(CsvProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
