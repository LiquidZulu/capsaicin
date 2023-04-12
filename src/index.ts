import 'reflect-metadata';
import { Container, inject, injectable } from 'inversify';
import { Command, Option } from 'commander';
const path = require('path');

const C = new Container();
const program = new Command();

import { TERM_COLOUR } from './termcols';

import {
    IGenCaption,
    GenCaptionWhisper,
    IConvert,
    ConvertToImage,
} from './services';

@injectable()
class Application {
    constructor(
        @inject(IGenCaption) GenCaption: IGenCaption,
        @inject(IConvert) Convert: IConvert
    ) {
        this.GenCaption = GenCaption;
        this.Convert = Convert;
    }

    public run(
        filenames: string[],
        out: string,
        options: { [key: string]: boolean | string }
    ) {
        for (let filename of filenames) {
            // This is if I want to generate captions from an audio file
            if (options.whisper) {
                (async () => {
                    await this.GenCaption.read(
                        filename,
                        options.model as string,
                        out,
                        options
                    );

                    if (options.png) {
                        this.Convert.convert(
                            path.resolve(out, filename),
                            'png'
                        );
                    }
                })();
            }

            // This is if I want to convert an .srt into .png or whatever
            else if (options.convert) {
                this.Convert.convert(path.resolve(filename), 'png');
            }
        }
    }

    private GenCaption: IGenCaption;
    private Convert: IConvert;
}

C.bind(IGenCaption).to(GenCaptionWhisper);
C.bind(IConvert).to(ConvertToImage);
C.bind(Application).toSelf();

const app = C.get(Application);

const [chili, chilistem, logo_text] = [
    TERM_COLOUR.FgRed,
    TERM_COLOUR.FgGreen,
    TERM_COLOUR.FgGray,
];

const logo = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀${chilistem}⣴⡾⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣾⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠻⢿⣷⣄⠀⠀⠀⠀⠀
${chili}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡾⢛⣿⣿⣶⣄${chilistem}⠙⠿⠀⠀⠀⠀⠀ ${logo_text} ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄ ▄▄    ▄
${chili}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟⢀⣾⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀ ${logo_text}█       █      █       █       █      █   █       █   █  █  █ █
${chili}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⢀⣾⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀ ${logo_text}█       █  ▄   █    ▄  █  ▄▄▄▄▄█  ▄   █   █       █   █   █▄█ █
${chili}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⣼⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀ ${logo_text}█     ▄▄█ █▄█  █   █▄█ █ █▄▄▄▄▄█ █▄█  █   █     ▄▄█   █       █
${chili}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣷⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀ ${logo_text}█    █  █      █    ▄▄▄█▄▄▄▄▄  █      █   █    █  █   █  ▄    █
${chili}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${logo_text}█    █▄▄█  ▄   █   █    ▄▄▄▄▄█ █  ▄   █   █    █▄▄█   █ █ █   █
${chili}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${logo_text}█▄▄▄▄▄▄▄█▄█ █▄▄█▄▄▄█   █▄▄▄▄▄▄▄█▄█ █▄▄█▄▄▄█▄▄▄▄▄▄▄█▄▄▄█▄█  █▄▄█
${chili}⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⣶⡿⠿⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀${TERM_COLOUR.Reset}`;

program
    .name('capsaicin')
    .description('An automatic caption generator, powered by OpenAI Whisper')
    .version('0.9.0')
    .addHelpText('beforeAll', logo)
    .showHelpAfterError();

program
    .argument(
        '[filenames...]',
        'The .srt or audio file(s) to generate captions from'
    )
    .option(
        '--outdir <path>',
        'The directory to output files to',
        './capsaicin'
    )
    .option(
        '-w, --whisper',
        'Generate captions for [filenames...] with OpenAI Whisper'
    )
    .option(
        '-c, --convert',
        'Convert given caption file(s) to the supplied format'
    )
    .option('-p, --png', 'Export captions as PNG images')
    .option('--noCUDA', 'Disable CUDA support')
    .option('--im-size', 'The -size input provided to ImageMagick')
    .option('--im-pointsize', 'The -pointsize input provided to ImageMagick')
    .option(
        '--im-gravity',
        'The -gravity input provided to ImageMagick, use magick -list gravity for options'
    )
    .option(
        '--im-font',
        'The -font input provided to ImageMagick, use magick -list font for options'
    )
    .addOption(
        new Option('--model <model>')
            .default('tiny.en')
            .choices([
                'tiny.en',
                'tiny',
                'base.en',
                'base',
                'small.en',
                'small',
                'medium.en',
                'medium',
                'large',
            ])
    )
    .option(
        '--model <model>',
        'The model to use to generate the captions',
        'tiny.en'
    )
    .action((filenames, options) => {
        if (filenames.length == 0) {
            // exits the program
            program.help();
        }

        app.run(filenames, options.outdir, options);
    });

program.parseAsync(process.argv);
