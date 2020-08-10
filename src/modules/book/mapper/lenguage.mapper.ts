import { LenguageDto } from "../dto/lenguage/lenguage.dto";
import { LenguagesEntity } from "../entities/lenguage.entity";

export const toDtoLenguage = (lenguageEntity: LenguagesEntity) => {

    if (!lenguageEntity) return new LenguageDto();

    const { id_lenguage, name } = lenguageEntity;

    let lenguage: LenguageDto = {
        id_lenguage,
        name
    }

    return lenguage;

}

export const toDtoLenguages = (lenguagesEntity: LenguagesEntity[]) => {

    if (!lenguagesEntity) return lenguagesEntity = [] ;

    let lenguages: LenguageDto[] = lenguagesEntity.map(lenguage => {

        return {
            id_lenguage: lenguage.id_lenguage,
            name: lenguage.name
        }

    });

    return lenguages;

}