import { createReadStream } from 'fs';

interface IFileReader {
  readFileLine(line: number, lineSize: number): Promise<string>;
}

export class FileReader implements IFileReader {
  constructor(private filePath: string) {}

  async readFileLine(line: number, lineSize: number): Promise<string> {
    const readStream = createReadStream(this.filePath, {
      start: line * lineSize,
      end: (line + 1) * lineSize - 2, // -1 is \n
    });

    const readLinePromise: Promise<string> = new Promise((res, rej) => {
      let lineString = '';
      readStream.on('data', (data) => {
        lineString = `${lineString}${data.toString()}`;
      });
      readStream.on('end', () => {
        readStream.close();
        res(lineString);
      });
      readStream.on('error', (error) => {
        readStream.close();
        rej(error);
      });
    });

    return readLinePromise;
  }
}
