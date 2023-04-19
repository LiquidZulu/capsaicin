import { injectable } from 'inversify';
import { IGenCaption } from './';
import { TERM_COLOUR } from '../../termcols';

@injectable()
export class GenCaptionWhisper implements IGenCaption {
    async read(
        file: string,
        model: string,
        outDir: string,
        options: { [key: string]: boolean | string }
    ): Promise<string> {
        const command = `whisper ${file} --model ${model} ${
            !!options.noCUDA ? '--fp16 False' : '--device cuda'
        } --output_dir ${outDir} --task transcribe --language en`;

        console.log(command); // I think its nice to let people know what their computer is doing
        const { stderr, stdout } = await require('exec-sh').promise(command);

        if (!!stderr) throw new Error(stderr);

        console.log(
            `\n\n\n${TERM_COLOUR.BgCyan}${TERM_COLOUR.FgBlack}[FINISHED]${TERM_COLOUR.Reset} ${command}\n\n${stdout}`
        );
        return stdout;
    }
}
