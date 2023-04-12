import { TImOutputs } from '../../TYPES';

export { ConvertToImage } from './ConvertToImage';

export abstract class IConvert {
    abstract convert(
        path: string,
        format: TImOutputs,
        options: { [key: string]: boolean | string }
    ): void;
}
