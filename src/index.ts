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
        const format = (() => {
            if (options.png) return 'png';
            if (options.jpg) return 'jpg';
            if (options.gif) return 'gif';
            if (options.tiff) return 'tiff';
            return '';
        })();
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

                    if (format !== '') {
                        this.Convert.convert(
                            path.resolve(out, filename),
                            format,
                            options
                        );
                    }
                })();
            }

            // This is if I want to convert an .srt into .png or whatever
            else if (options.convert) {
                if (format !== '') {
                    this.Convert.convert(
                        path.resolve(filename),
                        format,
                        options
                    );
                } else {
                    console.warn(
                        `You did not provide a format to convert ${filename} into. Try capsaicin -cp ${filename}`
                    );
                }
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
    .version('0.9.1')
    .addHelpText('beforeAll', logo)
    .addHelpText(
        'after',
        `

Examples:
  capsaicin -cp ./subtitles.srt             convert subtitles.srt into subtitles.srt-images/n.png
  capsaicin -w ./song-1.mp3 ./song-2.mp3    generate lyrics for an album of songs
  capsaicin -wcp ./youtube-video.mp3        generate image captions for a youtube video, WARNING: it is recommended that you edit the captions by hand as the AI sometimes makes mistakes`
    )
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
    ) //'gif' | 'jpg' | 'png' | 'tiff'
    .option('-p, --png', 'Export captions as PNG images')
    .option('-j, --jpg', 'Export captions as JPEG images')
    .option('-g, --gif', 'Export captions as GIF images')
    .option('-t, --tiff', 'Export captions as TIFF images')
    .option(
        '--noCUDA',
        'Disable CUDA support (try this option if you get Whisper errors)'
    )
    .option(
        '--im-size <size>',
        'The -size input provided to ImageMagick',
        '1920x1080'
    )
    .option(
        '--im-pointsize <pointsize>',
        'The -pointsize input provided to ImageMagick',
        '48'
    )
    .option(
        '--im-gravity <gravity>',
        'The -gravity input provided to ImageMagick, use magick -list gravity for options',
        'South'
    )
    .option(
        '--im-font <font>',
        'The -font input provided to ImageMagick, use magick -list font for options',
        'Cubano-Normal'
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
    .action((filenames, options) => {
        if (filenames.length == 0) {
            // exits the program
            program.help();
        }

        app.run(filenames, options.outdir, options);
    });

program.parseAsync(process.argv);
