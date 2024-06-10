import { FileReader } from './FileReader';

describe('FileReader', () => {
  it('should get same string', async () => {
    const fr = new FileReader('./csv_data/RoomRepository.csv');
    const string =
      '000000000000000,!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!room1,000000000000001\n';
    const stringRes = await fr.readFileLine(3, string.length);
    console.log(stringRes);
    expect(stringRes).toBe(
      '000000000000003,!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!room4,000000000000001',
    );
  });
});
