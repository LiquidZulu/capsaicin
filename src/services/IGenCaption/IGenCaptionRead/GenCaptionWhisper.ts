import { injectable } from 'inversify';
import { IGenCaptionRead } from './';
import { default as sh } from 'exec-sh';

@injectable()
export class GenCaptionWhisper implements IGenCaptionRead {
    async read(file: string, model: string): Promise<string> {
        const { stderr, stdout } = await sh.promise(
            `whisper ${file} --model ${model} --task transcribe --language en`
        );

        if (!!stderr) throw new Error(stderr);

        return stdout;
    }
}
