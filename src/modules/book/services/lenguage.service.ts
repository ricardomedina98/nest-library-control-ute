import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LenguageRepository } from '../repositories/lenguage.repository';
import { CreateLenguageDto } from '../dto/lenguage/create-lenguage.dto';
import { LenguagesEntity } from '../entities/lenguage.entity';
import { toDtoLenguages, toDtoLenguage } from '../mapper/lenguage.mapper';
import { LenguageDto } from '../dto/lenguage/lenguage.dto';
import { UpdateLenguageDto } from '../dto/lenguage/update-lenguage.dto';

@Injectable()
export class LenguageService {

    constructor(
        @InjectRepository(LenguageRepository)
        private readonly _lenguageRepository: LenguageRepository
    ) {}

    async getOneLenguage(id: number): Promise<LenguageDto> {

        const lenguage = await this._lenguageRepository.findOne(id);

        return toDtoLenguage(lenguage);

    }

    async getAllLenguages(): Promise<LenguageDto[]> {

        const lenguages = await this._lenguageRepository.find();

        return toDtoLenguages(lenguages);

    }

    async createLenguage(createLenguageDto: CreateLenguageDto) {

        const { name } = createLenguageDto;

        const existLenguage = await this._lenguageRepository.findOne({
            where: {
                name
            }
        });

        if(existLenguage) {
            throw new ConflictException('Lenguage already exist');
        }

        let lenguage: LenguagesEntity = this._lenguageRepository.create({
            name
        });

        lenguage = await this._lenguageRepository.save(lenguage);

        return toDtoLenguage(lenguage);
        
    }
    
    async updateLenguage(id: number, updateLenguageDto: UpdateLenguageDto) {

        const { name } = updateLenguageDto;

        const existLenguage = await this._lenguageRepository.findOne(id);

        if(!existLenguage) {
            throw new ConflictException('Lenguage does not exist');
        }

        const lenguage: LenguagesEntity = this._lenguageRepository.merge(existLenguage, {
            name
        });

        return toDtoLenguage(lenguage);

    }

    async deleteLenguage(id: number) {

        const existLenguage = await this._lenguageRepository.findOne(id);

        if(!existLenguage) {
            throw new ConflictException('Lenguage does not exist');
        }

        await this._lenguageRepository.remove(existLenguage);

        return toDtoLenguage(existLenguage);

    }

}
