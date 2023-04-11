import 'reflect-metadata';
import { Container, inject, injectable } from 'inversify';
const { Command } = require('commander');

const C = new Container();
const program = new Command();

import {
    IGenCaptionRead,
    GenCaptionWhisper,
    IGenCaptionProc,
    IGenCaptionLoad,
    IConvertRead,
    IConvertProc,
    IConvertLoad,
} from './services';

@injectable()
class Application {
    constructor(
        @inject(IGenCaptionRead) GenCaptionRead: IGenCaptionRead
        /*@inject(IGenCaptionProc) GenCaptionProc: IGenCaptionProc,
        @inject(IGenCaptionLoad) GenCaptionLoad: IGenCaptionLoad,
        @inject(IConvertRead) ConvertRead: IConvertRead,
        @inject(IConvertProc) ConvertProc: IConvertProc,
        @inject(IConvertLoad) ConvertLoad: IConvertLoad*/
    ) {
        this.GenCaptionRead = GenCaptionRead;
        /*this.GenCaptionProc = GenCaptionProc;
        this.GenCaptionLoad = GenCaptionLoad;
        this.ConvertRead = ConvertRead;
        this.ConvertProc = ConvertProc;
        this.ConvertLoad = ConvertLoad;*/
    }

    public async run(
        filename: string,
        out: string,
        flags: { [key: string]: boolean }
    ) {
        console.log(await this.GenCaptionRead.read(filename, 'tiny.en'));
        /*
        if (flags & FLAGS.GEN_CAPTIONS_WHISPER) {
            this.GenCaptionLoad.export(
                this.GenCaptionProc.proc(
                    this.GenCaptionRead.read(
                        fileToGenerateCaptionsFrom,
                        'the name of the model should go here'
                    )
                )
            );
        }

        if (flags & FLAGS.CONVERT_PNG) {
            this.ConvertLoad.export(
                this.ConvertProc.proc(
                    this.ConvertRead.read(captionsToConvertToPNG)
                )
            );
        }*/
    }

    private GenCaptionRead: IGenCaptionRead;
    private GenCaptionProc: IGenCaptionProc;
    private GenCaptionLoad: IGenCaptionLoad;
    private ConvertRead: IConvertRead;
    private ConvertProc: IConvertProc;
    private ConvertLoad: IConvertLoad;
}

C.bind(IGenCaptionRead).to(GenCaptionWhisper);
C.bind(Application).toSelf();

const app = C.get(Application);

const logo = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡾⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣾⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠻⢿⣷⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡾⢛⣿⣿⣶⣄⠙⠿⠀⠀⠀⠀⠀  ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄ ▄▄    ▄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟⢀⣾⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀ █       █      █       █       █      █   █       █   █  █  █ █
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⢀⣾⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀ █       █  ▄   █    ▄  █  ▄▄▄▄▄█  ▄   █   █       █   █   █▄█ █
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⣼⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀ █     ▄▄█ █▄█  █   █▄█ █ █▄▄▄▄▄█ █▄█  █   █     ▄▄█   █       █
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣷⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀ █    █  █      █    ▄▄▄█▄▄▄▄▄  █      █   █    █  █   █  ▄    █
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀ █    █▄▄█  ▄   █   █    ▄▄▄▄▄█ █  ▄   █   █    █▄▄█   █ █ █   █
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ █▄▄▄▄▄▄▄█▄█ █▄▄█▄▄▄█   █▄▄▄▄▄▄▄█▄█ █▄▄█▄▄▄█▄▄▄▄▄▄▄█▄▄▄█▄█  █▄▄█
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⣶⡿⠿⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

program
    .name('capsaicin')
    .description('An automatic caption generator, powered by OpenAI Whisper')
    .version('0.9.0')
    .addHelpText('beforeAll', logo)
    .showHelpAfterError();

program
    .argument('[filename]', 'The .srt or audio file to generate captions from')
    .option(
        '-w, --whisper',
        'Generate captions for [filename] with OpenAI Whisper'
    )
    .option(
        '-c, --convert',
        'Convert a given captions file to the supplied format'
    )
    .option('-p, --png', 'Export captions as PNG images')
    .option('-s, --srt', 'Export captinos as .srt file')
    .action((filename, options, command) => {
        if (filename == undefined) {
            // exits the program
            program.help();
        }

        app.run(filename, './capsaicin', options);
    });

/*
CLI.option('--blah')
    .option(
        '--captions <filename>',
        'The path to an audio file to generate captions from.',
        undefined
    )
    .option(
        '-p, --topng <filename>',
        'The path to a captions file to generate png images from.',
        undefined
    )
    .option(
        '-o, --output <directory>',
        'The path to output files to.',
        './capsaicin'
    );
*/

program.parseAsync(process.argv);
/*
const { captions, topng, output } = program.opts();

// TODO make this an interactive dealio
// neither provided
if (!captions && !topng) {
    console.log(captions);
} else {
    const [isCaptions, isTopng] = [!!captions, !!topng];

    app.run(
        isCaptions ? captions : '',
        isCaptions ? topng : '',
        output,
        (FLAGS.GEN_CAPTIONS_WHISPER * Number(isCaptions)) |
            (FLAGS.CONVERT_PNG * Number(isTopng))
    );
}*/
