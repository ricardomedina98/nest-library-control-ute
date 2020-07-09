import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateRoleDTO } from '../dto/create-role.dto';

@Injectable()
export class ParseNameCreatePipe implements PipeTransform<CreateRoleDTO, CreateRoleDTO> {
  transform(createDto: CreateRoleDTO, metadata: ArgumentMetadata): CreateRoleDTO {
    const role: CreateRoleDTO = {
        name: createDto.name.toUpperCase(),
        description: createDto.description
    };

    return role;
  }
}