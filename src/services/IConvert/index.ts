import { TImOutputs } from '../../TYPES';

export { ConvertToImage } from './ConvertToImage';

export abstract class IConvert {
    abstract convert(path: string, format: TImOutputs): void;
}
