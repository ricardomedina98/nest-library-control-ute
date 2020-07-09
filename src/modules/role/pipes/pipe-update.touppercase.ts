import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { UpdateRoleDTO } from '../dto/update-role.dto';

@Injectable()
export class ParseNameUpdatePipe implements PipeTransform<UpdateRoleDTO, UpdateRoleDTO> {
  transform(updateDto: UpdateRoleDTO, metadata: ArgumentMetadata): UpdateRoleDTO {
    const role: UpdateRoleDTO = {
        name: updateDto.name.toUpperCase(),
        description: updateDto.description
    };

    return role;
  }
}