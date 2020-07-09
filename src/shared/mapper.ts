import { UserEntity } from "src/modules/user/user.entity";
import { UserDto } from "src/modules/user/dto/user.dto";
import { RoleEntity } from "src/modules/role/role.entity";
import { RoleDTO } from "src/modules/role/dto/role.dto";

export const toUserDto = (data: UserEntity): UserDto => {
    if(!data) return null;

    const { id, username, email, details, createdAt, updatedAt, role  } = data;
    
    let userDto: UserDto = {
      id,
      username,
      email,
      deitals: {
        id: details.id,
        name: details.name,
        firstName: details.firstName,
        secondName: details.secondName
      },
      createdAt,
      updatedAt,
      role: {
        id_role: role.id_role,
        name: role.name,
        description: role.description,
        status: role.status,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt
      }
    };
  
    return userDto;
};


export const toRoleDto = (data: RoleEntity): RoleDTO => {
    if(!data) return null;

    const { id_role, name, description, status, createdAt, updatedAt } = data;
    
    let roleDto: RoleDTO = {
        id_role,
        name,
        description,
        status,
        createdAt,
        updatedAt
    };
  
    return roleDto;
};