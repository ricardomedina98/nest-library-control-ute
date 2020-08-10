import { UserEntity } from "src/modules/user/user.entity";
import { UserDto } from "src/modules/user/dto/user.dto";
import { RoleEntity } from "src/modules/role/entities/role.entity";
import { RoleDto } from "src/modules/role/dto/role.dto";

export const toUserDto = (data: UserEntity): UserDto => {
    if (!data) return null;

    const { id, username, email, details, createdAt, updatedAt, role } = data;

    let userDto: UserDto = {
        id,
        username,
        email,
        name: details.name,
        firstName: details.firstName,
        secondName: details.secondName,
        createdAt,
        updatedAt,
        role: role.name
    };

    return userDto;
};


export const toRoleDto = (data: RoleEntity): RoleDto => {
    if (!data) return null;

    const { id_role, name, description, status, createdAt, updatedAt } = data;

    let roleDto: RoleDto = {
        id_role,
        name,
        description
    };

    return roleDto;
};

export const toRolesDto = (data: RoleEntity[]): RoleDto[] => {

    let rolesDto: RoleDto[] = data.map(role => {


        return {
            id_role: role.id_role,
            name: role.name,
            description: role.description
        }
    });

    return rolesDto;

};


export const toRolesUsersDto = (data: RoleEntity[]): RoleDto[] => {

    let rolesDto: RoleDto[] = data.map(role => {

        let users: UserDto[] = role.users.map(user => {
            return  {
                id: user.id,
                username: user.username,
                email : user.email,
                name: user.details.name,
                firstName: user.details.firstName,
                secondName: user.details.secondName,
                role: role.name,
            }
        });

        return {
            id_role: role.id_role,
            name: role.name,
            description: role.description,
            users
        }
    });

    return rolesDto;

};