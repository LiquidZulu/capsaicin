import { injectable } from 'inversify';
import { IGenCaptionRead } from './';

@injectable()
export class GenCaptionWhisper implements IGenCaptionRead {
    async read(file: string, model: string): Promise<string> {
        const { stderr, stdout } = await require('exec-sh').promise(
            `whisper ${file} --model ${model} --task transcribe --language en`
        );

        if (!!stderr) throw new Error(stderr);

        return stdout;
    }
}
