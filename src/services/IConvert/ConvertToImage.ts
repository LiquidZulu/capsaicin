import { injectable } from 'inversify';
import { createReadStream } from 'fs';
import { mkdir } from 'fs/promises';
import { parse, map } from 'subtitle';
import { IConvert } from './';
import { basename, dirname, extname, join } from 'path';
import { TImOutputs } from '../../TYPES';

@injectable()
export class ConvertToImage implements IConvert {
    public async convert(path: string, format: TImOutputs) {
        const inType = extname(path).toLowerCase();
        const dir = dirname(path);
        const filename = basename(path);

        if (inType !== '.srt')
            throw new Error(`Cannot convert files of type ${inType}`);

        const inStream = createReadStream(path)
            .pipe(parse())
            .pipe(
                map((n, i) => {
                    if (n.type === 'cue') return n;
                })
            );

        inStream.on('error', e => {
            throw e;
        });

        let i = 0;
        for await (let chunk of inStream) {
            (async j => {
                const outdir = join(dir, `${filename}-images/`);
                const outfile = join(outdir, `/${j}.${format}`);
                await mkdir(outdir);
                const command = `magick -background transparent -fill white -font Cubano-Normal -size 1920x1080 -pointsize 48 -gravity South label:"${chunk.data.text}\\n" ${outfile}`;

                console.log(command); // I think its nice to let people know what their computer is doing
                const { stderr, stdout } = await require('exec-sh').promise(
                    command
                );

                if (!!stderr) throw new Error(stderr);

                console.log(stdout);
            })(i++);
        }
    }
}
