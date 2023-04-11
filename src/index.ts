import 'reflect-metadata';
import { Container, inject, injectable } from 'inversify';
import { Command } from 'commander';

const C = new Container();
const CLI = new Command();

CLI.name('capsaicin').description(
    'An automatic caption generator, powered by OpenAI Whisper'
);

abstract class IGenCaptionRead {
    abstract read(file: string, model: string): string;
}

abstract class IGenCaptionProc {
    abstract proc(captions: string): string;
}

abstract class IGenCaptionLoad {
    abstract export(file: string): void;
}

abstract class IConvertRead {
    abstract read(file: string): string;
}

abstract class IConvertProc {
    abstract proc(captions: string): string;
}

abstract class IConvertLoad {
    abstract export(file: string): void;
}

@injectable()
class Application {
    constructor(
        @inject(IGenCaptionRead) GenCaptionRead: IGenCaptionRead,
        @inject(IGenCaptionProc) GenCaptionProc: IGenCaptionProc,
        @inject(IGenCaptionLoad) GenCaptionLoad: IGenCaptionLoad,
        @inject(IConvertRead) ConvertRead: IConvertRead,
        @inject(IConvertProc) ConvertProc: IConvertProc,
        @inject(IConvertLoad) ConvertLoad: IConvertLoad
    ) {
        this.GenCaptionRead = GenCaptionRead;
        this.GenCaptionProc = GenCaptionProc;
        this.GenCaptionLoad = GenCaptionLoad;
        this.ConvertRead = ConvertRead;
        this.ConvertProc = ConvertProc;
        this.ConvertLoad = ConvertLoad;
    }

    public run(
        fileToGenerateCaptionsFrom: string,
        captionsToConvertToPNG: string,
        out: string,
        flags: number
    ) {
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
        }

        // read
        // transform
        // load
    }

    private GenCaptionRead: IGenCaptionRead;
    private GenCaptionProc: IGenCaptionProc;
    private GenCaptionLoad: IGenCaptionLoad;
    private ConvertRead: IConvertRead;
    private ConvertProc: IConvertProc;
    private ConvertLoad: IConvertLoad;
}

C.bind(Application).toSelf();

const app = C.get(Application);

CLI.option(
    '-c, --captions',
    'The path to an audio file to generate captions from.',
    undefined
);
CLI.option(
    '-p, --topng',
    'The path to a captions file to generate png images from.',
    undefined
);
CLI.option('-o, --output', 'The path to output files to.', './capsaicin');

console.log('Hello world!');

//CLI.parse();
