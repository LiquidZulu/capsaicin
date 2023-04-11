export abstract class IGenCaptionRead {
    abstract read(file: string, model: string): Promise<string>;
}
