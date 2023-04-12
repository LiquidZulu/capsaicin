export { GenCaptionWhisper } from './GenCaptionWhisper';

export abstract class IGenCaption {
    abstract read(
        file: string,
        model: string,
        outDir: string,
        options?: { [key: string]: boolean | string }
    ): Promise<string>;
}
